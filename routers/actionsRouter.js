const express = require('express');

const Actions = require('../data/helpers/actionModel');
const router = express.Router();

router.get('/', (req, res) => {
    Actions.get().then(action => {
        console.log(action);
        res.status(201).json(action);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "unable to retrieve actions" });
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Actions.get(id).then(action => {
        res.status(201).json(action);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "unable to retrieve actions" })
    });
});

router.put('/:id', (req, res) => {
    const changes = req.body;

    Actions.update(req.params.id, changes).then(update => {
        res.status(200).json(update)
    }).catch(error => {
        console.log(error);
        res.status(500).json({ error: 'the user information could not be updated.' })
    })
});

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id).then(deleted => {
        res.sendStatus(200);
    })
    .catch(error => {
        res.status(500).json({ error: "the use could not be deleted." })
    })
})


module.exports = router;