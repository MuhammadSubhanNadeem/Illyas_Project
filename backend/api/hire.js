import express from "express";
import { worker_profile_schema } from "../config/models/worker_profile_schema.js";
import { UserSignupData } from "./../config/models/userProfileLoginData.js";
export const worker_shop_data = express.Router();
worker_shop_data.post("/workers_shop", async (req, res) => {
  try {
  let requestBody = req.body;
  let requestBodyFilter = req.body.filter;
  // console.log(requestBody);

  let pageOffset = Math.max(parseInt(requestBody.offset) || 0, 0);
  let workerShopQuery = {};

  workerShopQuery.gig_live = true;
  if (requestBodyFilter.category !== "") {
    workerShopQuery.profession = requestBodyFilter.category;
  }
  if (requestBodyFilter.experience !== "") {
    workerShopQuery.experience = { $gte: Number(requestBodyFilter.experience) };
  }
  if (requestBodyFilter.price !== "") {
    workerShopQuery.$or = [
      { gig_basic_price: { $lte: Number(requestBodyFilter.price) } },
      { gig_standard_price: { $lte: Number(requestBodyFilter.price) } },
      { gig_premium_price: { $lte: Number(requestBodyFilter.price) } },
    ];
  }
  if (requestBodyFilter.location !== "") {
    workerShopQuery.countryName = requestBodyFilter.location;
  }
  // console.log(workerShopQuery);
  // console.log(requestBody);
  let shopsData = await worker_profile_schema
    .find(workerShopQuery)
    .skip(pageOffset - 20)
    .limit(20)
    .lean();
    // console.log(shopsData);
    
    shopsData = await Promise.all(
      shopsData.map(async (eachDoc, docIndex) => {
        let getUserDp = await UserSignupData.findOne(
          { userEmail: eachDoc?.useremail },
          { userImageUniqueId: 1, _id: 0 }
        );
        console.log(eachDoc);
      if (getUserDp) {
        return {
          ...eachDoc,
          workerDp: getUserDp?.userImageUniqueId || null,
        };
      } else {
        return eachDoc;
      }
    })
  );
  // shopsData = await Promise.all(
  //   shopsData.map(async (eachDoc) => {
  //     let getUserDp = await UserSignupData.findOne(
  //       { userEmail: eachDoc?.useremail },
  //       { userImageUniqueId: 1, _id: 0 }
  //     );
      
  //     if (getUserDp) {
  //       return {
  //         ...eachDoc, // Use eachDoc, not shopsData[docIndex]
  //         workerDp: getUserDp?.userImageUniqueId || null,
  //       };
  //     }
      
  //     return eachDoc; // If no profile found, just return the original data
  //   })
  // );
  console.log(shopsData);
  
  shopsData = shopsData.filter((each) => each !== null);
  res.status(200).json({
    dataFind: shopsData.length > 0,
    workerData: shopsData.length > 0 ? shopsData : [],
  });
} catch (error) {
  res.status(500).json({ dataFind: false,
    workerData: [], });
}
});
worker_shop_data.get("/specific_worker_profile_data", async (req, res) => {
  try {
    let workerId = req.query.workerId;
    let shopsData = await worker_profile_schema
      .findOne({ _id: workerId })
      .lean();

    if (!shopsData) {
      return res.status(200).json({ dataFind: false, workerData: null });
    }
    let getUserDp = await UserSignupData.findOne(
      { userEmail: shopsData.useremail },
      { userImageUniqueId: 1, _id: 0 }
    );

    // Attach worker DP if found
    shopsData.workerDp = getUserDp?.userImageUniqueId || null;

    // Send response
    res.status(200).json({ dataFind: true, workerData: shopsData });
  } catch (error) {
    console.error("Error fetching worker profile:", error);
    res.status(500).json({ dataFind: false, message: "Internal Server Error" });
  }
});
