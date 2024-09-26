import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Select, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { Document, Page, Text, View, Image, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const TaskReport = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch projects from the backend when component mounts
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8000/project');
        if (response.status === 200) {
          setProjects(response.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Handle error
      }
    };

    fetchProjects();
  }, []);

  const handleProjectChange = async (projectId) => {
    try {
      const response = await axios.get(`http://localhost:8000/project/${projectId}/tasks`);
      if (response.status === 200) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      // Handle error
    }
  };

  const generatePDF = () => {
    // Generate PDF content here
    const styles = StyleSheet.create({
      page: {
        padding: 20,
      },
      header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
      },
      logo: {
        width: 100,
        height: 100,
        marginRight: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
      },
      subtitle: {
        fontSize: 18,
        marginBottom: 10,
      },
      table: {
        display: "table",
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: 10,
      },
      tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
      },
      cell: {
        padding: 10,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#ddd",
        width: "33.33%", // Equal width for each column
      },
      columnHeader: {
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#f2f2f2",
      },
    });

    const TaskReportPDF = () => (
      <Document>
        <Page style={styles.page}>
          <View style={styles.header}>
            <Image src="https://img.freepik.com/free-vector/flat-design-construction-company-logo_23-2150051906.jpg?size=626&ext=jpg&ga=GA1.1.1860668642.1707247523&semt=ais" style={styles.logo} />
            <View>
              <Text style={styles.title}>{selectedProject}</Text>
              <Text style={styles.subtitle}>Date: {new Date().toLocaleDateString()}</Text>
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.columnHeader]}>Task ID</Text>
              <Text style={[styles.cell, styles.columnHeader]}>Task Name</Text>
              <Text style={[styles.cell, styles.columnHeader]}>Status</Text>
            </View>
            {tasks.map((task) => (
              <View style={styles.tableRow} key={task.taskid}>
                <Text style={styles.cell}>{task.taskid}</Text>
                <Text style={styles.cell}>{task.taskname}</Text>
                <Text style={styles.cell}>{task.status}</Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );

    // Render the TaskReportPDF component directly within the PDFDownloadLink
    return <TaskReportPDF />;
  };

  return (
    <Box maxW="800px" m="auto" p="20px">
      <Heading mb="20px">Task Report</Heading>
      <Select
        placeholder="Select a project"
        onChange={(e) => {
          setSelectedProject(projects.find((project) => project.id === e.target.value)?.projectName || '');
          handleProjectChange(e.target.value);
        }}
      >
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.projectName}
          </option>
        ))}
      </Select>
      {tasks.length > 0 && (
        <Box mt="20px">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Task ID</Th>
                <Th>Task Name</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tasks.map((task) => (
                <Tr key={task.taskid}>
                  <Td>{task.taskid}</Td>
                  <Td>{task.taskname}</Td>
                  <Td>{task.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
      {tasks.length > 0 && (
        <Box mt="20px">
          <PDFDownloadLink
            document={generatePDF()}
            fileName="task_report.pdf"
          >
            {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
          </PDFDownloadLink>
        </Box>
      )}
    </Box>
  );
};

export default TaskReport;
