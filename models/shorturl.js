const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const shortUrlSchema = new mongoose.Schema(
  {
    fullUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      unique: true,
      type: String,
      default: () => nanoid().substring(0, 10),
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

shortUrlSchema.pre("validate", async function (next) {
  console.log(this.isNew);
  if (!this.isNew) {
    return next();
  }
  let exist = true;
  while (exist) {
    const existing = await mongoose.models.shortUrl.findOne({
      shortUrl: this.shortUrl,
    });
    if (!existing) {
      exist = false;
    } else {
      this.shortUrl = nanoid(10);
    }
  }
  next();
});
module.exports = mongoose.model("shortUrl", shortUrlSchema);
