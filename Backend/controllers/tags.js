const Campground = require('../models/Campground');
const Tag = require('../models/Tag');

exports.addTagToTagList = async (req, res, next) => {
    try {  
      const tag = await Tag.create({ name: req.body.tagName });
      res.status(201).json({ success: true, tag });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };
  
  exports.deleteTagToList = async (req, res, next) => {
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