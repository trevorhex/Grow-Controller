import time
import board
import adafruit_scd4x
from lib.relay import *
from lib.db import *

sensor = adafruit_scd4x.SCD4X(board.I2C())
sensor.start_periodic_measurement()

HUMIDIFIER_RELAY = 1
FAN_RELAY = 2
LIGHT_RELAY = 3
INSERT_DELAY_MINUTES = 1

try:
  conn = create_connection()
  cursor = conn.cursor()

  flush_data = get_flush()
  flush = flush_data['flush']
  boundary = flush_data['boundary']

  print("Starting flush:", flush)
  print("Boundary conditions:", boundary)

  def control_humidifier(humidity):
    if humidity < boundary['humidifier_on']:
      relay_on(HUMIDIFIER_RELAY)
    elif humidity > boundary['humidifier_off']:
      relay_off(HUMIDIFIER_RELAY)
  
  def control_fan(co2):
    if co2 > boundary['fan_on']:
      relay_on(FAN_RELAY)
    elif co2 < boundary['fan_off']:
      relay_off(FAN_RELAY)

  def check_humidity_warning(humidity, flush_id):
    if humidity < boundary['humidity_min_warn']:
      save_warning(humidity, 'Humidity too low', flush_id)
    elif humidity > boundary['humidity_max_warn']:
      save_warning(humidity, 'Humidity too high', flush_id)

  def check_co2_warning(co2, flush_id):
    if co2 > boundary['co2_max_warn']:
      save_warning(co2, 'CO₂ too high', flush_id)

  def check_temperature_warning(temp, flush_id):
    if temp < boundary['temperature_min_warn']:
      save_warning(temp, 'Temperature too low', flush_id)
    elif temp > boundary['temperature_max_warn']:
      save_warning(temp, 'Temperature too high', flush_id)

  if not flush:
    print('No current flush found.')
    exit(1)

  last_insert_time = 0

  while True:
    if sensor.data_ready:
      humidity = sensor.relative_humidity
      co2 = sensor.CO2
      temp = sensor.temperature * 9/5.0 + 32

      print("Humidity %0.1f %%" % humidity)
      print("CO₂ %d ppm" % co2)
      print("Temperature %0.1f *F" % temp)

      if boundary:  
        control_humidifier(humidity)
        control_fan(co2)
        check_humidity_warning(humidity, flush['id'])
        check_co2_warning(co2, flush['id'])
        check_temperature_warning(temp, flush['id'])

      current_time = time.time()
      if current_time - last_insert_time >= 60 * INSERT_DELAY_MINUTES:
        cursor.execute('INSERT INTO readings (co2, temperature, humidity, flush_id) VALUES (?, ?, ?, ?);', 
                       (co2, temp, humidity, flush['id']))
        conn.commit()
        last_insert_time = current_time

    time.sleep(15)

except Exception as e:
  print(f"An error occurred: {str(e)}")
finally:
  conn.close()
  relay_all_off()
