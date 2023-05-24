import fs from 'fs'
// generador de ids ya no se usa 
// import { nanoid } from "nanoid";

class ProductsManager {

    constructor(path) {
        this.path = path
        this.format = 'utf-8'
    }
    // leer el contenido de un archivo y parsearlo como JSON.
    getProducts = async () => {
        return fs.promises.readFile(this.path, this.format)
            .then(content => JSON.parse(content))
            .catch(() => {return [] })
    }
    // este código toma un array de productos, lo convierte en formato JSON y lo escribe en un archivo
    writeFile = productsArray => {
        return fs.promises.writeFile(this.path, JSON.stringify(productsArray))
    }

    // esto sirve para agregar el ID incremental, pero con mongoose no se si servira mas tarde
    getNextID = async () => {
        return this.getProducts()
            .then(products => {
                const count = products.length
                return (count > 0) ? products[count-1].id + 1 : 1
            })
    }
    //este el titulo te lo dice
    getProductsById = async (id) => {
        const products = await this.getProducts()
        const productById = products.find(prod => prod.id == id);
        return productById ?? "Error: No se pudo obtener el producto"
    }

    //se agrega un producto verificando primero que no repita su code, declarar el producto antes no era necesario
    addProduct = async (obj) => {
        const products = await this.getProducts()
        // const product = {
        //     title: obj.title,
        //     description: obj.description,
        //     code: obj.code,
        //     price: Number(obj.price),
        //     stock: Number(obj.stock),
        //     img: [obj.img],
        // };
        const id = await this.getNextID()
        obj.id = id
        const codes = products.map(prod => prod.code);
        if (codes.includes(obj.code)) {
            console.log(`Error: No se aceptan codigos duplicados\n No se pudo agregar el producto"${obj.title}"`)
        } else {
            products.push(obj)
            await this.writeFile(products)  
            return obj
        }
    }
    // ste método busca un producto en el array de productos por su id, 
    // lo actualiza con un nuevo objeto y luego escribe el array actualizado.
    updateProduct = async (id, object) => {
        const products = await this.getProducts()

        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id){
                products[i] = object
        
                await this.writeFile(products) 
                break
            }
        }
    }
    //la funcion lo dice, se borra con ID 
    deleteProduct = async (id) => {
        const products = await this.getProducts()
        // findIndex se utiliza para encontrar el índice de un elemento en un array que cumpla con una condición.
        const productToDelete = products.findIndex(prod => prod.id == id)

        if (!productToDelete) {
            return console.log("Not Found")
        } else {
        // splice se utiliza para modificar un array, eliminando, reemplazando o agregando elementos en posiciones específicas.
            products.splice(productToDelete,1)
            await this.writeFile(products)
            return productToDelete
        }
    }
}

export default ProductsManager