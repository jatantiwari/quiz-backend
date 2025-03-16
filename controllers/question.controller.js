const { questionService } = require("../services");

class QuestionController {
  async createQuestion (request, response) {
    try {
      if (!request.body) {
        return response.status(400).json({ message: "Question data required" });
      }
      const question = await questionService.createQuestion(request.body);
      response.status(201).json(question);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  };
  
  async getQuestions (request, response) {
    try {
      const questions = await questionService.get(request.query);
      response.status(200).json(questions);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  };
  
  async upload (request, response) {
    try {
      if (!request.file) {
        return response.status(400).json({ message: "File required" });
      }
      const questions = await questionService.uploadQuestion(request.file);
      response.status(200).json(questions);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }
  
  async update (request, response) {
    try {
      const { id } = request.params;
      if (!id) {
        return response.status(400).json({ message: "Question Id required" });
      }
      if (!request.body) {
        return response.status(400).json({ message: "Question data required" });
      }
      const question = await questionService.editQuestion(id, request.body);
      response.status(200).json(question);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  };
  
  async deleteQuestion (request, response) {
    try {
      const { id } = request.params;
      if (!id) {
        return response.status(400).json({ message: "Question Id required" });
      }
      await questionService.deleteQuestion(id);
      response.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  };
}

module.exports = new QuestionController()