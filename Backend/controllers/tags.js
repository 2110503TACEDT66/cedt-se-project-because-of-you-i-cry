const Tag = require('../models/Tag');
const Campground = require('../models/Campground');

exports.getAllTags = async (req, res, next) => {
    try {
      const tags = await Tag.find();
      res.status(200).json({ success: true, tags });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };