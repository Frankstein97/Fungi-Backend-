# Fungi-Backend-
Esta es la arquitectura del backend de mi proyecto para CoderHouse. Sera una base de datos pero desde MONGO DB.
#GUIAS internas:
GET: http://localhost:8080/
RES:
Pagina web:
----------------------------
GET products: http://localhost:8080/api/products
RES:
La pagina de productos
----------------------------
GET products por ID: http://localhost:8080/api/products/646cbd47b1ea5fc6fefa568b
RES:
{
    "prodById": {
        "_id": "646cbd47b1ea5fc6fefa568b",
        "title": "Hongo Maitake",
        "description": "Hongo conocido por sus propiedades medicinales",
        "code": "MAI005",
        "price": 6.49,
        "stock": 20,
        "category": "Setas",
        "thumbnail": "https://ejemplo.com/imagen-maitake.jpg",
        "__v": 0
    }
}

----------------------------
POST producto: http://localhost:8080/api/products
REQ: 
 	  "title": "",
        "description": "",
        "code": "",
        "price": number ,
        "stock": number ,
        "category": "",
----------------------------
PUT products por ID: http://localhost:8080/api/products/646cbd47b1ea5fc6fefa568b
REQ (modificacion):
{
    "title":"Hongo Maitake Modificated"
}
----------------------------
DELETE http://localhost:8080/api/products/646cbd47b1ea5fc6fefa568b
REQ:
Preferentemente no eliminarlo

>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>

GET carts: http://localhost:8080/api/carts
RES:     "carts": [
        {
            "_id": "646d10cb1f413db9427d855d",
            "products": [],
            "__v": 0
        },
        {...}
    ]

----------------------------

GET carts by ID: http://localhost:8080/api/carts/646d10cb1f413db9427d855d
RES:	{
    "cartById": {
        "_id": "646d10cb1f413db9427d855d",
        "products": [],
        "__v": 0
    }
}

----------------------------
POST carts: http://localhost:8080/api/carts
RES: solo con hacer el la solicitud se crea el carrito
----------------------------
POST productos en un carts : http://localhost:8080/api/carts/646d10cb1f413db9427d855d/products/646cbd47b1ea5fc6fefa5687
RES: solo con hacer la solicitud se agrega "hongos shitake" en el carrito 646d10cb1f413db9427d855d

{"_id":{"$oid":"646d10cb1f413db9427d855d"},"products":[{"id":{"$oid":"646cbd47b1ea5fc6fefa5687"},"quantity":{"$numberInt":"1"},"_id":{"$oid":"646d1b4c1f413db9427d85c6"}}],"__v":{"$numberInt":"1"}}

----------------------------
----------------------------

PARA VER UN CARRITO: 
http://localhost:8080/carts/646d109f1f413db9427d855a

PARA VER UN PRODUCTO:
http://localhost:8080/products/646cbd47b1ea5fc6fefa568b



    // Para interactuar desde la API
    http://localhost:8080/api/products
    app.use('/api/carts', cartRouter)
    http://localhost:8080/api/carts
    app.use('/api/message', chatRouter)
    http://localhost:8080/api/chat

    // Para interactuar desde el cliente. Se debe pasar el ID (ejemplo: http://localhost:8080/carts/646d109f1f413db9427d855a)
    http://localhost:8080/products/646cbd47b1ea5fc6fefa5687
    app.use('/carts', oneCartRouter)
http://localhost:8080/carts/646d109f1f413db9427d855a
