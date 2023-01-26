const express = require('express');
const adminSchema = require('../models/admin');

const router = express.Router();

//Create new admin
router.post('/admin', (req, res) => {
    const admin = adminSchema(req.body);
    admin.save().then((data) => res.json(data)).catch((error) => res.json({ message: error }));
});

//Get all admins
router.get('/admin', (req, res) => {
    adminSchema.find().then((data) => res.json(data)).catch((error) => res.json({ message: error }));
});

//Get a admin
router.get('/admin:id', (req, res) => {
    const { id } = req.params;
    adminSchema.findById(id).then((data) => res.json(data)).catch((error) => res.json({ message: error }));
});

//Update a admin
router.put('/admin:id', (req, res) => {
    const { id } = req.params;
    const { name, last_name, dpi, email, password } = req.body;
    adminSchema
    .updateOne({ _id: id }, { $set: { name, last_name, dpi, email, password } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Delete a admin
router.delete('/admin:id', (req, res) => {
    const { id } = req.params;
    adminSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;