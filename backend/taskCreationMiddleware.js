const jwt = require('jsonwebtoken');

function authorizeTaskCreation(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: 'No token provided.' });
  }

  jwt.verify(token, 'web_master', (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Invalid token.' });
    }

    // Extract userId from decoded token payload
    const userId = decoded.userId;
    const projectId = req.body.projectId; // Assuming projectId is provided in request body

    // Check if the supervisor is authorized to create tasks for this project
    if (!isSupervisorAuthorizedForProject(userId, projectId)) {
      return res.status(403).send({ message: 'Unauthorized: Insufficient project access.' });
    }

    // Proceed if supervisor is authorized for the project
    req.userId = userId; // Attach userId to request object for future use
    next();
  });
}
module.exports=authorizeTaskCreation;