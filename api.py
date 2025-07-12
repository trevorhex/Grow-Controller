from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__)

def get_db_connection():
  conn = sqlite3.connect('data.db')
  conn.row_factory = sqlite3.Row
  return conn

@app.route('/data', methods=['GET'])
def data():
  conn = get_db_connection()
  try:
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM data")
    rows = cursor.fetchall()
    data = []
    for row in rows:
      data.append({
        'co2': row[0],
        'temperature': row[1],
        'humidity': row[2],
        'timestamp': row[3]
      })
    return jsonify(data)
  finally:
    conn.close()
