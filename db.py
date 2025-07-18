import sqlite3
import argparse

parser = argparse.ArgumentParser(description='Seed database.')
parser.add_argument('-s', action='store_true', help='Seed the database with test data.')
args = parser.parse_args()

conn = sqlite3.connect('data.db')
cursor = conn.cursor()

cursor.execute('DROP TABLE IF EXISTS flushes;')
cursor.execute('DROP TABLE IF EXISTS readings;')
cursor.execute('DROP TABLE IF EXISTS boundaries;')
cursor.execute('DROP TABLE IF EXISTS warnings;')

cursor.execute('''
  CREATE TABLE flushes (
    id INTEGER PRIMARY KEY,
    start_datetime TEXT,
    end_datetime TEXT,
    stage TEXT,
    active INTEGER NOT NULL DEFAULT 0,
    current INTEGER NOT NULL DEFAULT 0
  );
''')
cursor.execute('''
  CREATE TABLE readings (
    id INTEGER PRIMARY KEY,
    humidity FLOAT NOT NULL,
    co2 INTEGER NOT NULL,
    temperature FLOAT NOT NULL,
    stage TEXT,
    flush_id INTEGER NOT NULL,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (flush_id) REFERENCES flushes (id)
  );
''')
cursor.execute('''
  CREATE TABLE boundaries (
    id INTEGER PRIMARY KEY,
    humidifier_on FLOAT,
    humidifier_off FLOAT,
    humidity_min_warn FLOAT,
    humidity_max_warn FLOAT,
    fan_on INTEGER,
    fan_off INTEGER,
    co2_max_warn INTEGER,
    temperature_min_warn FLOAT,
    temperature_max_warn FLOAT,
    lights_on TEXT,
    lights_off TEXT,
    stage TEXT,
    flush_id INTEGER,
    FOREIGN KEY (flush_id) REFERENCES flushes (id)
  );
''')
cursor.execute('''
  CREATE TABLE warnings (
    id INTEGER PRIMARY KEY,
    flush_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    value REAL NOT NULL,
    stage TEXT,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (flush_id) REFERENCES flushes (id)
  );
''')

if args.s:
  try:
    cursor.execute('INSERT INTO flushes (start_datetime, stage, active, current) VALUES ("2025-07-14 08:00:00", "pinning", 0, 1);')
    cursor.executemany('INSERT INTO readings (temperature, humidity, co2, stage, flush_id, timestamp) VALUES (?, ?, ?, ?, ?, ?);', (
      (82.5, 70.1, 1220, "pinning", 1, "2025-07-14 08:00:00"),
      (83.4, 66.0, 1210, "pinning", 1, "2025-07-14 08:01:00"),
      (81.2, 59.8, 1182, "pinning", 1, "2025-07-14 08:02:00"),
      (78.0, 69.3, 1100, "pinning", 1, "2025-07-14 08:03:00"),
      (64.3, 73.0, 1065, "pinning", 1, "2025-07-14 08:04:00"),
      (60.3, 78.7, 1043, "pinning", 1, "2025-07-14 08:05:00"),
      (61.6, 76.4, 998, "pinning", 1, "2025-07-14 08:06:00"),
      (65.6, 75.9, 997, "pinning", 1, "2025-07-14 08:07:00"),
      (70.7, 76.0, 998, "pinning", 1, "2025-07-14 08:08:00")
    ))
    cursor.execute('''
      INSERT INTO boundaries (
        humidifier_on,
        humidifier_off,
        humidity_min_warn,
        humidity_max_warn,
        fan_on,
        fan_off,
        co2_max_warn,
        temperature_min_warn,
        temperature_max_warn,
        lights_on,
        lights_off,
        stage,
        flush_id
      ) VALUES (75.0, 85.0, 70.0, 90.0, 1200, 1000, 1500, 70.0, 95.0, "2025-07-14 08:00:00", "2025-07-14 20:00:00", "pinning", 1);
    ''')
    cursor.executemany('INSERT INTO warnings (flush_id, type, value, stage) VALUES (?, ?, ?, ?);', (
      (1, 'humidity', 59.8, 'pinning'),
      (1, 'co2', 221, 'fruiting')
    ))
  except sqlite3.Error as e:
    print(f"Error seeding database: {e}")

conn.commit()
conn.close()

print('Database and tables created.')
if args.s:
  print('Test data seeded.')
