import ProductServices from '../services/products.services.js';

const productServices = new ProductServices();

class ProductController {

    async saveProduct(req, res) {
        let { title, description, code, price, stock, category } = req.body;

        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).send({ status: "Error", error: "Falta completar algún dato" })
        }

        const response = await productServices.createProduct({ title, description, code, price, stock, category })

        if (!response) {
            return res.status(500).json({ status: "error", message: "view console" })
        }

        res.status(201).json({ status: "producto creado", payload: response })
    }

    async updateProduct(req, res) {
        const id = req.params.id;
        const { title, description, code, price, stock, category } = req.body;
        const response = await productServices.updateProduct(id, { title, description, code, price, stock, category })

        if (!response) {
            return res.status(500).json({ status: "error", message: "view console" })
        }

        res.json({ status: 'OK', message: 'Producto actualizado satisfactoriamente', producto: response });
    }

    async deleteProduct(req, res) {
        const id = req.params.id;

        const response = await productServices.deleteUser(id);

        if (!response) {
            return res.status(500).json({ status: "error", message: "view console" })
        }        

        res.json({ status: "Producto eliminado", payload: response })
    }
}

export default ProductController