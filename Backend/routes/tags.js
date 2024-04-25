// routes/tagRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllTags,
  addTagToTagList,
  deleteTagToList,
  addTagToCampground,
  removeTagFromCampground,
} = require('../controllers/tags');

router.route('/').get(getAllTags);
// router.route('/').post(addTagToTagList);
// router.route('/:tagId').delete(deleteTagToList);
// router.route('/campgrounds/:campgroundId/:tagId').post(addTagToCampground);
// router.route('/campgrounds/:campgroundId/:tagId').delete(removeTagFromCampground);

module.exports = router;