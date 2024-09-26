const express = require("express");
const db = require("./models");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors({
  origin:'http://localhost:3000'
}));

// 

//routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const advertRoutes = require("./routes/advertRoutes");
const assignedProjectRoutes = require("./routes/assignedProjectRoutes");
const inventoryRoutes=require("./routes/inventoryRoutes")
const projectUpdateRoutes=require("./routes/projectUpdateRoutes")
const taskRoutes=require("./routes/taskRoutes")
const resourceAllocationRoutes=require("./routes/resourceAllocationRoutes")
const forgotpassword=require("./routes/forgotpasswordRoutes")
const userhomeroutes=require("./routes/userHomeRoute")
const fileUploadsRoutes=require("./routes/uploadFileRoutes")
const registerRoutes=require("./routes/registerRoutes")
const ceoreportRoutes=require("./routes/ceoreportRoutes")
const profileRoutes=require("./routes/profileRoutes")
const notificationRoutes=require("./routes/notificationRoutes")


app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/project", projectRoutes);
app.use("/assign", assignmentRoutes);
app.use("/adverts", advertRoutes);
app.use("/projects", assignedProjectRoutes);
app.use("/inventory",inventoryRoutes);
app.use('/projectss', projectUpdateRoutes);
app.use("/task",taskRoutes);
app.use("/resource",resourceAllocationRoutes)
app.use("/",forgotpassword)
app.use("/progress",userhomeroutes)
app.use("/file",fileUploadsRoutes)
app.use("/register",registerRoutes)
app.use("/ceoreport", ceoreportRoutes)
app.use("/profile",profileRoutes)
app.use("/issues",notificationRoutes)


db.sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log("server running at port 8000");
  });
});

