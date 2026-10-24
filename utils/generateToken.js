const jwt = require("jsonwebtoken");
module.exports = (id) => jwt.sign({ id }, process.env.JWT_SECRET || "change-this-development-secret", { expiresIn: "7d" });
