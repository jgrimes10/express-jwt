// set up .env
require('dotenv').config();

// import dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up db connection
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Successfully connected to DB');
    })
    .catch(err => {
        console.log(err);
    });

// set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set up routes
app.get('/checking', (req, res) => {
    res.json({
        "Tutorial": "Welcome to the Node express JWT Tutorial"
    });
});

app.listen(process.env.API_PORT, () => {
    console.log(`Server is running on port: ${process.env.API_PORT}`);
});
