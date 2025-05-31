import React from "react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { Main_context } from "../../stores/main_store/main_store";
import footer_img_1 from "../../assets/images/footer images/fotter_img_1.jpg";
import footer_img_2 from "../../assets/images/footer images/fotter_img_2.jpg";
export function Footer() {
  let navigator = useNavigate();
  let context = useContext(Main_context);
  return (
    <footer className="w-full h-auto min-h-[760px] bg-top_nav_second_color px-[75px] pt-[75px] pb-[15px] flex flex-col items-center justify-between max-[1024px]:px-[35px] max-[1024px]:pt-[45px] max-[768px]:px-[15px]">
      <div className="w-full max-w-[1440px] h-full flex flex-col items-center justify-between">
        <div className="w-full h-fit flex items-center justify-between max-[768px]:flex-col max-[768px]:gap-[25px]">
          <div className="w-[50%] h-fit flex flex-col items-start justify-center gap-[35px] max-[768px]:w-full">
            <span className="text-[54px] text-main_website_color_1 font-font_family_br selection:bg-main_website_color_2 selection:text-top_nav_second_color max-[1440px]:text-[42px] max-[1024px]:text-[30px] max-[768px]:text-[26px]">
              If you are ready to hire workers or become a worker then {"->"}
            </span>{" "}
            <button
              type="button"
              className="w-[180px] h-[40px] max-[1024px]:w-[160px] max-[1024px]:text-[16px] border-none outline-neutral-50 font-font_family_lato font-bold text-[18px] text-[#e3e6e7] bg-main_website_color_2 cursor-pointer rounded-[5px] max-[768px]:hidden"
              title={
                context.account.login || context.account.signup
                  ? "Hire Workers"
                  : "Create Account"
              }
              onClick={() => {
                context.account.login || context.account.signup
                  ? navigator("/hire")
                  : navigator("/signup");
              }}
            >
              {context.account.login || context.account.signup
                ? "Hire Workers"
                : "Create Account"}
            </button>
          </div>
          <div className="relative w-[50%] h-auto flex items-center justify-center overflow-hidden max-[1440px]:justify-end max-[768px]:w-full max-[768px]:justify-start">
            <div className="w-fit h-fit overflow-hidden rounded-[150px] p-[8px] flex items-center justify-center gap-[10px] bg-main_website_color_2 max-[320px]:hidden">
              <div className="w-[280px] h-[280px] rounded-full overflow-hidden max-[1440px]:w-[200px] max-[1440px]:h-[200px] max-[1024px]:w-[160px] max-[1024px]:h-[160px] max-[768px]:w-[160px] max-[768px]:h-[160px] max-[425px]:w-[120px] max-[425px]:h-[120px]">
                <img
                  src={footer_img_1 || undefined}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div className="w-[280px] h-[280px] rounded-full overflow-hidden max-[1440px]:w-[200px] max-[1440px]:h-[200px] max-[1024px]:w-[160px] max-[1024px]:h-[160px] max-[768px]:w-[160px] max-[768px]:h-[160px] max-[425px]:w-[120px] max-[425px]:h-[120px]">
                <img
                  src={footer_img_2 || undefined}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="w-full h-fit hidden max-[768px]:flex">
          <button
              type="button"
              className="w-[180px] h-[40px] max-[1024px]:w-[160px] max-[1024px]:text-[16px] border-none outline-neutral-50 font-font_family_lato font-bold text-[18px] text-[#e3e6e7] bg-main_website_color_2 cursor-pointer rounded-[5px]"
              title={
                context.account.login || context.account.signup
                  ? "Hire Workers"
                  : "Create Account"
              }
              onClick={() => {
                context.account.login || context.account.signup
                  ? navigator("/hire")
                  : navigator("/signup");
              }}
            >
              {context.account.login || context.account.signup
                ? "Hire Workers"
                : "Create Account"}
            </button>
          </div>
        </div>
        <div className="w-full h-[340px] flex items-center bg-main_website_color_2 rounded-[7px] p-[65px] mt-[180px] max-[1440px]:mt-[120px] max-[1024px]:mt-[100px] max-[1024px]:p-[35px] max-[1024px]:h-[280px] max-[768px]:px-[15px] max-[425px]:gap-[15px]">
          <div className="w-[40%] h-full flex flex-col items-start justify-center gap-[25px] select-none max-[1440px]:w-[35%] max-[768px]:w-[30%] max-[425px]:hidden">
            {/* <h1 className="text-[48px] font-black font-font_family_lato text-[white] max-[1024px]:text-[18px]">
              LOGO

            </h1> */}
            <img src={'/logo/logo.png'} className="w-[120px] h-[120px] object-contain object-center" alt="" />
            <p className="w-[80%] h-fit text-[white] font-font_family_lato text-[18px] max-[1440px]:text-[16px] max-[1440px]:w-[95%] max-[1024px]:text-[14px] max-[768px]:text-[12px] max-[1024px]:w-full">
              Our Mission: Creating Opportunities with Ease & Doubling Growth
              for a Better Future!
            </p>
          </div>
          <div className="w-[2px] h-full bg-[rgba(255,255,255,0.2)] flex items-center justify-between max-[425px]:hidden"></div>
          <div className="w-[35%] h-full px-[35px] flex items-start justify-center gap-[25px] max-[1440px]:w-[40%] max-[1024px]:px-[15px] max-[768px]:w-[calc(100%-30%-50px)] max-[425px]:w-[calc(100%-50px)] max-[425px]:px-0 max-[320px]:w-full">
            <div className="w-[50%] h-full flex items-center justify-center">
              <div className="w-fit h-full flex flex-col items-start justify-between">
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive
                      ? "text-[white] underline decoration-2 underline-offset-3 font-black text-[18px] cursor-pointer max-[1024px]:text-[16px]"
                      : "text-[rgba(255,255,255,0.35)] font-bold cursor-pointer max-[1024px]:text-[15px]"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to={"/about"}
                  className={({ isActive }) =>
                    isActive
                      ? "text-[white] underline decoration-2 underline-offset-3 font-black text-[18px] cursor-pointer max-[1024px]:text-[16px]"
                      : "text-[rgba(255,255,255,0.35)] font-bold cursor-pointer max-[1024px]:text-[15px]"
                  }
                >
                  About
                </NavLink>
                <NavLink
                  to={"/hire"}
                  onClick={() => {window.scrollTo(0, 0);}}
                  className={({ isActive }) =>
                    isActive
                      ? "text-[white] underline decoration-2 underline-offset-3 font-black text-[18px] cursor-pointer max-[1024px]:text-[16px]"
                      : "text-[rgba(255,255,255,0.35)] cursor-pointer font-bold max-[1024px]:text-[15px]"
                  }
                >
                  Hire Workers
                </NavLink>
              </div>
            </div>
            <div className="w-[50%] h-full flex items-center justify-center">
              <div className="w-fit h-full flex flex-col items-start justify-between">
                <NavLink
                  to={"/contact"}
                  className={({ isActive }) =>
                    isActive
                      ? "text-[white] underline decoration-2 underline-offset-3 font-black text-[18px] cursor-pointer max-[1024px]:text-[16px]"
                      : "text-[rgba(255,255,255,0.35)] font-bold cursor-pointer max-[1024px]:text-[15px]"
                  }
                >
                  Contact Us
                </NavLink>
                {context.account.login || context.account.signup ? (
                  <>
                    <NavLink
                      to={"/profile"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-[white] underline decoration-2 underline-offset-3 font-black text-[18px] cursor-pointer max-[1024px]:text-[16px]"
                          : "text-[rgba(255,255,255,0.35)] font-bold cursor-pointer max-[1024px]:text-[15px]"
                      }
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to={"/messages"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-[white] underline decoration-2 underline-offset-3 font-black text-[18px] cursor-pointer max-[1024px]:text-[16px]"
                          : "text-[rgba(255,255,255,0.35)] font-bold cursor-pointer max-[1024px]:text-[15px]"
                      }
                    >
                      Messages
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to={"/signup"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-[white] underline decoration-2 underline-offset-3 font-black text-[18px] cursor-pointer max-[1024px]:text-[16px]"
                          : "text-[rgba(255,255,255,0.35)] font-bold cursor-pointer max-[1024px]:text-[15px]"
                      }
                    >
                      Sign Up
                    </NavLink>
                    <NavLink
                      to={"/login"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-[white] underline decoration-2 underline-offset-3 font-black text-[18px] cursor-pointer max-[1024px]:text-[16px]"
                          : "text-[rgba(255,255,255,0.35)] font-bold cursor-pointer max-[1024px]:text-[15px]"
                      }
                    >
                      Login
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-[2px] h-full bg-[rgba(255,255,255,0.2)] max-[320px]:hidden"></div>
          <div className="w-[25%] h-full flex flex-col items-start justify-center gap-[25px] px-[75px] max-[768px]:w-[40px] max-[768px]:px-[0px] max-[768px]:ml-[15px] overflow-hidden max-[425px]:ml-0 max-[320px]:hidden">
            <div className="w-fit h-full flex flex-col items-center justify-between overflow-hidden">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                title="Linked In"
              >
                <svg
                  className="w-[34px] h-[34px] fill-[rgba(255,255,255,0.35)] transition-all duration-150 ease-in cursor-pointer hover:fill-top_nav_second_color"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
              </a>
              <a href="https://github.com" target="_blank" title="GitHub">
                <svg
                  className="w-[34px] h-[34px] fill-[rgba(255,255,255,0.35)] transition-all duration-150 ease-in cursor-pointer hover:fill-top_nav_second_color"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
              </a>
              <a href="https://www.reddit.com" target="_blank" title="Reddit">
                <svg
                  className="w-[34px] h-[34px] fill-[rgba(255,255,255,0.35)] transition-all duration-150 ease-in cursor-pointer hover:fill-top_nav_second_color"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.167 8a.83.83 0 0 0-.83.83c0 .459.372.84.83.831a.831.831 0 0 0 0-1.661m1.843 3.647c.315 0 1.403-.038 1.976-.611a.23.23 0 0 0 0-.306.213.213 0 0 0-.306 0c-.353.363-1.126.487-1.67.487-.545 0-1.308-.124-1.671-.487a.213.213 0 0 0-.306 0 .213.213 0 0 0 0 .306c.564.563 1.652.61 1.977.61zm.992-2.807c0 .458.373.83.831.83s.83-.381.83-.83a.831.831 0 0 0-1.66 0z" />
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.828-1.165c-.315 0-.602.124-.812.325-.801-.573-1.9-.945-3.121-.993l.534-2.501 1.738.372a.83.83 0 1 0 .83-.869.83.83 0 0 0-.744.468l-1.938-.41a.2.2 0 0 0-.153.028.2.2 0 0 0-.086.134l-.592 2.788c-1.24.038-2.358.41-3.17.992-.21-.2-.496-.324-.81-.324a1.163 1.163 0 0 0-.478 2.224q-.03.17-.029.353c0 1.795 2.091 3.256 4.669 3.256s4.668-1.451 4.668-3.256c0-.114-.01-.238-.029-.353.401-.181.688-.592.688-1.069 0-.65-.525-1.165-1.165-1.165" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="w-full h-[35px] bg-main_website_color_2 flex items-center justify-evenly mt-[15px] rounded-[7px] overflow-hidden">
          <a href="https://lordicon.com/" target="_blank" className="w-full h-full text-[rgba(255,255,255,0.45)] flex items-center justify-center transition-all duration-150 ease-in hover:bg-main_website_color_1 hover:text-[rgba(255,255,255,0.85)] max-[768px]:hidden">@ PRODUCTION 2025</a>
          <div className="w-[2px] h-full bg-[rgba(255,255,255,0.2)] max-[768px]:hidden"></div>
          <a href="https://lordicon.com/" target="_blank" className="w-full h-full text-[rgba(255,255,255,0.45)] flex items-center justify-center transition-all duration-150 ease-in hover:bg-main_website_color_1 hover:text-[rgba(255,255,255,0.85)] max-[425px]:hidden">Icons by Lordicon.com</a>
          <div className="w-[2px] h-full bg-[rgba(255,255,255,0.2)] max-[768px]:hidden"></div>
          <a href="https://lordicon.com/" target="_blank" className="w-full h-full text-[rgba(255,255,255,0.45)] flex items-center justify-center transition-all duration-150 ease-in hover:bg-main_website_color_1 hover:text-[rgba(255,255,255,0.85)]">Icons by Lordicon.com</a>
        </div>
      </div>
    </footer>
  );
}
