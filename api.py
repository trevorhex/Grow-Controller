from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__)

def create_connection():
  conn = sqlite3.connect('data.db')
  conn.row_factory = sqlite3.Row
  return conn

#
# GET /flush
#
@app.route('/flush', methods=['GET'])
def flush():
  conn = create_connection()
  try:
    cursor = conn.cursor()
    cursor.execute('''
      SELECT f.*, r.*, b.*
      FROM flushes f
      JOIN readings r ON f.id = r.flush_id
      JOIN boundaries b ON f.id = b.flush_id
      WHERE f.current = 1
    ''')
    rows = cursor.fetchall()
    return jsonify([dict(row) for row in rows])
  finally:
    conn.close()

#
# GET /flush/:flush_id
#
@app.route('/flush/<int:flush_id>', methods=['GET'])
def flush(flush_id):
  conn = create_connection()
  try:
    cursor = conn.cursor()
    cursor.execute('''
      SELECT f.*, r.*, b.*
      FROM flushes f
      JOIN readings r ON f.id = r.flush_id
      JOIN boundaries b ON f.id = b.flush_id
      WHERE f.id = ?
    ''', (flush_id,))
    rows = cursor.fetchall()
    return jsonify([dict(row) for row in rows])
  finally:
    conn.close()

#
# GET /warnings
#
@app.route('/warnings', methods=['GET'])
def warnings():
  conn = create_connection()
  try:
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM warnings')
    rows = cursor.fetchall()
    return jsonify([dict(row) for row in rows])
  finally:
    conn.close()

#
# GET /boundaries
#
@app.route('/boundaries', methods=['GET'])
def boundaries():
  conn = create_connection()
  try:
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM boundaries')
    rows = cursor.fetchall()
    return jsonify([dict(row) for row in rows])
  finally:
    conn.close()

#
# GET /flushes
#
@app.route('/flushes', methods=['GET'])
def flushes():
  conn = create_connection()
  try:
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM flushes')
    rows = cursor.fetchall()
    return jsonify([dict(row) for row in rows])
  finally:
    conn.close()

if __name__ == '__main__':
  app.run(debug=True)