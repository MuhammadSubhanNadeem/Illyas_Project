// import express from "express";
// const expressApp = express();
export function setCookie(name, value, isBackend, isSecure, duration, res) {
  res.cookie(name, value, {
    httpOnly: isBackend,
    secure: isSecure,
    sameSite: "strict",
    maxAge: duration,
  });
}
    // res.cookie("userEmail", `${req.filteredData.email}`, {
    //   httpOnly: true,
    //   secure: process.env.SECURE === "production",
    //   sameSite: "strict",
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    // });