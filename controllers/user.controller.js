import { UserRepo } from "../repository/index.js";

export default class UserController {
  static async findById(userID) {
    const userDTOArray = await UserRepo.findById(userID);
    return userDTOArray;
  }
}
