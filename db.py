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
    start_datetime DATETIME,
    end_datetime DATETIME,
    active INTEGER NOT NULL DEFAULT 0
  );
''')
cursor.execute('''
  CREATE TABLE readings (
    id INTEGER PRIMARY KEY,
    temperature FLOAT NOT NULL,
    humidity FLOAT NOT NULL,
    co2 INTEGER NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    flush_id INTEGER,
    FOREIGN KEY (flush_id) REFERENCES flushes (id)
  );
''')
cursor.execute('''
  CREATE TABLE boundaries (
    id INTEGER PRIMARY KEY,
    temperature_min_warn FLOAT NOT NULL,
    temperature_max_warn FLOAT NOT NULL,
    humidity_min FLOAT NOT NULL,
    humidity_min_warn FLOAT NOT NULL,
    humidity_max FLOAT NOT NULL,
    humidity_max_warn FLOAT NOT NULL,
    co2_max INTEGER NOT NULL,
    co2_max_warn INTEGER NOT NULL,
    flush_id INTEGER,
    FOREIGN KEY (flush_id) REFERENCES flushes (id)
  );
''')
cursor.execute('''
  CREATE TABLE warnings (
    id INTEGER PRIMARY KEY,
    reading_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    value REAL NOT NULL,
    FOREIGN KEY (reading_id) REFERENCES readings (id)
  );
''')

if args.s:
  try:
    cursor.execute('INSERT INTO flushes (start_datetime, active) VALUES ("2025-07-14 08:00:00", 1);')
    cursor.executemany('INSERT INTO readings (temperature, humidity, co2, flush_id) VALUES (?, ?, ?, ?);', (
      (82.5, 70.1, 210, 1),
      (83.4, 66.0, 212, 1),
      (81.2, 59.8, 212, 1),
      (78.0, 69.3, 213, 1),
      (64.3, 73.0, 215, 1),
      (60.3, 78.7, 217, 1),
      (61.6, 76.4, 218, 1),
      (65.6, 75.9, 221, 1),
      (70.7, 76.0, 220, 1)
    ))
    cursor.execute('''
      INSERT INTO boundaries (
        temperature_min_warn,
        temperature_max_warn,
        humidity_min,
        humidity_min_warn,
        humidity_max,
        humidity_max_warn,
        co2_max,
        co2_max_warn,
        flush_id
      ) VALUES (60.0, 90.0, 70.0, 60.0, 80.0, 90.0, 200, 220, 1);
    ''')
    cursor.executemany('INSERT INTO warnings (reading_id, type, value) VALUES (?, ?, ?);', (
      (3, 'humidity', 59.8),
      (8, 'co2', 221)
    ))
  except sqlite3.Error as e:
    print(f"Error seeding database: {e}")

conn.commit()
conn.close()

print('Database and tables created.')
if args.s:
  print('Test data seeded.')
