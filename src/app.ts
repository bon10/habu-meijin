import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import lusca from "lusca";
//import mongo from "connect-mongo";
import path from "path";
//import mongoose from "mongoose";
//import passport from "passport";
import bluebird from "bluebird";
import { SESSION_SECRET } from "./util/secrets";
import router from "./rest/router";


// GraphQL
//import { ApolloServer } from "apollo-server";
//import { ApolloGateway } from "@apollo/gateway";

//const MongoStore = mongo(session);

// Controllers (route handlers)
//import * as apiController from "./controllers/api";

// API keys and Passport configuration
//import * as passportConfig from "./config/passport";

// Create Express server
const app = express();

// Connect to MongoDB
//const mongoUrl = MONGODB_URI;
//mongoose.Promise = bluebird;

//mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
//    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
//).catch(err => {
//    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
//    // process.exit();
//});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  cookie: {
    httpOnly: true,
    secure: false
  }

  //    store: new MongoStore({
  //        url: mongoUrl,
  //        autoReconnect: true
  //        })
}));
//app.use(passport.initialize());
//app.use(passport.session());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
    req.path !== "/login" &&
    req.path !== "/signup" &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)) {
    req.session.returnTo = req.path;
  } else if (req.user &&
    req.path == "/account") {
    req.session.returnTo = req.path;
  }
  next();
});

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

app.use(router);

/**
 * API examples routes.
 */
//app.get("/api", apiController.getApi);
//app.get("/api/facebook", passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);

/**
 * OAuth authentication routes. (Sign in)
 */
//app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
//app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
//    res.redirect(req.session.returnTo || "/");
//});

export default app;
