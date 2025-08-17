import ProductModel from './models/products.model.js'

class productDAO {

    async saveProduct(userObj) {
        try {
            let producto = await ProductModel.create(userObj);
            return producto;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

    async getProductById(pid) {
        try {
            let result = await ProductModel.findOne({ _id: pid })
            return result;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

    async deleteProduct(pid) {
        try {
            let product = await ProductModel.deleteOne({ _id: pid });
            return product
        } catch (error) {
            console.error({ error });
            return null;
        }
    }    
}

export default productDAO;