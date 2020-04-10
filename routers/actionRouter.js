const express = require('express');

const Actions = require('../data/helpers/actionModel');

const router = express.Router();


//get list of actions
router
.get('/', (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Actions could not be retrieved" });
    });
});


//retrieve actions by id
router
.get('/:id', validateActionId, (req, res) => {
  Actions.get(req.params.id)
  .then(action => {
    res.status(200).json(action)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({error: 'Action with that ID could not be retrieved'})
  })
      });

//add action
router
.post('/', validateAction, (req, res) => {
    Actions.insert(req.body)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ message: "Error, could not add action" });
    });
});


//edit actions by id
router
.put('/:id', validateAction, validateActionId, (req, res) => {
  Actions.update(req.params.id, req.body)
    .then(action => {
        res.status(200).json(action)
        })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Could not update action" });
    });
});


//delete action
router
.delete('/:id', validateActionId, (req, res) => {
  Actions.remove(req.params.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Could not delete action" });
    });
});


//custom middleware

function validateActionId(req, res, next) {
    if (req.params.id) {
        next();
      } else {
        res.status(400).json({ message: "Invalid ID"});
  }
}
  
  function validateAction(req, res, next) {
      if (!req.body.project_id || !req.body.description || ! req.body.notes) {
          res.status(400).json({ message: "Needs project id, description, and notes"});
      } else {
          next();
      }
  };




module.exports = router;