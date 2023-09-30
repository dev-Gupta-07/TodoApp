const router = require("express").Router();
const {protect}=require("../middleware/authMiddleware")
const {
  getAllTodos,
  getATodo,
  createATodo,
  updateATodo,
  deleteATodo,
} = require("../controllers/todoController");

router.route("/todos-all").get(protect,getAllTodos);
router.route("/todo/:id").get(protect,getATodo);
router.route("/todo/new").post(protect, createATodo);
router.route("/todo/:id").put(protect, updateATodo);
router.route("/todo/:id").delete(protect, deleteATodo);

module.exports = router;
