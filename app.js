// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

const session = require("express-session");//crear session
const MongoStore = require("connect-mongo");//guardar session

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const projectName = "indiegamerland";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here

app.use(//siempre arriba de todas las rutas
    session({
      secret: 'Semoh lo mehore',//string que sirve de firma para la session
      resave: true,
      saveUninitialized: true,
      cookie: {//vida maxima de la cookie
        maxAge: 30 * 24 * 60 * 60 * 1000
      },
      store: MongoStore.create({//lugar donde se guardan las sesiones en nuestra DB
        mongoUrl: 'mongodb://localhost/auth-demo'
      })
    })
);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const indexRouter = require("./routes/index");
const isLoggedIn = require('./middleware/isLoggedIn')
app.use("/", isLoggedIn, indexRouter)


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
