
// Server-side (Node.js + Express)

// Requires
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setuo tsore
var tsore = require('tsore');

// Server-side store
require('./todostore');

// Add Tsore Express router
app.use(tsore.simpleSync());

app.use(express.static(__dirname+'/')));
app.listen(3000);




