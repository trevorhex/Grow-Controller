from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/data', methods=['GET'])
def data():
  return jsonify({ 'message': 'Grow Controller' })
