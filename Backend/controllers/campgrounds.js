const User = require("../models/User");
const Campground = require("../models/Campground");
const Comment = require('../models/Comment')
const Reservation = require('../models/Reservation')

//@desc Get all campgrounds
//@route GET /api-information/campgrounds
//@access Public
exports.getCampgrounds = async (req, res, next) => {
  let query;

  //Copy req.query
  const reqQuery = { ...req.query };

  //Fields to exclude
  const removeFields = ["select", "sort", "page", "limit", "topProvince"];

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

    // Get top province
    if (req.query.topProvince === 'true') {
      const topProvinces = await Campground.aggregate([
        {
          $group: {
            _id: "$province",
            avgRating: { $avg: "$rating" },
            // count: { $count: {} },
          },
        },
        {
          $sort: { avgRating: -1 },
        },
        {
          $project: {
            _id: 0,
            province: "$_id",
            avgRating: { $round: ["$avgRating", 1] },
            // count: 1,
          },
        },
      ]);

      res.status(200).json({
        success: true,
        topProvinces,
      });
    } else {
      res.status(200).json({
        success: true,
        count: camgrounds.length,
        pagination,
        data: camgrounds,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "bad request" });
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

    if (req.user.role === 'admin') {
      return res.status(400).json({ success: false });
    }

    const reservations = await Reservation.find({
      user: req.user.id,
      campground: req.params.id,
    });

    const hasPastReservation = reservations.some(reservation => new Date(reservation.apptDate) < new Date());

    if (hasPastReservation) {

      const comment = await Comment.create(req.body);

      if (comment) {
        const updateCampgroundArray = await Campground.findByIdAndUpdate(comment.campground_id, { "$push": { "comments": comment._id } })
      }
    }
    else {
      return res.status(400).json({ success: false, message: "You can only comment on campgrounds you have visited in the past." });
    }

  } catch (error) {
    res.status(400).json({ success: false });
  }

  next();
}

exports.updateComment = async (req, res, next) => {
  try {

    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: `Cannot find comment with id ${req.params.commentId}`,
      });
    }

    if (comment.user_id !== req.user.id) {
      return res.status(401).json({ success: false, message: `User ${req.user.id} is not authorized to update this comment` });
    }

    if (req.user.role == 'admin') {
      return res.status(401).json({ success: false, message: `User ${req.user.id} is not authorized to update any comment` });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ success: true, data: updatedComment });
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

    if (comment.user_id !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: "You can't delete other comment",
      });
    }

    const removeCommentFromCampground = await Campground.findByIdAndUpdate(comment.campground_id, { $pull: { comments: comment._id } })
    await comment.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false });
  }

}

exports.getComment = async (req, res, next) => {
  try {
    const campgroundId = req.params.id;

    const comments = await Comment.find({ campground_id: campgroundId }).populate({
      path: 'user_id',
      select: 'name',
    });

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
};


exports.updateCampgroundRating = async (req, res, next) => {

  console.log("OK");

  try {
    // Find the campground by ID
    const campground = await Campground.findById(req.params.id);

    // Find all comments for the campground
    const comments = await Comment.find({ campground_id: campground._id });

    // Calculate the sum of ratings
    const sumOfRatings = comments.reduce((total, comment) => total + comment.user_rating, 0);

    // Calculate the average rating
    const averageRating = (sumOfRatings / comments.length).toFixed(1);

    // Update the campground's rating
    campground.rating = averageRating;

    // Save the updated campground
    await campground.save();

    res.json({ message: 'Campground rating updated successfully.', newRating: averageRating });

  } catch (error) {

    console.error('Error updating campground rating:', error);
    res.status(500).json({ error: 'An error occurred while updating campground rating.' });

  }

};