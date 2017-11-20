/**
 * Module dependencies.
 */
import * as express from "express";
import * as prpl from "prpl-server";
import * as compression from "compression";  // compresses requests
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
import * as lusca from "lusca";
import * as dotenv from "dotenv";
import * as mongo from "connect-mongo";
import * as flash from "express-flash";
import * as path from "path";
import * as mongoose from "mongoose";
import * as passport from "passport";
import expressValidator = require("express-validator");


const MongoStore = mongo(session);

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: ".env.example" });

/**
 * Controllers (route handlers).
 */
import * as homeController from "./controllers/home";
import * as apiController from "./controllers/api";

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
// mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);

mongoose.connection.on("error", () => {
 console.log("MongoDB connection error. Please make sure MongoDB is running.");
 process.exit();
});



/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
 resave: true,
 saveUninitialized: true,
 secret: process.env.SESSION_SECRET,
 store: new MongoStore({
   url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
   autoReconnect: true
 })
}));
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
 res.locals.user = req.user;
 next();
});
// app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */

/**
 * API examples routes.
 */
app.get("/api/heartbeat", (req, res, next) => apiController.getApi(req, res));

app.get("/*", prpl.makeHandler("./src/public/", {
  builds: [
    {name: "es6-unbundled", browserCapabilities: ["es2015", "push"]},
    {name: "es6-bundled"},
  ],
}));

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
 console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
 console.log("  Press CTRL-C to stop\n");
});

module.exports = app;