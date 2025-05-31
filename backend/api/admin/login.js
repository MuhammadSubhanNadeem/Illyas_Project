import express from "express";
import bcrypt from "bcrypt";
import { adminLoginModle } from "../../config/models/adminModle.js";
export const adminLogin = express.Router();
adminLogin.post("/admin-login", async (req, res) => {
  try {
    console.log(req.body);
    let loginData = req.body;
    let checkAdmin = await adminLoginModle.findOne({
      email: loginData?.adminEmail,
    });
    console.log(checkAdmin);
    
    if (!checkAdmin) {
      return res.status(200).json({
        success: false,
        error: "Admin not found",
        adminData: null,
      });
    }
    //  const isMatch = await bcrypt.compare(loginData?.adminPassword, checkAdmin?.password);
    //  console.log(isMatch, checkAdmin?.password);
     console.log(loginData?.adminPassword, checkAdmin?.password);
    if (loginData?.adminPassword !== checkAdmin?.password) {
      return res.status(200).json({
        success: false,
        error: "Incorrect password",
        adminData: null,
      });
    }

    res.cookie("adminEmail", checkAdmin.email, {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: process.env.SECURE === "production",
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      error: null,
      adminData: checkAdmin,
    });
  } catch (error) {
    res
      .status(200)
      .json({ success: false, error: error.message, adminData: null });
  }
});
adminLogin.get("/admin-login-check", async (req, res) => {
  try {
    let adminEmail = req.cookies?.adminEmail;
    if (!adminEmail) {
      return res.status(200).json({
        success: false,
        error: "Please Login First",
        adminData: null,
      });
    }
    let checkAdmin = await adminLoginModle.findOne({
      email: adminEmail,
    });
    
    if (!checkAdmin) {
      res.cookie("adminEmail", null, {
        maxAge: -1 * (1000 * 60 * 60 * 24),
        secure: process.env.SECURE === "production",
        httpOnly: true,
      });
    }
    res.cookie("adminEmail", checkAdmin.email, {
      maxAge: 1000 * 60 * 60 * 24,
      secure: process.env.SECURE === "production",
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      error: null,
      adminData: checkAdmin,
    });
  } catch (error) {
    res
      .status(200)
      .json({ success: false, error: error.message, adminData: null });
  }
});
// import express from "express";
// import bcrypt from "bcrypt";
// import { adminLoginModle } from "../../config/models/adminModle.js";
// export const adminLogin = express.Router();
// adminLogin.post("/admin-login", async (req, res) => {
//   try {
//     console.log(req.body);
//     let loginData = req.body;
//     let checkAdmin = await adminLoginModle.findOne({
//       email: loginData?.adminEmail,
//     });
//     console.log(checkAdmin);
    
//     if (!checkAdmin) {
//       return res.status(200).json({
//         success: false,
//         error: "Admin not found",
//         adminData: null,
//       });
//     }
//      const isMatch = await bcrypt.compare(loginData?.adminPassword, checkAdmin?.password);
//      console.log(isMatch, checkAdmin?.password);
//      console.log("Password Match Result:", isMatch);
     
//     if (!isMatch) {
//       return res.status(200).json({
//         success: false,
//         error: "Incorrect password",
//         adminData: null,
//       });
//     }

//     res.cookie("adminEmail", checkAdmin.email, {
//       maxAge: 1000 * 60 * 60 * 24, // 1 day
//       secure: process.env.SECURE === "production",
//       httpOnly: true,
//     });

//     res.status(200).json({
//       success: true,
//       error: null,
//       adminData: checkAdmin,
//     });
//   } catch (error) {
//     res
//       .status(200)
//       .json({ success: false, error: error.message, adminData: null });
//   }
// });
