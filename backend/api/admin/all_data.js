import express from "express";
import { UserSignupData } from "../../config/models/userProfileLoginData.js";
import { worker_profile_schema } from "../../config/models/worker_profile_schema.js";
import mongoose from "mongoose";
export const allDataForAdmin = express.Router();
allDataForAdmin.get("/all-users", async (req, res) => {
  try {
    let allUsersData = await UserSignupData.find({}).lean();
    let allWorkersData = await worker_profile_schema.find({}).lean();
    let userData = [];
    let workerData = [];
    let complainMessages = [];
    if (allUsersData?.length > 0) {
      allUsersData.forEach((eachUser, idx) => {
        userData.push({
          userName: eachUser.userName,
          userEmail: eachUser.userEmail,
          userPassword: eachUser.userPassword,
          userImageUniqueId: eachUser.userImageUniqueId,
        });
      });
    }
    console.log(allUsersData);
    
    if (allWorkersData?.length > 0) {
      allWorkersData.forEach((eachWorker, idx) => {
        workerData.push({
          workerName: eachWorker?.username,
          workerEmail: eachWorker?.useremail,
          workerExperience: eachWorker.experience,
          workerCity: eachWorker.address,
          workerContact: eachWorker.phoneNumber,
        });
      });
    }
    let contactColection = mongoose.connection.collection("contactMessage");
    let allComplainMessages = await contactColection.find({}).toArray();;
    if (allComplainMessages?.length > 0) {
      allComplainMessages.forEach((eachWorker, idx) => {
        complainMessages.push({
          userName: eachWorker?.userName,
          userEmail: eachWorker?.userEmail,
          complainMessage: eachWorker?.contactMsg
        });
      });
    }
    console.log(userData, workerData, complainMessages);
    
    res.status(200).json({ success: true, error: null, userData, workerData, complainMessages });
  } catch (error) {
    res.status(200).json({
      success: false,
      error: error?.message,
      userData: null,
      workerData: null,
    });
  }
});
