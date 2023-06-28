import passport from "passport";
import local from "passport-local";
import GitHubStragey from "passport-github2";
import  userModel  from "../dao/models/users.model.js";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy;



const initializePassport = () => {

// ESTO ES DE ESTRATEGIA LOCAL
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          const user = await userModel.findOne({ email: username });
          if (user) return done(null, false);

          const userToSave = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };
          const result = await userModel.create(userToSave);
          return done(null, result);
        } catch (error) {
          return done(`Error getting user: ${error}`);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) return done(null, false);
          if (!isValidPassword(user, password)) return done(null, false);
          return done(null, user);
        } catch (error) {
          return done(`Error al obtener el usuario: ${error}`);
        }
      }
    )
  );

// Usare un middleware
  passport.use(
    "github",
    new GitHubStragey(
      {
        clientID: "Iv1.98dcde9793d7d8ec",
        clientSecret: "e767113e34e734a0bc469d42e1a5cba4396f77fc",
        callbackURL: "http://localhost:8080/api/sessions/github-callback",
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          const user = await userModel.findOne({ email });
          if (!user) {
            const newUser = {
              first_name: profile._json.name,
              last_name: " ",
              age: 18,
              email,
              password: " ",
            };
            const result = await userModel.create(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  
//ESTO ES PARA SERIALIZAR CONTRASEÑAS Y ENCONTRARLAS POR ID
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });



};
export default initializePassport;
