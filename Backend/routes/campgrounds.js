const express = require("express");
const {
  getCampgrounds,
  getCampground,
  createCampground,
  updateCampground,
  deleteCampground,
  createComment
} = require("../controllers/campgrounds");


//Include other resource routers
const reservationRouter = require("./reservations");


const router = express.Router();
const { protect, authorize } = require("../middleware/user");


//Re-route into other resource routers
router.use("/:campgroundId/reservations/", reservationRouter);


router.route("/").get(getCampgrounds).post(protect, authorize("admin"), createCampground);
router
  .route("/:id")
  .get(getCampground)
  .put(protect, authorize("admin"), updateCampground)
  .delete(protect, authorize("admin"), deleteCampground)

  .post(protect, createComment)

module.exports = router;
