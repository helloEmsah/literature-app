const express = require("express");
const router = express.Router();
const { authentication, authAdmin } = require("../middlewares/auth");

const { uploadImage } = require("../middlewares/uploadImage");

const { Register, Login, checkAuth } = require("../controllers/auth");

const {
  getUsers,
  getUser,
  getUserLiterature,
  deleteUser,
  uploadPicture,
} = require("../controllers/user");

const {
  getLiteratures,
  getLiterature,
  getLiteratureByTitle,
  addLiterature,
  deleteLiterature,
} = require("../controllers/literature");

// IMPORT COLLECTION CONTROLLER

// REGISTER & LOGIN ROUTE
router.post("/register", Register);
router.post("/login", Login);
router.get("/auth", authentication, checkAuth);

// USER ROUTE
router.get("/user", getUsers);
router.get("/user/:id", getUser);
router.delete("/user/:id", deleteUser);
router.post("/picture", uploadImage("profilePicture"), uploadPicture);

// LITERATURE ROUTE
router.get("/literatures", getLiteratures);
router.get("/literature", getLiteratureByTitle);
router.get("/literature/:id", getLiterature);

// FIX THIS ROUTE LATER
router.post("/literature", addLiterature);
// FIX THIS ROUTE LATER

router.delete("/literature/:id", deleteLiterature);

module.exports = router;
