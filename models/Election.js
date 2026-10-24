const mongoose = require("mongoose");
module.exports = mongoose.model("Election", new mongoose.Schema({ 
    name: { type: String, required: true, trim: true }, 
    position: { type: String, required: true }, 
    startDate: { type: Date, required: true }, 
    endDate: { type: Date, required: true }, 
    status: { type: String, enum: ["upcoming", "active", "completed"], default: "upcoming" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } }, { timestamps: true }));
