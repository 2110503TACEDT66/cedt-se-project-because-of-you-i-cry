const Campground = require('../models/Campground');
const Tag = require('../models/Tag');

exports.getAllTags = async (req, res, next) => {
    try {
      const tags = await Tag.find().select('-__v');
      res.status(200).json({ success: true, tags });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
};

exports.addTagToCampground = async (req, res, next) => {
    try {
        const campground = await Campground.findById(req.params.campgroundId);
        const tag = await Tag.findById(req.params.tagId);

        if (!campground) {
            return res.status(404).json({
                success: false,
                message: "Campground not found",
            });
        }

        if (!tag) {
            return res.status(404).json({
                success: false,
                message: "Tag not found",
            });
        }

        campground.tags.push(tag);
        await campground.save();

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

exports.removeTagFromCampground = async (req, res, next) => {
    try {
        const campground = await Campground.findById(req.params.campgroundId);
        const tagId = req.params.tagId;

        if (!campground) {
            return res.status(404).json({
                success: false,
                message: "Campground not found",
            });
        }

        const index = campground.tags.indexOf(tagId);
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: `Tag with ID ${tagId} is not associated with this campground`,
            });
        }

        campground.tags.splice(index, 1);
        await campground.save();

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

exports.addTagToTagList = async (req, res, next) => {
    try {  
      const tag = await Tag.create({ name: req.body.name });
      res.status(201).json({ success: true, tag });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };
  
exports.deleteTagFromList = async (req, res, next) => {
    try {
      const tag = await Tag.findById(req.params.tagId);
      if (!tag) {
        return res.status(404).json({ success: false, message: `Tag with id ${req.params.tagId} not found` });
      }
      await tag.deleteOne();
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  //@desc Get all campgrounds
//@route GET /api-information/campgrounds
//@access Public
exports.getCampgroundWithMatchandSimilarTag = async (req, res, next) => {
    try {
      // Find the campground by ID
      const campground = await Campground.findById(req.params.id);
  
      // Bring tags from the current campground
      const campTag = campground.tag;
  
      // Aggregate to find campgrounds with similar tags
      const allSimilar = await Campground.aggregate([
        // Match to exclude the current campground
        { $match: { _id: { $ne: campground._id } } },
        // Unwind the tags array
        { $unwind: "$tags" },
        // Group by name and count the number of matching tags with the target tags
        {
          $group: {
            _id: "$name",
            count: {
              $sum: {
                $cond: { if: { $in: ["$tags", campTag] }, then: 1, else: 0 }
              }
            },
            data: { $first: "$$ROOT" } // Preserve the original document data
          }
        },
        // Sort by count descending, then by _id ascending
        { $sort: { count: -1, _id: 1 } },
        // Project to include only the preserved document data
        { $replaceRoot: { newRoot: "$data" } }
      ]).toArray();
  
      // Return the result as JSON
      res.status(200).json({ success: true, data: allSimilar });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
  
  
  //@desc Get all campgrounds
  //@route GET /api-information/campgrounds
  //@access Public
  exports.getCampgroundWithMatchandSimilarTag2 = async (req, res, next) => {
    try {
      // Find the campground by ID
      const campground = await Campground.findById(req.params.id);
  
      // Bring tags from the current campground
      const campTag = campground.tag;
  
      // Aggregate to find campgrounds with similar tags
      const allSimilar = await Campground.aggregate([
        // Match to exclude the current campground
        { $match: { _id: { $ne: campground._id } } },
        // search campground that have same tags
        { tags: { $elemMatch: { $in: campTag } } },
        {
          $addFields: {
            "count": {
              $sum: {
                $cond: { if: { $in: ["$tags", campTag] }, then: 1, else: 0 }
              }
            },
          }
        },
        // Sort by count descending, then by _id ascending
        { $sort: { count: -1, name: 1 } },
        { $unset: "count" }
      ]).toArray();
  
      // Return the result as JSON
      res.status(200).json({ success: true, data: allSimilar });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }