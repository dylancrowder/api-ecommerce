import { UserRepo } from "../repository/index.js";
import userDaoMongoDB from "../dao/user.dao.js";
import UserService from "../services/user.service.js";
import UsersDTO from "../dto/users.dto.js";
import userRegisterModel from "../dao/models/userRegister.model.js";
import EmailService from "../services/email.service.js";
export default class UserController {
  static async findById(userID) {
    const userDTOArray = await UserRepo.findById(userID);
    return userDTOArray;
  }

  static updateRole(userId, newRole) {
    return userDaoMongoDB(userId, newRole)

  }


  static async deleteOldUser() {
    const limitDate = new Date();
    limitDate.setDate(limitDate.getDate() - 2);


    const matchs = await userRegisterModel.find({
      last_conection: { $lt: limitDate }
    });
    const emailService = EmailService.getInstance();
    for (const iterator of matchs) {

      const result = await emailService.sendEmail(
        iterator.email,
        'usuario eliminado',
        `<div>
          <h1>cueta eliminada</h1>
          <p>su cuenta fue removida por no inicir session despues de 2 dias</p>
         
        </div>`,
      );


    }



    return await UserService.deleteOldUser(limitDate)
  }

  static async findAll() {
    // Suponiendo que UserService.findAll devuelve una lista de contactos
    const users = await UserService.findAll();

    // Crear una lista para almacenar los DTO de usuarios
    const usersDTOs = [];

    // Iterar sobre cada contacto y crear un DTO para cada uno
    for (const contact of users) {
      const userDTO = new UsersDTO(contact);
      usersDTOs.push(userDTO);
    }

    return usersDTOs;
  }





}

