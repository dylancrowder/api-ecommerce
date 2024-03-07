import userDaoMongoDB from "../dao/user.dao.js";

export default class UserService {
  static findById(userID) {
    return userDaoMongoDB.findById(userID);
  }
  static updateRole(userId, newRole) {
    return userDaoMongoDB(userId, newRole)

  }

}
