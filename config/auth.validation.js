const USERS_ROUTES = [
    '/api/cartsview',
    '/api/login',
    '/api/profile',
    '/api/add-to-cart',
    '/api/logout',
    '/api/chat',
    '/api/sessions/register',
    "/api/getProduct/",
    "/api/purcherase"
];

const ADMIN_ROUTES = [
    '/api/cartsview',
    '/api/chat',
    "/api/add-to-cart"
];

function hasAccess(role, url) {
    if (role === 'admin') {

        return !ADMIN_ROUTES.some(allowedRoute => url.startsWith(allowedRoute));
    } else if (role === 'user') {

        return USERS_ROUTES.some(allowedRoute => url.startsWith(allowedRoute));
    }
    return false;
}

export default function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        const userRole = req.user.role;

        if (hasAccess(userRole, req.originalUrl)) {
            return next();
        } else {
            return res.status(403).render("acceso");
        }
    }

    res.redirect("/login");
}
