const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const userRoutes = require("./routes/user.routes");
const movieRoutes = require("./routes/movies.routes");
const { restart } = require('nodemon');
const cors = require('cors');

/*const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}*/

//Settings
app.set('port', process.env.PORT || 3001);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', movieRoutes);
app.use(cors());

//Routes
app.get("/", (req, res) => {
    res.send("Welcome to my API");
});

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//MongoDB connection
mongoose.connect(process.env.MONGODB_URI);

mongoose.set('strictQuery', true);

//Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});