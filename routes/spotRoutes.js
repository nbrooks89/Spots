const express = require("express");
const spotController = require("../controllers/spotController");

const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

// router.use(authController.isLoggedIn);
router
  .route("/spots-within/:distance/center/:latlng/unit/:unit")
  .get(spotController.getSpotsWithin);

router.route("/distances/:latlng/unit/:unit").get(spotController.getDistances);

router
  .route("/")
  .get(spotController.getAllSpots)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    spotController.uploadSpotPhoto,
    spotController.resizeUserPhoto,
    spotController.createSpot
  );
router
  .route("/:id")
  .get(spotController.getSpot)
  .patch(
    authController.protect,
    authController.restrictTo("user"),
    spotController.uploadSpotPhoto,
    spotController.resizeUserPhoto,
    spotController.updateSpot
  )
  .delete(
    authController.protect,
    authController.restrictTo("user"),
    spotController.deleteSpot
  );

module.exports = router;
