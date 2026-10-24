const router = require("express").Router(); 
const c = require("../Controllers/electionController"); 
const { protect } = require("../middleware/authMiddleware"); 
const { allowRoles } = require("../middleware/roleMiddleware");
router.get("/", protect, c.list); 
router.post("/", protect, allowRoles("admin", "supervisor"), c.create); 
router.put("/:id", protect, allowRoles("admin", "supervisor"), c.update); 
router.delete("/:id", protect, allowRoles("admin", "supervisor"), c.remove); 
module.exports = router;



