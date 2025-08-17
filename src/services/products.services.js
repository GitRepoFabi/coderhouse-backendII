import ProductRepository from "../repository/products.repository.js";

const productoRepository = new ProductRepository();

class ProductService {

    async createProduct(body) {
        return await productoRepository.createProduct(body);
    }

    async updateProduct(id, body) {
        const productoEditar = await productoRepository.getProductById(id);
        const { title, description, code, price, stock, category } = body;

        // Solo actualiza si los campos están presentes en el body
        if (title) productoEditar.title = title;
        if (description) productoEditar.description = description;
        if (code) productoEditar.code = code;
        if (price) productoEditar.price = price;
        if (stock) productoEditar.stock = stock;
        if (category) productoEditar.category = category;

        const usuarioActualizado = await productoEditar.save();

        return usuarioActualizado;
    }

    async deleteUser(pid) {
        return await productoRepository.deleteProduct(pid);
    }
}

export default ProductService;