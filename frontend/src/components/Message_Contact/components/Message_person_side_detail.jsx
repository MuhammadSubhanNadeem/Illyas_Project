import React, { useContext, useState } from "react";
import { Main_context } from "./../../../stores/main_store/main_store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import defaultDp from "../../../assets/images/default_Images/defaultPic_cropped.webp";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function Message_person_side_detail(props) {
  const context = useContext(Main_context);
  console.log(props, "slkjhsdf");
  let navigator = useNavigate();

  // async function getContactMessagesFunc() {
  //   let response = await axios.get(
  //     `${import.meta.env.VITE_BACKEND_URL}/get-messages?userId=${props?.userPersonId}&contactId=${props?.contactPersonId}`,
  //     {
  //       withCredentials: true,
  //     }
  //   );
  //   console.log(response.data);

  //   context.uiStates.setSelectedContactMessageData((perv) => {
  //     return {...response.data}
  //   })
  //   return response.data;
  // }
  // const getContactMessages = useQuery({
  //   queryKey: ["contactMessages", props?.contactPersonId, props?.userPersonId],
  //   queryFn: getContactMessagesFunc,
  //   enabled: false,
  // });
  function handleMessageRoute() {
    navigator(`/messages/${props?.contactPersonId}`);
  }
  return (
    <div
      onClick={() => {
        handleMessageRoute();
        context.uiStates.setSelectedContact(props?.contactPersonId);
        context.uiStates.setSelectedContactData({
          contactName: props.personName,
          workerId: props.workerId,
          contactDp: props.personDp ? `https://res.cloudinary.com/dgazver6h/image/upload/userDp/${props.personDp}` : defaultDp,
          contactProfession: props.personProfession,
        });
        // props?.userPersonId && props?.contactPersonId
        //   ? getContactMessages.refetch()
        //   : null;
      }}
      className="w-[calc(100%-30px)] h-[65px] flex items-center justify-center gap-[15px] bg-main_website_color_1 py-[5px] px-[15px] cursor-pointer group rounded-[8px]"
    >
      <span className="w-[45px] h-[45px] flex items-center justify-center rounded-full overflow-hidden">
        <img
          src={props.personDp ? `https://res.cloudinary.com/dgazver6h/image/upload/userDp/${props.personDp}` : defaultDp}
          className="w-full h-full object-cover"
          alt="userDp"
        />
      </span>
      <div className="w-[calc(100%-55px)] h-full flex flex-col items-center justify-start overflow-hidden">
        <h3 className="w-full h-fit text-[20px] font-semibold text-top_nav_second_color overflow-hidden underline-offset-2 decoration-1 text-nowrap overflow-ellipsis group-hover:underline">
          {props.personName}
        </h3>
        <h6 className="w-full h-fit text-[15px] font-light text-[rgba(255,255,255,0.6)]">
          {props.personProfession}
        </h6>
      </div>
    </div>
  );
}
