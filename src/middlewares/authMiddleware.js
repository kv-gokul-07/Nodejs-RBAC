const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if(authHeader || authHeader?.startsWith("Bearer")) {
        token = authHeader.split(" ").pop();

        if(!token) {
            return res.status(401).json({
                message: "No token, authorization denied"
            })
        }
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        console.log("The Decode User is:", req.user);
        next();
    }
    catch(e) {
       res.status(400).json({ message: "Token is not valid"}) 
    }

}

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // 🔍 Check if user exists (from auth middleware)
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: No user found"
        });
      }

      // 🔍 Check role
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required role: ${allowedRoles.join(", ")}`
        });
      }

      // ✅ Passed
      next();

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Authorization error"
      });
    }
  };
};

module.exports = { verifyToken, authorize };