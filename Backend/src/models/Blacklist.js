const mongoose = require("mongoose");

const BlacklistSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    expireAt: {
      type: Date,
      default: Date.now,
      expires: 1 * 24 * 60 * 60,
      index: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Blacklist", BlacklistSchema);
