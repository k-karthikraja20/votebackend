const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({ 
    name: { type: String, required: true, trim: true }, regNo: String, 
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false }, 
    role: { type: String, enum: ["admin", "student", "candidate", "supervisor"], default: "student" }, phone: String, department: String, year: String }, 
    { timestamps: true });
userSchema.pre("save", async function () { 
    if (this.isModified("password")) 
        this.password = await bcrypt.hash(this.password, 12); });
userSchema.methods.matchesPassword = function (password) { 
    return bcrypt.compare(password, this.password); };
module.exports = mongoose.model("User", userSchema);
