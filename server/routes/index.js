const express = require("express");
const router = express.Router();
const { authentication, authAdmin } = require("../middlewares/auth");

const { Register, Login, checkAuth } = require("../controllers/auth");

const { getAllUser, getUser, deleteUser } = require("../controllers/user");

const {
  getAllPaper,
  getPaper,
  addPaper,
  deletePaper,
} = require("../controllers/paper");

// REGISTER & LOGIN ROUTE
router.post("/register", Register);
router.post("/login", Login);
router.get("/auth", authentication, checkAuth);

// PAPER ROUTE
router.get("/paper", getAllPaper);
router.get("/paper/:id", getPaper);
router.post("/paper", addPaper);
router.delete("/paper/:id", deletePaper);

// USER ROUTE
router.get("/user", getAllUser);
router.get("/user/:id", getUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
