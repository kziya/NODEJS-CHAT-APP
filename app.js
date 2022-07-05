"use strict";
// dotenv
require("dotenv").config();

// packages

const express = require("express");
const path = require("path");

const app = express();
const start = require('./middlewares/startApplication');
const startupMiddlewares = require('./middlewares/startupMiddlewares');

// configs

app.set('view engine','ejs');


// middlewares
app.get('/public/favicon.ico',(req,res) => res.status(200).end());
app.use('/public',express.static(path.join(__dirname,'public')))
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use(startupMiddlewares); // An array of middlewares



app.use((req,res,next) =>{
    console.log(req.path);
    return next();;
})



// routes
require('./routes/routeManager')(app);



// 404 error
app.use((req, res) => {
    res.status(404);
    if (req.accepts("html")) return res.render("404", { layout: false });
    if (req.accepts("json")) return res.json({ error: "Not found!" });
    return res.type("txt").send("Not found !");
});




// start application
start(app);