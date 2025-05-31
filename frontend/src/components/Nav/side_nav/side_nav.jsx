import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Main_context } from "../../../stores/main_store/main_store";
export function Side_nav() {
  let context = useContext(Main_context);
  let navigate = useNavigate();
  let location = useLocation();
  return (
    <div
      className="side_nav_main_cover_box"
      ref={(reference) => {
        context.refs.side_nav_refs.side_nav_main_box = reference;
      }}
    >
      <div
        onClick={(defs) => window.location.reload(true)}
        className="side_nav_logo"
      >
        Logo
      </div>
      <div
        onClick={() => navigate("/create_worker_profile")}
        className={
          location.pathname === "/create_worker_profile"
            ? "side_nav_become_worker side_become_worker_active_link"
            : "side_nav_become_worker"
        }
      >
        Become As a Worker
      </div>
      <hr className="side_nav_main_link_divider_hr" />
      <div className="side_nav_main_link_cover">
        <div
          onClick={() => navigate("/")}
          className={
            location.pathname === "/"
              ? "side_link side_active_link"
              : "side_link"
          }
        >
          Home
        </div>
        <div
          onClick={() => navigate("/about")}
          className={
            location.pathname === "/about"
              ? "side_link side_active_link"
              : "side_link"
          }
        >
          About
        </div>
        <div
          onClick={() => navigate("/hire")}
          className={
            location.pathname === "/hire"
              ? "side_link side_active_link"
              : "side_link"
          }
        >
          Hire Worker
        </div>
        <div
          onClick={() => navigate("/contact")}
          className={
            location.pathname === "/contact"
              ? "side_link side_active_link"
              : "side_link"
          }
        >
          Contact Us
        </div>
      </div>
      <hr className="login_signup_top_link_divider_hr" />
      {!(context.account?.signup || context.account?.login) ? (
        <div className="side_login_signup_cover">
          <div className="side_login_signup_inner_cover">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className={
                location.pathname === "/login"
                  ? "side_login_link side_active_login_link"
                  : "side_login_link"
              }
            >
              Login
            </button>
            <div className="side_login_signup_divider"></div>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className={
                location.pathname === "/signup"
                  ? "side_signup_link side_active_signup_link"
                  : "side_signup_link"
              }
            >
              Signup
            </button>
          </div>
        </div>
      ) : <></>}
    </div>
  );
}
