const multer = require("multer");
const sharp = require("sharp/lib");
const Spot = require("../models/spotModel");
const CatchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadSpotPhoto = upload.single("photo");

exports.resizeUserPhoto = CatchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `spot-${req.params.userId}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/spots/${req.file.filename}`);

  next();
});

exports.getAllSpots = CatchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.userId) filter = { user: req.params.userId };
  const features = new APIFeatures(Spot.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const spots = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: spots.length,
    data: {
      spots,
    },
  });
});

exports.getSpot = CatchAsync(async (req, res, next) => {
  const spot = await Spot.findById(req.params.id);

  if (!spot) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      spot,
    },
  });
});

exports.createSpot = CatchAsync(async (req, res, next) => {
  //allow nesteed routes
  // if (req.body.spot) req.body.spot = req.params.spotId;

  if (!req.body.user) req.body.user = req.params.userId;
  if (req.file) req.body.photo = req.file.filename;

  const newSpot = await Spot.create(req.body);

  console.log(req.body);
  res.status(201).json({
    status: "success",

    data: {
      spot: newSpot,
    },
  });
});

exports.updateSpot = CatchAsync(async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);

  if (req.file) req.body.photo = req.file.filename;
  const spot = await Spot.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!spot) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      spot,
    },
  });
});

exports.deleteSpot = CatchAsync(async (req, res, next) => {
  const spot = await Spot.findByIdAndDelete(req.params.id);

  if (!spot) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getSpotsWithin = CatchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");

  const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    next(
      new AppError(
        "Please provide latitutr and longitude in the format lat,lng.",
        400
      )
    );
  }

  const spots = await Spot.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: "success",
    results: spots.length,
    data: {
      data: spots,
    },
  });
});

exports.getDistances = CatchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");

  const multiplier = unit === "mi" ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    next(
      new AppError(
        "Please provide latitute and longitude in the format lat,lng.",
        400
      )
    );
  }

  const distances = await Spot.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: "distance",
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      data: distances,
    },
  });
});
