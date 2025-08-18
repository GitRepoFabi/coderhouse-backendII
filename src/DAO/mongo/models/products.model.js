import mongoose from "mongoose";

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

const productModel = mongoose.model("product", productSchema);

export default productModel;