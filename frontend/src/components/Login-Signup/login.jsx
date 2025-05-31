import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Loading from "./../Loading/loading";
import { Main_context } from "../../stores/main_store/main_store";
import { Footer } from "../Footer/footer";
import defaultDp from "../../assets/images/default_Images/defaultPic_cropped.webp"
export function Login() {
  let mainContext = useContext(Main_context);
  console.log(mainContext.account.login);
  let navigator = useNavigate();
  let [loginRequestPending, setLoginRequestPending] = useState(false);
  const loginForm = useRef(null);
  function loginFormSubmission(event) {
    event.preventDefault();
    let formData = new FormData(loginForm.current);
    let formObjectData = Object.fromEntries(formData.entries());
    setLoginRequestPending(true);
    sendLoginRequest(formObjectData);
  }
  async function sendLoginRequest(userLoginData) {
    console.log(userLoginData, mainContext);
    let status = await mainContext.apiCalls.loginRequest(userLoginData);
    console.log(status);
    setLoginRequestPending(false);

    // if (userLoginData?.isRemember === "on") {
    //   userLoginData.isRemember = true;
    // } else {
    //   userLoginData.isRemember = false;
    // }
    // console.log(userLoginData);
    // let loginRequest = await axios.post(
    //   `${import.meta.env.VITE_BACKEND_URL}/login`,
    //   userLoginData,
    //   {
    //     withCredentials: true,
    //   }
    // );
    // setLoginRequestPending(false);
    // console.log(loginRequest);
  }
  return (
    <>
      <section className="relative w-full h-[calc(100%-70px)] min-h-[760px] flex items-center justify-center overflow-hidden bg-main_website_color_2 selection:bg-[rgba(255,166,0,0.45)]">
        <div className="w-full max-w-[1440px] h-[calc(100%-120px)] flex items-center justify-center">
          {!mainContext.account.login ? (
            <>
              <div className="w-[50%] h-full">
                <div className="relative w-full h-full rounded-none rounded-tl-[15px] rounded-bl-[15px] overflow-hidden">
                  <div className="absolute w-full h-full -bg-linear-35 from-top_nav_second_color to-[#f05913]"></div>
                  <div className="absolute w-full h-full bg-linear-35 from-[rgba(255,0,43,0.5)] to-transparent to-70%"></div>
                  <div className="absolute w-full h-full flex items-center justify-center flex-col gap-[25px]">
                    <h1 className="w-full h-fit text-center content-center text-main_website_color_1 font-font_family_lato text-[32px] font-black">
                      Login Your Account
                    </h1>
                    <p className="w-[60%] h-fit text-center content-center text-[rgba(27,37,41,0.85)] font-font_family_lato text-[16px]">
                      Enter your new account info which you save when you was
                      Creating Account.
                    </p>
                    <hr className="w-[60%] h-[2px] border-none bg-main_website_color_1 mt-[15px]" />
                    <span className="text-main_website_color_1 font-font_family_lato mt-[15px]">
                      - If you want to create new account
                    </span>
                    <button
                      type="button"
                      className="w-[120px] h-[40px] rounded-[7px] border-[2px] border-main_website_color_1 cursor-pointer font-font_family_lato text-[20px] text-main_website_color_1 hover:bg-[rgba(27,37,41,0.15)] font-black transition-all duration-150 ease-in"
                      onClick={() => navigator("/signup")}
                    >
                      Signup
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-[50%] h-full overflow-hidden rounded-none rounded-tr-[15px] py-[65px] rounded-br-[15px] bg-[rgb(27,37,41)]">
                <div className="w-full h-full border-none flex flex-col items-center justify-start gap-[15px]">
                  <h1 className="w-full text-top_nav_second_color text-center content-center text-[42px] font-font_family_lato">
                    Login
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
                  <span className="font-font_family_lato text-[rgba(255,255,255,0.45)] mt-[15px]">
                    - Or Use Enter Your Email.
                  </span>
                  <form
                    action="#"
                    method="post"
                    ref={loginForm}
                    className="relative w-full h-max mt-[15px] flex flex-col items-center justify-center gap-[20px]"
                    onSubmit={loginFormSubmission}
                  >
                    <input
                      type="email"
                      name="email"
                      className="signup_inputs_class"
                      placeholder="Email"
                      required={true}
                    />
                    <div className="relative w-full h-fit flex flex-col items-center justify-center">
                      <input
                        type="password"
                        name="password"
                        className="signup_inputs_class"
                        placeholder="Enter Password"
                        required={true}
                      />
                      {/* <span className="w-[380px] min-w-[280px] h-fit mt-[3.5px] text-[15px] text-[rgba(255,255,255,0.5)] cursor-pointer text-end hover:underline">
                        Forgot Password!
                      </span> */}
                    </div>
                    <div className="w-[380px] min-w-[280px] h-fit flex items-center gap-[5px] justify-start mt-3">
                      <input
                        type="checkbox"
                        name="isRemember"
                        id="isRemember"
                        className="accent-top_nav_second_color w-[14px] h-[14px] cursor-pointer"
                      />
                      <label
                        htmlFor="isRemember"
                        className="text-[rgba(255,255,255,0.5)] text-[14px] select-none cursor-pointer"
                      >
                        Remember to Login?
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="signup_inputs_class select-none bg-main_website_color_2 border-none text-[20px] font-font_family_lato cursor-pointer hover:bg-top_nav_second_color hover:text-main_website_color_2"
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <div className="w-fit h-fit flex flex-col gap-[15px] items-center justify-center">
              <div className="w-[120px] h-[120px] rounded-full overflow-hidden  border-[5px] border-main_website_color_1">
                <img
                  src={mainContext.account.userDp || defaultDp}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <h1 className="text-[32px] text-[orange]">
                Your Are Already Loge In
              </h1>
              <button
                type="button"
                className="w-[140px] h-[40px] border-none outline-none cursor-pointer bg-top_nav_second_color rounded-[7px] font-font_family_lato text-[18px] font-black text-main_website_color_2"
                onClick={() => navigator("/")}
              >
                Go To Home
              </button>
            </div>
          )}
        </div>
        {loginRequestPending ? (
          <Loading loadingMessage="We Are Checking Your Data ..." />
        ) : null}
      </section>
      <Footer />
    </>
  );
}
