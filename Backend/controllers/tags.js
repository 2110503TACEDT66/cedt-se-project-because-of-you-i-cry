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

        campground.tags.push(tag);
        await campground.save();

        res.status(200).json({success : true});

    } catch (error) {

        res.status(400).json({
            success : false, 
            message : error
        });

    }

};

exports.removeTagFromCampground = async (req, res, next) => {

    try {

        const campground = await Campground.findById(req.params.campgroundId);
        const tag = await campground.tags.findById(req.params.tagId);

        if ( !tag ) {
            return res.status(404).json({
                success: false,
                message: `Cannot find a tag with id ${req.params.tagId}`,
              });
        }

        await tag.deleteOne();
        res.status(200).json({ success: true });

    } catch (error) {
        
        res.status(400).json({
            success : false, 
            message : error
        });


    }

}

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
