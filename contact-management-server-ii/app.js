const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const colors = require("colors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();



app.use(cors());
app.use(express.json());

// Increase payload size limit (e.g., 50MB)
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));




// import routes
const blogsRoute = require('./v1/Routes/blogs.route');







// declare routes
app.use('/api/v1/blogs', blogsRoute);






app.get("/", (req, res) => {
    try {
        res.send("Welcome to CT Management Server !");
    } catch (error) {
        console.log(error.message);
    };
});

app.all("*", (req, res) => {
    try {
        res.send("No Routes Found");
    } catch (error) {
        console.log(error.message);
    };
});


app.listen(PORT, () => {
    try {
        console.log(`server is successfully running on port ${PORT}!`.red.bold);
    } catch (error) {
        console.log(error.message);
    };
});

exports = app;