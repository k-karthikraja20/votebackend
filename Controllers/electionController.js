const Election = require("../models/Election");
exports.list = async (req, res, next) => { 
    try { res.json(await Election.find().sort({ startDate: -1 })); } 
    catch (e) { next(e); } };
exports.create = async (req, res, next) => { 
    try { const { name, position, startDate, endDate, status } = req.body; 
    if (!name || !position || !startDate || !endDate) return res.status(400).json({ message: "All election fields are required" }); 
    if (new Date(endDate) < new Date(startDate)) return res.status(400).json({ message: "End date must be after start date" }); 
    res.status(201).json(await Election.create({ name, position, startDate, endDate, status, createdBy: req.user._id })); } 
    catch (e) { next(e); } };
exports.update = async (req, res, next) => { 
    try { const election = await Election.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); 
    if (!election) return res.status(404).json({ message: "Election not found" }); 
    res.json(election); } catch (e) { next(e); } };
exports.remove = async (req, res, next) => { 
    try { const election = await Election.findByIdAndDelete(req.params.id); 
        if (!election) return res.status(404).json({ message: "Election not found" }); 
        res.status(204).end(); } catch (e) { next(e); } };
