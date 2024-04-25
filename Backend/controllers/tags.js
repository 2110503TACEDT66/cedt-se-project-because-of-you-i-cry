const Tag = require('../models/Tag');
const Campground = require('../models/Campground');

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

}

exports.removeTagToCampground = async (req, res, next) => {

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