var express = require("express");
var router = express.Router();
const tasksController = require("../controllers/tasksController");
const protectRoute = require("../middleware/authMiddleware");

router.use(protectRoute);

router.get("/", tasksController.getAllTasks);
router.post("/", tasksController.createTask);
router.put("/:id", tasksController.updateTask);
router.delete("/:id", tasksController.deleteTask);

module.exports = router;
