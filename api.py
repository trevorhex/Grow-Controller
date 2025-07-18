from flask import Flask, jsonify, request
import sqlite3
from lib.db import *

app = Flask(__name__)

#
# GET /flush or GET /flush/:flush_id
#
@app.route('/flushes/current', methods=['GET'])
@app.route('/flushes/<int:flush_id>', methods=['GET'])
def flush(flush_id=None):
  conn = create_connection()
  try:
    cursor = conn.cursor()
    
    if flush_id is None:
      cursor.execute('SELECT * FROM flushes WHERE current = 1')
    else:
      cursor.execute('SELECT * FROM flushes WHERE id = ?', (flush_id,))
    
    flush_row = cursor.fetchone() 
    if not flush_row:
      return jsonify({ 'error': 'No flush found' }), 404

    flush_data = dict(flush_row)
    flush_id = flush_data['id']
    print(f"Flush: {flush_data}")
    
    cursor.execute('SELECT * FROM readings WHERE flush_id = ? ORDER BY timestamp', (flush_id,))
    readings_rows = cursor.fetchall()
    readings_data = [dict(row) for row in readings_rows]
    
    cursor.execute('SELECT * FROM boundaries WHERE flush_id = ?', (flush_id,))
    boundary_row = cursor.fetchone()
    boundary_data = dict(boundary_row) if boundary_row else None

    return jsonify({
      'flush': flush_data,
      'readings': readings_data,
      'boundary': boundary_data
    })
  except Exception as e:
    print(f"An error occurred: {str(e)}")
    return jsonify({ 'error': str(e) }), 500
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

#
# PATCH /boundaries/<int:boundary_id>
#
@app.route('/boundaries/<int:boundary_id>', methods=['PATCH'])
def update_boundary(boundary_id=None):
  conn = create_connection()
  try:
    cursor = conn.cursor()

    if boundary_id is None:
      cursor.execute('SELECT id FROM boundaries WHERE current = 1')
      boundary_row = cursor.fetchone()
      if not boundary_row:
        return jsonify({ 'error': 'No current boundary found' }), 404
      boundary_id = boundary_row['id']

    cursor.execute('SELECT * FROM boundaries WHERE id = ?', (boundary_id,))

    boundary_row = cursor.fetchone()
    if not boundary_row:
      return jsonify({ 'error': 'Boundary not found' }), 404

    allowed_fields = {
      'humidifier_on', 'humidifier_off', 'humidity_min_warn', 'humidity_max_warn',
      'fan_on', 'fan_off', 'co2_max', 'co2_max_warn',
      'temperature_min_warn', 'temperature_max_warn',
    }

    updates = { key: value for key, value in request.json.items() if key in allowed_fields }

    fields = ', '.join([f"{key} = ?" for key in updates.keys()])
    values = list(updates.values()) + [boundary_id]

    cursor.execute(f'UPDATE boundaries SET {fields} WHERE id = ?', values)
    conn.commit()

    cursor.execute('SELECT * FROM boundaries WHERE id = ?', (boundary_id,))
    return jsonify(dict(cursor.fetchone()))

  except Exception as e:
    print(f"An error occurred: {str(e)}")
    return jsonify({ 'error': str(e) }), 500
  finally:
    conn.close()

if __name__ == '__main__':
  app.run(debug=True)