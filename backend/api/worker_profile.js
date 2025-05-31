import express, { Router } from "express";
import multer from "multer";
import path, { format } from "path";
import { fileURLToPath } from "url";
import { worker_profile_schema } from "../config/models/worker_profile_schema.js";
import cloudinary from "../config/cloudinary_config.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import crypto from "crypto";
export const worker_profile_router = Router();
let tempFIlePath = path.join(
  path.dirname(path.dirname(fileURLToPath(import.meta.url))),
  "temp",
  "images"
);
worker_profile_router.use("/worker_profile/*", (req, res, next) => {
  if (!req.uploadedAllImagesPublicId) {
    req.uploadedAllImagesPublicId = [];
  }
  next();
});
let create_worker_img_arr = async (req, res, next) => {
  let duplicationData = await worker_profile_schema.findOne({
    useremail: { $eq: req?.cookies?.userEmail },
  });
  if (duplicationData) {
    if (duplicationData?.gig_imgs?.cnic_front) {
      let status = await Promise.all([
        cloudinary.uploader.destroy(
          `worker_profile_imgs/${duplicationData?.gig_imgs?.cnic_front}`
        ),
        cloudinary.uploader.destroy(
          `worker_profile_imgs/${duplicationData?.gig_imgs?.cnic_back}`
        ),
      ]);
      let all_banner_imgs_object = duplicationData?.gig_imgs?.gig_banner_imgs;
      if (all_banner_imgs_object) {
        let all_banner_imgs = Object.values(all_banner_imgs_object);
        let banner_deletion = await Promise.all(
          all_banner_imgs.map((each) =>
            cloudinary.uploader.destroy(`worker_profile_imgs/${each}`)
          )
        );
      }
      req.duplicationData = duplicationData;
      req.deletionStatus =
        status.every((each) => each.result === "ok") &&
        all_banner_imgs_object &&
        banner_deletion.every((each) => each.result === "ok");
    }
  }
  next();
};
let storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    if (!file) return null;
    let randBytes = crypto.randomBytes(12).toString("hex");
    let fileName = `${randBytes}-${file.originalname.split(".")[0]}`;
    // uploadedAllImagesPublicId.push(fileName);
    if (req.uploadedAllImagesPublicId) {
      req.uploadedAllImagesPublicId.push(fileName);
    }
    let fileType = file.mimetype.split("/")[1];
    return {
      folder: "worker_profile_imgs",
      format: fileType,
      public_id: fileName,
    };
  },
});
let uploader = multer({ storage });
worker_profile_router.post(
  "/worker_profile",
  create_worker_img_arr,
  uploader.fields([
    { name: "cnic_front", maxCount: 1 },
    { name: "cnic_back", maxCount: 1 },
  ]),
  async (req, res) => {
    let userData = req.body;
    let recentImgs = await worker_profile_schema.findOne({ useremail: req?.cookies?.userEmail }, {gig_imgs: 1})
    let uploadedData = await worker_profile_schema.findOneAndUpdate(
      { useremail: req?.cookies?.userEmail },
      {
        username: userData?.username,
        gender: userData?.gender,
        phoneNumber: userData?.phoneNumber,
        dob: userData?.dob,
        countryName: userData?.countryName,
        address: userData?.address,
        useremail: req?.cookies?.userEmail,
        gig_imgs: {
          gig_banners: { ...(recentImgs?.gig_imgs?.gig_banners || {}) },
          cnic_front: req.uploadedAllImagesPublicId[0],
          cnic_back: req.uploadedAllImagesPublicId[1],
        },
        gig_data_steps: 1,
      },
      { upsert: true, new: true }
    );
    if (uploadedData) {
      res.status(200).json({ dataSet: true, data: uploadedData });
    } else {
      res.status(200).json({ dataSet: false, data: null });
    }
  }
);
worker_profile_router.get(
  "/worker_profile/checkWorkerData",
  async (req, res) => {
    let workerData = await worker_profile_schema.findOne({
      useremail: { $eq: req.cookies?.userEmail || req.session?.loginData?.userEmail },
    });
    res.status(200).json({ dataFind: true, workerData });
  }
);

worker_profile_router.post("/worker_profile/profession", async (req, res) => {
  let worker_profession_data = req?.body;
  let storedData = await worker_profile_schema.updateOne(
    {
      useremail: { $eq: req.cookies?.userEmail || req.session?.loginData?.userEmail },
    },
    {
      profession: worker_profession_data?.profession,
      experience: worker_profession_data?.experience,
      education: {
        edu_class: worker_profession_data?.edu_class,
        edu_from: worker_profession_data?.edu_from,
        edu_to: worker_profession_data?.edu_to,
      },
      gig_data_steps: 2,
    }
  );
  if (storedData?.acknowledged && storedData?.matchedCount === 1) {
    res.status(200).json({ dataFind: true, workerData: storedData });
  } else {
    res.status(200).json({ dataFind: false, workerData: null });
  }
});
worker_profile_router.post("/worker_profile/social_links", async (req, res) => {
  console.log(req.body);
  let worker_profession_data = req?.body;
  let { step, ...socialLinks } = worker_profession_data;
  let storedData = await worker_profile_schema.updateOne(
    {
      useremail: { $eq: req.cookies?.userEmail || req.session?.loginData?.userEmail},
    },
    {
      social_link: {
        ...socialLinks,
        gig_data_steps: 3,
      },
    }
  );
  if (storedData?.acknowledged && storedData?.matchedCount === 1) {
    res.status(200).json({ dataFind: true, workerData: storedData });
  } else {
    res.status(200).json({ dataFind: false, workerData: null });
  }
});
worker_profile_router.post(
  "/worker_profile/gig_final_data",
  uploader.fields([{ name: "gig_banner_imgs[0]", maxCount: 4 }]),
  async (req, res) => {
    req.gig_imgs_setter = {};
    let workerData = await worker_profile_schema.findOne({
      useremail: { $eq: req?.cookies?.userEmail },
    });
    Object.entries(workerData.gig_imgs).forEach(([key, value]) => {
      if (!(value instanceof Array || value instanceof Object)) {
        req.gig_imgs_setter[key] = value;
      }
    });
    let storedData = await worker_profile_schema.updateOne(
      {
        useremail: { $eq: req?.cookies?.userEmail },
      },
      {
        $set: {
          gig_title: req?.body?.gig_title,
          gig_imgs: {
            ...req.gig_imgs_setter,
            gig_banners: [
              ...req.uploadedAllImagesPublicId.map(
                (eachImgId, index) => eachImgId
              ),
            ],
          },
          worker_bio: req?.body?.worker_bio,
          gig_description: req?.body?.gig_desc,
          gig_langs: [...req?.body?.worker_langs.split(",")],
          gig_basic_title: req?.body?.gig_basic_plan_heading,
          gig_basic_desc: req?.body?.gig_basic_plan_desc,
          gig_basic_price: req?.body?.gig_basic_plan_price,
          gig_standard_title: req?.body?.gig_standard_plan_heading,
          gig_standard_desc: req?.body?.gig_standard_plan_desc,
          gig_standard_price: req?.body?.gig_standard_plan_price,
          gig_premium_title: req?.body?.gig_premium_plan_heading,
          gig_premium_desc: req?.body?.gig_premium_plan_desc,
          gig_premium_price: req?.body?.gig_premium_plan_price,
          gig_data_steps: 4,
        },
      }
    );
    if (storedData?.acknowledged && storedData?.matchedCount === 1) {
      res.status(200).json({ dataFind: true, workerData: storedData });
    } else {
      res.status(200).json({ dataFind: false, workerData: null });
    }
  }
);

// https://res.cloudinary.com/dgazver6h/image/upload/worker_profile_imgs/da8d7a942705b1062dc76c89-Designer (11)
// d20e5a0019ede1ad62b1b699-Screenshot 2024-10-01 031158
// worker_profile_router.get('/testing', async (req, res, next) => {
//   console.log(req.cookies.userEmail);
//   res.json({hi: "hello"})
  
// })