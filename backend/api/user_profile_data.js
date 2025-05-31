import express from "express";
import path from "path";
// import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import mongoose from "mongoose";
import { z } from "zod";
import { UserSignupData as dataCollection } from "../config/models/userProfileLoginData.js";
import cloudinary from "../config/cloudinary_config.js";
export let profileDataRouter = express.Router();
let storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    if (!file) return null;
    let fileName = `${path
      .parse(file.originalname)
      .name.split(" ")
      .join("")}-${Date.now()}`;
    let fileType = file.mimetype.split("/")[1];
    req.imgUniqueId = fileName;
    console.log("FILE INFO:", file);
    console.log("FILE INFO:", fileName);
    return {
      folder: "userDp",
      format: fileType,
      public_id: fileName,
    };
  },
});
let multerParser = multer({ storage });
profileDataRouter.patch(
  "/update-profile-data",
  multerParser.single("userDp"),
  async (req, res) => {
    try {
      console.log("FILE INFO:", req.file);
      console.log("BODY:", req.body);
      // Filtering Data
      let oldImageDel = false;
      let userProfileDataFilterSchema = z.object({
        userName: z
          .string()
          .min(2, "Name is too short")
          .max(30, "name is too long"),
        userEmail: z.string().email("Email is Not Valid"),
        userPassword: z
          .string()
          .min(6, "Minimum 6 character allowed")
          .max(20, "Maximum 20 character allowed"),
        userDp: z.any().optional(),
      });
      let parsedData = userProfileDataFilterSchema.safeParse(req.body);
      console.log(parsedData);
      
      if (!parsedData.success) {
        return res
          .status(200)
          .json({ error: parsedData.error.errors, dataUpdateStatus: false });
      }
      // Duplication Uploading Checking
      if (req.file) {
        let oldImgPublicId = await dataCollection.findOne(
          { userEmail: parsedData.data.userEmail },
          { userImageUniqueId: 1, _id: 0 }
        );
        if (oldImgPublicId && oldImgPublicId.userImageUniqueId) {
          // console.log(oldImgPublicId.userImageUniqueId);
          let oldDelImage = await cloudinary.uploader.destroy(
            `userDp/${oldImgPublicId.userImageUniqueId}`
          );
          if (oldDelImage.result === "ok") {
            oldImageDel = true;
          }
        }
      }
      // Updating Data
      if (parsedData.data) {
        let uploadingData = {
          userName: parsedData.data.userName,
          userEmail: parsedData.data.userEmail,
          userPassword: parsedData.data.userPassword,
        };
        if (req.imgUniqueId) {
          uploadingData.userImageUniqueId = req.imgUniqueId;
        }
        let updatedData = await dataCollection.updateOne(
          { userEmail: parsedData.data.userEmail },
          {
            $set: uploadingData,
          }
        );
        // console.log(updatedData);

        return res.status(200).json({
          error: false,
          userUpdateData: updatedData,
          oldImageDel,
          dataUpdateStatus: true,
        });
      }

      return res
        .status(200)
        .json({ error: true, userUpdateData: null, dataUpdateStatus: false });
    } catch (error) {
      console.log(error);
      return res;
      // .status(200)
      // .json({ error: error, userUpdateData: null, dataUpdateStatus: false });
    }
  }
);
