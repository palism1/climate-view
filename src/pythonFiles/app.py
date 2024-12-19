from flask import Flask, send_file, request, jsonify
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
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

@app.route("/prediction-plot", methods=["GET"])
def generate_prediction_plot():
    # Example data for the plot
    df_1 = pd.read_csv("../datasets/USTemperature.csv", parse_dates=['dt'])
    df_1['dt'] = pd.to_datetime(df_1['dt'], errors='coerce')
    df_1['YearMonth'] = df_1['dt'].dt.to_period('M')  # Aggregate monthly 
    df_1 = df_1.groupby('YearMonth')['averagetemp'].mean().reset_index()
    
    # Convert to datetime and numeric
    df_1['YearMonth'] = df_1['YearMonth'].dt.to_timestamp()
    data = df_1[['YearMonth', 'averagetemp']]

     # Normalize the temperature data
    scaler = MinMaxScaler(feature_range=(0, 1))
    data['temp_scaled'] = scaler.fit_transform(data[['averagetemp']])
    
    # Prepare data for LSTM
    def create_sequences(data, seq_length):
        X, y = [], []
        for i in range(len(data) - seq_length):
            X.append(data[i:i+seq_length])
            y.append(data[i+seq_length])
        return np.array(X), np.array(y)
    
    # Sequence length
    SEQ_LENGTH = 12  # Use past 12 months to predict the next month
    
    # Create sequences
    temp_values = data['temp_scaled'].values
    X, y = create_sequences(temp_values, SEQ_LENGTH)
    
    # Reshape for LSTM input: [samples, time steps, features]
    X = X.reshape((X.shape[0], X.shape[1], 1))
    
    # Build the LSTM model
    model = Sequential()
    model.add(LSTM(50, activation='relu', input_shape=(SEQ_LENGTH, 1)))
    model.add(Dense(1))  # Output layer for single value prediction
    model.compile(optimizer='adam', loss='mse')
    
    # Train the model
    history = model.fit(X, y, epochs=50, batch_size=16, validation_split=0.1)
    
    # Predict future temperature
    future_steps = 12  # Predict next 12 months
    input_seq = temp_values[-SEQ_LENGTH:]  # Start with the last known sequence
    predictions = []
    
    for _ in range(future_steps):
        pred = model.predict(input_seq.reshape(1, SEQ_LENGTH, 1), verbose=0)
        predictions.append(pred[0, 0])
        input_seq = np.append(input_seq[1:], pred[0, 0])  # Update input sequence
    
    # Inverse scale predictions
    predictions = scaler.inverse_transform(np.array(predictions).reshape(-1, 1))
    
    # Visualize predictions
    future_dates = pd.date_range(data['YearMonth'].iloc[-1], periods=future_steps + 1, freq='M')[1:]
    
    plt.figure(figsize=(10, 6))
    plt.plot(data['YearMonth'], data['averagetemp'], label="Historical Temperature")
    plt.plot(future_dates, predictions, label="Predicted Temperature", linestyle='--')
    plt.title("Temperature Prediction")
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