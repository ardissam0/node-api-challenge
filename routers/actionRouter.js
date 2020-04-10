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