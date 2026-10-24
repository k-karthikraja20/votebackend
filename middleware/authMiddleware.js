const jwt = require("jsonwebtoken");
const User = require("../models/User");
exports.protect = async (req, res, next) => {
     const token = req.headers.authorization?.startsWith("Bearer ") && req.headers.authorization.slice(7); 
     if (!token) return res.status(401).json({ message: "Authentication required" }); 
     try { req.user = await User.findById(jwt.verify(token, process.env.JWT_SECRET || "change-this-development-secret").id); 
        if (!req.user) throw new Error(); next(); } 
        catch { res.status(401).json({ message: "Invalid or expired token" }); } };
