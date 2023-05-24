import mongoose from 'mongoose'

const cartCollection = 'carts'

// {
//     "products": []
// }
// el quantity son la cantidad de productos con ese ID, y el default [] para inicializar los products
const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: Number
        }],
        default: []
    }
})
// se utiliza para poblar los datos de los productos asociados al products.id,
// en una operación de búsqueda en el esquema de carrito
cartSchema.pre('find', function() {
    this.populate('products.id')
})
// utilizando findOne, la referencia 'products.id' 
// se reemplazará con los datos reales de los productos asociados.
cartSchema.pre('findOne', function() {
    this.populate('products.id')
})

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel