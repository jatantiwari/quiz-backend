const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { User, Token } = require("../models");
const { sendVerificationEmail } = require("../utils/email");
const config = require("../config/config");

class AuthService {
  async signup(name, email, password, profilePic) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Email already in use");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, profilePic });
    await user.save();

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await Token.create({
      userId: user._id,
      token: verificationToken,
      type: "EMAIL_VERIFICATION",
      expiresAt,
    });

    sendVerificationEmail(email, user.name, verificationToken);
    return { message: "User registered successfully. Verify your email." };
  }

  async verifyEmail(token) {
    const tokenRecord = await Token.findOne({
      token,
      type: "EMAIL_VERIFICATION",
      expiresAt: { $gt: new Date() },
    });

    if (!tokenRecord) throw new Error("Invalid or expired token");

    await User.findByIdAndUpdate(tokenRecord.userId, { isVerified: true });
    await Token.deleteOne({ _id: tokenRecord._id });

    return { message: "Email verified successfully" };
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    if (!user.isVerified) throw new Error("Please verify your email first");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const accessToken = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_MINUTES * 60 + 5.5 * 60 * 60,
    });
    const refreshToken = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_DAYS,
    });

    await Token.deleteMany({ userId: user._id, type: "REFRESH_TOKEN" });
    await Token.create({
      userId: user._id,
      token: refreshToken,
      type: "REFRESH_TOKEN",
      expiresAt: new Date(
        Date.now() + config.JWT_EXPIRES_DAYS * 24 * 60 * 60 * 1000
      ),
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
    };
  }

  async refreshAccessToken(refreshToken) {
    const tokenRecord = await Token.findOne({
      token: refreshToken,
      type: "REFRESH_TOKEN",
      expiresAt: { $gt: new Date() },
    });
    if (!tokenRecord) throw new Error("Invalid or expired refresh token");

    const user = await User.findById(tokenRecord.userId);
    if (!user) throw new Error("User not found");

    const newAccessToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_DAYS,
    });
    return { accessToken: newAccessToken };
  }

  async getUserById(userId) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    return user;
  }

  async updateUser(userId, data) {
    const user = await User.findByIdAndUpdate(userId, data, { new: true });
    if (!user) throw new Error("User not found");
    return user;
  }
}

module.exports = new AuthService();