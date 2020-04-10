const express = require('express');

const Projects = require('../data/helpers/projectModel');
const router = express.Router();

router.get('/', (req, res) => {
    Projects.get().then(project => {
        res.status(200).json(project);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: "error retrieving project." })
    })
});

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
        if(project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({ message: "error retrieving project ID." })
        }
    })
})

router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(action => {
            if(action) {
                res.status(200).json(action)
            } else {
                res.status(400).json({ message: "error retrieving project actions." })
            }
        })
})

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "the project has been removed." })
            } else {
                res.status(404).json({ message: "the project could not be found" })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "error deleting the project" })
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    Projects.update(id, req.body)
        .then(user => {
            if (user) {
                res.status(201).json({...req.body, id: id })
            } else {
                res.status(404).json({ message: "error finding project" })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "error updating project" })
        })
})

router.post('/:id', (req, res) => {
    Projects.insert(req.body)
      .then((project) => {
        if (project) {
          res.status(201).json(project);
        } else {
          res.status(400).json({ message: "Error finding project" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "Error posting project" });
      });
})

module.exports = router;