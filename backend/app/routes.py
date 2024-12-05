from flask import Blueprint, jsonify

main = Blueprint("main", __name__)

@main.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the Climate Data Visualization API!"})

@main.route("/api/temperature", methods=["GET"])
def get_temperature():
    data = {
        "labels": ["2000", "2005", "2010", "2015", "2020"],
        "temperature": [14.5, 14.7, 14.8, 15.0, 15.3]
    }
    return jsonify(data)
