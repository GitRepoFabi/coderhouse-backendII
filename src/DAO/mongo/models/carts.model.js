import mongoose from 'mongoose';

const carsCollection = 'cars'; //Así es como se llamará la colección en nuestra base de datos.

const carsSchema = new mongoose.Schema({

    //Aquí procederemos a escribir todas las propiedades que queremos que tenga un carrito en nuestra BD
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId, //Aplico el link al esquema products
                    ref: "product"
                },
                quantity: Number
            },
        ],
        default: []
    }
});



const carsModel = mongoose.model(carsCollection, carsSchema);


export default carsModel;