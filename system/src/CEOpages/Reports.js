import React, { useEffect, useState } from "react";
import {
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import axios from "axios"; // for making API requests

const Reports = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [resourceAllocations, setResourceAllocations] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    // Fetch projects data from backend
    axios
      .get("http://localhost:8000/ceoreport/project-reports")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });

    // Fetch task reports
    axios
      .get("http://localhost:8000/ceoreport/task-reports")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });

    // Fetch resource allocation reports
    axios
      .get("http://localhost:8000/ceoreport/resource-allocation-reports")
      .then((response) => {
        setResourceAllocations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resource allocations:", error);
      });

    // Fetch worker reports
    axios
      .get("http://localhost:8000/ceoreport/worker-reports")
      .then((response) => {
        setWorkers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching workers:", error);
      });

    // Fetch inventory reports
    axios
      .get("http://localhost:8000/ceoreport/inventory-reports")
      .then((response) => {
        setInventoryItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inventory items:", error);
      });

    // Fetch adverts reports
    axios
      .get("http://localhost:8000/ceoreport/adverts-reports")
      .then((response) => {
        setAdverts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching adverts:", error);
      });
  }, []);

  // Define frontend table components
  const ProjectTable = () => (
    <Table variant="striped" colorScheme="teal" marginTop="20px">
      <Thead>
        <Tr>
          <Th>Project Name</Th>
          <Th>Description</Th>
          <Th>Budget</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {projects.map((project) => (
          <Tr key={project.id}>
            <Td>{project.projectName}</Td>
            <Td>{project.description}</Td>
            <Td>{project.budget}</Td>
            <Td>{project.status}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );

  const TaskTable = () => (
    <Table variant="striped" colorScheme="teal" marginTop="20px">
      <Thead>
        <Tr>
          <Th>Task Name</Th>
          <Th>Deadline</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tasks.map((task) => (
          <Tr key={task.taskid}>
            <Td>{task.taskname}</Td>
            <Td>{task.deadline}</Td>
            <Td>{task.status}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );

  
  const ResourceAllocationTable = () => (
    <Table variant="striped" colorScheme="teal" marginTop="20px">
      <Thead>
        <Tr>
          <Th>Resource ID</Th>
          <Th>Amount</Th>
        </Tr>
      </Thead>
      <Tbody>
        {resourceAllocations.map((allocation) => (
          <Tr key={allocation.id}>
            <Td>{allocation.resourceId}</Td>
            <Td>{allocation.amount}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );

  const WorkerTable = () => (
    <Table variant="striped" colorScheme="teal" marginTop="20px">
      <Thead>
        <Tr>
          <Th>Worker Name</Th>
          <Th>Attendance Status</Th>
          <Th>Approval Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {workers.map((worker) => (
          <Tr key={worker.id}>
            <Td>
              {worker.fname} {worker.lname}
            </Td>
            <Td>{worker.status}</Td>
            <Td>{worker.approvalStatus}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );

  const InventoryTable = () => (
    <Table variant="striped" colorScheme="teal" marginTop="20px">
      <Thead>
        <Tr>
          <Th>Inventory Item</Th>
          <Th>Quantity</Th>
          <Th>Description</Th>
        </Tr>
      </Thead>
      <Tbody>
        {inventoryItems.map((item) => (
          <Tr key={item.id}>
            <Td>{item.name}</Td>
            <Td>{item.quantity}</Td>
            <Td>{item.description}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );

  const AdvertsTable = () => (
    <Table variant="striped" colorScheme="teal" marginTop="20px">
      <Thead>
        <Tr>
          <Th>Role</Th>
          <Th>Description</Th>
          <Th>Requirements</Th>
        </Tr>
      </Thead>
      <Tbody>
        {adverts.map((advert) => (
          <Tr key={advert.id}>
            <Td>{advert.role}</Td>
            <Td>{advert.description}</Td>
            <Td>{advert.requirements}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );

  // Define PDF component to render project data
  const ProjectReport = ({ projects }) => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Project Reports</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString()}
          </Text>{" "}
          {/* Display current date */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.columnHeader}>Project Name</Text>
              <Text style={styles.columnHeader}>Description</Text>
              <Text style={styles.columnHeader}>Budget</Text>
              <Text style={styles.columnHeader}>Status</Text>
            </View>
            {projects.map((project, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.cell}>{project.projectName}</Text>
                <Text style={styles.cell}>{project.description}</Text>
                <Text style={styles.cell}>{project.budget}</Text>
                <Text style={styles.cell}>{project.status}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );

  // Define PDF component to render task data
  const TaskReport = ({ tasks }) => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Task Reports</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString()}
          </Text>{" "}
          {/* Display current date */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.columnHeader}>Task Name</Text>
              <Text style={styles.columnHeader}>Deadline</Text>
              <Text style={styles.columnHeader}>Status</Text>
            </View>
            {tasks.map((task, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.cell}>{task.taskname}</Text>
                <Text style={styles.cell}>{task.deadline}</Text>
                <Text style={styles.cell}>{task.status}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );

  // Define PDF component to render resource allocation data
  const ResourceAllocationReport = ({ resourceAllocations }) => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Resource Allocation Reports</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString()}
          </Text>{" "}
          {/* Display current date */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.columnHeader}>Resource ID</Text>
              <Text style={styles.columnHeader}>Amount</Text>
            </View>
            {resourceAllocations.map((allocation, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.cell}>{allocation.resourceId}</Text>
                <Text style={styles.cell}>{allocation.amount}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );

  // Define PDF component to render worker data
  const WorkerReport = ({ workers }) => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Worker Reports</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString()}
          </Text>{" "}
          {/* Display current date */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.columnHeader}>Worker Name</Text>
              <Text style={styles.columnHeader}>Attendance Status</Text>
              <Text style={styles.columnHeader}>Approval Status</Text>
            </View>
            {workers.map((worker, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.cell}>
                  {worker.fname} {worker.lname}
                </Text>
                <Text style={styles.cell}>{worker.status}</Text>
                <Text style={styles.cell}>{worker.approvalStatus}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );

  // Define PDF component to render inventory data
  const InventoryReport = ({ inventoryItems }) => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Inventory Reports</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString()}
          </Text>{" "}
          {/* Display current date */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.columnHeader}>Inventory Item</Text>
              <Text style={styles.columnHeader}>Quantity</Text>
              <Text style={styles.columnHeader}>Description</Text>
            </View>
            {inventoryItems.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.cell}>{item.name}</Text>
                <Text style={styles.cell}>{item.quantity}</Text>
                <Text style={styles.cell}>{item.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );

  // Define PDF component to render advert data
  const AdvertsReport = ({ adverts }) => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Adverts Reports</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString()}
          </Text>{" "}
          {/* Display current date */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.columnHeader}>Role</Text>
              <Text style={styles.columnHeader}>Description</Text>
              <Text style={styles.columnHeader}>Requirements</Text>
            </View>
            {adverts.map((advert, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.cell}>{advert.role}</Text>
                <Text style={styles.cell}>{advert.description}</Text>
                <Text style={styles.cell}>{advert.requirements}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#fff",
      padding: 20,
    },
    section: {
      margin: 10,
      padding: 10,
    },
    title: {
      fontSize: 20,
      marginBottom: 10,
      fontWeight: "bold",
    },
    date: {
      marginBottom: 10,
    },
    table: {
      display: "table",
      width: "auto",
      borderCollapse: "collapse", // Ensure borders are collapsed
      borderColor: "#000",
      borderWidth: 1,
    },
    tableRow: {
      flexDirection: "row",
    },
    columnHeader: {
      flex: 1, // Equal width for each column
      fontWeight: "bold",
      padding: 10,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
    },
    cell: {
      flex: 1, // Equal width for each column
      padding: 10,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
    },
  });

  return (
    <div>
      <Heading>View reports </Heading>
      {/* Render project report */}
      <ProjectTable />
      <Button colorScheme="blue" marginTop="20px">
        <PDFDownloadLink
          document={<ProjectReport projects={projects} />}
          fileName="project_report.pdf"
        >
          {({ loading }) => (loading ? "Generating PDF.." : "Download PDF")}
        </PDFDownloadLink>
      </Button>
      {/* Render task report */}
      <TaskTable />
      <Button colorScheme="blue" marginTop="20px">
        <PDFDownloadLink
          document={<TaskReport tasks={tasks} />}
          fileName="task_report.pdf"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>
      </Button>
      {/* Render resource allocation report */}
      <ResourceAllocationTable />
      <Button colorScheme="blue" marginTop="20px">
        <PDFDownloadLink
          document={
            <ResourceAllocationReport
              resourceAllocations={resourceAllocations}
            />
          }
          fileName="resource_allocation_report.pdf"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>
      </Button>
      {/* Render worker report */}
      <WorkerTable />
      <Button colorScheme="blue" marginTop="20px">
        <PDFDownloadLink
          document={<WorkerReport workers={workers} />}
          fileName="worker_report.pdf"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>
      </Button>
      {/* Render inventory report */}
      <InventoryTable />
      <Button colorScheme="blue" marginTop="20px">
        <PDFDownloadLink
          document={<InventoryReport inventoryItems={inventoryItems} />}
          fileName="inventory_report.pdf"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>
      </Button>
      {/* Render adverts report */}
      <AdvertsTable />
      <Button colorScheme="blue" marginTop="20px">
        <PDFDownloadLink
          document={<AdvertsReport adverts={adverts} />}
          fileName="adverts_report.pdf"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>
      </Button>
    </div>
  );
};

export default Reports;
