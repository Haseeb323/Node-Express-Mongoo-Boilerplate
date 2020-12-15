const { Router } = require("express");

const router = require("express").Router();
const taskController = require("../controller/taskController");
router.get("/:id", taskController.getTasks); //listid
router.get("/:id/task", taskController.getTask);
router.delete("/:id", taskController.deleteTask);
router.post("/:id", taskController.addTask); //listid
module.exports = router;
