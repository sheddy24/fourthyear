import React from 'react'
import { Tabs,TabList,Tab } from '@chakra-ui/react'
import { Link,Outlet } from 'react-router-dom'
export default function WorkerInventoryLayout() {
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
            <Link to="manageinventory">manage inventory</Link>
          </Tab>
          <Tab
            fontSize="20px"
            fontWeight="bold"
            p="10px"
            mr="30px"
            _selected={{ color: "black", bg: "blue.200" }}
          >
            {" "}
            <Link to="returnitems"> return items</Link>
          </Tab>
          {/**<Tab
            fontSize="20px"
            fontWeight="bold"
            p="10px"
            mr="30px"
            _selected={{ color: "black", bg: "blue.200" }}
          >
            {" "}
            <Link to="resourceusage"> resource usage</Link>
  </Tab>*/}
        </TabList>
      </Tabs>

      <Outlet />
    </div>
  )
}
