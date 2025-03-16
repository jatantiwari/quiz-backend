const { authService } = require("../services");

class AuthController {

async signupUser (request, response) {
  try {
    const { name, email, password, profilePic } = request.body;
    if (!name || !email || !password) {
      return response.status(400).json({ message: "Missing required fields" });
    }
    const result = await authService.signup(name, email, password, profilePic);
    response.status(201).json(result);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

async verifyAccount (request, response) {
  try {
    const { token } = request.query;
    if (!token) {
      return response.status(400).json({ message: "Invalid or missing token" });
    }
    const result = await authService.verifyEmail(token);
    response.status(200).json(result);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

async loginUser (request, response) {
  try {
    const { email, password } = request.body;
    if (!email ||!password) {
      return response.status(400).json({ message: "Missing required fields" });
    }
    const result = await authService.login(email, password);
    response.status(200).json(result);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

async newAccessToken (request, response) {
  try {
    const { refreshToken } = request.body;
    if (!refreshToken) {
      return response.status(400).json({ message: "Missing required fields" });
    }
    const result = await authService.refreshAccessToken(refreshToken);
    response.status(200).json(result);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};
}

module.exports = new AuthController()
