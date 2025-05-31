import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Main_context } from "../../stores/main_store/main_store";
import { Footer } from "../Footer/footer";
import defaultImg from "../../../src/assets/images/default_Images/defaultPic_cropped.webp";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/loading";
import { Inputs_for_shop_update } from "./../become_worker/profile_steps/update_shop_data_form/inputs_for_shop_update";
export const WorkerProfile = () => {
  const navigate = useNavigate();
  const orderProposalFormRef = useRef(null);
  const context = useContext(Main_context);
  let [shareProfileHover, setShareProfileHover] = useState(false);
  let [workerData, setWorkerData] = useState({});
  let [order, setOrder] = useState({ status: false, orderType: "" });
  let [pricingBoxState, setPricingBoxState] = useState(1);
  useEffect(() => {
    setOrder((prev) => {
      return {
        ...prev,
        orderType:
          pricingBoxState === 1
            ? "Basic Plan"
            : pricingBoxState === 2
            ? "Standard Plan"
            : "Premium Plan",
      };
    });
  }, [pricingBoxState]);
  const { workerId } = useParams();
  async function workerProfileData(Id) {
    try {
      let response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/specific_worker_profile_data?workerId=${Id}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  let { data, isLoading, isSuccess } = useQuery({
    queryKey: [workerId],
    queryFn: () => {
      return workerProfileData(workerId);
    },
  });
  useEffect(() => {
    console.log(data?.workerData);
    console.log(workerData.username);
    setWorkerData(() => {
      if (data?.workerData) {
        return { ...data?.workerData };
      }
      return {};
    });
  }, [data?.workerData]);
  useEffect(() => {
    console.log(workerData);
  }, [workerData]);
  async function orderProposalHandler(defs) {
    defs.preventDefault();
    context.uiStates.setLoadingState(true);
    let orderFromDataRaw = new FormData(orderProposalFormRef.current);
    let orderFromData = {};
    orderFromData["orderType"] = order.orderType;
    orderFromData["orderTo"] = workerId;
    orderFromDataRaw.entries().forEach((entry) => {
      orderFromData[entry[0]] = entry[1];
    });
    console.log(orderFromData);
    let response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/order_proposal`,
      orderFromData,
      {
        withCredentials: true,
      }
    );
    console.log(response);
    if (response.data.status) {
      setOrder((prev) => {
        return { ...prev, status: false };
      });
      navigate("/order");
    } else {
      alert("Proposal Not Send, Please try again later.");
    }
    context.uiStates.setLoadingState(false);
  }
  return (
    <>
      <section className="w-full h-auto min-h-[780px] border-[5px] border-red-400 bg-main_website_color_2 flex items-start justify-center pb-[65px]">
        {isLoading || context.uiStates.loadingState ? (
          <Loading loadingMessage="Loading..." />
        ) : null}
        <div className="w-full max-w-[1440px] h-full py-[25px] flex flex-col items-center justify-start gap-[35px]">
          <div className="w-full h-fit px-[75px] flex items-center justify-end">
            <span
              title="Copy Worker Profile Url"
              className="w-[50px] h-[50px] border-[0.5px] flex items-center justify-center duration-150 ease-in border-top_nav_second_color rounded-full cursor-pointer hover:bg-main_website_color_1 group"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(window.location.href);
                  alert("URL Copied Successfully.");
                } catch (err) {
                  console.error("Failed to copy:", err);
                }
              }}
              onMouseEnter={() => {
                console.log(window.location.href);
                setShareProfileHover(true);
              }}
              onMouseLeave={() => {
                setShareProfileHover(false);
              }}
            >
              <svg
                className="w-[26px] h-[26px] fill-top_nav_second_color group-hover:rotate-[-35deg] duration-75 ease-in"
                viewBox="0 0 16 16"
              >
                <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
              </svg>
            </span>
          </div>
          <div className="relative w-full h-full flex items-start justify-between px-[75px] gap-[75px]">
            <div className="w-[60%] h-auto flex flex-col">
              <h1 className="w-full h-fit line-clamp-2 overflow-ellipsis text-top_nav_second_color font-bold text-[24px] ">
                {workerData.gig_title}
              </h1>
              <div className="w-full h-[55px] mt-[25px] flex items-center justify-start gap-[15px]">
                <span className="w-[55px] h-[55px] inline-block rounded-full overflow-hidden">
                  <img
                    src={
                      workerData?.workerDp
                        ? `https://res.cloudinary.com/dgazver6h/image/upload/userDp/${workerData?.workerDp}`
                        : defaultImg
                    }
                    className="w-full h-full object-center object-cover"
                    alt="Worker Dp"
                  />
                </span>
                <div className="w-fit h-full flex flex-col items-start justify-center">
                  <span className="w-fit h-full text-center content-center transition-all duration-75 ease-in inline-block font-bold text-top_nav_second_color hover:underline hover:decoration-2 cursor-pointer opacity-[0.75] hover:opacity-[1]">
                    {workerData.username}
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
                    {workerData.gig_imgs?.gig_banners?.length > 0 &&
                    workerData.gig_imgs.gig_banners.some((url) =>
                      url?.trim()
                    ) ? (
                      workerData.gig_imgs.gig_banners
                        .filter((url) => url?.trim())
                        .map((eachImgUrl, index) => (
                          <img
                            key={index}
                            src={`https://res.cloudinary.com/dgazver6h/image/upload/worker_profile_imgs/${eachImgUrl}`}
                            className="min-w-full min-h-full object-cover object-center flex items-center justify-center"
                            alt={`Gig Banner ${index}`}
                          />
                        ))
                    ) : (
                      <div className="text-top_nav_second_color text-[36px] font-bold">
                        Upload Your Images
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full h-[75px] flex items-center justify-start mt-[15px] gap-[5px]">
                  {workerData.gig_imgs?.gig_banners?.length > 0 &&
                    workerData.gig_imgs.gig_banners.map((eachImgUrl, index) =>
                      eachImgUrl ? (
                        <img
                          key={index}
                          src={`https://res.cloudinary.com/dgazver6h/image/upload/worker_profile_imgs/${eachImgUrl}`}
                          className="w-auto h-[75px] object-cover object-center flex items-center justify-center cursor-pointer opacity-[0.6] grayscale-[0.2] hover:grayscale-[0.2] hover:scale-[1.125] hover:z-10 hover:opacity-[0.85] transition-all duration-100 ease-out"
                          alt={`Gig Banner ${index}`}
                        />
                      ) : null
                    )}
                </div>
              </div>
              <hr className="w-full h-[2px] bg-top_nav_second_color my-[55px]" />
              <div className="flex flex-col items-start justify-start gap-[25px]">
                <h3 className="w-fit h-fit font-bold text-[22px] text-top_nav_second_color">
                  About this Worker
                </h3>
                <p className="w-full min-h-max text-[rgba(255,255,255,0.75)] whitespace-pre-line">
                  {workerData.gig_description}
                </p>
              </div>
              <hr className="w-full h-[2px] bg-top_nav_second_color my-[25px]" />
              <div className="w-full h-fit flex flex-col items-start justify-start gap-[25px]">
                <div className="w-full h-auto">
                  <h3 className="w-fit h-fit text-top_nav_second_color text-[21px] font-bold">
                    Get to know {workerData.username}
                  </h3>
                  <div className="w-full h-[95px] mt-[25px] flex items-center justify-start gap-[15px]">
                    <span className="w-[95px] h-[95px] inline-block rounded-full overflow-hidden">
                      {workerData?.workerDp ? (
                        <img
                          src={`https://res.cloudinary.com/dgazver6h/image/upload/userDp/${workerData?.workerDp}`}
                          className="w-full h-full object-center object-cover"
                          alt="Worker Dp"
                        />
                      ) : (
                        <img
                          src={defaultImg}
                          className="w-full h-full object-center object-cover"
                          alt="Worker Dp"
                        />
                      )}
                    </span>
                    <div className="w-fit h-[85%] flex flex-col items-start justify-between">
                      <span className="w-fit h-fit text-center text-[17px] content-center transition-all duration-75 ease-in inline-block font-bold text-top_nav_second_color hover:underline hover:decoration-2 cursor-pointer">
                        {workerData.username}
                      </span>
                      <span className="text-[rgba(255,255,255,0.5)] w-[220px] overflow-hidden overflow-ellipsis text-nowrap text-[16px]">
                        {workerData.gig_title}
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
                  onClick={() => navigate(`/messages/${workerId}`)}
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
                          {workerData?.gig_langs?.map((each, index) => {
                            return workerData?.gig_langs.length === index + 1
                              ? `${each}`
                              : `${each} , `;
                          })}
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
                      {workerData.worker_bio}
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
                          ? workerData?.gig_basic_title
                          : pricingBoxState === 2
                          ? workerData?.gig_standard_title
                          : workerData?.gig_premium_title
                      }
                    >
                      {pricingBoxState === 1
                        ? workerData.gig_basic_title
                        : pricingBoxState === 2
                        ? workerData?.gig_standard_title
                        : workerData?.gig_premium_title}
                    </h3>
                    <h6
                      className="flex items-center justify-center gap-[10px] cursor-default"
                      title={
                        pricingBoxState === 1
                          ? workerData?.gig_basic_price
                          : pricingBoxState === 2
                          ? workerData?.gig_standard_price
                          : workerData?.gig_premium_price
                      }
                    >
                      <strong className="text-[22px] font-semibold text-top_nav_second_color">
                        PKR
                      </strong>
                      <span className="text-[22px] font-semibold text-top_nav_second_color">
                        {pricingBoxState === 1
                          ? workerData?.gig_basic_price
                          : pricingBoxState === 2
                          ? workerData?.gig_standard_price
                          : workerData?.gig_premium_price}
                      </span>
                    </h6>
                  </div>
                  <div
                    className="w-full  h-fit line-clamp-3 overflow-ellipsis text-[17px] text-[rgba(255,255,255,0.55)] mt-[10px] pr-[25px]"
                    title={
                      pricingBoxState === 1
                        ? workerData.gig_basic_desc
                        : pricingBoxState === 2
                        ? workerData?.gig_standard_desc
                        : workerData.gig_premium_desc
                    }
                  >
                    {pricingBoxState === 1
                      ? workerData.gig_basic_desc
                      : pricingBoxState === 2
                      ? workerData.gig_standard_desc
                      : workerData.gig_premium_desc}
                  </div>
                  <div className="w-full h-[40px] flex items-center justify-center mt-[35px]">
                    <button
                      type="button"
                      onClick={() => {
                        if(context.account.login || context.account.signup) {
                          setOrder((prev) => {
                            return { ...prev, status: true };
                          });
                        } else{
                          navigate('/login');
                        }
                      }}
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
                    onClick={() => {
                      navigate(`/messages/${workerId}`);
                    }}
                  >
                    Contact me
                  </button>
                </div>
              </div>
            </div>
          </div>
          {order.status ? (
            <form
              ref={orderProposalFormRef}
              className="absolute z-50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[460px] h-fit flex flex-col items-start justify-center p-[25px] rounded-[8px] bg-main_website_color_2 shadow-2xl border-[2px] border-main_website_color_1"
              // method="POST"
              // action="#"
              onSubmit={orderProposalHandler}
            >
              <div className="w-full h-fit text-[22px] font-bold text-top_nav_second_color mb-[5px]">
                {order.orderType}
              </div>
              <div
                className="absolute top-[15px] right-[15px] w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[rgba(0,0,0,0.1)] cursor-pointer"
                onClick={() => {
                  setOrder((prev) => {
                    return { ...prev, status: false };
                  });
                }}
              >
                <svg
                  className="w-[28px] h-[28px] fill-top_nav_second_color/70"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </div>
              <div className="w-[70%] h-fit text-[rgba(255,255,255,0.75)] mb-[25px] text-[16px]">
                Fill Guidelines & Send Proposal to{" "}
                <strong>{workerData.username}</strong>
              </div>
              <div className="w-full h-fit">
                <Inputs_for_shop_update
                  tag="textarea"
                  inputType="text"
                  fieldName="orderDescription"
                  inputPlaceholder="Write GuidLines For Worker"
                  isRequired={true}
                  inputLimit="150"
                  className="w-full max-w-[420px] h-[120px] outline-none border-[1px] border-top_nav_second_color resize-none rounded-[5px] px-[8px] py-[10px] text-white"
                />
              </div>
              <div className="w-full h-fit mt-[35px] flex items-center justify-between">
                <div className="w-[calc(100%-180px)] h-full flex items-center justify-center">
                  <h1 className="text-[18px] font-bold text-top_nav_second_color">
                    Project Price
                  </h1>
                </div>
                <Inputs_for_shop_update
                  tag="input"
                  inputType="number"
                  fieldName="orderPrice"
                  inputPlaceholder="Price e.g, (150)"
                  inputLimit="10"
                  isRequired={true}
                  className="w-full max-w-[180px] h-fit outline-none pl-[15px] border-[1px] border-top_nav_second_color resize-none rounded-[5px] px-[8px] py-[10px] text-white"
                />
                {/* <input type="text" required={true} /> */}
              </div>
              <div className="w-full h-fit mt-[35px] flex items-center justify-end">
                <button
                  type="submit"
                  title="Send Proposal To Worker"
                  className="bg-top_nav_second_color px-[20px] py-[6px] rounded-[5px] font-black text-main_website_color_1 cursor-pointer"
                >
                  Send Proposal
                </button>
              </div>
            </form>
          ) : null}
        </div>
      </section>
      <Footer />
    </>
  );
};

// let data = {
//   dob: "2005-11-12T00:00:00.000Z",
//   education: {
//     edu_class: "BS Qualification (14 or 16 Year Education)",
//     edu_from: "2025-03-04",
//     edu_to: "2025-03-29",
//   },
//   experience: 0.5,
//   gender: "male",
//   gig_basic_desc: "This is My Basic Plan Description",
//   gig_basic_price: "8",
//   gig_basic_title: "This is My Basic Plan Title",
//   gig_data_steps: 0,
//   gig_description:
//     "I will do Web Developing On This Website & This is My Description",
//   gig_imgs: {
//     cnic_front:
//       "1854a4a8ebab12391f9cd06d-A professional person sit…at and clean, with a blurry background, realistic",
//     cnic_back: "82fdf7c2ffae95c8c5399271-img_3",
//     gig_banners: [],
//   },
//   gig_langs: (3)[("Urdu", "English", "Hindi")],
//   gig_live: true,
//   gig_premium_desc: "This is My Premium Plan Description",
//   gig_premium_price: "16",
//   gig_premium_title: "This is My Premium Plan Title",
//   gig_standard_desc: "This is My Standard Plan Description",
//   gig_standard_price: "12",
//   gig_standard_title: "This is My Standard Plan Title",
//   gig_title: "I will do Web Developing On This Website & This is My Title",
//   phoneNumber: 3079237750,
//   profession: "Web Developer",
//   social_link: {
//     LinkedIn: "https://Suabhan",
//     Instagram: "https://Suabs",
//     Github: "https://Suabs",
//     Whatsapp: "",
//   },
//   useremail: "sn9273671@gmail.com",
//   username: "F23BSEEN1E02188",
//   worker_bio: "I will do Web Developing On This Website & This is My Bio",
//   __v: 0,
//   _id: "67ddaf8877190d3a3826c194",
// };
