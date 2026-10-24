const router = require("express").Router(); 
const c = require("../Controllers/voteController"); 
const { protect } = require("../middleware/authMiddleware"); 
const { allowRoles } = require("../middleware/roleMiddleware");
router.post("/", protect, allowRoles("student"), c.cast); 
router.get("/history", protect, allowRoles("student"), c.history);
router.get("/results", protect, allowRoles("admin", "supervisor"), c.results); 
module.exports = router;
