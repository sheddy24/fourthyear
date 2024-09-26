import React from "react";
import { Tabs, TabList, Tab } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";

export default function CEOinventoryLayout() {
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
            <Link to="resources">resources available</Link>
          </Tab>
          <Tab
            fontSize="20px"
            fontWeight="bold"
            p="10px"
            mr="30px"
            _selected={{ color: "black", bg: "blue.200" }}
          >
            {" "}
            <Link to="manage">manage</Link>
          </Tab>
        </TabList>
      </Tabs>

      <Outlet />
    </div>
  );
}
