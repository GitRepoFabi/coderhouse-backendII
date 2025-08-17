import UserRepository from "../repository/user.repository.js";
import { createHash } from "../utils.js";

const userRepository = new UserRepository();

class UserService {
    async getUsers() {
        return await userRepository.getUsers();
    }

    async getUserById(uid) {
        return await userRepository.getUserById(uid);
    }

    async createUser(body) {
        return await userRepository.createUser(body)
    }

    async updateUser(id, body) {
        const usuarioEditar = await userRepository.getUserById(id);
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
    }

    async deleteUser(uid) {
        return await userRepository.deleteUser(uid);
    }
}

export default UserService;