const Candidate = require("../models/Candidate");
exports.list = async (req, res, next) => { 
    try { const filter = req.query.election ? { election: req.query.election } : {}; res.json(await Candidate.find(filter).populate("user", "name department year email").populate("election", "name position status")); }
 catch (e) { next(e); } };
exports.apply = async (req, res, next) => { 
    try { const candidate = await Candidate.create({ user: req.user._id, election: req.body.election, manifesto: req.body.manifesto }); 
res.status(201).json(candidate); } 
catch (e) { if (e.code === 11000) return res.status(409).json({ message: "You already have a candidate profile" }); 
next(e); } };
exports.update = async (req, res, next) => { 
    try { const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!candidate) return res.status(404).json({ message: "Candidate not found" }); 
    res.json(candidate); }
 catch (e) { next(e); } };
exports.remove = async (req, res, next) => { try { await Candidate.findByIdAndDelete(req.params.id); 
    res.status(204).end(); } 
catch (e) { next(e); } };
