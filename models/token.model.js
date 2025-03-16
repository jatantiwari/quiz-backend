const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    type: { type: String, enum: ["EMAIL_VERIFICATION", "REFRESH_TOKEN"], required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Token", TokenSchema);
