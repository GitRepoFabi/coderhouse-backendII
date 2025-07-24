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

    async getUserById(uid) {
        try {
            let result = await userModel.findOne({ _id: uid })
            return result;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

    async saveUser(userObj) {
        try {
            let user = await userModel.create(userObj);
            return user;
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

    async deleteUser(uid) {
        try {
            let user = await userModel.deleteOne({ _id: uid });
            return user
        } catch (error) {
            console.error({ error });
            return null;
        }
    }
}

export default userDAO;