import express from "express";
import { z } from "zod";
import mongoose from "mongoose";
import { setCookie } from "../setups/cookie_sessoin.js";
export const loginRouter = express.Router();
loginRouter.use("/login", (req, res, next) => {
  let dataParseData = z.object({
    email: z.string().email("Invalid Email Syntax"),
    password: z
      .string()
      .min(6, "Minimum 6 character allowed")
      .max(20, "Maximum 20 character allowed"),
    isRemember: z.boolean(),
  });
  
  let userData = dataParseData.safeParse(req.body);
  if (userData.success) {
    req.filteredLoginData = userData.data;
    next();
  } else {
    res.status(200).json({
      loginStatus: false,
      yourDataStructure: false,
      error: true,
      userData: null,
    });
    res.end();
  }
});
loginRouter.post("/login", async (req, res) => {
  delete req.session.data;
  
  let userData = req?.filteredLoginData;
  let getDbData = mongoose.connection.collection("UserSignupData");
  let dbData = await getDbData.findOne({ userEmail: userData.email });
    if (dbData && dbData?.userPassword === userData?.password) {
      if (userData.isRemember) {
      setCookie(
        "userEmail",
        `${userData.email}`,
        true,
        process.env.SECURE === "production",
        30 * 24 * 60 * 60 * 1000,
        res
      );
    } else {
      req.session.loginData = {
        loginStatus: true,
        userEmail: userData.email,
      };
    }

    res.status(200).json({
      loginStatus: true,
      yourDataStructure: true,
      error: false,
      userData: dbData,
    });
  } else {
    res.status(200).json({
      loginStatus: false,
      yourDataStructure: true,
      error: true,
      userData: null,
    });
  }
  res.end();
});
