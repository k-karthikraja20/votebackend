const User = require("../models/User");
exports.list = async (req, res, next) => { 
    try { res.json(await User.find({ role: "student" }).select("-password")); } 
    catch (e) { next(e); } };
