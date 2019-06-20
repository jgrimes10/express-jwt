// set up .env
require('dotenv').config();

// import dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// set up middleware
app.use(bodyParser.json());

// set up routes
app.get('/checking', (req, res) => {
    res.json({
        "Tutorial": "Welcome to the Node express JWT Tutorial"
    });
});

app.listen(process.env.API_PORT, () => {
    console.log(`Server is running on port: ${process.env.API_PORT}`);
});
