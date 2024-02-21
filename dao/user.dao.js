import userRegisterModel from "./models/userRegister.model.js";
export default class userDaoMongoDB {
  static findById(userId) {
    return userRegisterModel.findById(userId);
  }


  static updatePassword(userId, newPassword) {
    return userRegisterModel.updateOne({ _id: userId }, { $set: { password: newPassword } });
  }
}

