const mongoose = require("mongoose");
const slugify = require("slugify");

const spotSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Spot must have a name"],
      unique: true,
      trim: true,
    },
    slug: String,
    photo: {
      type: String,
      default: "default.jpg",
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "rating must be above 1.0"],
      max: [5, "rating must be below 5.0"],
      set: (val) => Math.round((val * 10) / 10),
    },
    ratingsQuantity: {
      type: Number,
      default: 4.5,
    },
    spotType: {
      type: String,
      // required: [true, " A spot must have a type"],
      enum: {
        values: ["street", "park"],
        message: "a spot is either: street or park",
      },
    },
    description: {
      type: String,
      trim: true,
    },

    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    secretSpot: {
      type: Boolean,
      default: false,
    },

    latitude: [Number],
    longitude: [Number],
    address: String,

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "spot must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

spotSchema.index({ ratingsAverage: -1 });
spotSchema.index({ slug: 1 });
spotSchema.index({ location: "2dsphere" });

spotSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name ",
  });
  next();
});

//Document MIDDLEWARE:rund befor .save() .create
spotSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
//QUERYMIDDLEWARE
spotSchema.pre(/^find/, function (next) {
  this.find({ secretSpot: { $ne: true } });
  this.start = Date.now();
  next();
});

const Spot = mongoose.model("Spot", spotSchema);

module.exports = Spot;
