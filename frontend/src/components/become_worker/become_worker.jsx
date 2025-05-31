import { useContext, useEffect, useRef, useState } from "react";
import { Footer } from "../Footer/footer";
import { motion } from "motion/react";
import { Personal_info } from "./profile_steps/personal_info";
import { Skill_education_info } from "./profile_steps/skill_education_info";
import NotFount from "../../assets/animations/lottie/not_found_icon.json";
import { Additional_info } from "./profile_steps/additional_info";
import axios from "axios";
import { z } from "zod";
import { Create_final_gig } from "./profile_steps/create_final_gig";
import { Main_context } from "../../stores/main_store/main_store";
import Loading from "../Loading/loading";
import Lottie from "lottie-react";
import { useNavigate } from "react-router";

export function Become_Worker() {
  let context = useContext(Main_context);
  const navigator = useNavigate();
  const [stepBarWidth, setStepBarWidth] = useState(0);
  const not_found_anim_ref = useRef(null);
  const totalStepsRef = useRef([]);
  const stepProgBar = useRef(null);
  const profileStepWidthBarHandler = 33.333333;
  function setStepRefs(ref) {
    totalStepsRef.current.push(ref);
  }
  let workerProfileRequest = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/worker_profile/`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  useEffect(() => {
    let animationInterval;
    if (not_found_anim_ref.current) {
      not_found_anim_ref.current.play();
      animationInterval = setInterval(() => {
        not_found_anim_ref.current.goToAndPlay(0);
      }, 12000);
    }
    return () => {
      clearInterval(animationInterval);
    };
  }, []);
  useEffect(() => {
    for (let i = 0; i < context.uiStates.profileStep; i++) {
      // totalStepsRef.current[i].classList.remove("bg-main_website_color_2");
      // totalStepsRef.current[i].classList.add("bg-top_nav_second_color");
    }
    setStepBarWidth(
      context.uiStates.profileStep <= 4
        ? profileStepWidthBarHandler *
            Math.max(0, context.uiStates.profileStep - 1)
        : stepBarWidth
    );
  }, [context.uiStates.profileStep]);
  function workProfileFormHandler(defs) {
    defs.preventDefault();
    context?.uiStates?.setLoadingState(true);
    let IMAGE_FORMATE = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/PNG",
      "image/JPG",
      "image/JPEG",
    ];
    let IMAGE_SIZE = 2 * 1024 * 1024;
    let step1FormDataRaw = new FormData(defs.currentTarget);
    let step1FormData = Object.entries(Object.fromEntries(step1FormDataRaw));
    if (context.uiStates.profileStep === 0) {
      step1FormDataRaw.append("step", context.uiStates.profileStep);
      let finalFilteredJsonData = {};
      step1FormData.forEach((data) => {
        finalFilteredJsonData[`${data[0]}`] = data[1];
      });
      let formValidatorSchema = z.object({
        username: z.string().min(3, { message: "Username is too short" }),
        gender: z.string(),
        phoneNumber: z
          .string()
          .length(11, { message: "Phone Number must be 11 digits" })
          .regex(/^\d{11}$/, {
            message: "Phone Number must have exactly 11 digits",
          }),

        dob: z.coerce.date({ message: "Invalid Date Format" }),

        cnic_front: z
          .any()
          .refine(
            (rawFile) =>
              rawFile && typeof rawFile === "object" && "size" in rawFile,
            {
              message: "Invalid File",
            }
          )
          .refine((rawFile) => IMAGE_FORMATE.includes(rawFile.type), {
            message: "Invalid File Format",
          })
          .refine((rawFile) => rawFile.size < IMAGE_SIZE, {
            message: "File Size is too large. File must be under 2MB",
          }),

        cnic_back: z
          .any()
          .refine(
            (rawFile) =>
              rawFile && typeof rawFile === "object" && "size" in rawFile,
            {
              message: "Invalid File",
            }
          )
          .refine((rawFile) => IMAGE_FORMATE.includes(rawFile.type), {
            message: "Invalid File Format",
          })
          .refine((rawFile) => rawFile.size < IMAGE_SIZE, {
            message: "File Size is too large. File must be under 2MB",
          }),
      });
      console.log(finalFilteredJsonData);

      let validatedData = formValidatorSchema.safeParse(finalFilteredJsonData);
      console.log(validatedData);

      if (validatedData.success && validatedData?.data) {
        workerProfileRequest
          .post("/", step1FormDataRaw, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            console.log(response);

            if (response?.data?.dataSet && response?.data?.data) {
              context.uiStates.setProfileStep(1);
              context?.uiStates?.setLoadingState(false);
            }
          })
          .catch((error) => {
            console.log(error);
            context?.uiStates?.setLoadingState(false);
          });
      } else {
        context?.uiStates?.setLoadingState(false);
      }
    } else if (context.uiStates.profileStep === 1) {
      step1FormDataRaw.append("step", context.uiStates.profileStep);
      let finalFilteredJsonData = {};
      step1FormData.forEach((data) => {
        if (data[0] === "experience") {
          finalFilteredJsonData[`${data[0]}`] = Number(data[1]);
        } else {
          finalFilteredJsonData[`${data[0]}`] = data[1];
        }
      });

      let formValidatorSchema = z.object({
        profession: z.string().min(3, { message: "Incorrect Profession!" }),
        experience: z
          .number()
          .min(0, { message: "Incorrect Work Experience!" }),
        edu_class: z.string().min(3, { message: "Wrong Education Class!" }),
        edu_from: z.coerce.date({ message: "Wrong Class Date From!" }),
        edu_to: z.coerce.date({ message: "Wrong Class Date To!" }),
      });

      console.log(finalFilteredJsonData);

      let validatedData = formValidatorSchema.safeParse(finalFilteredJsonData);
      console.log(validatedData);

      if (validatedData.success && validatedData?.data) {
        workerProfileRequest
          .post("/profession", step1FormDataRaw, {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response);
            if (
              response?.data?.dataFind &&
              response?.data?.workerData?.acknowledged
            ) {
              context.uiStates.setProfileStep(2);
              context?.uiStates?.setLoadingState(false);
            } else {
              context?.uiStates?.setLoadingState(false);
            }
          })
          .catch((error) => {
            console.log(error);
            context?.uiStates?.setLoadingState(false);
          });
      } else {
        context?.uiStates?.setLoadingState(false);
      }
    } else if (context.uiStates.profileStep === 2) {
      step1FormDataRaw.append("step", context.uiStates.profileStep);
      let finalFilteredJsonData = {};
      step1FormData.forEach((data) => {
        if (data[1] !== "") {
          finalFilteredJsonData[`${data[0]}`] = data[1];
        }
      });

      let formValidatorSchema = z.object({
        LinkedIn: z
          .string()
          .url({ message: "Invalid LinkedIn URL!" })
          .optional(),
        Instagram: z
          .string()
          .url({ message: "Invalid LinkedIn URL!" })
          .optional(),
        Github: z.string().url({ message: "Invalid LinkedIn URL!" }).optional(),
        Whatsapp: z
          .string()
          .url({ message: "Invalid LinkedIn URL!" })
          .optional(),
      });

      console.log(finalFilteredJsonData);

      let validatedData = formValidatorSchema.safeParse(finalFilteredJsonData);
      console.log(validatedData);

      if (validatedData.success && validatedData?.data) {
        workerProfileRequest
          .post("/social_links", step1FormDataRaw, {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response);
            if (
              response?.data?.dataFind &&
              response?.data?.workerData?.acknowledged
            ) {
              context.uiStates.setProfileStep(3);
              context?.uiStates?.setLoadingState(false);
            } else {
              context?.uiStates?.setLoadingState(false);
            }
          })
          .catch((error) => {
            console.log(error);
            context?.uiStates?.setLoadingState(false);
          });
      } else {
        context?.uiStates?.setLoadingState(false);
      }
    }
  }
  return (
    <>
      <section className="w-full h-auto min-h-[780px] border-[5px] border-red-400 bg-main_website_color_2 flex items-start justify-center pb-[65px]">
        {context?.uiStates?.loadingState ? (
          <Loading loadingMessage="Data Processing ..." />
        ) : null}
        <div className="w-full max-w-[1440px] h-full py-[25px] flex flex-col items-center justify-start gap-[35px] px-[35px]">
          {context.account?.signup || context.account?.login ? (
            <>
              <div className="relative max-w-[700px] w-full h-[45px] flex items-center justify-center overflow-hidden">
                <div className="absolute w-full h-[2px] bg-[rgba(255,255,255,0.35)] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stepBarWidth}%` }}
                    transition={{ duration: 0.5, ease: "easeIn" }}
                    ref={stepProgBar}
                    className="absolute h-full w-[0%] bg-top_nav_second_color"
                  ></motion.div>
                </div>
                <div className="absolute w-full h-full bg-transparent top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex items-center justify-between">
                  <span
                    ref={(ref) => setStepRefs(ref)}
                    className="w-[40px] h-[40px] rounded-full bg-top_nav_second_color border-[2px] border-top_nav_second_color flex items-center justify-center text-white font-black overflow-hidden"
                  >
                    {context.uiStates.profileStep >= 1 ? (
                      <svg
                        className="w-[22px] h-[22px] fill-main_website_color_1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                      </svg>
                    ) : (
                      <span className="w-full h-full text-center content-center bg-main_website_color_2 text-white font-black">
                        1
                      </span>
                    )}
                  </span>
                  <span
                    ref={(ref) => setStepRefs(ref)}
                    className="w-[40px] h-[40px] rounded-full bg-top_nav_second_color border-[2px] border-top_nav_second_color flex items-center justify-center text-white font-black overflow-hidden"
                  >
                    {context.uiStates.profileStep >= 2 ? (
                      <svg
                        className="w-[22px] h-[22px] fill-main_website_color_1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                      </svg>
                    ) : (
                      <span className="w-full h-full text-center content-center bg-main_website_color_2 text-white font-black">
                        2
                      </span>
                    )}
                  </span>
                  <span
                    ref={(ref) => setStepRefs(ref)}
                    className="w-[40px] h-[40px] rounded-full bg-top_nav_second_color border-[2px] border-top_nav_second_color flex items-center justify-center text-white font-black overflow-hidden"
                  >
                    {context.uiStates.profileStep >= 3 ? (
                      <svg
                        className="w-[22px] h-[22px] fill-main_website_color_1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                      </svg>
                    ) : (
                      <span className="w-full h-full text-center content-center bg-main_website_color_2 text-white font-black">
                        3
                      </span>
                    )}
                  </span>
                  <span
                    ref={(ref) => setStepRefs(ref)}
                    className="w-[40px] h-[40px] rounded-full bg-top_nav_second_color border-[2px] border-top_nav_second_color flex items-center justify-center text-white font-black overflow-hidden"
                  >
                    {context.uiStates.profileStep === 4 ? (
                      <svg
                        className="w-[22px] h-[22px] fill-main_website_color_1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                      </svg>
                    ) : (
                      <span className="w-full h-full text-center content-center bg-main_website_color_2 text-white font-black">
                        4
                      </span>
                    )}
                  </span>
                </div>
              </div>
              {context.uiStates.profileStep < 3 ? (
                <div className="w-full max-w-[700px] max-h-auto min-h-fit p-[35px] bg-top_nav_second_color rounded-2xl overflow-hidden">
                  <form
                    action="#"
                    method="post"
                    className="relative w-full h-full flex flex-col items-start justify-start"
                    onSubmit={workProfileFormHandler}
                  >
                    {context.uiStates.profileStep === 0 ? (
                      <>
                        <Personal_info />
                      </>
                    ) : context.uiStates.profileStep === 1 ? (
                      <Skill_education_info />
                    ) : context.uiStates.profileStep === 2 ? (
                      <Additional_info />
                    ) : null}
                    <div className="w-full h-fit mt-[35px] flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          context.uiStates.setProfileStep((prev) => {
                            if (prev > 0) {
                              return prev - 1;
                            }
                            return prev;
                          });
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
                        // onClick={() => {
                        //   context.uiStates.setProfileStep((prev) => {
                        //     if (prev < 4) {
                        //       return prev + 1;
                        //     }
                        //     return prev;
                        //   });
                        // }}
                        className="w-[45px] h-[45px] rounded-full transition-all duration-300 ease-in-out bg-main_website_color_1 flex items-center justify-center gap-[15px] cursor-pointer hover:w-[110px] hover:px-[15px] group overflow-hidden"
                      >
                        <span className="opacity-0 w-0 transition-all duration-300 hidden ease-in-out text-[18px] text-white font-black group-hover:opacity-100 group-hover:w-[60px] group-hover:inline-block">
                          Next
                        </span>
                        <svg
                          className="w-[20px] h-[20px] fill-white group-hover:w-[20px] group-hover:h-[20px]"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                          />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <Create_final_gig />
              )}
            </>
          ) : (
            <div className="w-fit h-fit flex flex-col gap-[35px] items-center justify-center px-[35px]">
              <div className="w-[150px] h-[150px]"><Lottie
              animationData={NotFount}
              loop={false}
              autoPlay={false}
              lottieRef={not_found_anim_ref}
            ></Lottie></div>
              <p className="text-top_nav_second_color text-center">Please Signup First to Hire workers. If you have already an account then go to Login.</p>
              <div className="w-fit h-fit flex flex-wrap gap-[35px] items-center justify-center">
                <button type="button" className="px-[35px] py-[5px] rounded-[5px] bg-top_nav_second_color text-main_website_color_1 text-[18px] font-semibold font-font_family_lato" onClick={() => {navigator('/login')}}>Login</button>
                <button type="button" className="px-[35px] py-[5px] rounded-[5px] bg-top_nav_second_color text-main_website_color_1 text-[18px] font-semibold font-font_family_lato" onClick={() => {navigator('/signup')}}>Signup</button>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
