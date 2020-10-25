const express = require("express");
const router = express.Router();
const { authentication, authAdmin } = require("../middlewares/auth");

const { uploadImage } = require("../middlewares/uploadImage");

const { uploadPDF } = require("../middlewares/uploadPDF");

const { Register, Login, checkAuth } = require("../controllers/auth");

const {
  getUsers,
  getUser,
  getUserLiterature,
  deleteUser,
  uploadProfile,
} = require("../controllers/user");

const {
  getLiteratures,
  getLiterature,
  searchLiterature,
  addLiterature,
  deleteLiterature,
} = require("../controllers/literature");

const {
  getCollection,
  addCollection,
  deleteCollection,
} = require("../controllers/collection");

// REGISTER & LOGIN ROUTE
router.post("/register", Register);
router.post("/login", Login);
router.get("/auth", authentication, checkAuth);

// PROFILE ROUTE
router.get("/profile", getUsers);
router.get("/profile/:id", getUser);
router.get("/profile/:id/literature", getUserLiterature);
router.delete("/profile/:id", deleteUser);
router.patch("/profile/:id", uploadImage("picture"), uploadProfile);

// LITERATURE ROUTE
router.get("/literatures", getLiteratures);
router.get("/literature", searchLiterature);
router.get("/literature/:id", getLiterature);
router.post("/literature", uploadPDF("file"), addLiterature);
router.delete("/literature/:id", deleteLiterature);

// COLLECTION ROUTE
router.get("/collection/:id", getCollection);
router.post("/collection/:literatureId", addCollection);
router.delete("/collection/:literatureId", deleteCollection);

module.exports = router;
