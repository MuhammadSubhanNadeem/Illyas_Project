import mongoose from "mongoose";
let user_profile = new mongoose.Schema({
  useremail: { type: String, required: false },
  username: { type: String, required: false },
  gender: { type: String, required: false },
  phoneNumber: { type: Number, required: false },
  dob: { type: Date, required: false },
  countryName: { type: String, required: false },
  address: { type: String, required: false },
  profession: { type: String, required: false },
  experience: { type: Number, required: false },
  education: { type: Object, required: false },
  social_link: { type: Object, required: false },
  gig_title: { type: String, required: false },
  gig_imgs: { type: Object, required: false },
  worker_bio: { type: String, required: false },
  gig_description: { type: String, required: false },
  gig_langs: { type: Array, required: false },
  gig_basic_title: { type: String, required: false },
  gig_basic_desc: { type: String, required: false },
  gig_basic_price: { type: Number, required: false },
  gig_standard_title: { type: String, required: false },
  gig_standard_desc: { type: String, required: false },
  gig_standard_price: { type: Number, required: false },
  gig_premium_title: { type: String, required: false },
  gig_premium_desc: { type: String, required: false },
  gig_premium_price: { type: Number, required: false },
  gig_live: { type: Boolean, required: true, default: true },
  gig_data_steps: { type: Number, required: true, default: 0, min: 0 },
});
export let worker_profile_schema = new mongoose.model(
  "workerProfile",
  user_profile
);
