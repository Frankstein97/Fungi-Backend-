import passport from "passport";
import local from 'passport-local';
import userModel from "../dao/models/users.model.js";
import { createHash, isValidPassword } from "../utils.js";

const localStrategy = local.Strategy;

// usare un middleware
const initializePassport = () => {
    passport.use ('register', new localStrategy ({
        passReqToCallback: true, //permitira acceder a req como middleware
        usernameField: 'email'

    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        
        try {
            const user = await userModel.findOne({ email: username });
        if (user) {
            return done (null, false)
            }
            const userToSave = { first_name, last_name, email, age, password: createHash(password) };
            const result = await userModel.create(userToSave);
            return done(null, result);
        } catch (error) {
            return done(`Error al obtener usuario: ${error}`)
            
        }
    }));

    passport.use ('login', new localStrategy ({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username });
       
            if (!user) {
            return done (null, false)
            }

            if(isValidPassword(user, password)) return done (null, false)

              return done(null, user)
        } catch (error) {
            return done(`Error al obtener usuario: ${error}`)
            
        }
    }))
    passport.serializeUser((user, done) => {
    done (null,user._id);
});
    passport.deserializeUser(async (id,done) => {
        const user = await userModel.findById(id)
        done(null, user);

    })
};

export default initializePassport