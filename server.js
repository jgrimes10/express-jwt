const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// todo: replace with dot env
const PORT = 3000;

// set up middleware
app.use(bodyParser.json());

// set up routes
app.get('/checking', (req, res) => {
    res.json({
        "Tutorial": "Welcome to the Node express JWT Tutorial"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
