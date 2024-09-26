import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ResourcesAvailable() {
  const [resources, setResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDescription, setFilterDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get("http://localhost:8000/inventory");
        setResources(response.data.resources);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterDescription(event.target.value);
  };

  const filteredResources = resources.filter(
    (resource) =>
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterDescription === "" ||
        resource.description.toLowerCase() === filterDescription.toLowerCase())
  );

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResources.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Resources Available
      </h1>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "45%",
          }}
        />
        <select
          value={filterDescription}
          onChange={handleFilterChange}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "45%",
          }}
        >
          <option value="">Filter by Description</option>
          <option value="Consumable">Consumable</option>
          <option value="Non-Consumable">Non-Consumable</option>
        </select>
      </div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
            <th style={{ padding: "12px 15px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "12px 15px", textAlign: "left" }}>
              Quantity
            </th>
            <th style={{ padding: "12px 15px", textAlign: "left" }}>
              Description
            </th>
            <th style={{ padding: "12px 15px", textAlign: "left" }}>Unit</th> {/* Added Unit column header */}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((resource, index) => (
            <tr
              key={index}
              style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#fff" }}
            >
              <td style={{ padding: "12px 15px", textAlign: "left" }}>
                {resource.name}
              </td>
              <td style={{ padding: "12px 15px", textAlign: "left" }}>
                {resource.quantity < 3 && (
                  <FaExclamationTriangle
                    style={{ marginRight: "5px", color: "red" }}
                  />
                )}
                {resource.quantity}
              </td>
              <td style={{ padding: "12px 15px", textAlign: "left" }}>
                {resource.description}
              </td>
              <td style={{ padding: "12px 15px", textAlign: "left" }}>
                {resource.unit} {/* Display unit */}
              </td>
            </tr>
          ))}
          {currentItems.length === 0 && ( // Display message when no resources match the search
            <tr>
              <td
                colSpan="4"
                style={{ padding: "12px 15px", textAlign: "center" }}
              >
                No resources found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              style={{
                margin: "0 5px",
                padding: "5px 10px",
                border: "none",
                backgroundColor: i + 1 === currentPage ? "#007bff" : "#fff",
                color: i + 1 === currentPage ? "#fff" : "#007bff",
                cursor: "pointer",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
