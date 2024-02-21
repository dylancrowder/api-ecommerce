import userDaoMongoDB from "../dao/user.dao.js";

export default  class UserService {
  static  findById(userID) {
    return userDaoMongoDB.findById(userID);
  }

  
}
