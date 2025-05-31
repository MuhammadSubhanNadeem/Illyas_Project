import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { Main_context } from "../../stores/main_store/main_store";
import defaultDp from "../../assets/images/default_Images/defaultPic_cropped.webp";
import { ShowProfileBox } from "../profile/showProfileBox";
export function Top_nav() {
  let location = useLocation();
  let context = useContext(Main_context);
  let [userAccount, setUserAccount] = useState(false);
  useEffect(() => {
    console.log(location.pathname === "/admin");
    
  },[])
  useEffect(() => {
    if (context.account.login || context.account.signup) {
      setUserAccount(true);
    } else {
      setUserAccount(false);
    }
  }, [context.account.login, context.account.signup]);
  function logo_click() {
    window.location.reload(true);
  }
  function userDpClick() {
    context.uiStates.setUserClickDp((prev) => !prev);
  }
  return (
    <>
      {location.pathname === "/admin" ? null : (
        <nav id="top_nav">
          <div className="top_nav_inner_cover">
            <div className="nav_logo_cover_box">
              <svg
                className="top_nav_menu_icon"
                viewBox="0 0 16 16"
                ref={(reference) => {
                  context.refs.top_nav_refs.top_nav_icon = reference;
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                />
              </svg>
              <div className="top_nav_logo_box" onClick={logo_click}>
                {/* Logo */}
                <img
                  src={"/logo/logo.png"}
                  className="w-full h-full object-contain object-center"
                  alt=""
                />
              </div>
            </div>
            <div className="nav_links_cover_box">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? "active_link top_nav_main_links"
                    : "top_nav_main_links"
                }
              >
                Home
              </NavLink>
              <NavLink
                to={"/about"}
                className={({ isActive }) =>
                  isActive
                    ? "active_link top_nav_main_links"
                    : "top_nav_main_links"
                }
              >
                About
              </NavLink>
              <NavLink
                to={"/hire"}
                className={({ isActive }) =>
                  isActive
                    ? "active_link top_nav_main_links"
                    : "top_nav_main_links"
                }
              >
                Hire Worker
              </NavLink>
              <NavLink
                to={"/contact"}
                className={({ isActive }) =>
                  isActive
                    ? "active_link top_nav_main_links"
                    : "top_nav_main_links"
                }
              >
                Contact Us
              </NavLink>
              <div className="top_nav_right_three relative">
                {context.account.login || context.account.signup ? (
                  <>
                    <NavLink
                      to={"/create_worker_profile"}
                      className={({ isActive }) =>
                        isActive
                          ? "become_worker_active_link become_worker_link"
                          : "become_worker_link"
                      }
                    >
                      Become As a Worker
                    </NavLink>
                    <hr className="top_nav_right_hr" />
                  </>
                ) : null}
                {userAccount ? (
                  <>
                    <div className="relative w-fit h-full px-[25px] flex items-center justify-center">
                      <div
                        onClick={userDpClick}
                        className="w-[50px] h-[50px] p-[2px] border-[2px] border-top_nav_second_color rounded-full cursor-pointer overflow-hidden"
                      >
                        <img
                          src={context.account.userDp || defaultDp}
                          className="w-full h-full object-cover rounded-full"
                          alt=""
                        />
                      </div>
                    </div>
                    {context.uiStates.userClickDp ? <ShowProfileBox /> : null}
                  </>
                ) : (
                  <div className="login_signup_link_cover">
                    <NavLink
                      to={"/login"}
                      className={({ isActive }) =>
                        isActive ? "login_active login_link" : "login_link"
                      }
                    >
                      Login
                    </NavLink>
                    <hr className="login_signup_link_divider" />
                    <NavLink
                      to={"/signup"}
                      className={({ isActive }) =>
                        isActive ? "signup_active signup_link" : "signup_link"
                      }
                    >
                      Signup
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

