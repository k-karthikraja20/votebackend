const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const response = (user) => ({ 
    token: generateToken(user._id), user: { 
        id: user._id, name: user.name, email: user.email, role: user.role, regNo: user.regNo, department: user.department, year: user.year } });
exports.register = async (req, res, next) => { 
    try { const { name, email, password, regNo, phone, department, year } = req.body; 
    if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" }); 
    if (await User.exists({ email })) return res.status(409).json({ message: "An account with this email already exists" }); 
    const user = await User.create({ name, email, password, regNo, phone, department, year, role: "student" }); 
    res.status(201).json(response(user)); } catch (err) { next(err); } };
exports.login = async (req, res, next) => { 
    try { const { email, password } = req.body; 
    const user = await User.findOne({ email: email?.toLowerCase() }).select("+password"); 
    if (!user || !(await user.matchesPassword(password || ""))) return res.status(401).json({ message: "Invalid email or password" }); 
    res.json(response(user)); } 
    catch (err) { next(err); } };
exports.me = (req, res) => res.json({ 
    user: { id: req.userid, name: req.user.name, email: req.user.email, role: req.user.role, regNo: req.user.regNo, department: req.user.department, year: req.user.year } });
