import { Router } from "express";
import EmailService from "../../services/email.service.js";
import Email from "../../controllers/email.controller.js";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';


const router = Router();

// Función para generar un secreto único para cada usuario
const generateUserSecret = (userId) => {
  const randomPart = crypto.randomBytes(16).toString('hex');
  return `${userId}_${randomPart}`;
};

router.get('/password-recovery', async (req, res) => {
  try {
    const user = req.user;

    // Generar un secreto único para este usuario
    const secret = generateUserSecret(user._id);

    // Almacenar el secreto en la sesión
    req.session.secret = secret;

    // Crear un JWT con la información del usuario (en este caso, solo el ID)
    const token = jwt.sign({ userId: user.id }, secret, {
      expiresIn: '1h',
    });
    req.session.token = token
    console.log("este es el token", token);
    // Construir el enlace de recuperación con el token incluido
    const recoveryLink = `http://localhost:8080/api/recoverView?token=${token}`;

    // Enviar el correo electrónico con el enlace de recuperación
    const emailService = EmailService.getInstance();
    const result = await emailService.sendEmail(
      user.email,
      'Recupera tu contraseña',
      `<div>
          <h1>Recupera tu contraseña</h1>
          <p>Haz clic en el siguiente enlace para recuperar tu contraseña:</p>
          <a href="${recoveryLink}" role="button">${recoveryLink}</a>
        </div>`,
    );

    res.status(200).json(result);
  } catch (error) {
    console.error('Error en la recuperación de contraseña:', error);
    res.status(500).json({ error: 'Error en la recuperación de contraseña' });
  }
});

router.get("/recoverView", async (req, res) => {
  const { token } = req.query
  console.log("este es el token de la vista", token);
  res.status(200).render("recoverView", { token });
});



router.post("/reset-password", async (req, res) => {
  try {
    const user = req.user;
    const { passwordNew } = req.body;
    const { token } = req.query
    const secret = req.session.secret;

    console.log("este es el token de reset-password", token);
    if (!token || !secret) {
      return res.status(400).json({ error: 'Sesión inválida' });
    }

    // Verificar el token
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.error('Error al verificar el token:', err);

        return res.status(400).json({ error: 'Token inválido o expirado' });

      }
      console.log("este es el decoded", decoded);
      // Verificar que el usuario del token coincida
      if (decoded.userId !== user.id) {
        console.log("este es el usurio decoded ", decoded);
        console.error('El usuario del token no coincide con el usuario actual o expiró');
        return res.status(400).json({ error: 'Token inválido para este usuario' });
      }

      // Validar y actualizar la contraseña
      Email.passwordRecover(passwordNew, user);

      res.status(200).json("Completado");
    });

  } catch (error) {
    console.error('Error en el restablecimiento de contraseña:', error);
    res.status(400).json({ error: 'Error en el restablecimiento de contraseña' });
  }
});


export default router;
