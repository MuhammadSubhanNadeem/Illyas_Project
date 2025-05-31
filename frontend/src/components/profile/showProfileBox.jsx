import { useContext } from "react";
import { Main_context } from "../../stores/main_store/main_store";
import defaultDp from "../../assets/images/default_Images/defaultPic_cropped.webp";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";

export function ShowProfileBox() {
  let context = useContext(Main_context);
  let navigator = useNavigate();
  function userDpClick() {
    context.uiStates.setUserClickDp((prev) => !prev);
  }
  async function logoutHandler() {
    context.uiStates.setUserClickDp((prev) => !prev);
    let request = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/logout?logout=true`, {
      withCredentials: true,
    });
    console.log(request);
    if (request.data?.success) {
      console.log("hi");
      
      context.setAccount({
          login: false,
          signup: false,
          user_id: "",
          user_name: "",
          user_email: "",
          user_password: "",
          userDp: defaultDp,
        })
    } else{
      navigator('/')
      alert("Logout Failed! Try again later.");
    }
  }
  return (
    <>
      <div className="absolute w-[190px] h-fit bg-main_website_color_1 z-10 top-[110%] right-0 py-[20px] flex gap-[15px] flex-col items-start justify-start rounded-[10px]">
        <NavLink
          to={"/profile"}
          onClick={userDpClick}
          className={({ isActive }) =>
            !isActive
              ? "w-full h-[35px] pl-[20px] bg-transparent transition-all duration-150 ease-in hover:bg-[rgba(128,128,128,0.35)] content-center font-font_family_lato text-[rgba(255,255,255,0.7)] hover:text-[white]"
              : "w-full h-[35px] pl-[20px] transition-all duration-150 ease-in bg-[rgba(128,128,128,0.35)] content-center font-font_family_lato text-top_nav_second_color border-l-[3px] border-top_nav_second_color border-solid font-semibold"
          }
        >
          Profile
        </NavLink>
        <NavLink
          to={"/order"}
          onClick={userDpClick}
          className={({ isActive }) =>
            !isActive
              ? "w-full h-[35px] pl-[20px] bg-transparent transition-all duration-150 ease-in hover:bg-[rgba(128,128,128,0.35)] content-center font-font_family_lato text-[rgba(255,255,255,0.7)] hover:text-[white]"
              : "w-full h-[35px] pl-[20px] transition-all duration-150 ease-in bg-[rgba(128,128,128,0.35)] content-center font-font_family_lato text-top_nav_second_color border-l-[3px] border-top_nav_second_color border-solid font-semibold"
          }
        >
          Orders
        </NavLink>
        <NavLink
          to={"/messages"}
          onClick={userDpClick}
          className={({ isActive }) =>
            !isActive
              ? "w-full h-[35px] pl-[20px] bg-transparent transition-all duration-150 ease-in hover:bg-[rgba(128,128,128,0.35)] content-center font-font_family_lato text-[rgba(255,255,255,0.7)] hover:text-[white]"
              : "w-full h-[35px] pl-[20px] transition-all duration-150 ease-in bg-[rgba(128,128,128,0.35)] content-center font-font_family_lato text-top_nav_second_color border-l-[3px] border-top_nav_second_color border-solid font-semibold"
          }
        >
          Messages
        </NavLink>
        <NavLink
          to={"/admin"}
          onClick={userDpClick}
          className={({ isActive }) =>
            !isActive
              ? "w-full h-[35px] pl-[20px] bg-transparent transition-all duration-150 ease-in hover:bg-[rgba(128,128,128,0.35)] content-center font-font_family_lato text-[rgba(255,255,255,0.7)] hover:text-[white]"
              : "w-full h-[35px] pl-[20px] transition-all duration-150 ease-in bg-[rgba(128,128,128,0.35)] content-center font-font_family_lato text-top_nav_second_color border-l-[3px] border-top_nav_second_color border-solid font-semibold"
          }
        >
          Admin
        </NavLink>
        <NavLink
          to={"/login"}
          onClick={logoutHandler}
          className={({ isActive }) =>
            !isActive
              ? "w-full h-[35px] pl-[20px] bg-transparent transition-all duration-150 ease-in hover:bg-[rgba(128,128,128,0.35)] content-center font-font_family_lato text-[rgba(255,255,255,0.7)] hover:text-[white]"
              : "w-full h-[35px] pl-[20px] transition-all duration-150 ease-in bg-[rgba(128,128,128,0.35)] content-center font-font_family_lato text-top_nav_second_color border-l-[3px] border-top_nav_second_color border-solid font-semibold"
          }
        >
          Logout
        </NavLink>
      </div>
    </>
  );
}
