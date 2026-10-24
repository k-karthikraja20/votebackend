const Vote = require("../models/vote");
const Candidate = require("../models/Candidate");
exports.cast = async (req, res, next) => { 
    try { const candidate = await Candidate.findById(req.body.candidate).populate("election"); 
        if (!candidate) return res.status(404).json({ message: "Candidate not found" }); 
        if (!candidate.approved) return res.status(400).json({ message: "Candidate is not approved" }); 
        const vote = await Vote.create({ voter: req.user._id, candidate: candidate._id, election: candidate.election._id }); 
        res.status(201).json(vote); } 
        catch (e) { if (e.code === 11000) 
            return res.status(409).json({ message: "You have already voted in this election" }); 
            next(e); } };
exports.history = async (req, res, next) => { 
    try { res.json(await Vote.find({ voter: req.user._id }).populate({ path: "candidate", populate: { path: "user", select: "name" } }).populate("election", "name position")); } 
    catch (e) { next(e); } };
exports.results = async (req, res, next) => { 
    try { const results = await Vote.aggregate([{ $group: { _id: "$candidate", votes: { $sum: 1 } } }, { $sort: { votes: -1 } }]); const populated = await Candidate.populate(results, { path: "_id", populate: [{ path: "user", select: "name department" }, { path: "election", select: "name position" }] }); 
    res.json(populated.map(x => ({ candidate: x._id, votes: x.votes }))); } 
    catch (e) { next(e); } };
