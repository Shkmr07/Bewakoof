const mongoose = require("mongoose");

const BlacklistSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    expireAt: {
      type: Date,
      default: Date.now,
      expires: process.env.BLACKLIST_TOKEN,
      index: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Blacklist", BlacklistSchema);
