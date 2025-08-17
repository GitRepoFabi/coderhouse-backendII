import UserDAO from "../DAO/mongo/users.dao.js";

const userDAO = new UserDAO();

class UserRepository {
    async getUsers() {
        return await userDAO.getUsers();
    }

    async getUserById(uid) {
        return await userDAO.getUserById(uid);
    }

    async createUser(body) {
        return await userDAO.saveUser(body);
    }

    async deleteUser(uid) {
        return await userDAO.deleteUser(uid);
    }
}

export default UserRepository;