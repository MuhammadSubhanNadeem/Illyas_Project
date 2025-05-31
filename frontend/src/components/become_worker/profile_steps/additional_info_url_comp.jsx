import React, { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { Main_context } from "../../../stores/main_store/main_store";
let urlChecker = z.string().url("Invalid Url Formate.");
export function Additional_info_url_comp(props) {
  let context = useContext(Main_context);
  let [urlFormate, setUrlFormate] = useState(false);
  let [userUrl, setUserUrl] = useState("false");
  function linkInputChangeHandler(defs) {
    console.log(defs.target.value);

    let urlStatus = urlChecker.safeParse(defs.currentTarget.value);
    context?.uiStates?.setWorkerProfileData((prev) => {
      return {
        ...prev,
        social_link: {
          ...prev.social_link,
          [props.iconTitle]: defs.target.value,
        },
      };
    });
    setUrlFormate(urlStatus.success);
    if (urlStatus.success) {
      setUserUrl(defs.currentTarget.value);
    }
  }
  return (
    <>
      <div className="relative w-full h-[40px] flex items-center justify-between gap-[15px]">
        <a
          href={props.iconLink}
          target="_blank"
          className="w-fit h-fit cursor-pointer"
          title={props.iconTitle}
        >
          {props.userLinkSvg}
        </a>
        <input
          type="text"
          onChange={linkInputChangeHandler}
          name={props.fieldName}
          value={
            context?.uiStates?.workerProfileData?.social_link[
              props.iconTitle
            ] || ""
          }
          className="w-full h-[40px] border-[2px] border-main_website_color_1 outline-none pl-[15px] rounded-[5px] user_profession"
          placeholder={props.inputPlaceHolder}
        />
        <button
          type="button"
          disabled={!urlFormate}
          onClick={() => {
            if (urlFormate) {
              window.open(userUrl, "_blank", "noopener,noreferrer");
            }
          }}
          className="absolute w-[80px] h-[80%] text-top_nav_second_color text-[14px] font-black top-[50%] right-[5px] -translate-y-[50%] bg-main_website_color_1 rounded-[5px] cursor-pointer disabled:bg-[rgba(0,0,0,0.45)] disabled:cursor-default"
        >
          Visit Url
        </button>
      </div>
    </>
  );
}
