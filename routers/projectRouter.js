const express = require('express');

const Projects = require('../data/helpers/projectModel');

const router = express.Router();


//get list of projects
router
.get('/', (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Projects could not be retrieved" });
    });
});


//retrieve projects by id
router
.get('/:id', validateProjectId, (req, res) => {
  Projects.get(req.params.id)
  .then(projects => {
    res.status(200).json(projects)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({error: 'Project could not be retrieved'})
  })
      });




      
//custom middleware

function validateProjectId(req, res, next) {
    if (req.params.id) {
      req.project = req.params.id;
        next();
      } else {
        res.status(400).json({ message: "Invalid ID"});
  }
}
  
    function validateProject(req, res, next) {
      if (!req.body.name || !req.body.description) {
          res.status(400).json({message: 'Must include name and description'});
      } else {
          next();
      }
  }



module.exports = router;