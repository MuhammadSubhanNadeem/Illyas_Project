import express from "express";
import { UserSignupData } from "../config/models/userProfileLoginData.js";
import { worker_profile_schema } from "../config/models/worker_profile_schema.js";
import { setCookie } from "./../setups/cookie_sessoin.js";
import cloudinary from "../config/cloudinary_config.js";
export const deleteRouter = express.Router();
deleteRouter.delete("/delete_user", async (req, res) => {
  try {
    let userId = req.query.user_id;
    let delUserFromDb = await UserSignupData.findOneAndDelete({ _id: userId });
    console.log("asd", delUserFromDb);
    if (!delUserFromDb || !delUserFromDb.userEmail) {
      return res
        .status(200)
        .json({ success: false, message: "User not found" });
    } else if (delUserFromDb.userEmail) {
      if (delUserFromDb.userImageUniqueId) {
        console.log(delUserFromDb.userImageUniqueId);
        
        await cloudinary.uploader.destroy(delUserFromDb.userImageUniqueId);
      }
      let delWorkerFromDb = await worker_profile_schema.findOneAndDelete({
        useremail: delUserFromDb.userEmail,
      });
      if (delWorkerFromDb) {
        if (delWorkerFromDb.gig_imgs.cnic_front) {
          await cloudinary.uploader.destroy(
            delWorkerFromDb.gig_imgs.cnic_front
          );
        }
        if (delWorkerFromDb.gig_imgs.cnic_back) {
          await cloudinary.uploader.destroy(delWorkerFromDb.gig_imgs.cnic_back);
        }
        if (
          Array.isArray(delWorkerFromDb.gig_imgs.gig_banners) &&
          delWorkerFromDb.gig_imgs.gig_banners.length > 0
        ) {
          await Promise.all(
            delWorkerFromDb.gig_imgs.gig_banners.map((eachBanner) =>
              cloudinary.uploader.destroy(eachBanner)
            )
          );
        }
      }
      if (req.cookies.userEmail) {
        setCookie(
          "userEmail",
          "",
          true,
          process.env.SECURE === "production",
          -1 * (3600 * 5),
          res
        );
      }
      if (req.cookies.userName) {
        setCookie(
          "userName",
          "",
          true,
          process.env.SECURE === "production",
          -1 * (3600 * 5),
          res
        );
      }
      if (req.session.loginData?.loginStatus) {
        return req.session.destroy((err) => {
          if (err) {
            return res
              .status(500)
              .json({ success: false, message: "Account Deleted Failed!" });
          }
          return res
            .status(200)
            .json({ success: true, message: "Account Deleted Successfully" });
        });
      }
    }
    return res
      .status(200)
      .json({ success: true, message: "Account Deleted Successfully" });
  } catch (error) {
    console.log("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      message: "Account Deleted Failed!",
      error: error.message,
    });
  }
});
