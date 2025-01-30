const express = require('express');
require('./config');
const user = require('./user');

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.get('/search/:key', async (req, res) => {
    console.log(req.params.key);
    let data = await user.find(
        {
            "$or": [
                {userName: {$regex: req.params.key}},
                {Bio: {$regex: req.params.key}},
            ]
        }
    );
    res.send(data);
});

app.listen(5000);