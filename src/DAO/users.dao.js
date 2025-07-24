import userModel from './models/user.model.js';

class userDAO {
    async getUsers() {
        try {
            const result = await userModel.find({});
            return result;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }
}

export default userDAO;