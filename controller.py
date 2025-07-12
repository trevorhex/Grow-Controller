import sqlite3
import time
import datetime
import board
import adafruit_scd4x

conn = sqlite3.connect('data.db')
cursor = conn.cursor()

sensor = adafruit_scd4x.SCD4X(board.I2C())
sensor.start_periodic_measurement()

try:
  while True:
    if sensor.data_ready:
      co2 = sensor.CO2
      temp = sensor.temperature * 9/5.0 + 32
      humidity = sensor.relative_humidity
      timestamp = datetime.datetime.now()

      print("CO2 %d ppm" % co2)
      print("Temperature %0.1f *F" % temp)
      print("Humidity %0.1f %%" % humidity)
  
      cursor.execute("INSERT INTO data (co2, temperature, humidity, timestamp) VALUES (?, ?, ?, ?)", (co2, temp, humidity, timestamp))

      conn.commit()

    time.sleep(30)

except KeyboardInterrupt:
  conn.close()
  print("\nGoodbye")
except Exception as e:
  conn.close()
  print(f"An error occurred: {str(e)}")
