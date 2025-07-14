from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__)

def create_connection():
  conn = sqlite3.connect('data.db')
  conn.row_factory = sqlite3.Row
  return conn

#
# GET /readings
#
@app.route('/readings', methods=['GET'])
def data():
  conn = create_connection()
  try:
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM readings')
    return jsonify(cursor.fetchall())
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
    return jsonify(cursor.fetchall())
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
    return jsonify(cursor.fetchall())
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
    return jsonify(cursor.fetchall())
  finally:
    conn.close()

if __name__ == '__main__':
  app.run(debug=True)