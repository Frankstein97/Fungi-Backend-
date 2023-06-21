import mongoose from 'mongoose'

// Nombre de la coleccion Mongo Atlas que se vera en ecommerce.messages

const messageCollection = 'messages'

const messageSchema = new mongoose.Schema({
    user: String,
    message: String
})

const messageModel = mongoose.model(messageCollection, messageSchema)

export default messageModel