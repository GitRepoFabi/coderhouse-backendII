import UserServices from '../services/users.services.js';

const userServices = new UserServices();

class UserController {
    async getUsers (req,res) {
        const users = await userServices.getUsers();
        res.json({status:"success", users})
    }
}

export default UserController