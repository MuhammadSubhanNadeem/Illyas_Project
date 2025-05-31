import React, { useContext, useEffect } from "react";
import defaultImg from "../../../assets/images/default_Images/defaultPic_cropped.webp";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Main_context } from "../../../stores/main_store/main_store";

export function OrderShowBox(props) {
  const context = useContext(Main_context);
  const navigator = useNavigate();
  async function cancelOrderHandler(orderId) {
    context.uiStates.setLoadingState(true);
    try {
      let response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/cancel_order`,
        { orderId },
        { withCredentials: true }
      );
      context.uiStates.setLoadingState(false);
      return response.data;
    } catch (error) {
      return error;
    }
  }
  useEffect(() => {
    console.log(context?.account?.user_id, props.orderFrom);
  }, []);
  let cancelOrderMutation = useMutation({
    mutationFn: (orderId) => {
      cancelOrderHandler(orderId);
    },
    mutationKey: ["cancelOrder"],
  });
  async function completeOrderHandler() {
    let response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/complete_order`,
      { orderId: props.orderId },
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
  async function acceptOrderHandler() {
    let response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/accept_order`,
      { orderId: props.orderId },
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
  return (
    // <>
    //   <div className="relative w-full h-full flex flex-col items-start justify-start bg-main_website_color_1 p-[15px] gap-[10px] rounded-[8px]">
    //     <span className={`absolute top-[10px] right-[15px] font-semibold text-[17px] ${props.status === "pending" ? 'text-amber-200' : props.status === "cancel" ? 'text-red-500': props.status === "accept" ? 'text-sky-500' : 'text-green-400'} decoration-clone flex items-center justify-center gap-[5px] capitalize`}><span className={`w-[5px] h-[5px] ${props.status === "pending" ? 'bg-amber-200' : props.status === "cancel" ? 'bg-red-500': props.status === "accept" ? 'bg-sky-500': 'bg-green-400'} rounded-full inline-block`}></span>{props.status}</span>
    //     <h1 className="text-[22px] text-top_nav_second_color font-black">
    //       {props.type}
    //     </h1>
    //     <p className="text-top_nav_second_color/70 ">{props.description}</p>
    //     <div className="w-full h-fit flex items-center justify-end">
    //       {props.status === "pending" ? <span className="text-top_nav_second_color font-bold text-[22px] mr-[35px]">
    //         {props.price}$
    //       </span> : <span className="h-[35px] inline-block"></span>}
    //     </div>
    //     <div className="w-full h-fit flex items-center justify-start gap-[15px] mt-[0px]">
    //       <div className="w-[65px] h-[65px] rounded-full border-2 border-top_nav_second_color/50 flex items-center justify-center overflow-hidden">
    //         <img src={props.dp ? `https://res.cloudinary.com/dgazver6h/image/upload/userDp/${eachOrder?.orderToDp}` : defaultImg} alt="Client Dp" />
    //       </div>
    //       <div className="w-fit h-full flex flex-col items-start justify-center">
    //         <h3 className="text-top_nav_second_color font-bold text-[18px] cursor-default">
    //           {props.clientName}
    //         </h3>
    //         <h3 className="text-top_nav_second_color/75 text-[18px] font-light">
    //           {props.profession}
    //         </h3>
    //       </div>
    //       <button
    //         type="button"
    //         onClick={() => {
    //           navigator("/contact");
    //         }}
    //         className="px-[25px] py-[5px] border-2 border-top_nav_second_color rounded-[7px] text-top_nav_second_color font-medium cursor-pointer ml-[15px] transition-all duration-150 hover:bg-top_nav_second_color/5"
    //         title="Contact to Client"
    //       >
    //         Contact
    //       </button>
    //       {props.status === "pending" ? <button
    //         type="button"
    //         onClick={() => {
    //           cancelOrderMutation.mutate(props.orderId);
    //         }}
    //         title="Accept Client Order"
    //         className="px-[25px] py-[7px] rounded-[8px] bg-red-500 font-medium text-[18px] cursor-pointer ml-auto text-white"
    //       >
    //         Cancel Order
    //       </button> : <span className="text-top_nav_second_color font-bold text-[22px] ml-auto">
    //         {props.price}$
    //       </span>}
    //       {props.status === "accept" && context?.account?.user_id === props.orderFrom ? <button
    //           type="button"
    //           onClick={() => {completeOrderHandler(props.orderId)}}
    //           title="Cancel Client Order"
    //           className="px-[25px] py-[7px] rounded-[8px] bg-top_nav_second_color font-medium text-[18px] cursor-pointer"
    //         >
    //           Complete Order
    //         </button> : null}
    //       {context?.account?.user_id !== props.orderFrom && props.status === "pending" ? (
    //         <button
    //           type="button"
    //           onClick={() => {acceptOrderHandler(props.orderId)}}
    //           title="Cancel Client Order"
    //           className="px-[25px] py-[7px] rounded-[8px] bg-top_nav_second_color font-medium text-[18px] cursor-pointer"
    //         >
    //           Accept Order
    //         </button>
    //       ) : null}
    //     </div>
    //     <div className="w-full h-fit flex items-center justify-end">
    //       <span className="text-top_nav_second_color/60">{props.dateTime}</span>
    //     </div>
    //   </div>
    // </>
    <div className="relative w-full h-full flex flex-col items-start justify-start bg-main_website_color_1 p-[15px] gap-[10px] rounded-[8px]">
      {/* STATUS */}
      <span
        className={`absolute top-[10px] right-[15px] font-semibold text-[17px] ${
          props.status === "pending"
            ? "text-amber-200"
            : props.status === "cancel"
            ? "text-red-500"
            : props.status === "accept"
            ? "text-sky-500"
            : "text-green-400"
        } decoration-clone flex items-center justify-center gap-[5px] capitalize`}
      >
        <span
          className={`w-[5px] h-[5px] ${
            props.status === "pending"
              ? "bg-amber-200"
              : props.status === "cancel"
              ? "bg-red-500"
              : props.status === "accept"
              ? "bg-sky-500"
              : "bg-green-400"
          } rounded-full inline-block`}
        ></span>
        {props.status}
      </span>

      {/* TYPE */}
      <h1 className="text-[22px] text-top_nav_second_color font-black">
        {props.type}
      </h1>

      {/* DESCRIPTION */}
      <p className="text-top_nav_second_color/70">{props.description}</p>

      {/* PRICE - Before User Info */}
      <div className="w-full flex justify-end items-center mt-auto">
        {props.status === "pending" && (
          <span className="text-top_nav_second_color font-bold text-[22px]">
            {props.price}$
          </span>
        )}
      </div>

      {/* CLIENT INFO + IMAGE & BUTTONS */}
      <div className="w-full flex flex-wrap items-center justify-between gap-[15px] mt-[0px]">
        {/* User Info */}
        <div className="flex flex-wrap items-center gap-[15px] w-full sm:w-auto">
          <div className="w-[65px] h-[65px] rounded-full border-2 border-top_nav_second_color/50 flex items-center justify-center overflow-hidden">
            <img
              src={
                props.dp
                  ? `https://res.cloudinary.com/dgazver6h/image/upload/userDp/${props.dp}`
                  : defaultImg
              }
              alt="Client Dp"
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <h3 className="text-top_nav_second_color font-bold text-[18px] cursor-default">
              {props.clientName}
            </h3>
            <h3 className="text-top_nav_second_color/75 text-[18px] font-light">
              {props.profession}
            </h3>
          </div>
        </div>

        {/* Contact Button */}
        <div className="flex justify-start w-full sm:w-auto">
          <button
            type="button"
            onClick={() =>
              navigator(
                `/messages/${
                  props?.isProject ? props?.orderTo : props?.orderFrom
                }`
              )
            }
            className="px-[25px] py-[5px] border-2 border-top_nav_second_color rounded-[7px] text-top_nav_second_color font-medium cursor-pointer transition-all duration-150 hover:bg-top_nav_second_color/5 mt-[10px] sm:mt-0"
            title="Contact to Client"
          >
            Contact
          </button>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-[10px] w-full sm:w-auto justify-end sm:ml-auto">
          {props.status === "pending" ? (
            <button
              type="button"
              onClick={() => {
                cancelOrderMutation.mutate(props.orderId);
                props.mutation.mutate();
              }}
              title="Cancel Client Order"
              className="px-[25px] py-[7px] rounded-[8px] bg-red-500 font-medium text-[18px] cursor-pointer text-white"
            >
              Cancel Order
            </button>
          ) : null}

          {context?.account?.user_id !== props.orderFrom &&
          props.status === "pending" ? (
            <button
              type="button"
              onClick={() => {
                acceptOrderHandler(props.orderId);
                props.mutation.mutate();
              }}
              title="Accept Client Order"
              className="px-[25px] py-[7px] rounded-[8px] bg-top_nav_second_color font-medium text-[18px] cursor-pointer"
            >
              Accept Order
            </button>
          ) : null}

          {props.status === "accept" &&
          context?.account?.user_id === props.orderFrom ? (
            <button
              type="button"
              onClick={() => {
                completeOrderHandler(props.orderId);
                props.mutation.mutate();
              }}
              title="Complete Client Order"
              className="px-[25px] py-[7px] rounded-[8px] bg-top_nav_second_color font-medium text-[18px] cursor-pointer"
            >
              Complete Order
            </button>
          ) : null}
        </div>
      </div>

      {/* DATE - Always at the bottom */}
      <div className="w-full flex justify-end items-center mt-[15px] sm:order-4">
        <span className="text-top_nav_second_color/60">{props.dateTime}</span>
      </div>
    </div>
  );
}
