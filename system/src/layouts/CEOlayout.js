import { Outlet } from "react-router-dom";
import React from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const CEOlayout = () => {
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
        <Sidebar />
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
          <Navbar />
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

export default CEOlayout;
