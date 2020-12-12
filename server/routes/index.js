const express = require("express");
const router = express.Router();
const { authentication, authAdmin } = require("../middlewares/auth");

const { uploadImage } = require("../middlewares/uploadImage");

// const { upload } = require("../middlewares/uploadPDF");

const { upload } = require("../middlewares/uploadFile");

const { Register, Login, checkAuth } = require("../controllers/auth");

const {
  getUsers,
  getUser,
  getUserLiterature,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const {
  getLiteratures,
  getLiterature,
  searchLiterature,
  addLiterature,
  deleteLiterature,
  getLiteratureByTitle,
  getLiteratureByTitleAndYear,
  getYear,
  updateLiterature,
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
router.get("/user", authentication, getUsers);
router.get("/user/:id", authentication, getUser);
// router.get("/user/:id/literature", authentication, getUserLiterature);
router.patch("/user/:id", authentication, uploadImage("picture"), updateUser);
router.delete("/user/:id", authentication, authAdmin, deleteUser);

// LITERATURE ROUTE
router.get("/literatures", authentication, getLiteratures);
router.get("/literature", authentication, searchLiterature);
router.get("/user-literature/:id", authentication, getUserLiterature);
router.get("/literature/:id", authentication, getLiterature);
router.get("/approved-literature/:title/", getLiteratureByTitle);
router.get("/year", getYear);
router.get(
  "/approved-literature/:title/:publication",
  getLiteratureByTitleAndYear
);
router.get("/literature/:id", authentication, getLiterature);
router.post("/literature", authentication, upload("literature"), addLiterature);
// router.post("/literature", authentication, addLiterature);
router.patch("/literature/:id", authentication, updateLiterature);
router.delete("/literature/:id", authentication, authAdmin, deleteLiterature);

// COLLECTION ROUTE
router.get("/collection/:id", authentication, getCollection);
router.post("/collection/", authentication, addCollection);
router.delete("/collection/:id", authentication, deleteCollection);
// router.delete(
//   "/remove-collection/:literatureId",
//   authentication,
//   deleteCollection
// );

module.exports = router;
