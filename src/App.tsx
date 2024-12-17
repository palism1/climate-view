import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import Footer from "./components/Footer";
import CmsPage from "./modules/cms/CmsPage";
import VisualizationPage from "./modules/visualizationEngine/VisualizationPage";
import { fetchData } from "./modules/DataFetchingModule";
import "./App.css"; // Import the external CSS file

function CmsPageWrapper() {
  const { pageId } = useParams();
  if (!pageId) {
    return <div>Error: Page ID is missing</div>;
  }
  return <CmsPage pageId={pageId} />;
}

function VisualizationPageWrapper() {
  const { dataId } = useParams();
  if (!dataId) {
    return <div>Error: Data ID is missing</div>;
  }
  return <VisualizationPage dataId={dataId} />;
}

function App() {
  const [climateData, setClimateData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData("noaa", "weather-data");
      setClimateData(data);
    };
    getData();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content-container">
          <Routes>
            <Route path="/cms/:pageId" element={<CmsPageWrapper />} />{" "}
            {/* Add CMS route */}
            <Route
              path="/visualization/:dataId"
              element={<VisualizationPageWrapper />}
            />{" "}
            {/* Add Visualization route */}
            <Route path="/" element={<Tabs />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
