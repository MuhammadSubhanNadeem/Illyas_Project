import React, { useContext, useEffect, useRef, useState } from "react";
import { Inputs_for_shop_update } from "./inputs_for_shop_update";
import defaultTempImg from "../../../../../src/assets/images/hire/bike_repairing.jpg";
import { Main_context } from "../../../../stores/main_store/main_store";
import { z } from "zod";
import axios from "axios";

export function Edit_shop_data_form({ showForm }) {
  let context = useContext(Main_context);
  let imageInputRef = useRef(null);
  let selectLangRef = useRef(null);
  let [pricingBoxState, setPricingBoxState] = useState(1);
  let [currentUploadedImages, setCurrentUploadedImages] = useState(null);
  let [currentUploaded, setCurrentUploaded] = useState(null);
  let [uploadedImages, setUploadedImages] = useState([]);
  let [uploadedImagesUrl, setUploadedImagesUrl] = useState([]);
  let [addedLanguages, setAddedLanguages] = useState([]);
  useEffect(() => {
    console.log(uploadedImages);
  }, [uploadedImages]);
  function addImageAcceptHandler() {
    if (!uploadedImagesUrl.includes(currentUploadedImages)) {
      setUploadedImages((prev) => {
        if (prev.length <= 3) {
          return [...prev, currentUploaded];
        } else {
          alert("You Can Upload Maximum 4 Images");
          return [...prev];
        }
      });
      setUploadedImagesUrl((prev) => {
        if (prev.length <= 3) {
          return [...prev, currentUploadedImages];
        } else {
          return [...prev];
        }
      });
    } else {
      alert("Already Uploaded!! Upload Different Image Banner...");
    }
    imageInputRef.current.value = "";
    setCurrentUploaded(null);
    setCurrentUploadedImages(null);
  }
  function addImageDeclineHandler() {
    imageInputRef.current.value = "";
    setCurrentUploaded(null);
    setCurrentUploadedImages(null);
  }
  function ImageUploadHandler() {
    let currentImageRaw = imageInputRef.current.files[0];
    setCurrentUploaded(currentImageRaw);
    if (currentImageRaw) {
      let currentImageInstance = new FileReader();
      currentImageInstance.onload = (event) => {
        let currentImageLink = event.target.result;
        setCurrentUploadedImages(currentImageLink);
      };
      currentImageInstance.readAsDataURL(currentImageRaw);
    } else {
      setCurrentUploaded(null);
      setCurrentUploadedImages(null);
    }
  }
  async function final_gig_form_handler(defs) {
    defs.preventDefault();
    let IMAGE_FORMATE = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/PNG",
      "image/JPG",
      "image/JPEG",
    ];
    let IMAGE_SIZE = 3 * 1024 * 1024;
    // let step1FormDataRaw = new FormData(defs.currentTarget);
    let final_gig_raw_data = new FormData(defs.currentTarget);
    let final_gig_raw_data_entries = Object.entries(
      Object.fromEntries(final_gig_raw_data)
    );
    if (context.uiStates.profileStep === 3) {
      // let final_gig_data_object = {gig_banner_imgs: {...uploadedImages}}
      final_gig_raw_data.append("step", context.uiStates.profileStep);
      console.log(final_gig_raw_data);
      let uploaded_banner_obj = {};
      uploadedImages.forEach((each_file, index) => {
        uploaded_banner_obj[`gig_banner_${index}`] = each_file;
      });
      let finalFilteredJsonData = {};
      finalFilteredJsonData["gig_banner_imgs"] = { ...uploaded_banner_obj };
      finalFilteredJsonData["worker_langs"] = [...addedLanguages];
      final_gig_raw_data_entries.forEach((data) => {
        if (data[1] !== "") {
          finalFilteredJsonData[`${data[0]}`] = data[1];
        }
      });

      let formValidatorSchema = z.object({
        gig_banner_imgs: z.object({
          gig_banner_0: z
            .any()
            .refine((file) => file instanceof File, {
              message: "Incorrect Data",
            })
            .refine(
              (file) => (file ? IMAGE_FORMATE.includes(file.type) : false),
              {
                message: "Wrong File Format",
              }
            )
            .refine((file) => (file ? file.size <= IMAGE_SIZE : false), {
              message: "File Size Must be Under 3MB",
            }),
          gig_banner_1: z
            .any()
            .refine((file) => file instanceof File, {
              message: "Incorrect Data",
            })
            .refine(
              (file) => (file ? IMAGE_FORMATE.includes(file.type) : false),
              {
                message: "Wrong File Format",
              }
            )
            .refine((file) => (file ? file.size <= IMAGE_SIZE : false), {
              message: "File Size Must be Under 3MB",
            })
            .optional(),
          gig_banner_2: z
            .any()
            .refine((file) => file instanceof File, {
              message: "Incorrect Data",
            })
            .refine(
              (file) => (file ? IMAGE_FORMATE.includes(file.type) : false),
              {
                message: "Wrong File Format",
              }
            )
            .refine((file) => (file ? file.size <= IMAGE_SIZE : false), {
              message: "File Size Must be Under 3MB",
            })
            .optional(),
          gig_banner_3: z
            .any()
            .refine((file) => file instanceof File, {
              message: "Incorrect Data",
            })
            .refine((file) => IMAGE_FORMATE.includes(file.type), {
              message: "Wrong File Format",
            })
            .refine((file) => file.size <= IMAGE_SIZE, {
              message: "File Size Must be Under 3MB",
            })
            .optional(),
        }),
        gig_title: z
          .string()
          .min(3, { message: "Title is too Short" })
          .max(80, { message: "Title is too Large" }),
        gig_desc: z
          .string()
          .min(20, { message: "Description is too Short" })
          .max(1000, { message: "Description is too Large" }),
        worker_bio: z
          .string()
          .min(5, { message: "Bio is too Short" })
          .max(120, { message: "Bio is too Large" }),
        worker_langs: z
          .array(
            z
              .string()
              .min(2, { message: "Language name too short" })
              .max(20, { message: "Language name too Large" })
          )
          .min(1, { message: "At least 1 language is required" })
          .max(5, { message: "You can add up to 5 languages only" }),
        gig_basic_plan_heading: z
          .string()
          .min(3, { message: "Basic Plan Heading is too Short" })
          .max(50, { message: "Basic Plan Heading is too Large" }),
        gig_standard_plan_heading: z
          .string()
          .min(3, { message: "Standard Plan Heading is too Short" })
          .max(50, { message: "Standard Plan Heading is too Large" }),
        gig_premium_plan_heading: z
          .string()
          .min(3, { message: "Premium Plan Heading is too Short" })
          .max(50, { message: "Premium Plan Heading is too Large" }),
        gig_basic_plan_desc: z
          .string()
          .min(3, { message: "Basic Plan Description is too Short" })
          .max(120, { message: "Basic Plan Description is too Large" }),
        gig_standard_plan_desc: z
          .string()
          .min(3, { message: "Standard Plan Description is too Short" })
          .max(120, { message: "Standard Plan Description is too Large" }),
        gig_premium_plan_desc: z
          .string()
          .min(3, { message: "Premium Plan Description is too Short" })
          .max(120, { message: "Premium Plan Description is too Large" }),
        gig_basic_plan_price: z
          .string()
          .min(1, { message: "Basic Plan Price is too Low" })
          .max(5, { message: "Basic Plan Price is too High" }),
        gig_standard_plan_price: z
          .string()
          .min(1, { message: "Standard Plan Price is too Low" })
          .max(5, { message: "Standard Plan Price is too High" }),
        gig_premium_plan_price: z
          .string()
          .min(1, { message: "Premium Plan Price is too Low" })
          .max(5, { message: "Premium Plan Price is too High" }),
      });

      console.log(finalFilteredJsonData);

      let validatedData = formValidatorSchema.safeParse(finalFilteredJsonData);
      console.log(validatedData);
      if (!validatedData.success && !validatedData?.data) {
        alert("Enter Correct Data");
        return;
      }
      context?.uiStates?.setLoadingState(true);
      let formDataConvert = new FormData();
      Object.entries(validatedData?.data).forEach(([key, value]) => {
        if (key === "gig_banner_imgs") {
          Object.entries(value).forEach(([fileKey, file]) => {
            // formDataConvert.append(`gig_banner_imgs[${fileKey}]`, file);
            formDataConvert.append(`gig_banner_imgs[${0}]`, file);
          });
        } else if (value !== null && value !== undefined) {
          formDataConvert.append(key, value);
        }
      });
      let response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/worker_profile/gig_final_data`,
        formDataConvert,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log(response);
      if (response?.data) {
        window.location.reload(true);
        context?.uiStates?.setLoadingState(false);
      }
    }
  }
  return (
    <form
      encType="multipart/form-data"
      method="post"
      onSubmit={final_gig_form_handler}
      className="absolute w-[calc(100%-150px)] max-w-[1440px] h-auto top-0 left-[50%] -translate-x-[50%] z-50 bg-top_nav_second_color rounded-[15px] flex flex-col items-center justify-start p-[35px] selection:bg-main_website_color_1 selection:text-top_nav_second_color"
    >
      <svg
        className="absolute top-[15px] right-[15px] w-[34px] h-[34px] fill-main_website_color_1 cursor-pointer"
        onClick={() => {showForm(false)}}
        viewBox="0 0 16 16"
      >
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
      </svg>
      <h1 className="text-[32px] font-bold text-main_website_color_1">
        Update Shop Data
      </h1>
      <Inputs_for_shop_update
        inputCoverStyle="w-full h-[45px] mt-[35px]"
        tag="input"
        inputType="text"
        fieldName="gig_title"
        className="w-full h-full border-main_website_color_1 border-[2px] outline-none rounded-[7px] pl-[15px] text-[18px] font-semibold"
        inputPlaceholder="Your Work Title e.g, (I will Web Developing With Responsive Design)"
        isRequired={true}
        inputLimit={80}
      />
      <div className="relative w-full h-[429px] flex items-center justify-between mt-[35px] gap-[35px]">
        <div className="relative w-full h-full flex items-center justify-center rounded-[8px] overflow-hidden">
          {currentUploadedImages ? (
            <div className="absolute w-fit h-fit top-[5px] right-[5px] flex items-center justify-center gap-[15px]">
              <span
                onClick={addImageAcceptHandler}
                className="w-[45px] h-[45px] flex items-center justify-center bg-main_website_color_1 rounded-full cursor-pointer z-50 group"
              >
                <svg
                  className="w-[26px] h-[26px] fill-[rgba(255,255,255,0.45)] group-hover:fill-top_nav_second_color transition-all duration-150 ease-out"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                </svg>
              </span>
              <span
                onClick={addImageDeclineHandler}
                className="w-[45px] h-[45px] flex items-center justify-center bg-main_website_color_1 rounded-full cursor-pointer z-50 group"
              >
                <svg
                  className="w-[32px] h-[32px] fill-[rgba(255,255,255,0.45)] group-hover:fill-top_nav_second_color transition-all duration-150 ease-out"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </span>
            </div>
          ) : null}
          <input
            type="file"
            id="userShopBanner"
            onChange={ImageUploadHandler}
            ref={imageInputRef}
            accept=".png, .jpg, .jpeg, .webp"
            className="hidden"
          />
          <label
            htmlFor="userShopBanner"
            className="relative w-full h-full bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.25)] rounded-[8px] flex items-center justify-center cursor-pointer border-2 border-main_website_color_1 transition-all duration-150 ease-out"
          >
            <div className="w-fit h-fit flex flex-col items-center justify-center gap-[15px]">
              <svg
                className="w-[72px] h-[72px] fill-[rgba(0,0,0,0.45)]"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"
                />
                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
              </svg>
              <span className="text-[rgba(0,0,0,0.45)] font-semibold text-[16px]">
                Upload Image Here (Image Must be Less than 3MB)
              </span>
            </div>
          </label>
          <img
            src={currentUploadedImages || undefined}
            className={`absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-full h-full object-cover ${
              currentUploadedImages ? "" : "hidden"
            }`}
            alt="Your Banner"
          />
        </div>
        <div className="w-[420px] h-full flex flex-col items-center justify-center gap-[10px]">
          {uploadedImagesUrl.map((eachImg, index) => {
            return (
              <div
                key={index}
                className="relative w-full h-[calc((100%/4)-10px)] flex items center justify-center border-[2px] border-main_website_color_1 rounded-[5px] overflow-hidden bg-[rgba(255,255,255,0.3)]"
              >
                <img
                  src={eachImg || undefined}
                  className="w-full h-full object-contain"
                  alt=""
                />
                <div className="absolute w-fit h-fit top-[3px] right-[3px] flex items-center justify-center gap-[15px]">
                  <span
                    onClick={() => {
                      setUploadedImagesUrl((prev) => {
                        let newUrlArr = prev.filter((each) => {
                          if (each !== prev[index]) {
                            return each;
                          }
                        });
                        return [...newUrlArr];
                      });
                      setUploadedImages((prev) => {
                        let newUrlArr = prev.filter((each) => {
                          if (each !== prev[index]) {
                            return each;
                          }
                        });
                        return [...newUrlArr];
                        // console.log(prev);
                        // let newFileObj = { ...prev };
                        // delete newFileObj[`gig_banner_${index}`];
                        // return newFileObj;
                        // return prev;
                      });
                    }}
                    className="w-[30px] h-[30px] flex items-center justify-center bg-main_website_color_1 rounded-full cursor-pointer z-50 group"
                  >
                    <svg
                      className="w-[22px] h-[22px] fill-[rgba(255,255,255,0.45)] group-hover:fill-top_nav_second_color transition-all duration-150 ease-out"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full h-auto flex items-center justify-center">
        <Inputs_for_shop_update
          inputCoverStyle="w-full min-h-[45px] h-[120px] max-h-[120px] mt-[35px]"
          inputType="text"
          fieldName="worker_bio"
          tag="textarea"
          className="w-full h-full content-start border-main_website_color_1 border-[2px] outline-none rounded-[7px] pl-[15px] text-[18px] resize-none p-[15px]"
          inputPlaceholder="Write Your Bio (About You)"
          isRequired={true}
          inputLimit={120}
        />
      </div>
      <div className="w-full h-auto flex items-center justify-center">
        <Inputs_for_shop_update
          inputCoverStyle="w-full min-h-[45px] h-[350px] max-h-[350px] mt-[35px]"
          inputType="text"
          tag="textarea"
          fieldName="gig_desc"
          className="w-full h-full content-start border-main_website_color_1 border-[2px] outline-none rounded-[7px] pl-[15px] text-[18px] resize-none p-[15px]"
          inputPlaceholder="Write About Your Work (Complete Description)"
          isRequired={true}
          inputLimit={1000}
        />
      </div>
      <div className="w-full h-fit flex flex-col items-start justify-center gap-[10px] mt-[35px]">
        <select
          id="languageSelect"
          ref={selectLangRef}
          onChange={() => {
            setAddedLanguages((prev) => {
              let selectedLang = selectLangRef.current.value;
              if (prev.length < 5) {
                if (!prev.includes(selectedLang)) {
                  return [...prev, selectedLang];
                }
                return prev;
              }
              alert("You Can Choose Maximum 5 Languages!!");
              return prev;
            });
          }}
          className="w-[160px] h-[45px] pl-[5px] font-semibold cursor-pointer outline-none border-[2px] border-main_website_color_1 rounded-[5px]"
          defaultValue={""}
        >
          <option value="" disabled>
            Select Language
          </option>
          {context?.allHumanLanguages?.map((eachLang, index) => {
            return (
              <option
                value={eachLang}
                disabled={addedLanguages.includes(eachLang) ? true : false}
                key={index}
              >
                {eachLang}
              </option>
            );
          })}
        </select>
        <div className="w-full h-[50px] flex items-center justify-start border-[2px] rounded-[5px] px-[15px] gap-[15px]">
          {addedLanguages?.map((eachSelectedLang, index) => {
            return (
              <div
                key={index}
                className="w-fit h-[35px] border flex items-center justify-center gap-[5px] rounded-[5px]"
              >
                <span className="px-[7px] font-semibold text-main_website_color_1 text-[16px]">
                  {eachSelectedLang}
                </span>
                <span
                  onClick={() => {
                    setAddedLanguages((prev) => {
                      return prev.filter((each) => each !== eachSelectedLang);
                    });
                  }}
                  className="w-[25px] h-[25px] mr-[5px] border flex items-center justify-center cursor-pointer rounded-[3px] hover:bg-[rgba(0,0,0,0.05)] group transition-all duration-150 ease-out"
                >
                  <svg
                    className="w-[23px] h-[23px] group-hover:scale-[1.1] fill-main_website_color_1 transition-all duration-150 ease-out"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                  </svg>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <hr className="w-full h-[0.5px] bg-main_website_color_1 border-none mt-[35px]" />
      <div className="w-full h-auto mt-[35px] flex items-center justify-between gap-[15px]">
        <div className="w-full h-auto flex flex-col items-center justify-start">
          <h1 className="text-main_website_color_1 text-[22px] font-black">
            Basic
          </h1>
          <Inputs_for_shop_update
            inputCoverStyle="w-full h-[45px] mt-[25px]"
            tag="input"
            fieldName="gig_basic_plan_heading"
            inputType="text"
            className="w-full h-full border-main_website_color_1 border-[2px] outline-none rounded-[7px] pl-[15px] text-[16px]"
            inputPlaceholder="Basic Plan Heading"
            isRequired={true}
            inputLimit={50}
          />
          <Inputs_for_shop_update
            inputCoverStyle="w-full h-[45px] mt-[25px]"
            tag="input"
            inputType="text"
            fieldName="gig_basic_plan_desc"
            className="w-full h-full border-main_website_color_1 border-[2px] outline-none rounded-[7px] pl-[15px] text-[16px]"
            inputPlaceholder="Basic Plan Description"
            isRequired={true}
            inputLimit={120}
          />
          <div className="w-full h-auto flex items-center justify-center mt-[25px] gap-[15px]">
            <span className="min-h-[45px] min-w-[45px] flex items-center justify-center text-top_nav_second_color font-semibold border-[2px] rounded-[5px] bg-main_website_color_1">
              {/* <svg
                className="w-[25px] h-[25px] fill-top_nav_second_color"
                viewBox="0 0 16 16"
              >
                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
              </svg> */}
              PKR
            </span>
            <Inputs_for_shop_update
              inputCoverStyle="w-full h-[45px]"
              tag="input"
              fieldName="gig_basic_plan_price"
              inputType="number"
              className="w-full h-full border-main_website_color_1 border-[2px] outline-none rounded-[7px] pl-[15px] text-[16px]"
              inputPlaceholder="Basic Plan Pricing e.g, (130)"
              isRequired={true}
              inputLimit={5}
            />
          </div>
        </div>
        <div className="w-[2px] min-h-full bg-main_website_color_1"></div>
        <div className="w-full h-auto flex flex-col items-center justify-start">
          <h1 className="text-main_website_color_1 text-[22px] font-black">
            Standard
          </h1>
          <Inputs_for_shop_update
            inputCoverStyle="w-full h-[45px] mt-[25px]"
            tag="input"
            inputType="text"
            fieldName="gig_standard_plan_heading"
            className="w-full h-full border-main_website_color_1 border-[2px] outline-none rounded-[7px] pl-[15px] text-[16px]"
            inputPlaceholder="Standard Plan Heading"
            isRequired={true}
            inputLimit={50}
          />
          <Inputs_for_shop_update
            inputCoverStyle="w-full h-[45px] mt-[25px]"
            tag="input"
            inputType="text"
            fieldName="gig_standard_plan_desc"
            className="w-full h-full border-main_website_color_1 border-[2px] outline-none rounded-[7px] pl-[15px] text-[16px]"
            inputPlaceholder="Standard Plan Description"
            isRequired={true}
            inputLimit={120}
          />
          <div className="w-full h-auto flex items-center justify-center mt-[25px] gap-[15px]">
            <span className="min-h-[45px] min-w-[45px] flex items-center justify-center text-top_nav_second_color font-semibold border-[2px] rounded-[5px] bg-main_website_color_1">
              {/* <svg
                className="w-[25px] h-[25px] fill-top_nav_second_color"
                viewBox="0 0 16 16"
              >
                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
              </svg> */}
              PKR
            </span>
            <Inputs_for_shop_update
              inputCoverStyle="w-full h-[45px]"
              tag="input"
              inputType="number"
              fieldName="gig_standard_plan_price"
              className="w-full h-full border-main_website_color_1 border-[2px] outline-none rounded-[7px] pl-[15px] text-[16px]"
              inputPlaceholder="Standard Plan Pricing e.g, (130)"
              isRequired={true}
              inputLimit={5}
            />
          </div>
        </div>
        <div className="w-[2px] min-h-full bg-main_website_color_1"></div>
        <div className="w-full h-auto flex flex-col items-center justify-start">
          <h1 className="text-main_website_color_1 text-[22px] font-black">
            Premium
          </h1>
          <Inputs_for_shop_update
            inputCoverStyle="w-full h-[45px] mt-[25px]"
            tag="input"
            inputType="text"
            fieldName="gig_premium_plan_heading"
            className="w-full h-full border-main_website_color_1 border-[2px] outline-none rounded-[7px] pl-[15px] text-[16px]"
            inputPlaceholder="Premium Plan Heading"
            isRequired={true}
            inputLimit={50}
          />
          <Inputs_for_shop_update
            inputCoverStyle="w-full h-[45px] mt-[25px]"
            tag="input"
            inputType="text"
            fieldName="gig_premium_plan_desc"
            className="w-full h-full border-main_website_color_1 border-[2px] outline-none rounded-[7px] pl-[15px] text-[16px]"
            inputPlaceholder="Premium Plan Description"
            isRequired={true}
            inputLimit={120}
          />
          <div className="w-full h-auto flex items-center justify-center mt-[25px] gap-[15px]">
            <span className="min-h-[45px] min-w-[45px] flex items-center justify-center text-top_nav_second_color font-semibold border-[2px] rounded-[5px] bg-main_website_color_1">
              {/* <svg
                className="w-[25px] h-[25px] fill-top_nav_second_color"
                viewBox="0 0 16 16"
              >
                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
              </svg> */}
              PKR
            </span>
            <Inputs_for_shop_update
              inputCoverStyle="w-full h-[45px]"
              tag="input"
              inputType="number"
              fieldName="gig_premium_plan_price"
              className="w-full h-full border-main_website_color_1 border-[2px] outline-none rounded-[7px] pl-[15px] text-[16px]"
              inputPlaceholder="Premium Plan Pricing e.g, (130)"
              isRequired={true}
              inputLimit={5}
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[45px] flex items-center justify-between mt-[75px]">
        <button
          type="button"
          onClick={() => {
            context.uiStates.setProfileStep(2);
          }}
          className="w-[45px] h-[45px] rounded-full transition-all duration-300 ease-in-out bg-main_website_color_1 flex items-center justify-center gap-[15px] cursor-pointer hover:w-[110px] hover:px-[15px] group overflow-hidden"
        >
          <svg
            className="w-[20px] h-[20px] fill-white group-hover:w-[20px] group-hover:h-[20px] rotate-[180deg]"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
          <span className="opacity-0 w-0 transition-all duration-300 hidden ease-in-out text-[18px] text-white font-black group-hover:opacity-100 group-hover:w-[60px] group-hover:inline-block">
            Back
          </span>
        </button>
        <button
          type="submit"
          className=" h-[45px] rounded-full transition-all duration-300 ease-in-out bg-main_website_color_1 cursor-pointer w-[110px] overflow-hidden text-top_nav_second_color font-black text-[18px]"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

// Requirements

//? User Shop Main Heading max(80)
//? user Shop Images Max (4) Min (1)
//? About Worker Disc max (700)
//? User Country
//? Languages
//? User Bio Max(120)
//? User Basic Plan Heading max(40)
//? User Basic Plan Disc max(80)
//? User Basic Plan Price max(20)
//? User Standard Plan Heading max(40)
//? User Standard Plan Disc max(80)
//? User Standard Plan Price max(20)
//? User Premium Plan Heading max(40)
//? User Premium Plan Disc max(80)
//? User Premium Plan Price max(20)
