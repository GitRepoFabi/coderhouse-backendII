import mongoose from 'mongoose';

const productCollection = 'products'; //Así es como se llamará la colección en nuestra base de datos.

const productSchema = new mongoose.Schema({

    //Aquí procederemos a escribir todas las propiedades que queremos que tenga un producto en nuestra BD
    title: String,
    description: String,
    code: {
        type: Number,
        unique: true
    },
    price: Number,
    stock: Number,
    category: String,
    status: Boolean,
    thumbnails: Array
})

// Ahora, con mongoose.model, generamos el modelo funcional de un producto conectado a la BD.
export const productModel = mongoose.model(productCollection, productSchema);