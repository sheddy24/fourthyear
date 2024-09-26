import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

// Components
import RootNavbar from "../components/RootNavbar";
import RootSidebar from "../components/RootSidebar";
import { Button, Icon } from "@chakra-ui/react";
import {
  FaUser,
  FaHome,
  FaChartBar,
  FaWarehouse,
  FaTasks,
  FaClipboardCheck,
  FaProjectDiagram,
} from "react-icons/fa";

const SiteSupervisor = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  const location = useLocation();
  const projects = location.state && location.state.projects;

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
          zIndex: 1,
        }}
      >
        <RootSidebar>
          <Link to="profile" style={linkStyle}>
            <FaUser style={iconStyle} /> Profile
          </Link>
          <Link to="userhomepage" style={linkStyle}>
            <FaHome style={iconStyle} /> Home
          </Link>
          <Link to="sdashboard" style={linkStyle}>
            <FaChartBar style={iconStyle} /> Dashboard
          </Link>
          <Link to="layout" style={linkStyle}>
            <FaWarehouse style={iconStyle} /> Inventory
          </Link>
          <Link to="taskslayout" style={linkStyle}>
            <FaTasks style={iconStyle} /> Tasks
          </Link>
          <Link to="approveregister" style={linkStyle}>
            <FaClipboardCheck style={iconStyle} /> Approve Register
          </Link>
          <Link to="projectplan" style={linkStyle}>
            <FaProjectDiagram style={iconStyle} /> Project Plan
          </Link>
          <Link to='help'style={linkStyle}>help</Link>
        </RootSidebar>
      </div>

      {/* Main Content */}
      <div style={{ flex: "1", marginLeft: "250px", position: "relative" }}>
        {/* Navbar */}
        <div style={navbarStyle}>
          <RootNavbar>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={logoStyle}>
                <img
                  src="https://img.freepik.com/free-vector/flat-design-construction-company-logo_23-2150051906.jpg?size=626&ext=jpg&ga=GA1.1.1860668642.1707247523&semt=ais"
                  alt="logo"
                  style={logoImageStyle}
                />
              </div>
              <h1>Welcome Site Supervisor</h1>
              <Button onClick={handleLogout} colorScheme="red">
                Logout
              </Button>
            </div>
          </RootNavbar>
        </div>
        {/* Outlet */}
        <div style={outletStyle}>
          <Outlet projects={projects} />
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

const navbarStyle = {
  position: "fixed",
  top: 0,
  left: "250px",
  right: 0,
  backgroundColor: "white",
  zIndex: 1,
  padding: "10px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
};

const logoStyle = {
  backgroundColor: "gray",
  padding: "10px",
  borderRadius: "50%",
};

const logoImageStyle = {
  width: "40px",
  borderRadius: "50%",
};

const outletStyle = {
  paddingTop: "60px",
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingBottom: "20px",
  overflowY: "auto",
  height: "calc(100vh - 60px)",
  marginTop: "30px",
};

export default SiteSupervisor;
