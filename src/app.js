import express from "express";
import mongoose from "mongoose";
import passport from "passport";

import initializePassport from "./config/passport.config.js";

const app = express();

app.use(express.json());

initializePassport();

app.use(passport.initialize());
