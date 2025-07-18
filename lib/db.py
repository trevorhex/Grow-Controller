import sqlite3

#
# Create a database connection
#
def create_connection():
  conn = sqlite3.connect('data.db')
  conn.row_factory = sqlite3.Row
  return conn

#
# Query current flush and boundary data
#
def get_flush():
  try:
    conn = create_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
      SELECT 
        f.*, b.id as boundary_id, b.stage,
        b.humidifier_on, b.humidifier_off, b.humidity_min_warn, b.humidity_max_warn,
        b.fan_on, b.fan_off, b.co2_max_warn, b.lights_on, b.lights_off,
        b.temperature_min_warn, b.temperature_max_warn,
      FROM flushes f
      LEFT JOIN boundaries b ON f.id = b.flush_id
      WHERE f.current = 1;
    ''')
    
    row = cursor.fetchone()
  finally:
    conn.close()

  if not row:
    return None
  
  data = dict(row)
  
  flush_data = {
    'id': data['id'],
    'start_datetime': data['start_datetime'],
    'end_datetime': data['end_datetime'],
    'active': data['active'],
    'current': data['current']
  }
  
  boundary_data = None
  if data['boundary_id']:
    boundary_data = {
      'id': data['boundary_id'],
      'stage': data['stage'],
      'flush_id': data['id'],
      'humidifier_on': data['humidifier_on'],
      'humidifier_off': data['humidifier_off'],
      'humidity_min_warn': data['humidity_min_warn'],
      'humidity_max_warn': data['humidity_max_warn'],
      'fan_on': data['fan_on'],
      'fan_off': data['fan_off'],
      'co2_max_warn': data['co2_max_warn'],
      'lights_on': data['lights_on'],
      'lights_off': data['lights_off'],
      'temperature_min_warn': data['temperature_min_warn'],
      'temperature_max_warn': data['temperature_max_warn']
    }

  return { 'flush': flush_data, 'boundary': boundary_data }

#
# Save a warning
#
def save_warning(value, warning_type, flush_id):
  try:
    conn = create_connection()
    cursor = conn.cursor()

    cursor.execute('INSERT INTO warnings (flush_id, type, value) VALUES (?, ?, ?);',
                   (flush_id, warning_type, value))

    conn.commit()
  finally:
    conn.close()
