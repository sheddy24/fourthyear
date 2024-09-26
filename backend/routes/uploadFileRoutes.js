const express = require('express');
const router = express.Router();
const multer = require('multer');
const {ProjectDocument} = require('../models');

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:\\Users\\shedrack\\OneDrive\\Desktop\\fileuploads');
  },
  filename: function (req, file, cb) {
    // You can define custom file naming logic here if needed
    cb(null, file.originalname); // Keep the original file name
  }
});
const upload = multer({ storage: storage });

// POST route for uploading project documents
router.post('/upload', upload.fields([{ name: 'projectPlan' }, { name: 'contractAgreement' }]), async (req, res) => {
  try {
    const { projectId } = req.body;
    const projectPlanFile = req.files['projectPlan'][0];
    const contractAgreementFile = req.files['contractAgreement'][0];

    // Save the uploaded documents to the database
    await ProjectDocument.create({
      projectId,
      projectPlanPath: projectPlanFile.path,
      contractAgreementPath: contractAgreementFile.path
    });

    res.status(200).json({ message: 'Documents uploaded successfully' });
  } catch (error) {
    console.error('Error uploading documents:', error);
    res.status(500).json({ error: 'Failed to upload documents' });
  }
});


//route for retrieving project plan
router.get('/project-plan/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;

    // Find the project document by project ID
    const projectDocument = await ProjectDocument.findOne({
      where: { projectId: projectId }
    });

    if (!projectDocument) {
      // If no document found, return 404 status
      return res.status(404).json({ error: 'Project plan not found' });
    }

    // Retrieve the project plan file path
    const projectPlanPath = projectDocument.projectPlanPath;

    // Send the project plan file as a response
    res.sendFile(projectPlanPath);
  } catch (error) {
    console.error('Error fetching project plan:', error);
    res.status(500).json({ error: 'Failed to fetch project plan' });
  }
});


module.exports = router;
