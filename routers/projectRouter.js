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


//retrieve project actions 
router
.get('/:id/actions', validateProjectId, (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error, could not get action" });
    });
});


//add project
router
.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: "Error, could not add project" });
    });
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