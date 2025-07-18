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
        f.*, b.id as boundary_id, b.temperature_min_warn, b.temperature_max_warn,
        b.humidity_min, b.humidity_min_warn, b.humidity_max, b.humidity_max_warn,
        b.co2_max, b.co2_max_warn
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
      'temperature_min_warn': data['temperature_min_warn'],
      'temperature_max_warn': data['temperature_max_warn'],
      'humidity_min': data['humidity_min'],
      'humidity_min_warn': data['humidity_min_warn'],
      'humidity_max': data['humidity_max'],
      'humidity_max_warn': data['humidity_max_warn'],
      'co2_max': data['co2_max'],
      'co2_max_warn': data['co2_max_warn'],
      'flush_id': data['id']
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
