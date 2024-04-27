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
