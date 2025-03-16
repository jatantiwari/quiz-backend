const mongoose = require("mongoose");
const moment = require("moment-timezone");
const { UserAnswer, Question } = require("../models");
let userTimezone = "Asia/Kolkata";

class UserAnswerService {
  async submitAnswer(userId, data) {
    const { questionId, selectedAnswer } = data;
    const question = await Question.findById(questionId);
    if (!question) throw new Error("Question not found");

    const submittedAt = moment().tz(userTimezone).format("YYYY-MM-DD HH:mm:ss");

    const answer = await UserAnswer.create({
      userId,
      questionId,
      selectedAnswer,
      submittedAt,
      userTimezone: userTimezone,
    });

    return answer;
  }

  async submittedQuestion(params, userId) {
    const { questionId } = params;
    const question = await Question.aggregate([
      {
        $match: {
          ...(questionId && { _id: new mongoose.Types.ObjectId(questionId) }),
        },
      },
      {
        $lookup: {
          from: "useranswers",
          localField: "_id",
          foreignField: "questionId",
          as: "userAnswers",
          pipeline: [
            {
              $match: {
                userId: new mongoose.Types.ObjectId(userId),
                ...(questionId && {
                  questionId: new mongoose.Types.ObjectId(questionId),
                }),
              },
            },
            {
              $project: {
                _id: 1,
                selectedAnswer: 1,
                isCorrect: 1,
                submittedAt: 1,
              },
            },
          ],
        },
      },
      {
        $match: { userAnswers: { $ne: [] } },
      },
    ]);

    return question;
  }
}

module.exports = new UserAnswerService();
