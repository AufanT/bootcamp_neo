const isAdmin = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.developer.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

module.exports = { isAdmin };