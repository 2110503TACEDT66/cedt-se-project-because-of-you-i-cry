// routes/tagRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllTags,
  addTagToTagList,
  deleteTagFromList,
  addTagToCampground,
  removeTagFromCampground,
} = require('../controllers/tags');

const { protect, authorize } = require('../middleware/user');

router.route('/').get(getAllTags);
router.route('/').post(protect, authorize('admin'), addTagToTagList);
router.route('/:tagId').delete(protect, authorize('admin'), deleteTagFromList);
router.route('/campgrounds/:campgroundId/:tagId').post(protect, authorize('admin'), addTagToCampground);
router.route('/campgrounds/:campgroundId/:tagId').delete(protect, authorize('admin'), removeTagFromCampground);

module.exports = router;