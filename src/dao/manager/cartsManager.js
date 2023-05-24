import fs from 'fs'
// generador de ID ya no se usara
// import { nanoid } from "nanoid";
// import ProductManager from "./ProductManager.js";

class CartsManager {

    constructor(path) {
        this.path = path
        this.format = 'utf-8'
    }
  // funciones que me ayudaran a no repetir
    getCarts = async () => {
        return fs.promises.readFile(this.path, this.format)
            .then(content => JSON.parse(content))
            .catch(() => {return [] })
    }

    writeFile = cartsArray => {
        return fs.promises.writeFile(this.path, JSON.stringify(cartsArray))
    }
    // esto sirve para agregar el ID incremental, pero con mongoose no se si servira mas tarde
    getNextID = async () => {
        return this.getCarts()
            .then(carts => {
                const count = carts.length
                return (count > 0) ? carts[count-1].id + 1 : 1
            })
    }
    //este el titulo te lo dice
    getCartsById = async (id) => {
        const carts = await this.getCarts()
        const cartById = carts.find(cart => cart.id == id);

        return cartById ?? "error: no se pudo obtener el carrito solicitado"
    }
    //se agrega un cart pero sin verificar nada

    addCart = async () => {
        const carts = await this.getCarts()
        const id = await this.getNextID()
        const newCart = {
            id,
            // se genera con un arreglo vacio
            products: []
        }
        carts.push(newCart)
        await this.writeFile(carts)  
        return newCart
    }
    // esta funcion deberia agregar productos al carrito actual
    addProduct = async (idCart, idProd) => {
        const cart = await this.getCartsById(idCart)
        
        let productToUpdate = null
        for (let i = 0; i < cart.products.length; i++) {
            if (cart.products[i].id == idProd) {
                cart.products[i].quantity++
                productToUpdate = 1
                break
            }
        }
        if (productToUpdate == null) {
            cart.products.push({ id: idProd, quantity: 1 })
        }
        await this.update(idCart, cart)
        return cart
    }
    //se deberia poder modificar el carrito
    updateCart = async (id, obj) => {
        obj.id = id
        const cart = await this.getCarts()
        
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id == id) {
                cart[i] = obj

                await this.writeFile(cart) 
                break
            }
        }
    }

}

export default CartsManager