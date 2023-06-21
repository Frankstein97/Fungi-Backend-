import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

//LOS DATOS SE DEBERAN VER ASI COMO//
// {
//     "title": "Nombre del hongo",
//     "description": "Descripción del hongo",
//     "code": "Código del producto",
//     "price": "Precio del hongo",
//     "stock": "Cantidad disponible en stock",
//     "category": "Categoría del hongo",
//     "thumbnail": "URL de la imagen en miniatura del hongo"
//   }

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: String,
  price: Number,
  stock: Number,
  category: String,
  thumbnail: String,
});

// Se agrega la capacidad de paginación al modelo de productos, 
// lo que facilita la implementación de consultas paginadas en la colección de productos.
productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productCollection, productSchema);

export default productModel;
