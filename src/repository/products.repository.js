import ProductDAO from "../DAO/mongo/product.dao.js";

const productDAO = new ProductDAO();

class ProductRepository {

    async getProductById(pid) {
        return await productDAO.getProductById(pid);
    }

    async createProduct(body) {
        return await productDAO.saveProduct(body);
    }

    async deleteProduct(pid) {
        return await productDAO.deleteProduct(pid);
    }
}

export default ProductRepository;