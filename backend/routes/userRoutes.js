const express=require('express')
const bcrypt = require('bcrypt');
const { users, ProjectAssignment } = require('../models');


const router= express.Router();

router.post("/create-account", async(req,res)=>{
    try {
        const{fname,lname,email,username,password,role}=req.body
        //check if the user exists
        const existingUser = await users.findOne({
            where: {
                email:email
            }
        });
        if (existingUser) {
            return res.status(400).json({ error: "User with the same email or username already exists" });
        }

        //create the user
        const hashedPassword = await bcrypt.hash(password, 10);

        await users.create({
           fname:fname,
           lname:lname,
           email:email,
           username:username,
           password:hashedPassword,
           role:role
        })
       res.json("user created successfully")
    } catch (error) {
        console.log(error.message);
    }
})


//api to get all managers from the database
router.get("/managers", async(req,res)=>{
    try {
        const projectManagers=await users.findAll({
            where:{
                role: "project-manager"
            }
        });
        return res.json(projectManagers)
    } catch (error) {
       console.log(error.message) 
    }
})

//api to get all supervisors system
router.get("/supervisors",async(req,res)=>{
    try {
        const siteSupervisors= await users.findAll({
            where:{
                role:"site-supervisor"
            }
        });
        res.json(siteSupervisors)
    } catch (error) {
        console.log(error.message);
    }
})

//api to get all onsite workers in the sysytem
router.get("/workers", async (req, res) => {
    try {
        const workersNotInAssignment = await users.findAll({
            where: {
                role: "onsite-worker"
            },
            include: [{
                model: ProjectAssignment,
                as: 'Worker',
                required: false
            }]
        });

        const filteredWorkers = workersNotInAssignment.filter(worker => worker.Worker === null);
        
        res.json(filteredWorkers);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports=router;