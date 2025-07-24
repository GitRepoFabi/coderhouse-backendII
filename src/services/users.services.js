import UserDAO from "../DAO/users.dao.js";

const userDAO = new UserDAO();

class UserService {
    async getUsers () {
        return await userDAO.getUsers();
    }
}

export default UserService;