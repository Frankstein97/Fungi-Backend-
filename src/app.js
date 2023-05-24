import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import __dirname from './utils.js'
import mongoose from 'mongoose'
import run from "./run.js";

const app = express()

//Configuracion para traer info de POST como JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Configurar el handlebars y vistas
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Carpeta publica para fotos/info de usuarios de acceso publico
app.use(express.static(__dirname + '/public'))

// Conexión a mongoose
const db = "mongodb+srv://francoivannicoletti:1997@backendcoderfn.j1toc90.mongodb.net/?retryWrites=true&w=majority"

mongoose.set('strictQuery', false)
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


