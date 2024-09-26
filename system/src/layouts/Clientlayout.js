import { Heading } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
const Clientlayout = () => {
  return (
    <div>
    <Heading>this is the layout of the client</Heading>
    
    <Outlet/>
    </div>
  )
}

export default Clientlayout
