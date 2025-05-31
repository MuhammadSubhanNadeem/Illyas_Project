import express, { urlencoded } from "express";
import { z } from "zod";
import mongoose from "mongoose";
import "dotenv/config";
import path from "path";
import nodemailer from "nodemailer";
import { setCookie } from "../setups/cookie_sessoin.js";
const signupRouter = express.Router();
let __dirName = import.meta.dirname;
import {UserSignupData as  userSignupDataModel} from "../config/models/userProfileLoginData.js";
// let dbName = "UserSignupData";
let mailTransporterConfig = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sn9273671@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});
// let userSignupDataSchema = new mongoose.Schema({
//   userName: { type: String, required: true },
//   userEmail: { type: String, required: true, unique: true },
//   userPassword: { type: String, required: true },
//   userImageUniqueId: { type: String, required: false, default: null },
// });
// let userSignupDataModel = mongoose.model(dbName, userSignupDataSchema, dbName);
let signupMiddleWare = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  let signupDataSchema = z.object({
    fullName: z
      .string()
      .min(2, "Name is too short")
      .max(30, "name is too long"),
    email: z.string().email("Invalid Email Syntax"),
    password: z
      .string()
      .min(6, "Minimum 6 character allowed")
      .max(20, "Maximum 20 character allowed"),
    confirmPassword: z.string(),
  });
  let parsedDataBody = signupDataSchema.safeParse(req.body);
  if (!parsedDataBody.success) {
    return res.status(422).json({ error: parsedDataBody.error.errors });
  }
  req.filteredData = parsedDataBody.data;
  next();
};
function sendEmailMiddleWare(
  req,
  res,
  userNameData,
  userEmailData,
  userPasswordData,
  OTP
) {
  try {
    mailTransporterConfig.sendMail(
      {
        from: "sn9273671@gmail.com",
        to: `${userEmailData}`,
        subject: "Testing",
        html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Email Verification</title>
        </head>
        <body style="margin: 0; padding: 0; box-sizing: border-box; font-family: Lato, sans-serif; width: 100%; height: 100%;">
          <main style="width: 100%; height: 100%; display: flex; flex-direction: column; gap: 0px; align-items: center; justify-content: flex-start;">
            <div style="position: relative; width: 80%; height: 280px; max-height: 280px; display: flex; align-items: center; justify-content: center; overflow: hidden; text-align: center;">
              <img
              src="${process.env.MAIN_IMG_CLOUDINARY_URL}"
              style="width: 100%; height: 100%; border-radius: 15px; object-fit: cover; object-position: 0 20%; display: block;"
              alt="Workers"
              />
            </div>
            <div style="width: 80%; height: fit-content; margin-top: 25px; display: grid; grid-template-row: repeat(3, fit-content); gap: 0; grid-template-column: 100%; align-items: center; justify-content: center;">
              <h1 style="width: 100%; max-height: 30px; height: min-content; font-size: 32px; color: rgb(255, 166, 0);">Email Verification</h1>
              <p style="color: rgba(0, 0, 0, 0.65); grid-row: 1;">Copy the Code which is given below and write it on the website email verification Code Section.</p>
              <h1 style="color: rgba(0, 0, 0, 0.75); font-size: 20px; grid-row: 2;">CODE: <strong style="font-size: 22px; font-weight: bolder; color: rgb(255, 166, 0);">${OTP}</strong></h1>
            </div>
          </main>
        </body>
      </html>`,
      },
      (error, response) => {
        if (error) {
          console.log('r');
          // console.log("req.session.OTP");
          return res.status(422).json({
            error: "Server Error!",
            message: "Something Went Wrong Try Again Later! 1",
            userDataStatus: false,
            emailSend: false,
            duplication: false,
            userStoredData: null,
          });
        }
        if (response.accepted.length < 1) {
          console.log('r');
          // console.log("req.session.OTP");
          return res.status(422).json({
            error: "Server Error!",
            message: "Email Sending Error!",
            userDataStatus: false,
            emailSend: false,
            duplication: false,
            userStoredData: null,
          });
        }
        if (!req.session) {
          console.log('r');
          return res.status(422).json({
            error: "Server Error!",
            message: "Something Went Wrong Try Again Later! 2",
            userDataStatus: false,
            emailSend: false,
            duplication: false,
            userStoredData: null,
            session: false,
          });
        }
        req.session.OTP = {
          otpCode: OTP,
          expiry: Date.now() + 60 * 1000,
        };
        req.session.userData = {
          userName: userNameData,
          userEmail: userEmailData,
          userPassword: userPasswordData,
        };
        // console.log(response);
        // console.log("req.session.OTP");
        return res.status(200).json({
          error: null,
          message: "Email Sent Successfully!",
          userDataStatus: false,
          emailSend: true,
          duplication: false,
          userStoredData: null,
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(422).json({
      error: "Server Error!",
      message: "Something Went Wrong Try Again Later! 3",
      userDataStatus: false,
      emailSend: false,
      duplication: false,
      userStoredData: null,
    });
  }
}
signupRouter.post("/signup", signupMiddleWare, async (req, res) => {
  try {
    // console.log(req.filteredData);
    let duplicationChecker = await userSignupDataModel.countDocuments({
      userEmail: req.filteredData.email,
    });
    // console.log(duplicationChecker);
    if (duplicationChecker >= 1) {
      
      return res.status(422).json({
        error: "Server Error!",
        duplication: true,
        emailSend: false,
        userDataStatus: false,
        userStoredData: null,
      });
    }
    let randomOTP = Math.floor(Math.random() * 89999 + 10000);
    sendEmailMiddleWare(
      req,
      res,
      req.filteredData.fullName,
      req.filteredData.email,
      req.filteredData.password,
      randomOTP
    );
    
  } catch (error) {
    console.log(error);
    res.status(422).json({
      error: "Server Error!",
      message: "Something Went Wrong Try Again Later! 4",
      userDataStatus: false,
      duplication: false,
      emailSend: false,
      userStoredData: null,
    });
    
  }
});
signupRouter.post("/signup_auth", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    // console.log(req?.body, req?.session?.OTP);
    console.log(req.session.OTP.expiry > Date.now());
    console.log(req.session.OTP.expiry);
    if (req.session.OTP.expiry > Date.now()) {
      let userOtp = parseInt(req.body.userOtp, 10);
      let serverOtp = req.session.OTP.otpCode;
      if (userOtp === serverOtp) {
        let userSignupDataSaving = new userSignupDataModel({
          userName: req.session.userData.userName,
          userEmail: req.session.userData.userEmail,
          userPassword: req.session.userData.userPassword,
        });
        let storedData = await userSignupDataSaving.save();
        setCookie(
          "userEmail",
          `${req.session.userData.userEmail}`,
          true,
          process.env.SECURE === "production",
          30 * 24 * 60 * 60 * 1000,
          res
        );
        if (storedData) {
          req.session.destroy((err) => {
            if (err) {
              return res.status(422).json({
                error: null,
                message: "User Save Successfully",
                userDataStatus: true,
                timeOver: false,
                otpMatched: true,
                emailSend: true,
                userStoredData: null,
                duplication: false,
              });
            }
          });
          
          return res.status(200).json({
            error: null,
            message: "User Save Successfully",
            userDataStatus: true,
            timeOver: false,
            otpMatched: true,
            emailSend: true,
            userStoredData: storedData,
            duplication: false,
          });
        } else {
          // console.log(false);
          
          return res.status(422).json({
            error: "Stored Data Not Found!",
            message: "Server Busy Data Store Error!",
            userDataStatus: false,
            timeOver: false,
            otpMatched: true,
            duplication: false,
            userStoredData: null,
            emailSend: false,
          });
        }
      } else {
        // console.log("false1");
        
        return res.status(422).json({
          error: "Wrong Otp!",
          message: "Please Enter the Correct OTP",
          userDataStatus: false,
          timeOver: false,
          otpMatched: false,
          duplication: false,
          userStoredData: null,
          emailSend: false,
        });
      }
    } else {
      return res.status(200).json({
        error: null,
        message: "TimeOut",
        userDataStatus: true,
        timeOver: true,
        otpMatched: false,
        emailSend: true,
        userStoredData: null,
        duplication: false,
      });
    }
  } catch (error) {
    console.log(error);
    
    return res.status(422).json({
      error: "Server Error!",
      message: "Something Went Wrong Try Again Later! 5",
      userDataStatus: false,
      duplication: false,
      otpMatched: false,
      emailSend: false,
      userStoredData: null,
    });
  }
});
signupRouter.get("/check-signup", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let requestedUserEmail = decodeURIComponent(req.cookies.userEmail || '');
  let a = 1;
  console.log(req.session);
  let query = {};
  query = {userEmail: requestedUserEmail && requestedUserEmail !== "undefined" ? requestedUserEmail : req.session?.loginData?.loginStatus ? req.session?.loginData?.userEmail : ""};
  // let requestedUserData = await userSignupDataModel.findOne({
  //   userEmail: requestedUserEmail,
  // });
  console.log(query);
  
  let requestedUserData = await userSignupDataModel.findOne(query);
  console.log(requestedUserData);
  
  // if (requestedUserData) {
    res.status(200).json({ userFind: !!requestedUserData, userData: requestedUserData });
  // } else {
  //   res.status(200).json({ userFind: false, userData: null });
  // }
});
signupRouter.get("/resend_otp", async (req, res) => {
  let randomOTP = Math.floor(Math.random() * 89999 + 10000);
  // console.log(req.url, req.session);
  if (req?.session) {
    sendEmailMiddleWare(
      req,
      res,
      req.session?.userData?.userName,
      req.session?.userData?.userEmail,
      req.session?.userData?.userPassword,
      randomOTP
    );
  }
});
export default signupRouter;
