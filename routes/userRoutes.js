const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
// const spotController = require("../controllers/spotController");
const spotRouter = require("./spotRoutes");

const router = express.Router();

router.use("/:userId/spots", spotRouter);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
// router.get("/login", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// protects all the routes after this middleware
router.use(authController.protect);
router.use(authController.isLoggedIn);

// router
//   .route("/:userId/spots")
//   .post(
//     authController.protect,
//     authController.restrictTo("user"),
//     spotController.createSpot
//   );
router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);

router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
