import express from "express";
export const adminLogout = express.Router();
adminLogout.get("/admin-logout", (req, res) => {
  try {
    res.cookie("adminEmail", null, {
      maxAge: -1 * (1000 * 60 * 60 * 24),
      secure: process.env.SECURE === "production",
      httpOnly: true,
    });
    res.status(200).json({success: true, error: null})
  } catch (error) {
    res.status(200).json({success: false, error: error.message})
  }
});
