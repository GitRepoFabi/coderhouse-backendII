import CartsDAO from "../DAO/mongo/carts.dao.js"

const cartDAO = new CartsDAO();

class cartRepository {

    async createCar() {
        return await cartDAO.saveCart();
    }

    async findCarById(cid) {
        return await cartDAO.getCarById(cid);
    }
}

export default cartRepository;