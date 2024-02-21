import jwt from 'jsonwebtoken';

// Middleware de autenticación con verificación de roles
function authMiddleware(roles) {
    return (req, res, next) => {
        // Obtener el token del encabezado de autorización
        const token = req.header('Authorization');

        // Verificar si el token está presente
        if (!token) {
            return res.status(401).json({ message: 'Acceso no autorizado. Token no proporcionado.' });
        }

        try {
            // Verificar el token utilizando la clave secreta
            const decoded = jwt.verify(token, 'tu_clave_secreta');

            // Verificar el rol del usuario
            if (!roles.includes(decoded.user.role)) {
                return res.status(403).json({ message: 'Acceso prohibido. Rol no autorizado.' });
            }

            // Agregar la información del usuario decodificado al objeto de solicitud
            req.user = decoded.user;

            // Pasar al siguiente middleware o ruta
            next();
        } catch (error) {
            // Manejar errores de token inválido
            return res.status(401).json({ message: 'Token no válido.' });
        }
    };
}

export default authMiddleware;
