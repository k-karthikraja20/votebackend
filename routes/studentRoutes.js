const router = require("express").Router(); 
const { list } = require("../Controllers/studentController"); 
const { protect } = require("../middleware/authMiddleware"); 
const { allowRoles } = require("../middleware/roleMiddleware"); 
router.get("/", protect, allowRoles("admin", "supervisor"), list); 
module.exports = router;
