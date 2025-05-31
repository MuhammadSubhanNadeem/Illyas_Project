import express from "express";
import { z } from "zod";
import mongoose from "mongoose";
export const contact_Router = express.Router();
contact_Router.use("/contact-message", (req, res, next) => {
  let filter = z.object({
    userName: z
      .string()
      .min(2, "Enter Minimum 2 Character")
      .max(25, "Enter Maximum 25 Character"),
    userEmail: z.string().email("Enter Correct Email"),
    contactMsg: z
      .string()
      .min(5, "Enter Minimum 5 Character")
      .max(500, "Enter Maximum 500 Character"),
  });
  let filteredData = filter.safeParse(req.body);
  console.log(filteredData, req.body);
  if (filteredData.success) {
    req.filteredData = filteredData.data;
    next();
  } else {
    return res
      .status(200)
      .json({ dataStructure: false, dataStored: false, error: true });
  }
});
contact_Router.post("/contact-message", (req, res) => {
  console.log(req.filteredData);
  if (req.filteredData) {
    let useCollection = mongoose.connection.collection("contactMessage");
    useCollection.insertOne(req.filteredData).then((response) => {
      console.log(response.acknowledged);
      if (response.acknowledged) {
        return res
          .status(200)
          .json({ dataStructure: true, dataStored: true, error: false });
      } else {
        return res
          .status(200)
          .json({ dataStructure: true, dataStored: false, error: true });
      }
    });
  } else {
    return res
      .status(200)
      .json({ dataStructure: true, dataStored: false, error: true });
  }
});
