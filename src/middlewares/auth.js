
export const current = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "Not authenticated" });
  }
  next();
};

export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ error: "Not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).send({ error: "Forbidden: insufficient permissions" });
    }
    next();
  };
};