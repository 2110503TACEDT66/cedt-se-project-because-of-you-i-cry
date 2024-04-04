const Campground = require("../models/Campground");
const Comment = require('../models/Comment')

//@desc Get all campgrounds
//@route GET /api-information/campgrounds
//@access Public
exports.getCampgrounds = async (req, res, next) => {
  let query;

  //Copy req.query
  const reqQuery = { ...req.query };

  //Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);
  console.log(reqQuery);

  // Create operator ($gt, $gte, etc)
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resource
  query = Campground.find(JSON.parse(queryStr)).populate("reservations");

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("name");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  try {
    const total = await Campground.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const camgrounds = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }
    res.status(200).json({
      success: true,
      count: camgrounds.length,
      pagination,
      data: camgrounds,
    });
  } catch (error) {
    res.status(400).json({ success: false , message:"bad request"});
  }
};

//@desc Get single campgrounds
//@route GET /api-information/campgrounds/:id
//@access Public
exports.getCampground = async (req, res, next) => {
  try {
    const campground = await Campground.findById(req.params.id);

    if (!campground) {
      return res.status(404).json({
        success: false,
        message: `Cannot find campground with id ${req.params.id}`,
      });
    }

    res.status(200).json({ success: true, data: campground });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

//@desc Create single campground
//@route POST /api-information/campgrounds
//@access Private
exports.createCampground = async (req, res, next) => {
  try {
    const campground = await Campground.create(req.body);

    res.status(200).json({ success: true, data: campground });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

//@desc Update campground
//@route PUT /api-information/campgrounds/:id
//@access Private
exports.updateCampground = async (req, res, next) => {
  try {
    const campground = await Campground.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!campground) {
      return res.status(404).json({
        success: false,
        message: `Cannot find campground with id ${req.params.id}`,
      });
    }

    res.status(200).json({ success: true, data: campground });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

//@desc Delete campground
//@route DELETE /api-information/campgrounds/:id
//@access Private
exports.deleteCampground = async (req, res, next) => {
  try {
    const campground = await Campground.findById(req.params.id);

    if (!campground) {
      return res.status(404).json({
        success: false,
        message: `Cannot find campground with id ${req.params.id}`,
      });
    }

    await campground.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

exports.createComment = async (req, res, next) => {
  try {

    const comment = await Comment.create(req.body);

    if(req.user.role === 'admin') {
      return res.status(400).json({ success: false });
    }

    if(comment) {
      const updateCampgroundArray = await Campground.findByIdAndUpdate(comment.campground_id , {"$push" : {"comments" : comment._id}})
    }

    res.status(200).json({ success: true, data: comment });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

exports.deleteComment = async (req, res, next) => {
  // console.log(req.params.commentId)
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: `Cannot find comment with id ${req.params.commentId}`,
      });
    }

    console.log(comment.user_id)
    console.log(req.user.id)
    if(comment.user_id !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: "You can't delete other comment",
      });
    }

    const removeCommentFromCampground = await Campground.findByIdAndUpdate(comment.campground_id , {$pull : {comments : comment._id}})
    await comment.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false });
  }

}

exports.getComment = async (req, res, next) => {

  const comment = await Comment.findById(req.params.id);

  if(!comment) {
    return res.status(404).json({
      success: false,
      message: `Cannot find comment with id ${req.params.id}`,
    });
  }



}