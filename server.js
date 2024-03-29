const express_ = require('express');
const app = express_();
const connectToDatabases = require('./config/connectToDatabase');
const rateLimit = require("express-rate-limit");
const xss  = require("xss-clean");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
var cors = require('cors');

connectToDatabases();

const apiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 15 minutes
    max: 500,
    message:
    "Too many accounts created from this IP, please try again after 15 min"
});

app.use(apiLimiter);//safety against DOS attack

app.use(cors());//to follow cors policy

app.use(xss());//safety against XSS attack or Cross Site Scripting attacks

app.use(helmet());//safety against XSS attack

app.use(mongoSanitize());//safety against NoSql Injections

app.use(express_.json({ extended: false }));

app.use('/node_modules', express.static(path.resolve(__dirname, '../node_modules')));

let PORT = process.env.PORT || 4000;

app.listen(PORT, () => 
    console.log(`the server is running on the port: ${PORT}`)
);
