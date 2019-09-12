const express = require('express');
const http = require('http');
var cors = require('cors');
var bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

const ControllerApi = require('./server/controller');

app.use('/secretapi', ControllerApi);

app.use(function (err, req, res, next) {
    if (err.return) {
        res.json(err);
    } else {
        console.error(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
})

const port = process.env.PORT || '8202';
const host = process.env.HOST || 'localhost';

const server = http.createServer(app);
server.listen(port, () => console.log(`Running on ${host}:${port}`));