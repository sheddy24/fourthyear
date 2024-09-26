const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { users } = require("../models");
const crypto = require("crypto");
const bycript = require("bcrypt");

router.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 1: Generate a Reset Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Step 2: Store the Reset Token
    user.resetPasswordToken = resetToken;
    await user.save();

    // Step 3: Construct the Reset Password Link
    const resetPasswordLink = `http://localhost:3000/resetpassword/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mbaikisoi57@gmail.com",
        pass: "sexf vunr byzj fdzc",
      },
    });

    const mailOptions = {
      from: "mbaikisoi57@gmail.com",
      to: email,
      subject: "Password Reset Request",
      text:
        `You are receiving this email because you (or someone else) has requested to reset the password for your account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
        `${resetPasswordLink}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({ message: "An error occurred while resetting the password" });
  }
});

router.put("/newpassword", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database by email
    const user = await users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bycript.hash(password, 10);

    // Update the user's password with the hashed password
    user.password = hashedPassword; // Replace 'password' with the actual field name in your users table
    await user.save();

    // Send a success response
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the password" });
  }
});

module.exports = router;
