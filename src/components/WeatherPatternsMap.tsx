import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import "./WeatherPatternsMap.css"; // Import the external CSS file

// Fix marker icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Define default marker icon to fix missing icons in Leaflet
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const WeatherPatternsMap: React.FC = () => {
  // Example marker data
  const markers: { position: LatLngTuple; data: string }[] = [
    {
      position: [37.7749, -122.4194],
      data: "San Francisco: Clear skies, 22°C",
    },
    { position: [51.5074, -0.1278], data: "London: Rainy, 15°C" },
    { position: [-33.8688, 151.2093], data: "Sydney: Sunny, 28°C" },
  ];

  return (
    <div className="map-container">
      <MapContainer
        center={[20.0, 0.0] as LatLngTuple} // Explicitly type as a tuple
        zoom={2} // Initial zoom level
        className="map"
      >
        {/* Use a dark map theme for consistency with the app */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap contributors, &copy; CARTO"
        />
        {/* Add markers dynamically */}
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>
              <div className="popup-content">{marker.data}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default WeatherPatternsMap;
