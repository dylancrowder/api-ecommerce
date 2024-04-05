import userRegisterModel from "./models/userRegister.model.js";
export default class userDaoMongoDB {
  static findById(userId) {
    return userRegisterModel.findById(userId);
  }

  static async deleteOldUser(limitDate) {
    return await userRegisterModel.deleteMany({
      last_conection: { $lt: limitDate }
    }
    )
  }
  static async findAll() {
    return await userRegisterModel.find()
  }
  static updatePassword(userId, newPassword) {
    return userRegisterModel.updateOne({ _id: userId }, { $set: { password: newPassword } });
  }

  static async updateRole(userId, newRole) {
    try {
      return await userRegisterModel.updateOne({ _id: userId }, { $set: { role: newRole } });
    } catch (error) {
      throw new Error(`Error en updateRole: ${error.message}`);
    }
  }

  static async updateRoleEmail(email, newRole) {
    try {
      return await userRegisterModel.updateOne({ email: email }, { $set: { role: newRole } });
    } catch (error) {
      throw new Error(`Error en updateRole: ${error.message}`);
    }
  }

  static async updateDocument(userId, newOBJDocument) {
    try {
      return await userRegisterModel.updateOne({ _id: userId }, { $set: { documents: newOBJDocument } });
    } catch (error) {
      throw new Error(`Error en updateRole: ${error.message}`);
    }
  }



}