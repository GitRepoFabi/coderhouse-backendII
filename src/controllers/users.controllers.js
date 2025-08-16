import UserServices from '../services/users.services.js';
import { createHash } from '../utils.js';
import UserDTO from "../dto/UserDTO.js";


const userServices = new UserServices();

class UserController {
    async getUsers(req, res) {
        const users = await userServices.getUsers();
        res.json({ status: "success", users })
    }

    async getUserById(req, res) {
        const uid = req.params.id
        const user = await userServices.getUserById(uid)
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" })
        }

        res.json({ status: "success", user })
    }

    async saveUser(req, res) {
        let { first_name, last_name, email, age, password } = req.body;

        if (!first_name || !last_name || !email || !age || !password) {
            return res.status(400).send({ status: "Error", error: "Falta completar algún dato" })
        }

        const response = await userServices.createUser({ first_name, last_name, email, age, password: createHash(password) })

        if (!response) {
            return res.status(500).json({ status: "error", message: "view console" })
        }

        res.status(201).json({status: "created", payload: new UserDTO(response)})
    }

    async updateUser(req, res) {
        const id = req.params.id;
        const { first_name, last_name, email, age, password, cart, role } = req.body;
        const response = await userServices.updateUser(id, { first_name, last_name, email, age, password, cart, role })

        if (!response) {
            return res.status(500).json({ status: "error", message: "view console" })
        }

        res.json({ status: 'OK', message: 'Usuario actualizado satisfactoriamente', usuario: response });
    }

    async deleteUser(req, res) {
        const id = req.params.id;

        const response = await userServices.deleteUser(id);

        if (!response) {
            return res.status(500).json({ status: "error", message: "view console" })
        }        

        res.json({ status: "Usuario eliminado", payload: response })
    }
}

export default UserController