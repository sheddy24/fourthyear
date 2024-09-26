import { Heading } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getManagerDetails } from "../auth";

const Projectoverview = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Make HTTP GET request to fetch projects data for the manager
        const { token } = getManagerDetails(); // Assuming token is stored in localStorage
        const response = await axios.get('http://localhost:8000/task/manager', {
          headers: {
            Authorization: token,
          },
        });

        // Set the fetched projects data to state
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <Heading>View Project Tasks</Heading>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Render projects data */}
          {projects.map(project => (
            <div key={project.id}>
              <h2>{project.projectName}</h2>
              {/* Render tasks for each project */}
              <ul>
                {project.Tasks.map(task => (
                  <li key={task.taskid}>{task.taskname} , {task.deadline}, {task.status}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projectoverview;
