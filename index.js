const dotenv = require("dotenv")
dotenv.config()
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
const employeeRoutes = require('./routes/EmployeeRoutes.js')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', employeeRoutes);

var port = process.env.PORT || 9000;
app.listen(port);
console.log('Order API is runnning at ' + port);


