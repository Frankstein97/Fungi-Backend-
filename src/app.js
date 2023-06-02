import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import __dirname from "./utils.js";

import mongoose from "mongoose";
import run from "./run.js";

import session from "express-session";

// import FileStore from "session-file-store";
// import MongoStore from "connect-mongo"
// //luego pasar el viewrouter al runjs
// import viewsRouter from "./router/views.router.js"
// import sessionsRouter from "./router/sessions.router.js"
//configuracion filestorage con session
// const fileStorage = FileStore(session);

const app = express();

// //para las sesion
// function auth(req, res, next) {
//   if (req.session?.user === "pepe" && req.session?.admin) {
//     return next();
//   }
//   return res.status(401).send("error de autenticacion");
// }

// // Almacenamiento de las sesiones usado filestorage (en archivo)
// // app.use(
// //   session({
// //     store: new fileStorage({
// //       path: `${__dirname}/sessions`,
// //       ttl: 30,
// //       retries: 0,
// //     }),
// //     secret: "Coder41141497",
// //     resave: true,
// //     saveUninitialized: true,
// //   })
// // );

// //sesiones usando mongo storage 
// app.use(session({
//     store: MongoStore.create({
//         mongoUrl:'mongodb+srv://francoivannicoletti:1997@backendcoderfn.j1toc90.mongodb.net/login?retryWrites=true&w=majority',
//         // utilizando nueva forma de string de conexion
//         mongoOptions: {useNewUrlParser: true, useUnifiedTopology:true},
//         ttl:600
//     }),
//     secret: "Coder41141497",
//     resave: true,
//     saveUninitialized: true,

// }))


// app.get("/session", (req, res) => {
//     if (req.session.counter) {
//         req.session.counter++;
//         res.send (`Se visito el sitio ${req.session.counter} veces`)
//     } else{
//         req.session.counter = 1;
//         res.send(`Bienvenidxs`)
//     }
// });

// //cerrar sesion en storage
// app.get('/logout', (req,res) => {
//     req.session.destroy(err => {
//         if (!err) res.send ('Okay')
//         else res.send({status: 'error', error:err})
//     })
// })

// app.get ('/login', (req,res) => {
//     const {username, password} =req.query;

//     if(username !== "pepe" || password !== "pepepepe") {
//         return res.send ("login fail, intente nuevamente");
//     }
//     req.session.user =username;
//     req.session.admin =true;
//     res.send('login exitoso we!');
// })


//Configuracion para traer info de POST como JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configurar el handlebars y vistas
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Carpeta publica para fotos/info de usuarios de acceso publico
app.use(express.static(__dirname + "/public"));

// Conexión a mongoose
const db =
  "mongodb+srv://francoivannicoletti:1997@backendcoderfn.j1toc90.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);
mongoose.connect(
  db,
  {
    dbName: "ecommerce",
  },
  (error) => {
    if (error) {
      console.log("No se pudo conectar a la DB");
      return;
    }

    // Corriendo el servidor
    const httpServer = app.listen(8080, () =>
      console.log("El servidor te esta escuchando...")
    );
    const socketServer = new Server(httpServer);
    httpServer.on("error", (e) => console.log("ERROR: " + e));

    run(socketServer, app);
  }
);


//aca el problema es que no puede haber dos vaces de datos al mismo tiempo.Todo lo que esta arriba comentado pertenece a otra forma de persistir sesiones que desde el minuto 1:59 ya cambiara.
// Habria que encontrar la forma de hacer lo que hace el profe en esta clase para que no afecte al funcionamiento de la pagina y cargue todo en el mismos lugar