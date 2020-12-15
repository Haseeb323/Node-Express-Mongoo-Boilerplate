const router = require("express").Router();
const listController = require("../controller/listController");
router.get("/", listController.getLists);
router.get("/:id", listController.getList);
router.delete("/:id", listController.deleteList);
router.post("/", listController.addList);

module.exports = router;
