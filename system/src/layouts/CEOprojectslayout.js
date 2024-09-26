import { Tab, Tabs, TabList } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";


const CEOprojectslayout = () => {
  return (
    <div>
      <Tabs mb="20px" variant="enclosed" colorScheme="blue.200">
        <TabList>
          <Tab
            fontSize="20px"
            fontWeight="bold"
            p="10px"
            mr="30px"
            _selected={{ color: "black", bg: "blue.200" }}
          >
            <Link to="completedprojects">Completed projects</Link>
          </Tab>
          <Tab
            fontSize="20px"
            fontWeight="bold"
            p="10px"
            mr="30px"
            _selected={{ color: "black", bg: "blue.200" }}
          >
            {" "}
            <Link to="ongoingprojects">Ongoing projects</Link>
          </Tab>
          <Tab
            fontSize="20px"
            fontWeight="bold"
            p="10px"
            mr="30px"
            _selected={{ color: "black", bg: "blue.200" }}
          >
            <Link to="initiatedprojects">Initiated projects</Link>
          </Tab>
        </TabList>
      </Tabs>

      <Outlet />
    </div>
  );
};

export default CEOprojectslayout;
