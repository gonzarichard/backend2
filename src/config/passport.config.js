import passport from "passport";
import local from "passport-local";

import { UserModel } from "../models/User.js";
import { isValidPassword } from "../utils/bcrypt.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },

      async (username, password, done) => {
        try {
          const user = await UserModel.findOne({ email: username });

          if (!user) {
            return done(null, false);
          }

          if (!isValidPassword(user, password)) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
};

export default initializePassport;

import jwt from "passport-jwt";

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "CoderSecret",
    },

    async (jwt_payload, done) => {
      try {
        return done(null, jwt_payload);
      } catch (error) {
        return done(error);
      }
    },
  ),
);
