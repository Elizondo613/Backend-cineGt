const express = require('express');
const moviesSchema = require('../models/movies');

const router = express.Router();

//Create new movie
router.post('/movies', (req, res) => {
    const movie = moviesSchema(req.body);
    movie.save().then((data) => res.json(data)).catch((error) => res.json({ message: error }));
});

//Get all movies
router.get('/movies', (req, res) => {
    moviesSchema.find().then((data) => res.json(data)).catch((error) => res.json({ message: error }));
});

//Get a movie
router.get('/movies/:id', (req, res) => {
    const { id } = req.params;
    moviesSchema.findById(id).then((data) => res.json(data)).catch((error) => res.json({ message: error }));
});

//Update a movie
router.put('/movies/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, imagen } = req.body;
    moviesSchema
    .updateOne({ _id: id }, { $set: { name, description, imagen } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Delete a movie
router.delete('/movies/:id', (req, res) => {
    const { id } = req.params;
    moviesSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;