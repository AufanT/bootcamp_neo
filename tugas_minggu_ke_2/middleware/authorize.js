const isAdmin = (roles = []) => {
    if (typeof roles === 'string') {
       roles = [roles];
    }
    return (req, res, next) => {
        if (!roles.includes(req.developer.role)) {
            return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
        }
        next();
    };
}

module.exports = { isAdmin };