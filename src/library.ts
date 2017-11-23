/**
 * Module dependencies.
 */
import * as express from "express";
import * as prpl from "prpl-server";
import { Config as IBuildsConfig } from "prpl-server";
import * as compression from "compression";  // compresses requests
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
import * as lusca from "lusca";
import * as dotenv from "dotenv";
import * as path from "path";
import * as passport from "passport";
import expressValidator = require("express-validator");
import * as apiController from "./controllers/api";
import * as capabilities from "browser-capabilities";

interface IServerLibraryParams {
    newPort: number;
    newBuildsPath: string;
    buildsConfig: {
        name?: string,
        browserCapabilities?: capabilities.BrowserCapability[],
      }[];
}

const serverLibrary = (params: IServerLibraryParams ) => {
    const {
        newPort,
        newBuildsPath,
        buildsConfig
    } = params;

    if (!newPort || !newBuildsPath) return "Invalid configuration";

    /**
     * Load environment variables from .env file, where API keys and passwords are configured.
     */
    dotenv.config({ path: ".env.example" });

    /**
     * Create Express server.
     */
    const app = express();

    /**
     * Express configuration.
     */
    app.set("port", newPort || process.env.PORT || 3000);
    app.use(compression());
    app.use(logger("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressValidator());
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET
    }));
    app.use(lusca.xframe("SAMEORIGIN"));
    app.use(lusca.xssProtection(true));
    app.use((req, res, next) => {
        res.locals.user = req.user;
        next();
    });


    /**
     * Kill the server after ended the test
     */
    if ( process.env["NODE_ENV"] === "test") {
        setTimeout(function() {
            process.exit(-1);
        }, 3000);
    }

    /**
     * Primary app routes.
     */

    /**
     * API examples routes.
     */
    app.get("/api/heartbeat", (req, res, next) => apiController.getApi(req, res));

    let build: IBuildsConfig;
    if (buildsConfig)
       build = { builds: buildsConfig };
    else
        build = {
            builds: [
                {name: "es6-unbundled", browserCapabilities: ["es2015", "push"]},
                {name: "es6-bundled"},
            ],
        };
    app.get("/*", prpl.makeHandler(newBuildsPath || "./src/public/", build ));

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

    // return { name: app.name };
    return app;
};

module.exports = serverLibrary;

