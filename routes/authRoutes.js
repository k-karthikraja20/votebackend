const router = require("express").Router(); 
const c = require("../Controllers/authController"); 
const { protect } = require("../middleware/authMiddleware");
router.post("/register", c.register); 
router.post("/login", c.login); 
router.get("/me", protect, c.me); 
module.exports = router;
