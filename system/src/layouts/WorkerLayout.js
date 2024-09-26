import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Avatar, Button, Icon } from "@chakra-ui/react";
import {
  FaUser,
  FaHome,
  FaChartBar,
  FaTools,
  FaTasks,
  FaExclamationCircle,
  FaCloudSun,
  FaShieldAlt,
  FaClipboardList,
  FaUserClock,
} from "react-icons/fa";

import RootNavbar from "../components/RootNavbar";
import RootSidebar from "../components/RootSidebar";

const WorkerLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("wtoken");
    navigate("/");
  };
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
        <RootSidebar>
          <Link to="profile" style={linkStyle}>
            <FaUser style={iconStyle} /> Profile
          </Link>
          <Link to="userhomepage" style={linkStyle}>
            <FaHome style={iconStyle} /> Home
          </Link>
          <Link to="wdashboard" style={linkStyle}>
            <FaChartBar style={iconStyle} /> Dashboard
          </Link>
          {/**<Link to="equipmentrequest" style={linkStyle}>
            <FaTools style={iconStyle} /> Request Equipments
      </Link>*/}
          <Link to="viewtasks" style={linkStyle}>
            <FaTasks style={iconStyle} /> View Tasks
          </Link>
          {/**<Link to="reportissues" style={linkStyle}>
            <FaExclamationCircle style={iconStyle} /> Report Issues
          </Link>
          <Link to="weatherinformation" style={linkStyle}>
            <FaCloudSun style={iconStyle} /> Weather Information
    </Link>*/}
          <Link to="safetyreminders" style={linkStyle}>
            <FaShieldAlt style={iconStyle} /> Safety Rules
          </Link>
          <Link to="registerlayout" style={linkStyle}>
            <FaUserClock style={iconStyle} /> Attendance
          </Link>
          <Link to="help" style={linkStyle}>help</Link>
        </RootSidebar>
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: "250px",
          overflowY: "auto",
          position: "relative",
          flex: "1",
        }}
      >
        {/* Navbar */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "gray",
            zIndex: 1,
            padding: "10px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <RootNavbar>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src="https://img.freepik.com/free-vector/flat-design-construction-company-logo_23-2150051906.jpg?size=626&ext=jpg&ga=GA1.1.1860668642.1707247523&semt=ais"
                alt="logo"
                style={{ width: "40px", borderRadius: "50%" }}
              />
              <h1>Welcome Onsite Worker</h1>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Avatar size="sm" />
              <Button size="sm" colorScheme="blue" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </RootNavbar>
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

// Styles
const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "10px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  transition: "background-color 0.3s, color 0.3s",
};

const iconStyle = {
  fontSize: "20px",
};

export default WorkerLayout;
