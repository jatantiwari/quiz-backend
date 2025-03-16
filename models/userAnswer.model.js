const mongoose = require("mongoose");

const UserAnswerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    selectedAnswer: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
    userTimezone: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserAnswer", UserAnswerSchema);
