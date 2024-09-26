import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";

//page imports

//login components
import MainHomePage from "./pages/MainHomePage";
import CEOlogin from "./pages/CEOlogin";
import Managerlogin from "./pages/Managerlogin";
import Supervisorlogin from "./pages/Supervisorlogin";
import Clientlogin from "./pages/Clientlogin";
import Inventorylogin from "./pages/Inventorylogin";
import Workerslogin from "./pages/Workerslogin";
import Loginpage from "./components/Loginpage";
import TaskReport from "./CEOpages/TaskReport";
import InventoryReport from "./CEOpages/InventoryReport";

//password pages
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

//nav components in the mainhomepage
import Adverts from "./pages/Adverts";
import About from "./pages/About";
import Createaccount from "./components/Createaccount";

import UserHomePage from "./components/UserHomePage";

import WeatherWidget from "./components/WeatherWidget";
//layouts imports
import CEOlayout from "./layouts/CEOlayout";
//import CEOprojectslayout from './layouts/CEOprojectslayout';
import Clientlayout from "./layouts/Clientlayout";
import InventoryLayout from "./layouts/InventoryLayout";
import ProjectManager from "./layouts/ProjectManager";
import SiteSupervisor from "./layouts/SiteSupervisor";
import WorkerLayout from "./layouts/WorkerLayout";
import SiteSupervisorTasks from "./layouts/SiteSupervisorTasks";
import CEOinventoryLayout from "./layouts/CEOinventoryLayout";
import RegisterLayout from "./layouts/RegisterLayout";
import ReportLayout from "./layouts/ReportLayout";

//help pages
import Shelp from "./Spages/Shelp";
import Phelp from "./pmanagerpages/Phelp";
import Whelp from "./Workerpages/Whelp";

//userpage imports
import CEOhomepage from "./CEOpages/CEOhomepage";
import Newproject from "./CEOpages/Newproject";
import Notification from "./CEOpages/Notifications";
import Reports from "./CEOpages/Reports";
import Manageteams from "./CEOpages/Manageteams";
import CreateAdverts from "./CEOpages/CreateAdverts";
import ReviewAdverts from "./CEOpages/ReviewAdverts";
import Inventory from "./CEOpages/Inventory";
import ResourcesAvailable from "./CEOpages/ResourcesAvailable";
import ManageInventory from "./CEOpages/ManageInventory";

//project manager pages
import Pdashboard from "./pmanagerpages/Pdashboard";
import Projectoverview from "./pmanagerpages/Projectoverview";
import Managetasks from "./pmanagerpages/Managetasks";
import Resourceallocation from "./pmanagerpages/Resourceallocation";
import Notifications from "./pmanagerpages/Notifications";
import ProjectUpdates from "./pmanagerpages/ProjectUpdates";
import UploadDocs from "./pmanagerpages/UploadDocs";
import Pprofile from "./pmanagerpages/Pprofile";

//site supervisor pages
import Sdashboard from "./Spages/Sdashboard";
import Createtasks from "./Spages/Createtasks";
import Manageinventory from "./Spages/Manageinventory";
//import Notifications from './Spages/Notifications'
import Progress from "./Spages/Progress";
import Safetyregulations from "./Spages/Safetyregulations";
import WeatherInfo from "./Spages/WeatherInfo";
import CreatedTasks from "./Spages/CreatedTasks";
import ApproveRegister from "./Spages/ApproveRegister";
import Sprofile from "./Spages/Sprofile";
import ProjectPlan from "./Spages/ProjectPlan";
import WorkerInventoryLayout from "./layouts/WorkerInventoryLayout";
import ReturnItems from "./Spages/ReturnItems";
import ResourceUsage from "./Spages/ResourceUsage";

//workerpages
import Wdashboard from "./Workerpages/Wdashboard";
import RequestEquipments from "./Workerpages/RequestEquipments";
import Viewtasks from "./Workerpages/Viewtasks";
import Reportissues from "./Workerpages/Reportissues";
import WeatherInfom from "./Workerpages/WeatherInfom";
import Safetyremiders from "./Workerpages/Safetyremiders";
import Markregister from "./Workerpages/Markregister";
import ViewAttendance from "./Workerpages/ViewAttendance";
import Wprofile from "./Workerpages/Wprofile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="about" element={<About />} />
      </Route>

      <Route>
        <Route path="advertisements" element={<Adverts />} />
      </Route>

      <Route>
        <Route path="create-account" element={<Createaccount />}>
          <Route path="login" element={<Loginpage />} />
        </Route>
      </Route>

      <Route>
        <Route index element={<MainHomePage />} />
      </Route>

      <Route>
        <Route path="forgotpassword" element={<ForgotPasswordPage />} />
      </Route>

      <Route>
        <Route path="resetpassword/:token" element={<ResetPasswordPage />} />
      </Route>
      {/**CEO */}
      <Route>
        <Route path="ceologin" element={<CEOlogin />} />
        <Route path="ceologin">
          <Route path="CEOlayout" element={<CEOlayout />}>
            <Route path="ceohomepage" element={<CEOhomepage />} />
            {/*<Route path='CEOprojectslayout' element={<CEOprojectslayout/>}>
            <Route path='completedprojects' element={<CompleteProjects/>}/>
            <Route path='ongoingprojects' element={<Ongoingprojects/>}/>
            <Route path='initiatedprojects' element={<InitiatedProjects/>}/>
  </Route>*/}
            <Route path="newproject" element={<Newproject />} />
            {/*<Route path='viewusers' element={<Viewpersonnel/>}/>*/}
            <Route path="notifications" element={<Notification />} />
            <Route path="reports" element={<Reports />} />

            <Route path="manageteams" element={<Manageteams />} />
            <Route path="create adverts" element={<CreateAdverts />} />
            <Route path="review adverts" element={<ReviewAdverts />} />
            <Route path="inventory" element={<CEOinventoryLayout />}>
              <Route path="resources" element={<ResourcesAvailable />} />
              <Route path="manage" element={<Inventory />} />
            </Route>
            <Route path="summaries" element={<ReportLayout/>}>
              <Route path="taskreports" element={<TaskReport/>}/>
              <Route path="inventoryreports" element={<InventoryReport/>}/>
              <Route path="generalreports" element={<Reports />} />
            </Route>
            <Route path="weatherwidget" element={<WeatherWidget />} />
          </Route>
        </Route>
      </Route>

      {/**project manager routes */}
      <Route>
        <Route path="projectmanager" element={<Managerlogin />} />
        <Route path="projectmanager">
          <Route path="managerlayout" element={<ProjectManager />}>
            <Route path="profile" element={<Pprofile />} />
            <Route path="userhomepage" element={<UserHomePage />} />
            <Route path="pdashboard" element={<Pdashboard />} />
            <Route path="projectoverview" element={<Projectoverview />} />
            <Route path="managetasks" element={<Managetasks />} />
            <Route path="resources" element={<Resourceallocation />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="projectupdates" element={<ProjectUpdates />} />
            <Route path="uploadprojectdocs" element={<UploadDocs />} />
            <Route path="help" element={<Phelp/>}/>
          </Route>
        </Route>
      </Route>

      {/**site supervisor routes */}
      <Route>
        <Route path="site supervisor" element={<Supervisorlogin />} />
        <Route path="site supervisor">
          <Route path="supervisorlayout" element={<SiteSupervisor />}>
            <Route path="profile" element={<Sprofile />} />
            <Route path="userhomepage" element={<UserHomePage />} />
            <Route path="taskslayout" element={<SiteSupervisorTasks />}>
              <Route path="createtasks" element={<Createtasks />} />
              <Route path="createdtasks" element={<CreatedTasks />} />
            </Route>
            <Route path="sdashboard" element={<Sdashboard />} />
            <Route path="layout" element={<WorkerInventoryLayout />}>
              <Route path="manageinventory" element={<Manageinventory />} />
              <Route path="returnitems" element={<ReturnItems />} />
              <Route path="resourceusage" element={<ResourceUsage />} />
            </Route>
            <Route path="progress" element={<Progress />} />
            <Route path="safetyregulations" element={<Safetyregulations />} />
            <Route path="weatherinfo" element={<WeatherInfo />} />
            <Route path="approveregister" element={<ApproveRegister />} />
            <Route path="projectplan" element={<ProjectPlan />} />
            <Route path="help" element={<Shelp/>}/>
          </Route>
        </Route>
      </Route>

      {/**client routes */}
      <Route path="clientlogin" element={<Clientlogin />}>
        <Route path="clientlayout" element={<Clientlayout />}></Route>
      </Route>

      {/**inventory manager routes */}
      <Route>
        <Route path="inventorymanager" element={<Inventorylogin />} />
        <Route path="inventorymanager">
          <Route path="inventorylayout" element={<InventoryLayout />} />
        </Route>
      </Route>

      {/**onsite workers routes */}
      <Route>
        <Route path="onsite workers" element={<Workerslogin />} />
        <Route path="onsite workers">
          <Route path="workerslayout" element={<WorkerLayout />}>
            <Route path="profile" element={<Wprofile />} />
            <Route path="userhomepage" element={<UserHomePage />} />

            <Route path="wdashboard" element={<Wdashboard />} />
            <Route path="equipmentrequest" element={<RequestEquipments />} />
            <Route path="viewtasks" element={<Viewtasks />} />
            <Route path="reportissues" element={<Reportissues />} />
            <Route path="registerlayout" element={<RegisterLayout />}>
              <Route path="markregister" element={<Markregister />} />
              <Route path="viewattendance" element={<ViewAttendance />} />
            </Route>
            <Route path="weatherinformation" element={<WeatherInfom />} />
            <Route path="safetyreminders" element={<Safetyremiders />} />
            <Route path="help" element={<Whelp/>}/>
          </Route>
        </Route>
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
