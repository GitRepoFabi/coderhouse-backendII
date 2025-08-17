import cartModel from './models/carts.model.js';

class userDAO {
    async saveCart() {
        try {
            let cart = await cartModel.create({product: []});
            return cart;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

    async getCarById(cid) {
        try {
            let result = await cartModel.findOne({ _id: cid })
            return result;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

}

export default userDAO