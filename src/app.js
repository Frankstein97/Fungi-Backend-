import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import __dirname from './utils.js'
import mongoose from 'mongoose'
import run from "./run.js";

import MongoStore from "connect-mongo";
import session from "express-session";
const app = express()

const db = "mongodb+srv://francoivannicoletti:1997@backendcoderfn.j1toc90.mongodb.net/?retryWrites=true&w=majority"

mongoose.set('strictQuery', false)
try {
    mongoose.connect(db, {
        dbName: "ecommerce"
    }, error => {
        if (error) {
            console.log('No se pudo conectar a la DB');
            return
        }
    
        // Corriendo el servidor
        const httpServer = app.listen(8080, () => console.log('El servidor te esta escuchando...'))
        const socketServer = new Server(httpServer)
        httpServer.on("error", (e) => console.log("ERROR: " + e))
    
        run(socketServer, app)
    })
    
} catch (error) {
    console.error(error);
};


//Configuracion para traer info de POST como JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Carpeta publica para fotos/info/login de usuarios de acceso publico
app.use(express.static(`${__dirname}/public`));

//Configurar el handlebars y vistas
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 3600
    }),
    secret: 'Coder39760',
    resave: true,
    saveUninitialized: true
}));

// // Conexión a mongoose
// const db = "mongodb+srv://francoivannicoletti:1997@backendcoderfn.j1toc90.mongodb.net/?retryWrites=true&w=majority"

// mongoose.set('strictQuery', false)
// mongoose.connect(db, {
//     dbName: "ecommerce"
// }, error => {
//     if (error) {
//         console.log('No se pudo conectar a la DB');
//         return
//     }

//     // Corriendo el servidor
//     const httpServer = app.listen(8080, () => console.log('El servidor te esta escuchando...'))
//     const socketServer = new Server(httpServer)
//     httpServer.on("error", (e) => console.log("ERROR: " + e))

//     run(socketServer, app)
// })


