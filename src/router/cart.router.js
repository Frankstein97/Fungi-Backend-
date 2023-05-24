import { Router } from 'express'
import cartModel from '../dao/models/cart.model.js'

const cartRouter = Router()
//Ahora no deberia ser necesario usar el manager porque ya estan subidos en la db

// obtener carritos
cartRouter.get('/', async (req, res) => {
    const carts = await cartModel.find().lean().exec()

    res.json({ carts })
})

// obtener carritos por id
cartRouter.get('/:cid', async (req, res) => {
    const idCart = req.params.cid
    const cartById = await cartModel.findOne({_id: idCart})

    res.json({ cartById })
})

//se crea un carrito 
cartRouter.post('/', async (req, res) => {
    const newCart = await cartModel.create({})
    res.json({ status: 'success', message: newCart })
})
//maneja una solicitud para agregar un producto a un carrito específico
cartRouter.post('/:cid/products/:pid', async (req, res) => {
    const idCart = req.params.cid
    const idProd = req.params.pid
    const quantity = req.body.quantity || 1
    const cart = await cartModel.findById(idCart)
//para sumar cantidad de producto en carrito
    let prodInCart = false
    for (let i = 0; i < cart.products.length; i++) {
        if (cart.products[i].id == idProd) {
            cart.products[i].quantity++
            prodInCart = true
            break
        }
    }
    if (prodInCart == false) cart.products.push({ id: idProd, quantity})
    await cart.save()
    res.json({status: 'success', message: 'Producto añadido al carrito correctamente', cart})
})

// se modifica el carrito 
cartRouter.put('/:cid', async (req, res) => {
    const idCart = req.params.cid
    const newCart = req.body
    const cartUpdated = await cartModel.updateOne({_id: idCart}, newCart)

    res.json({status: 'success', message: 'Carrito modificado', cartUpdated})
})

//todo esto es para poder modificar la cantidad de productos en carrito
cartRouter.put('/:cid/products/:pid', async (req, res) => {
    const idCart = req.params.cid
    const idProd = req.params.pid
    const newQuantity = req.body

    const cart = await cartModel.findById(idCart)
    const prodIndex = cart.products.findIndex(prod => prod.id == idProd)
    const prodToUpdate = cart.products[prodIndex]

    prodToUpdate.quantity = newQuantity.quantity
    cart.products.splice(prodIndex, 1, prodToUpdate)
    await cart.save()

    res.json({status: 'success', message: 'Cantidad modificada', prodToUpdate})
})

//se eliminan todos los productos del carrito
cartRouter.delete('/:cid', async (req, res) => {
    const idCart = req.params.cid
    const cart = await cartModel.findById(idCart)

    cart.products = []
    await cart.save()

    res.json({status: 'success', message: 'El carrito se ha vaciado!'})
})

// eliminar productos del carrito y chatcehar errores
cartRouter.delete('/:cid/products/:pid', async (req, res) => {
    const idCart = req.params.cid
    const idProd = req.params.pid

    const cart = await cartModel.findById(idCart)
    if(!cart) return res.status(404).json({status: 'error', error: 'Error en el carrito'})

    const prodIndex = cart.products.findIndex(prod => prod.id == idProd)
    if (prodIndex < 0) return res.status(404).json({status: 'error', error: 'Error en el producto'})

    cart.products.splice(prodIndex, 1)
    await cart.save()
    
    res.json({status: 'success', message: 'Se ha eliminado el producto de su carrito', cart})
})

export default cartRouter
