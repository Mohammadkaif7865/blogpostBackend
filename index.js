const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 9870;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const mongoUrl = process.env.MongoLiveUrl;
// console.log("SDGSDGSDGSDGSDGsd", mongoUrl, port);
let db;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Endpoint to check if the server is running
app.get('/', (req, res) => {
    res.send("Express server is running");
});

// Endpoint to post a new blog
app.post('/postblog', (req, res) => {
    db.collection('Blogs').insertMany(req.body, (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).send(err);
        }
        res.send(result);
    });
});

// Connect to MongoDB
MongoClient.connect(mongoUrl, (err, client) => {
    if (err) {
        console.error(`Failed to connect to the database: ${err.message}`);
        return;
    }
    console.log("Connected to MongoDB successfully");
    db = client.db('BlogPost');
    app.listen(port, () => {
        console.log(`Express Server listening on port ${port}`);
    });
});
