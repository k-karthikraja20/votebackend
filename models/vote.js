const mongoose = require("mongoose");
const schema = new mongoose.Schema({ 
    voter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true }, 
    election: { type: mongoose.Schema.Types.ObjectId, ref: "Election", required: true } }, 
    { timestamps: true });
schema.index({ voter: 1, election: 1 }, { unique: true });
module.exports = mongoose.model("Vote", schema);
