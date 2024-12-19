import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  getCapitalMarkers,
  updateTemperatureForCapital,
} from "../utils/capitalMarkers"; // Updated import
import starIconUrl from "../assets/star-icon.png"; // Import the star icon

// Define the custom star icon
const starIcon = new L.Icon({
  iconUrl: starIconUrl,
  iconSize: [25, 25],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

// Define the MarkerData Interface
interface MarkerData {
  name: string;
  state: string;
  lat: number;
  lon: number;
  temperature?: string | number;
  unit?: string;
}

const LiveTemperatureMap: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  // Fetch initial markers on component mount
  useEffect(() => {
    const fetchMarkers = async () => {
      const data = await getCapitalMarkers();
      setMarkers(data);
    };

    fetchMarkers();
  }, []);

  // Handle marker click to update temperature dynamically
  const handleMarkerClick = async (marker: MarkerData) => {
    const updatedData = await updateTemperatureForCapital(marker);
    setMarkers((prevMarkers) =>
      prevMarkers.map((m) =>
        m.name === marker.name
          ? {
              ...m,
              temperature: updatedData.temperature,
              unit: updatedData.unit,
            }
          : m
      )
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <MapContainer
        center={[37.8, -96]} // Center on the US
        zoom={4} // Initial zoom level
        style={{ height: "100%", width: "100%" }}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        minZoom={3}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.lat, marker.lon]}
            icon={starIcon}
            eventHandlers={{
              click: () => handleMarkerClick(marker), // Fetch temperature on click
            }}
          >
            <Popup>
              <strong>
                {marker.name}, {marker.state}
              </strong>
              <br />
              Temperature: {marker.temperature ?? "Loading..."} {marker.unit}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LiveTemperatureMap;
