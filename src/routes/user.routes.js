const express = require('express');
const userSchema = require('../models/user');
var jwt = require('jsonwebtoken');

const router = express.Router();

//Create new user
router.post('/users', (req, res) => {
    const user = userSchema(req.body);
    user.save().then((data) => res.json(data)).catch((error) => res.json({ message: error }));
});

router.post('/users/login', async (req, res) => {
    const usuarioEncontrado = await userSchema.findOne({name: req.body.name})
    if(!usuarioEncontrado){
        return res.status(404).json({ message: 'Usuario no encontrado' })
    }else{
        if(usuarioEncontrado.password == req.body.password){
            const token = jwt.sign({id: usuarioEncontrado._id},"hola",{
                expiresIn: 86400
            });
            return res.status(200).json({usuario: usuarioEncontrado, token:token});
        }
        return res.status(500).json({ message: "Contraseña incorrecta" })
    }
});

//Get all users
router.get('/users', (req, res) => {
    userSchema.find().then((data) => res.json(data)).catch((error) => res.json({ message: error }));
});

//Get a user
router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema.findById(id).then((data) => res.json(data)).catch((error) => res.json({ message: error }));
});

//Update a user
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, last_name, dpi, email, phone, password, credits } = req.body;
    userSchema
    .updateOne({ _id: id }, { $set: { name, last_name, dpi, email, phone, password, credits } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Delete a user
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;