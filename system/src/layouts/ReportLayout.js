import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Tabs, TabList, Tab } from '@chakra-ui/react';

const ReportLayout = () => {
  return (
    <div>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>
            <Link to="taskreports">Tasks Report</Link>
          </Tab>
          <Tab>
            <Link to="inventoryreports">Inventory Report</Link>
          </Tab>
          <Tab>
            <Link to="generalreports"> generalReports</Link>
          </Tab>
        </TabList>
      </Tabs>
      <Outlet/>
    </div>
  );
};


export default ReportLayout;
