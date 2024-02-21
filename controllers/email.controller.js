
import userDaoMongoDB from "../dao/user.dao.js";
import { isValidPassword, createHash } from "../utils.js";
class Email {

    static async passwordRecover(passwordNew, user) {

        if (isValidPassword(passwordNew, user)) {

            return console.log("no puedes utilizar la misma contraseña ");
        }
        //crea hash a la nueva pass
        const passHash = createHash(passwordNew)
        //actualiza la contraseña 

        
        const newPass = await userDaoMongoDB.updatePassword(user.id, passHash)
        return newPass
    }
}
export default Email
