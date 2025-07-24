import UserDAO from "../DAO/users.dao.js";
import { createHash } from "../utils.js";

const userDAO = new UserDAO();

class UserService {
    async getUsers() {
        return await userDAO.getUsers();
    }

    async getUserById(uid) {
        return await userDAO.getUserById(uid);
    }

    async createUser(body) {
        return await userDAO.saveUser(body);
    }

    async updateUser(id, body) {
        const usuarioEditar = await userDAO.getUserById(id);
        const { first_name, last_name, email, age, password, cart, role } = body;

        // Solo actualiza si los campos están presentes en el body
        if (first_name) usuarioEditar.first_name = first_name;
        if (last_name) usuarioEditar.last_name = last_name;
        if (email) usuarioEditar.email = email;
        if (age) usuarioEditar.age = age;
        if (password) usuarioEditar.password = createHash(password);
        if (cart) usuarioEditar.cart = cart;
        if (role) usuarioEditar.role = role;

        const usuarioActualizado = await usuarioEditar.save();

        return usuarioActualizado;

        //res.json({status:"sucess", payload: usuarioActualizado})

    }

    async deleteUser(uid) {
        return await userDAO.deleteUser(uid);
    }
}

export default UserService;