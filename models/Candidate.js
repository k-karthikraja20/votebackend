const mongoose = require("mongoose");
module.exports = mongoose.model("Candidate", new mongoose.Schema({ 
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true }, 
    election: { type: mongoose.Schema.Types.ObjectId, ref: "Election", required: true }, 
    manifesto: { type: String, default: "" }, 
    approved: { type: Boolean, default: false } }, 
    { timestamps: true }));
