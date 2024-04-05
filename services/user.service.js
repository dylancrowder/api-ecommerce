import userDaoMongoDB from "../dao/user.dao.js";

export default class UserService {
  static findById(userID) {
    return userDaoMongoDB.findById(userID);
  }
  static updateRole(userId, newRole) {
    return userDaoMongoDB(userId, newRole)

  }



  static async updateRoleEmail(email, newRole) {
    try {
      return await userDaoMongoDB.updateRoleEmail(email, newRole)
    } catch (error) {
      throw new Error(`Error en updateRole: ${error.message}`);
    }
  }



  static deleteOldUser(fechaLimite) {
    return userDaoMongoDB.deleteOldUser(fechaLimite)
  }


  static findAll() {
    return userDaoMongoDB.findAll()
  }

  static async updateDocument(userId, newOBJDocument) {
    try {
      return await userDaoMongoDB.updateDocument(userId, newOBJDocument)
    } catch (error) {
      throw new Error(`Error en updateRole: ${error.message}`);
    }
  }

}
