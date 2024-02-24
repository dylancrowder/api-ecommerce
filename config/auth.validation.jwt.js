

// Middleware de autenticación con verificación de roles
function authMiddleware(roles) {
    return (req, res, next) => {
        // Obtener el token del encabezado de autorización

        const token = req.user.role

        // Verificar si el token está presente
        if (!token) {
            return res.status(401).render("acceso")
        }

        try {


            // Verificar el rol del usuario
            if (!roles.includes(token)) {
                return res.status(403).render("acceso")
            }
            console.log("esta autorizado");
            next();
        } catch (error) {

            return res.status(401).json({ message: 'Token no válido.' });
        }
    };
}

export default authMiddleware;
