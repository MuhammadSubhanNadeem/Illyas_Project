import React, { useContext, useEffect, useState } from "react";
import { Main_context } from "../../../stores/main_store/main_store";
// import defaultImage from "../../../assets/images/hire/bike_repairing.jpg";
import defaultDp from "../../../assets/images/default_Images/defaultPic_cropped.webp"
import { Edit_shop_data_form } from "./update_shop_data_form/edit_shop_data_form";
export function Create_final_gig() {
  let context = useContext(Main_context);
  let [pricingBoxState, setPricingBoxState] = useState(1);
  let [updateShopData, setUpdateShopData] = useState(false);
  useEffect(() => {
    console.log(context.uiStates.workerProfileData.gig_imgs.gig_banners[0]);
  }, []);
  return (
    <>
      <div className="relative w-full h-full flex items-center justify-center px-[75px] gap-[75px]">
        <button
          type="button"
          onClick={() => {
            setUpdateShopData((prev) => !prev);
          }}
          title="Change Your Work Shop Info"
          className="w-fit p-[5px] border-[1px] border-top_nav_second_color rounded-full text-[rgba(255,255,255,0.75)] font-bold cursor-pointer hover:bg-top_nav_second_color hover:text-main_website_color_1 flex items-center justify-center gap-[10px] transition-all duration-200 ease-out"
        >
          <span className="w-[40px] h-[40px] flex items-center justify-center bg-main_website_color_2 border-[1px] border-top_nav_second_color rounded-full">
            <svg
              className="w-[18px] h-[18px] fill-top_nav_second_color"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
            </svg>
          </span>
          <span className="w-fit h-fit pr-[15px]">Update Workshop Data</span>
        </button>
      </div>
      <div className="relative w-full h-full flex items-start justify-between px-[75px] gap-[75px]">
        {updateShopData ? <Edit_shop_data_form showForm = {setUpdateShopData} /> : null}
        <div className="w-[60%] h-auto flex flex-col">
          <h1 className="w-full h-fit line-clamp-2 overflow-ellipsis text-top_nav_second_color font-bold text-[24px] ">
            {/* I will clone, create, design or redesign webflow website. */}
            {context.uiStates.workerProfileData.gig_title}
          </h1>
          <div className="w-full h-[55px] mt-[25px] flex items-center justify-start gap-[15px]">
            <span className="w-[55px] h-[55px] inline-block rounded-full overflow-hidden">
              <img
                src={context.account.userDp === "" ? defaultDp : context.account.userDp}
                className="w-full h-full object-center object-cover"
                alt="Worker Dp"
              />
            </span>
            <div className="w-fit h-full flex flex-col items-start justify-center">
              <span className="w-fit h-full text-center content-center transition-all duration-75 ease-in inline-block font-bold text-top_nav_second_color hover:underline hover:decoration-2 cursor-pointer opacity-[0.75] hover:opacity-[1]">
                {context.account.user_name}
              </span>
              {/* <span className="text-[14px] text-top_nav_second_color flex items-center justify-start gap-[10px]">
                <span className="w-fit h-fit flex items-center justify-start gap-[5px]">
                  <svg
                    className="w-[15px] h-[15px] fill-top_nav_second_color"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg
                    className="w-[15px] h-[15px] fill-top_nav_second_color"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg
                    className="w-[15px] h-[15px] fill-top_nav_second_color"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg
                    className="w-[15px] h-[15px] fill-top_nav_second_color"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg
                    className="w-[15px] h-[15px] fill-top_nav_second_color"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                </span>
                <span className="text-[14px] text-top_nav_second_color flex items-center justify-start gap-[8px] font-semibold opacity-[0.45] cursor-pointer hover:opacity-[1] hover:underline hover:decoration-1">
                  (4.5 Rating)
                </span>
              </span> */}
            </div>
          </div>
          <div className="w-full h-fit flex flex-col items-start justify-start mt-[25px]">
            <div className="relative w-full h-[429px] flex items-start justify-start rounded-[5px] overflow-hidden bg-main_website_color_1 group">
              <div className="absolute top-[50%] -left-[50px] -translate-y-[50%] w-[40px] h-[40px] bg-top_nav_second_color rounded-full flex items-center justify-center cursor-pointer group-hover:left-[5px] transition-all duration-150 ease-in z-20">
                <svg
                  className="w-[22px] h-[22px] fill-main_website_color_1"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                  />
                </svg>
              </div>
              <div className="absolute top-[50%] -right-[50px] -translate-y-[50%] w-[40px] h-[40px] bg-top_nav_second_color rounded-full flex items-center justify-center cursor-pointer group-hover:right-[5px] transition-all duration-150 ease-out z-20">
                <svg
                  className="w-[22px] h-[22px] fill-main_website_color_1 rotate-[180deg]"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                  />
                </svg>
              </div>
              <div className="w-full h-full flex items-center justify-center bg-main_website_color_1">
                {context?.uiStates?.workerProfileData?.gig_imgs?.gig_banners
                  .length > 0 ? (
                  context?.uiStates?.workerProfileData?.gig_imgs?.gig_banners.map(
                    (eachImgUrl, index) => {
                      console.log(eachImgUrl);

                      return (
                        <img
                          key={index}
                          src={eachImgUrl || undefined}
                          className="min-w-full min-h-full object-cover object-center flex items-center justify-center"
                          alt="Gig Banner 1"
                        />
                      );
                    }
                  )
                ) : (
                  <>
                    <div className="text-top_nav_second_color text-[36px] font-bold">
                      Upload Your Images
                    </div>
                  </>
                )}
              </div>
              {/* <img
                src={defaultImage}
                className="min-w-full min-h-full object-cover object-center flex items-center justify-center"
                alt="Gig Banner 4"
              /> */}
            </div>
            <div className="w-full h-[75px] flex items-center justify-start mt-[15px] gap-[5px]">
              {context?.uiStates?.workerProfileData?.gig_imgs?.gig_banners
                .length > 0
                ? context?.uiStates?.workerProfileData?.gig_imgs?.gig_banners.map(
                    (eachImgUrl, index) => {
                      return (
                        <img
                          key={index}
                          src={eachImgUrl || undefined}
                          className="w-auto h-[75px] object-cover object-center flex items-center justify-center cursor-pointer opacity-[0.6] grayscale-[0.2] hover:grayscale-[0.2] hover:scale-[1.125] hover:z-10 hover:opacity-[0.85] transition-all duration-100 ease-out"
                          alt={`Gig Banner ${index}`}
                        />
                      );
                    }
                  )
                : null}
            </div>
          </div>
          <hr className="w-full h-[2px] bg-top_nav_second_color my-[55px]" />
          <div className="flex flex-col items-start justify-start gap-[25px]">
            <h3 className="w-fit h-fit font-bold text-[22px] text-top_nav_second_color">
              About this Worker
            </h3>
            <p className="w-full min-h-max text-[rgba(255,255,255,0.75)] whitespace-pre-line">
              {/* {`Welcome to my Webflow Website Development Gig!



Are you seeking a stunning, user-friendly website built on the Webflow platform? Look no further! I specialize in crafting bespoke websites tailored to your unique needs and preferences.



With 3.5 years of experience in Webflow development, I offer comprehensive services to bring your vision to life. Whether you're a startup, small business, or creative professional, I'll create a website that not only showcases your brand but also drives results.



Here's what you can expect from my Webflow development services:



. Custom Design
. Responsive Web Design
. User-friendly Navigation
. Custom Features and Functionality
. Search Engine Optimization (SEO)
. Speed Optimization
. Ongoing Support and Maintenance
. Cross-browser Compatibility
. Integration with Third-party Services
. Custom Content Management System (CMS)
. Interactive Elements and Animations
. Compliance with Web Standards
. Scalability and Future-proofing
. Testimonials and Reviews


Get in touch today to get started on your journey to a stunning and effective website with Webflow





#webflow expert #webflow developer #webflow design #webflow development`} */}
              {context?.uiStates?.workerProfileData?.gig_description}
            </p>
          </div>
          <hr className="w-full h-[2px] bg-top_nav_second_color my-[25px]" />
          <div className="w-full h-fit flex flex-col items-start justify-start gap-[25px]">
            <div className="w-full h-auto">
              <h3 className="w-fit h-fit text-top_nav_second_color text-[21px] font-bold">
                Get to know {context?.uiStates?.workerProfileData?.username}
              </h3>
              <div className="w-full h-[95px] mt-[25px] flex items-center justify-start gap-[15px]">
                <span className="w-[95px] h-[95px] inline-block rounded-full overflow-hidden">
                  <img
                    src={context.account.userDp || defaultDp}
                    className="w-full h-full object-center object-cover"
                    alt="Worker Dp"
                  />
                </span>
                <div className="w-fit h-[85%] flex flex-col items-start justify-between">
                  <span className="w-fit h-fit text-center text-[17px] content-center transition-all duration-75 ease-in inline-block font-bold text-top_nav_second_color hover:underline hover:decoration-2 cursor-pointer">
                    {context?.uiStates?.workerProfileData?.username}
                  </span>
                  <span className="text-[rgba(255,255,255,0.5)] w-[220px] overflow-hidden overflow-ellipsis text-nowrap text-[16px]">
                    {context?.uiStates?.workerProfileData?.gig_title}
                  </span>
                  {/* <span className="text-[14px] text-top_nav_second_color flex items-center justify-start gap-[10px]">
                    <span className="w-fit h-fit flex items-center justify-start gap-[5px]">
                      <svg
                        className="w-[15px] h-[15px] fill-top_nav_second_color"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      <svg
                        className="w-[15px] h-[15px] fill-top_nav_second_color"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      <svg
                        className="w-[15px] h-[15px] fill-top_nav_second_color"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      <svg
                        className="w-[15px] h-[15px] fill-top_nav_second_color"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      <svg
                        className="w-[15px] h-[15px] fill-top_nav_second_color"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    </span>
                    <span className="text-[14px] text-top_nav_second_color flex items-center justify-start gap-[8px] font-semibold opacity-[0.45] cursor-pointer hover:opacity-[1] hover:underline hover:decoration-1">
                      (4.5 Rating)
                    </span>
                  </span> */}
                </div>
              </div>
            </div>
            <button
              type="button"
              className="py-[10px] px-[20px] text-top_nav_second_color font-semibold cursor-pointer border-[1px] border-top_nav_second_color rounded-[10px] hover:bg-[rgba(255,255,255,0.06)] transition-all duration-75 ease-out"
            >
              Contact me
            </button>
            <div className="w-full h-auto border-[1px] border-[rgba(255,255,255,0.45)] p-[25px] flex flex-col items-center justify-center rounded-[5px]">
              <div className="w-full h-full flex items-start justify-between">
                <div className="w-[50%] h-auto flex flex-col gap-[25px] items-start justify-start">
                  <div className="w-fit h-fit flex flex-col gap-[5px]">
                    <span className="text-[rgba(255,255,255,0.6)] text-[16px]">
                      From
                    </span>
                    <span className="text-[rgba(255,255,255,0.75)] text-[16px] font-bold">
                      Pakistan
                    </span>
                  </div>
                  <div className="w-fit h-fit flex flex-col gap-[5px]">
                    <span className="text-[rgba(255,255,255,0.6)] text-[16px]">
                      Total Completed Orders
                    </span>
                    <span className="text-[rgba(255,255,255,0.75)] text-[16px] font-bold">
                      15+
                    </span>
                  </div>
                  <div className="w-fit h-fit flex flex-col gap-[5px]">
                    <span className="text-[rgba(255,255,255,0.6)] text-[16px]">
                      Languages
                    </span>
                    <span className="text-[rgba(255,255,255,0.75)] text-[16px] font-bold">
                      {context?.uiStates?.workerProfileData?.gig_langs.map(
                        (each, index) => {
                          return context?.uiStates?.workerProfileData?.gig_langs
                            .length ===
                            index + 1
                            ? `${each}`
                            : `${each} , `;
                        }
                      )}
                    </span>
                  </div>
                </div>
                <div className="w-[50%] h-auto flex flex-col gap-[25px] items-start justify-start">
                  <div className="w-fit h-fit flex flex-col gap-[5px]">
                    <span className="text-[rgba(255,255,255,0.6)] text-[16px]">
                      Member since
                    </span>
                    <span className="text-[rgba(255,255,255,0.75)] text-[16px] font-bold">
                      Feb 2024
                    </span>
                  </div>
                  <div className="w-fit h-fit flex flex-col gap-[5px]">
                    <span className="text-[rgba(255,255,255,0.6)] text-[16px]">
                      Last delivery
                    </span>
                    <span className="text-[rgba(255,255,255,0.75)] text-[16px] font-bold">
                      2 months
                    </span>
                  </div>
                </div>
              </div>
              <hr className="w-full h-[1px] bg-[rgba(255,255,255,0.45)] border-none my-[25px]" />
              <div>
                <p className="text-[rgba(255,255,255,0.6)] text-start">
                  {context?.uiStates?.workerProfileData?.worker_bio}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="sticky top-[35px] right-0 w-[40%] h-fit flex flex-col items-end justify-start gap-[15px]">
          <div className="w-full max-w-[460px] h-fit flex flex-col items-center justify-start">
            <div className="w-full h-[55px] flex items-center justify-between border-[1px]  border-[rgba(255,255,255,0.45)]">
              <span
                className={`w-full h-full text-[16px] font-bold text-top_nav_second_color text-center content-center inline-block ${
                  pricingBoxState === 1
                    ? "border-b-[3px] border-top_nav_second_color bg-main_website_color_1"
                    : "bg-main_website_color_2 border-none"
                } cursor-pointer select-none`}
                onClick={() => setPricingBoxState(1)}
              >
                Basic
              </span>
              <div className="w-[1px] h-full bg-[rgba(255,255,255,0.45)]"></div>
              <span
                className={`w-full h-full text-[16px] font-bold text-top_nav_second_color text-center content-center inline-block ${
                  pricingBoxState === 2
                    ? "border-b-[3px] border-top_nav_second_color bg-main_website_color_1"
                    : "bg-main_website_color_2 border-none"
                } cursor-pointer select-none`}
                onClick={() => setPricingBoxState(2)}
              >
                Standard
              </span>
              <div className="w-[1px] h-full bg-[rgba(255,255,255,0.45)]"></div>
              <span
                className={`w-full h-full text-[16px] font-bold text-top_nav_second_color text-center content-center inline-block ${
                  pricingBoxState === 3
                    ? "border-b-[3px] border-top_nav_second_color bg-main_website_color_1"
                    : "bg-main_website_color_2 border-none"
                } cursor-pointer select-none`}
                onClick={() => setPricingBoxState(3)}
              >
                Premium
              </span>
            </div>
            <div className="w-full h-full flex flex-col items-center justify-start p-[20px] border-[rgba(255,255,255,0.45)] border-[1px] border-t-0">
              <div className="w-full h-fit flex items-center justify-between gap-[25px] mt-[10px]">
                <h3
                  className="w-full h-fit max-h-fit line-clamp-2 text-[18px] font-bold text-top_nav_second_color overflow-ellipsis"
                  title={
                    pricingBoxState === 1
                      ? context?.uiStates?.workerProfileData?.gig_basic_title
                      : pricingBoxState === 2
                      ? context?.uiStates?.workerProfileData?.gig_standard_title
                      : context?.uiStates?.workerProfileData?.gig_premium_title
                  }
                >
                  {pricingBoxState === 1
                    ? context?.uiStates?.workerProfileData?.gig_basic_title
                    : pricingBoxState === 2
                    ? context?.uiStates?.workerProfileData?.gig_standard_title
                    : context?.uiStates?.workerProfileData?.gig_premium_title}
                </h3>
                <h6
                  className="flex items-center justify-center gap-[10px] cursor-default"
                  title={
                    pricingBoxState === 1
                      ? context?.uiStates?.workerProfileData?.gig_basic_price
                      : pricingBoxState === 2
                      ? context?.uiStates?.workerProfileData?.gig_standard_price
                      : context?.uiStates?.workerProfileData?.gig_premium_price
                  }
                >
                  <strong className="text-[22px] font-semibold text-top_nav_second_color">
                    PKR
                  </strong>
                  <span className="text-[22px] font-semibold text-top_nav_second_color">
                    {pricingBoxState === 1
                      ? context?.uiStates?.workerProfileData?.gig_basic_price
                      : pricingBoxState === 2
                      ? context?.uiStates?.workerProfileData?.gig_standard_price
                      : context?.uiStates?.workerProfileData?.gig_premium_price}
                  </span>
                </h6>
              </div>
              <div
                className="w-full  h-fit line-clamp-3 overflow-ellipsis text-[17px] text-[rgba(255,255,255,0.55)] mt-[10px] pr-[25px]"
                title={
                  pricingBoxState === 1
                    ? context?.uiStates?.workerProfileData?.gig_basic_desc
                    : pricingBoxState === 2
                    ? context?.uiStates?.workerProfileData?.gig_standard_desc
                    : context?.uiStates?.workerProfileData?.gig_premium_desc
                }
              >
                {pricingBoxState === 1
                  ? context?.uiStates?.workerProfileData?.gig_basic_desc
                  : pricingBoxState === 2
                  ? context?.uiStates?.workerProfileData?.gig_standard_desc
                  : context?.uiStates?.workerProfileData?.gig_premium_desc}
              </div>
              <div className="w-full h-[40px] flex items-center justify-center mt-[35px]">
                <button
                  type="button"
                  className="relative w-full h-full bg-top_nav_second_color rounded-[5px] text-[18px] text-main_website_color_1 font-black cursor-pointer hover:opacity-[0.9] transition-all duration-75 ease-in"
                >
                  Order Now
                  <svg
                    className="absolute w-[20px] h-[20px] top-[50%] right-[15px] -translate-y-[50%] ml-[10px] fill-main_website_color_1"
                    viewBox="0 0 16 16"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                      strokeWidth="1"
                      stroke="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-full h-fit bg-[rgba(255,255,255,0.025)] p-[20px] mt-[15px] rounded-[10px]">
              <button
                type="button"
                className="w-full h-[40px] border-top_nav_second_color border-[1px] rounded-[5px] text-top_nav_second_color text-[16px] transition-all duration-150 font-semibold cursor-pointer hover:bg-top_nav_second_color hover:text-main_website_color_1 hover:font-bold"
              >
                Contact me
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}