const express = require("express");
const bodyParser = require("body-parser");
const fetch = require('node-fetch')
const roleRouter = require('../src/router/role')
const userRouter = require('../src/router/user')
const todoRouter = require('../src/router/todo')

const app = express();

const PORT = process.env.PORT || 3030;

app.use(bodyParser.json());

app.use('/',roleRouter)
app.use('/', userRouter)
app.use('/', todoRouter)
app.listen(PORT);
