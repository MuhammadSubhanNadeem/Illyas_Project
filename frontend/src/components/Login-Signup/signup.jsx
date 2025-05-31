import { useMutation } from "@tanstack/react-query";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Main_context } from "../../stores/main_store/main_store";
import Loading from "../Loading/loading";
import defaultDp from "../../assets/images/default_Images/defaultPic_cropped.webp";
import { useEffect } from "react";
import { Footer } from "../Footer/footer";
function Signup() {
  let context = useContext(Main_context);
  let navigator = useNavigate();
  let confirmPassword = useRef(null);
  let otpCodeInput = useRef(null);
  let otpTimer = useRef(null);
  let [signupResponseData, setSignupResponseData] = useState();
  let [emailSend, setEmailSend] = useState(false);
  let [otpVerifyLog, setOtpVerifyLog] = useState(false);
  let [otpTime, setOtpTime] = useState(60);
  let [recentEmail, setRecentEmail] = useState("");
  let [emailChanged, setEmailChanged] = useState(false);
  let emailRef = useRef(null);
  let confirmPasswordInvalidTimeOut;
  let duplicationTimeout;
  useEffect(() => {
    if(context.account.login || context.account.signup){
      navigator('/');
    }
  }, [context.account.login, context.account.signup]);
  let tanStackMutation = useMutation({
    mutationKey: "signup",
    mutationFn: (userData) => signupRequestSender(userData),
  });
  async function signupFromSubmission(defs) {
    defs.preventDefault();
    setEmailChanged(false);
    setRecentEmail(emailRef.current.value);
    let formData = new FormData(defs.target);
    const formObject = Object.fromEntries(formData.entries());
    if (formObject["password"] !== formObject["confirmPassword"]) {
      confirmPassword.current.style.setProperty(
        "border",
        "2px solid red",
        "important"
      );
      console.log(confirmPassword.current);
      if (confirmPasswordInvalidTimeOut) {
        clearTimeout(confirmPasswordInvalidTimeOut);
      }
      confirmPasswordInvalidTimeOut = setTimeout(() => {
        confirmPassword.current.style.setProperty(
          "border",
          "2px solid rgba(102,102,102,0.66)",
          "important"
        );
      }, 1000);
    } else {
      setEmailSend(true);
      let mutationResponse = await tanStackMutation.mutateAsync(formObject);
      setSignupResponseData(mutationResponse[0]);
      if ((signupResponseData, mutationResponse[0].data[0]?.emailSend)) {
        setEmailSend(false);
        setOtpVerifyLog(true);
      } else {
        setEmailSend(false);
        setOtpVerifyLog(false);
      }
      console.log(signupResponseData, mutationResponse);
    }
  }
  async function signupRequestSender(userData) {
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/signup`,
        userData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        return [{ status: "data", data: [response?.data] }];
      }
      return null;
    } catch (error) {
      console.log(error.response);
      let errorResponseData = error.response?.data;
      if (errorResponseData.duplication) {
        emailRef.current.style.setProperty(
          "border",
          "2px solid red",
          "important"
        );
        if (duplicationTimeout) {
          clearTimeout(duplicationTimeout);
        }
        duplicationTimeout = setTimeout(() => {
          emailRef.current.style.setProperty(
            "border",
            "2px solid rgba(102,102,102,0.66)",
            "important"
          );
        }, 1000);
        return [{ status: "duplication", data: [] }];
      } else if (!errorResponseData?.emailSend) {
        return [{ status: "dbError", data: [] }];
      } else if (!errorResponseData?.userDataStatus) {
        return [{ status: "dbError", data: [] }];
      } else if (errorResponseData?.userStoredData === null) {
        return [{ status: "dbError", data: [] }];
      }
      return [{ status: "dbError", data: [] }];
    }
  }
  async function resendEmail() {
    setEmailSend(true);
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/resend_otp`,
        {
          withCredentials: true,
        }
      );
      setEmailSend(false);
      if (response.data.emailSend) {
        setOtpTime((prev) => prev + 60);
        otpTimerFunction();
      }
    } catch (error) {
      console.log(error);
      setEmailSend(false);
    }
  }
  async function submitOtp() {
    if (otpTime > 0) {
      let userOtp = { userOtp: otpCodeInput.current.value };
      let response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/signup_auth`,
        userOtp,
        {
          withCredentials: true,
        }
      );
      let dataRes = response.data;
      if (
        !dataRes.duplication &&
        dataRes.emailSend &&
        dataRes.otpMatched &&
        !dataRes.timeOver &&
        dataRes.userDataStatus
      ) {
        setOtpVerifyLog(false);
        
        context.setAccount({
            login: false,
            signup: true,
            user_id: dataRes.userStoredData._id,
            user_name: dataRes.userStoredData.userName,
            user_email: dataRes.userStoredData.userEmail,
            user_password: dataRes.userStoredData.userPassword,
            userDp: defaultDp,
          })
      }
    } else {
      window.alert("OTP Verification Time is Over >> Resend Otp");
    }
  }
  function otpTimerFunction(){
    if (otpVerifyLog) {
      otpTimer.current = setInterval(() => {
        setOtpTime((prev) => {
          if (prev === 0) {
            clearInterval(otpTimer.current);
            return 0;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    }
  }
  useEffect(() => {
    otpTimerFunction();
    return () => {
      clearInterval(otpTimer.current);
    };
  }, [otpVerifyLog]);
  return (
    <>
      <section className="relative w-full h-[calc(100%-70px)] min-h-[760px] flex items-center justify-center overflow-hidden bg-main_website_color_2 selection:bg-[rgba(255,166,0,0.45)]">
        <div className="w-full max-w-[1440px] h-[calc(100%-120px)] flex items-center justify-center px-[35px] max-[425px]:px-[15px]">
          <div className="w-[50%] h-full max-[768px]:hidden">
            <div className="relative w-full h-full rounded-none rounded-tl-[15px] rounded-bl-[15px] overflow-hidden">
              <div className="absolute w-full h-full -bg-linear-35 from-top_nav_second_color to-[#f05913]"></div>
              <div className="absolute w-full h-full bg-linear-35 from-[rgba(255,0,43,0.5)] to-transparent to-70%"></div>
              <div className="absolute w-full h-full flex items-center justify-center flex-col gap-[25px] px-[35px] max-[793px]:px-0">
                <h1 className="w-full h-fit text-center content-center text-main_website_color_1 font-font_family_lato text-[32px] font-black">
                  Create New Account
                </h1>
                <p className="w-[60%] h-fit text-center content-center text-[rgba(27,37,41,0.75)] font-font_family_lato text-[16px]">
                  Enter your new account info and get started. Remember your
                  credential which you enter here.
                </p>
                <hr className="w-[60%] h-[2px] border-none bg-main_website_color_1 mt-[15px]" />
                <span className="text-main_website_color_1 font-font_family_lato mt-[15px]">
                  - If you already have an account
                </span>
                <button
                  type="button"
                  className="w-[120px] h-[40px] rounded-[7px] border-[2px] border-main_website_color_1 cursor-pointer font-font_family_lato text-[20px] text-main_website_color_1 hover:bg-[rgba(27,37,41,0.15)] font-black transition-all duration-150 ease-in"
                  onClick={() => navigator("/login")}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
          <div className="w-[50%] h-full overflow-hidden rounded-none rounded-tr-[15px] py-[65px] rounded-br-[15px] bg-[rgb(27,37,41)] max-[768px]:w-full max-[768px]:rounded-[15px]">
            <div className="w-full h-full border-none flex flex-col items-center justify-start gap-[15px] px-[35px]">
              <h1 className="w-full text-top_nav_second_color text-center content-center text-[42px] font-font_family_lato">
                SignUp
              </h1>
              <div className="w-full h-fit min-h-[40px] mt-[35px] px-[35px] min-w-[280px] max-w-[380px] pl-[15px] text-[16px] text-white transition-all duration-150 ease-in overflow-hidden flex items-center justify-around">
                <div
                  onClick={() => {
                    window.alert(
                      "This option is disabled for know please signup by * EMAIL *"
                    );
                  }}
                  className="group w-[40px] h-[40px] border-[2px] border-[rgba(102,102,102,0.66)] hover:border-top_nav_second_color transition-all duration-150 ease-in border-solid rounded-full flex items-center justify-center cursor-pointer"
                >
                  <svg
                    className="w-[20px] h-[20px] fill-[rgba(102,102,102,0.66)] group-hover:fill-top_nav_second_color transition-all duration-150 ease-in pointer-events-none"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                  </svg>
                </div>
                <div
                  onClick={() => {
                    window.alert(
                      "This option is disabled for know please signup by * EMAIL *"
                    );
                  }}
                  className="group w-[40px] h-[40px] border-[2px] border-[rgba(102,102,102,0.66)] hover:border-top_nav_second_color transition-all duration-150 ease-in border-solid rounded-full flex items-center justify-center cursor-pointer"
                >
                  <svg
                    className="w-[20px] h-[20px] fill-[rgba(102,102,102,0.66)] group-hover:fill-top_nav_second_color transition-all duration-150 ease-in pointer-events-none"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                  </svg>
                </div>
                <div
                  onClick={() => {
                    window.alert(
                      "This option is disabled for know please signup by * EMAIL *"
                    );
                  }}
                  className="group w-[40px] h-[40px] border-[2px] border-[rgba(102,102,102,0.66)] hover:border-top_nav_second_color transition-all duration-150 ease-in border-solid rounded-full flex items-center justify-center cursor-pointer"
                >
                  <svg
                    className="w-[20px] h-[20px] fill-[rgba(102,102,102,0.66)] group-hover:fill-top_nav_second_color transition-all duration-150 ease-in pointer-events-none"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                  </svg>
                </div>
              </div>
              <span className="font-font_family_lato text-[rgba(255,255,255,0.45)]">
                - or use your email for registration.
              </span>
              <form
                action="#"
                method="post"
                className="relative w-full h-max flex flex-col items-center justify-center gap-[15px]"
                onSubmit={signupFromSubmission}
              >
                <input
                  type="text"
                  name="fullName"
                  className="signup_inputs_class"
                  placeholder="Full Name"
                  required={true}
                />
                <input
                  type="email"
                  name="email"
                  ref={emailRef}
                  onChange={() => setEmailChanged(true)}
                  className="signup_inputs_class"
                  placeholder="Email"
                  required={true}
                />
                <input
                  type="password"
                  name="password"
                  className="signup_inputs_class"
                  placeholder="Password"
                  required={true}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  className="signup_inputs_class"
                  ref={confirmPassword}
                  placeholder="Confirm Password"
                  required={true}
                />
                <button
                  type="submit"
                  className="signup_inputs_class bg-main_website_color_2 border-none text-[20px] font-font_family_lato cursor-pointer mt-10 hover:bg-top_nav_second_color hover:text-main_website_color_2"
                >
                  Signup
                </button>
                {signupResponseData?.status === "duplication" &&
                !emailChanged ? (
                  <div className="w-max h-fit flex items-center justify-center gap-1.5 absolute -bottom-[50px] left-[50%] -translate-x-[50%] text-red-600 font-font_family_lato text-[14px] border-none bg-transparent">
                    <span className="font-font_family_lato inline-block font-bold w-fit h-fit max-w-[80px] overflow-hidden text-ellipsis">
                      {recentEmail}
                    </span>{" "}
                    is already registered. Goto &gt;&gt;{" "}
                    <strong
                      className="underline underline-offset-2 decoration-red-800 transition-all duration-150 ease-in text-red-800 cursor-pointer hover:text-red-600 text-[13px]"
                      onClick={() => navigator("login")}
                    >
                      LOGIN
                    </strong>{" "}
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
        {otpVerifyLog ? (
          <div className="absolute w-full h-full z-50 bg-[rgba(0,0,0,0.5)] flex items-center border justify-center top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
            <div className="w-[320px] h-fit font-font_family_lato rounded-[12px] bg-main_website_color_1 py-[25px] px-[35px] flex items-start justify-start flex-col overflow-hidden">
              <h1 className="text-top_nav_second_color text-[28px]">
                Email Verification
              </h1>
              <span className="w-[90%] h-fit mt-2.5 text-[rgba(255,255,255,0.65)] font-light text-[14px]">
                Enter Your OTP Here which send to your Email.
              </span>
              <input
                type="number"
                ref={otpCodeInput}
                className="w-[85%] h-[35px] mt-[25px] border-b-[2px] border-b-[rgba(133,133,133,0.45)] outline-none text-white transition-all duration-150 ease-in pl-[12px] focus:border-b-top_nav_second_color"
              />
              <div className="w-full h-fit mt-[7px] text-[rgba(255,255,255,0.45)] text-[14px] flex items-start justify-start gap-[8px]">
                Time Remaining?{" "}
                {otpTime > 0 ? (
                  <span className="text-[rgba(255,255,255,0.65)] text-[14px]">
                    00 : {otpTime > 9 ? otpTime : `0${otpTime}`}
                  </span>
                ) : (
                  <span
                    className="hover:underline text-[rgba(255,255,255,0.65)] cursor-pointer"
                    onClick={resendEmail}
                  >
                    Resend Email
                  </span>
                )}
              </div>
              {/* [disabled:pointer-events-none disabled:grayscale-[0.35] disabled:opacity-[0.5]] */}
              <button
                type="button"
                className="w-fit h-fit mt-[35px] py-[5px] px-[18px] rounded-[5px] bg-top_nav_second_color cursor-pointer text-main_website_color_2 font-black"
                onClick={submitOtp}
                // disabled={true}
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
        {emailSend ? (
          <Loading loadingMessage="OTP Sending To Email . . ." />
        ) : null}
      </section>
      <Footer />
    </>
  );
}
export default Signup;
