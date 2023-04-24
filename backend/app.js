const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { Sequelize } = require('sequelize')
const config = require('./config/database.js');
const { environment } = require('./config');
const sequelize = new Sequelize(config.development);

const session = require('express-session');

const isProduction = environment === 'production';

const app = express(); // initialize the express application
app.use(morgan('dev')); // Connect the morgan middleware for logging information about requests and responses:
app.use(cookieParser()); // Add the cookie-parser middleware for parsing cookies
app.use(express.json()); // Add express.json middleware for parsing JSON bodies of requests with Content-Type of "application/json"

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    // Only allow CORS (Cross-Origin Resource Sharing) in development using the cors middleware
    // the React frontend will be served from a different server than the Express server.
    // CORS isn't needed in production since all of our React and Express resources will come from the same origin.
    app.use(cors());
}
// helmet helps set a variety of headers to better secure your app
/*
Enable better overall security with the helmet middleware (for more on what helmet is doing, see helmet on the npm registry).
React is generally safe at mitigating XSS (i.e., Cross-Site Scripting) attacks,
but do be sure to research how to protect your users from such attacks in React when deploying a large production application.

Now add the crossOriginResourcePolicy to the helmet middleware with a policy of cross-origin.
This will allow images with URLs to render in deployment.
*/
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

const { restoreUser } = require('./utils/auth');

// ...

app.use(restoreUser);
app.use(session({
    secret: 'your-secret-key', // Replace 'your-secret-key' with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
    }
}));
// Set the _csrf token and create req.csrfToken method
// Add the csurf middleware and configure it to use cookies.
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

const routes = require('./routes');

// ...

app.use(routes); // Connect all the routes

// ERROR HANDLER Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found. Alex is cool");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
});

const { ValidationError } = require('sequelize');
// Process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    // The second error handler is for catching Sequelize errors and formatting them before sending the error response.
    if (err instanceof ValidationError) {
        let errors = {};
        for (let error of err.errors) {
            errors[error.path] = error.message;
        }
        err.title = 'Validation error';
        err.errors = errors;
    }
    next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    });
});
// ...


module.exports = app;
