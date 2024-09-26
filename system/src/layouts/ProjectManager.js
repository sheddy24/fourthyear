import React from "react";
import { Outlet } from "react-router-dom";

// Page imports
import Psidebar from "../pmanagerpages/Psidebar";
import Pnavbar from "../pmanagerpages/Pnavbar";

const ProjectManager = ({ username }) => {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <div
        style={{
          flex: "0 0 auto",
          width: "250px",
          backgroundColor: "blue",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          overflowY: "auto",
        }}
      >
        <Psidebar />
      </div>

      {/* Main Content */}
      <div style={{ flex: "1", marginLeft: "250px", overflowY: "auto" }}>
        {/* Navbar */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: "250px",
            right: 0,
            backgroundColor: "white",
            zIndex: 1,
          }}
        >
          <Pnavbar username={username} />
        </div>
        {/* Outlet */}
        <div
          style={{
            paddingTop: "60px",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingBottom: "20px",
            overflowY: "auto",
            height: "calc(100vh - 60px)",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProjectManager;
