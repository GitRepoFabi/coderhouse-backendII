import CartRepository from '../repository/carts.repository.js'

const cartRepository = new CartRepository();

class CartServices {
    async createCar() {
        return await cartRepository.createCar();
    }

    async addProductCart(idCarrito, idProducto) {
        let carrito = await cartRepository.findCarById(idCarrito);

        // Verificar si el producto ya existe en el carrito
        const productoExistente = carrito.products.find(product => product.product.toString() === idProducto);

        if (productoExistente) {
            // Si el producto ya existe, incremento la cantidad
            productoExistente.quantity += 1;
        } else {
            // Si el producto no existe, lo agrego con la cantidad 1
            carrito.products.push({ product: idProducto, quantity: 1 });
        }

        // Salvo el carrito actualizado
        const actualizarCarrito = await carrito.save();

        return carrito;
    }
    
    async getCartById(cid) {
        return await cartRepository.findCarById(cid);
    }
}

export default CartServices