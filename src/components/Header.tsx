import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header: React.FC = () => {
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#2196f3", padding: "10px" }}
    >
      <Toolbar>
        <Typography variant="h5" style={{ flexGrow: 1, textAlign: "center" }}>
          Climate Data Visualization
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
