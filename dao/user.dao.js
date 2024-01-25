import userRegisterModel from "./models/userRegister.model.js";
export default class userDaoMongoDB {
  static findById(userId) {
    return userRegisterModel.findById(userId);
  }
}