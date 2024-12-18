from flask import Flask, send_file, request, jsonify
import matplotlib.pyplot as plt
import pandas as pd
import io
from process_region import process_selected_region  # Import the region processing function

app = Flask(__name__)

@app.route("/plot", methods=["GET"])
def generate_plot():
    # Example data for the plot
    df_1 = pd.read_csv("../datasets/USTemperature.csv", parse_dates=['dt'])
    df_1['dt'] = pd.to_datetime(df_1['dt'], errors='coerce')
    df_1['YearMonth'] = df_1['dt'].dt.to_period('M')  # Aggregate monthly 
    df_1 = df_1.groupby('YearMonth')['averagetemp'].mean().reset_index()
    
    # Convert to datetime and numeric
    df_1['YearMonth'] = df_1['YearMonth'].dt.to_timestamp()
    data = df_1[['YearMonth', 'averagetemp']]
    
    # Visualize the data
    plt.figure(figsize=(4, 4))
    plt.plot(data['YearMonth'], data['averagetemp'], label='Average Temperature')
    plt.title("Average Monthly Temperature")
    plt.xlabel("Year")
    plt.ylabel("Temperature")
    plt.legend()
    plt.show()

    # Save the plot to an in-memory file
    img = io.BytesIO()
    plt.savefig(img, format="png")
    img.seek(0)
    plt.close()

    # Return the image as a response
    return send_file(img, mimetype="image/png")

@app.route("/select-region", methods=["POST"])
def select_region():
    data = request.get_json()  # Retrieve the incoming JSON data
    selected_region = data.get('region')  # Extract the region

    if not selected_region:
        return jsonify({"error": "Region is required"}), 400

    # Process the selected region using the function from process_region.py
    process_selected_region(selected_region)

    return jsonify({"message": f"Region {selected_region} selected successfully!"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)