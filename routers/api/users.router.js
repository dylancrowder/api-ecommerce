import express from "express";
import multer from "multer";
import UserService from "../../services/user.service.js";
import userDaoMongoDB from "../../dao/user.dao.js";
import UserController from "../../controllers/user.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const allowedTypes = {
            document: "uploads/document",
            domicilio: "uploads/document",
            cuenta: "uploads/document",
            identificacion: "uploads/document",
            profile: "uploads/profile",
            product: "uploads/product"
        };

        const folder = allowedTypes[file.fieldname];

        cb(null, folder);
    },
    filename: function (req, file, cb) {
        console.log(file);
        const name = file.fieldname + file.originalname
        cb(null, Date.now() + name);
    }
});

const upload = multer({ storage: storage });

router.post("/users/:uid/documents", upload.fields([{ name: "document" }, { name: "cuenta" }, { name: "domicilio" }, { name: "profile", maxCount: 1 }, { name: "product" }, { name: "identificacion" },]), async (req, res) => {
    try {

        const { uid } = req.params;
        const files = req.files;

        if (!files || Object.keys(files).length === 0) {
            return res.status(400).json({ error: "No se han enviado archivos." });
        }

        const documents = [];

        for (const fieldName in files) {
            if (Object.prototype.hasOwnProperty.call(files, fieldName)) {
                const fileList = files[fieldName];

                for (const file of fileList) {
                    documents.push({
                        name: file.filename,
                        reference: file.path
                    });
                }
            }
        }

        const user = await UserService.updateDocument(uid, documents);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Ha ocurrido un error." });
    }
});




router.get("/updateUser/:uid", async (req, res) => {
    const { uid } = req.params;
    res.render("updateUser", { uid });
});



router.put("/users/premium/:uid", async (req, res) => {
    try {
        const { uid } = req.params;
        const { newRole } = req.body

        const user = await userDaoMongoDB.findById(uid);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const userUpdate = await userDaoMongoDB.updateRole(uid, newRole);
        console.log("esre es el nuevo rol", userUpdate);
        res.status(200).json(userUpdate);
    } catch (error) {
        res.status(400).json({ error: "An error occurred" });
    }
});

router.get("/users", async (req, res) => {


    const users = await UserController.findAll()
    res.status(200).json(users)
})



router.delete("/users", async (req, res) => {


    const users = await UserController.deleteOldUser()
    res.status(200).json(users)
})


router.post("/updateRoles/:email", async (req, res) => {
    const { email } = req.params;
    const { newRole } = req.body; // Obtener el nuevo rol del cuerpo de la solicitud
    console.log(newRole);

    try {
        // Suponiendo que UserService.updateRoleEmail() devuelve una promesa
        const roleUpdate = await UserService.updateRoleEmail(email, newRole);
        res.status(200).json(roleUpdate); // Enviar los datos actualizados del usuario como respuesta
    } catch (error) {
        console.error("Error al actualizar el rol del usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" }); // Manejar errores y enviar una respuesta adecuada
    }
});


router.get("/updateRole", async (req, res) => {
    const users = await UserController.findAll()

    res.render("updateRole", { users });
})
export default router;





