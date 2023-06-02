// Se abstrae la logica de enrutado para liberar el app
import productRouter from "./router/product.router.js"
import oneProductRouter from "./router/oneProduct.router.js";
import cartRouter from "./router/cart.router.js"
import oneCartRouter from "./router/oneCart.router.js";
import chatRouter from "./router/chat.router.js"
import messageModel from "./dao/models/message.model.js";
import indexRouter from "./router/index.router.js";
import sessionsRouter from "./router/sessions.router.js"

const run = (socketServer, app) => {
    app.use((req, res, next) => {
        req.io = socketServer
        next()
    })

    // Para interactuar desde la API
    app.use('/', indexRouter)
    app.use('/api/products', productRouter)
    app.use('/api/carts', cartRouter)
    app.use('/api/chat', chatRouter)

    // Para interactuar desde el cliente. Se debe pasar el ID (ejemplo: http://localhost:8080/carts/646d109f1f413db9427d855a)
    app.use('/products', oneProductRouter) //pasando el ID
    app.use('/carts', oneCartRouter) // pasando el id
    // Para interactuar con las sesiones
    app.use('/api/sessions', sessionsRouter)
    
    app.use('/', (req, res) => res.send('Bienvenidxs a mi API backend :)'))

    // Sockets para el envio de mensajes  
    socketServer.on("connection", socket => {
        console.log("Nuevo cliente conectado")

        socket.on("message", async data => {
            await messageModel.create(data)
            let messages = await messageModel.find().lean().exec()
            socketServer.emit("logs", messages)
        })
    })
}

export default run
