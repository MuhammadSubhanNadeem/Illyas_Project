import React, { useContext, useEffect, useRef, useState } from "react";
import { Message_person_side_detail } from "./components/Message_person_side_detail";
import { Main_context } from "../../stores/main_store/main_store";
import { Link, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import defaultDp from "../../assets/images/default_Images/defaultPic_cropped.webp";
import axios from "axios";
import { motion } from "motion/react";
import { Footer } from "../Footer/footer";

export function Message_Contact() {
  let { contactId } = useParams();
  let navigator = useNavigate();
  // console.log(contactId);
  // !contactMessageInput.current || contactMessageInput.current.value === ""
  let contactMessageInput = useRef(null);
  let messageContainerRef = useRef(null);
  const context = useContext(Main_context);
  const [messageTopMenu, setMessageTopMenu] = useState(false);
  const [messageSend, setMessageSend] = useState(Date.now());
  // console.log(contactId, context.uiStates.workerProfileData.id, "hi");

  async function addToContact() {
    if (contactId && contactId !== context.uiStates.workerProfileData.id) {
      console.log(
        `/add-contact?contactId=${contactId}&userId=${context.account?.user_id}`
      );

      let response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/add-contact?contactId=${contactId}&userId=${context.account?.user_id}`
      );
      console.log(response.data);
      
      return response.data;
    }
    return { status: null, dataSet: false };
  }
  async function getContactConnections() {
    let response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/contact-connections?userId=${
        context.account?.user_id
      }`
    );
    console.log(response);
    if (response.data) return response.data;
    return { status: null, dataSet: false };
  }
  let { data, isLoading, isSuccess } = useQuery({
    queryKey: ["addContact", contactId, context.account?.user_id],
    queryFn: addToContact,
    // enabled: !!context.account?.user_id,
    enabled: !!contactId && contactId !== context.uiStates.workerProfileData.id,
  });
  let {
    data: contactConnections,
    isLoading: contactConnectionsState,
    isSuccess: contactConnectionsStatus,
  } = useQuery({
    queryKey: ["contactConnections", contactId, context.account?.user_id],
    queryFn: getContactConnections,
    refetchInterval: 5000,
    enabled: !!context.account?.user_id,
  });
  // useEffect(() => {
  //   console.log(data);
  //   console.log(context.account?.user_id);
  // }, [context.account?.user_id]);
  useEffect(() => {
    console.log(context.account?.user_id, contactId, "threre");
  }, [context.account?.user_id]);
  let tempTimeoutId = null;
  let getMessageQuery = useQuery({
    queryKey: ["getMessages", contactId, messageSend],
    queryFn: getMessages,
    refetchInterval: 5000,
  });
  async function getMessages() {
    if (contactId) {
      let response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/get-messages?userId=${
          context.account.user_id
        }&contactId=${contactId}`,
        {
          withCredentials: true,
        }
      );
      context.uiStates.setSelectedContactMessageData((perv) => {
        return { ...response.data };
      });
      return response.data;
    }
    return null;
  }
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({ top: messageContainerRef.current.scrollHeight + 15, behavior: "smooth" });
    }
  }, [context.uiStates.selectedContactMessageData]);
  async function setMessage() {
    try {
      if (contactMessageInput.current.value === "") {
        tempTimeoutId ? clearTimeout(tempTimeoutId) : null;
        contactMessageInput.current.style.border = "1px solid red";
        tempTimeoutId = setTimeout(() => {
          contactMessageInput.current.style.border =
            "1px solid var(--top_nav_second_color)";
        }, 1500);
        return null;
      }
      console.log(context.uiStates.selectedContact, context.account?.user_id);
      
      let response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/set-messages`,
        {
          // userId:
          //   context.uiStates.workerProfileData.id !== ""
          //     ? context.uiStates.selectedContact
          //     : context.account?.user_id,
          // contactId:
          //   context.uiStates.workerProfileData.id !== ""
          //     ? context.account?.user_id
          //     : context.uiStates.selectedContact,
          userId: context.account?.user_id,
          contactId: context.uiStates.selectedContact,
          messageText: contactMessageInput.current.value,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      if (response.data.messageStatus) {
        setMessageSend(Date.now());
        contactMessageInput.current.value = "";
      } else {
        alert("Server Error Try Again Later!!");
      }
    } catch (error) {}
  }
  async function delContact() {
    try {
      let response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/del-contact?userId=${
          context.account.user_id
        }&contactId=${context.uiStates.selectedContact}`,
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {}
  }
  return (
    <>
      <section className="w-full h-[calc(100%-70px)] min-h-[760px] flex items-center justify-center bg-main_website_color_2">
        <div className="w-full max-w-[1440px] min-w-[320px] h-full pt-[75px] flex items-center justify-center px-[35px]">
          <div className="w-full h-fit flex items-center justify-end">
            <button type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
            </button>
          </div>
          {context.account.signup || context.account.login ? (
            <>
              <div className="min-w-[320px] max-w-[30%] w-[420px] hidden h-full border md:flex flex-col items-center justify-start gap-[15px] scroll-smooth">
                <h1 className="text-[28px] text-top_nav_second_color font-black flex flex-col items-start justify-start p-[15px]">
                  Message Accounts
                </h1>
                <div className="w-full min-h-[40px] flex items-center justify-center">
                  <input
                    type="text"
                    className="w-[calc(100%-95px)] h-full border outline-none pl-[12px] text-top_nav_second_color rounded-tl-[8px] rounded-bl-[8px] text-[17px]"
                    placeholder="Search User e.g, ( Allen Walker )"
                  />
                  <div className="w-[65px] h-full flex items-center justify-center rounded-br-[8px] rounded-tr-[8px] border-[1px] bg-top_nav_second_color border-top_nav_second_color cursor-pointer">
                    <svg
                      className="w-[22px] h-[22px] fill-main_website_color_1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                  </div>
                </div>
                <hr className="bg-top_nav_second_color border-none w-full h-[0.5px] my-[5px]" />
                <div className="w-full h-full overflow-x-hidden overflow-y-scroll no-scrollbar">
                  <div className="w-full h-auto flex flex-col items-center justify-start gap-[15px] pb-[15px]">
                    {contactConnections?.status &&
                    contactConnections?.contactConnectionsData.length > 0 ? (
                      contactConnections?.contactConnectionsData?.map(
                        (eachContact, index) => {
                          console.log(eachContact);
                          if (
                            eachContact?.username !==
                            context.uiStates.workerProfileData?.username
                          ) {
                            return (
                              <Message_person_side_detail
                                key={index}
                                contactPersonId={eachContact?._id}
                                userPersonId={context.account.user_id}
                                personName={eachContact?.username}
                                // redirectId={contactId}
                                personProfession={eachContact?.profession}
                                workerId={eachContact?.workerId}
                                personDp={eachContact?.userImageUniqueId}
                              />
                            );
                          } else {
                            return null;
                          }
                        }
                      )
                    ) : (
                      <div className="w-[calc(100%-30px)] h-[65px] flex items-center justify-center gap-[15px] bg-main_website_color_1 py-[5px] px-[15px] cursor-pointer group rounded-[8px]">
                        No Contact Found
                      </div>
                    )}

                    
                {/* <Message_person_side_detail
                  personName={context.account.user_name}
                  personProfession="Web Developer"
                  personDp={context.account.userDp}
                /> */}
                  </div>
                </div>
              </div>
              {context.uiStates.selectedContactData.contactName !== "" ? (
                <div className="max-w-[calc(100%-320px)] w-[70%] h-full border flex flex-col items-start justify-center">
                  <div className="relative w-full h-[65px] border-b-[1px] border-b-top_nav_second_color flex items-center justify-between bg-main_website_color_1">
                    <div className="w-full h-[65px] flex items-center justify-center gap-[15px] py-[5px] px-[15px] cursor-pointer group">
                      <span className="w-[50px] h-[50px] flex items-center justify-center rounded-full overflow-hidden">
                        <img
                          src={context.uiStates.selectedContactData.contactDp || defaultDp}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      </span>
                      <div className="w-[calc(100%-55px)] h-full flex flex-col items-center justify-start overflow-hidden">
                        <h3 className="w-full h-fit text-[20px] font-semibold text-top_nav_second_color overflow-hidden underline-offset-2 decoration-1 text-nowrap overflow-ellipsis group-hover:underline">
                          {context.uiStates.selectedContactData.contactName}
                        </h3>
                        <h6 className="w-full h-fit text-[15px] font-light text-[rgba(255,255,255,0.6)]">
                          {
                            context.uiStates.selectedContactData
                              .contactProfession
                          }
                        </h6>
                      </div>
                    </div>
                    <div className="w-[65px] h-[65px] flex items-center justify-center">
                      <span
                        className="w-[45px] h-[45px] flex items-center transition-all duration-150 ease-in justify-center hover:bg-top_nav_second_color rounded-full cursor-pointer group"
                        onClick={() => setMessageTopMenu(!messageTopMenu)}
                      >
                        <svg
                          className="w-[22px] h-[22px] fill-top_nav_second_color transition-all duration-150 ease-in group-hover:fill-main_website_color_1"
                          viewBox="0 0 16 16"
                        >
                          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                        </svg>
                      </span>
                    </div>
                    {messageTopMenu ? (
                      <div className="absolute w-[200px] h-fit flex flex-col gap-[10px] p-[10px] bg-main_website_color_1 bottom-0 translate-y-[calc(100%+10px)] right-[10px] rounded-[10px] shadow-md z-50">
                        <span onClick={() => {navigator(`/workerProfile/${context.uiStates?.selectedContactData?.workerId}`)}} className={`w-full h-[40px] transition-all duration-100 ease-in hover:bg-top_nav_second_color rounded-[6px] flex items-center justify-start px-[10px] cursor-pointer gap-[10px] group ${context.uiStates?.selectedContactData?.contactProfession === 'Client' ? 'hidden' : ''}`}>
                          <svg
                            className="w-[22px] h-[22px] transition-all duration-100 ease-in group-hover:fill-main_website_color_1 fill-top_nav_second_color"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                          </svg>
                          <span className="font-semibold transition-all duration-100 ease-in group-hover:text-main_website_color_1 text-top_nav_second_color text-[17px]">
                            Worker Profile
                          </span>
                        </span>
                        <span
                          onClick={delContact}
                          className="w-full h-[40px] transition-all duration-100 ease-in hover:bg-top_nav_second_color rounded-[6px] flex items-center justify-start px-[10px] cursor-pointer gap-[10px] group"
                        >
                          <svg
                            className="w-[22px] h-[22px] transition-all duration-100 ease-in group-hover:fill-main_website_color_1 fill-top_nav_second_color"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                          </svg>
                          <span className="font-semibold transition-all duration-100 ease-in group-hover:text-main_website_color_1 text-top_nav_second_color text-[17px]">
                            Delete User
                          </span>
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <div className="w-full h-[calc(100%-65px)] flex flex-col items-center justify-center">
                    <div ref={messageContainerRef} className="w-full h-[calc(100%-65px)] flex flex-col gap-[15px] p-[15px] overflow-y-scroll overflow-x-hidden no-scrollbar">
                      <div className="w-full h-auto min-h-[calc(100%-65px)] flex flex-col gap-[15px] items-start justify-start">
                        {context.uiStates.selectedContactMessageData.dataStatus
                          ? context.uiStates.selectedContactMessageData.messagesData.map(
                              (eachMessage, index) => {
                                console.log(
                                  context.account.user_id,
                                  eachMessage
                                );

                                let date = new Date(eachMessage?.createdAt);
                                const time12Hour = date.toLocaleString(
                                  "en-US",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  }
                                );
                                return (
                                  <motion.span
                                    key={index}
                                    initial={{ opacity: 0.45, scale: 0.65 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{duration: 0.3, ease: "backOut"}}
                                    exit={{ opacity: 0, scale: 0.45 }}
                                    className={`relative max-w-[520px] min-h-fit w-fit px-[10px] py-[5px] h-fit bg-main_website_color_1 text-start rounded-[7px] text-white font-semibold overflow-hidden ${
                                      context.account.user_id ===
                                      eachMessage.messageFrom
                                        ? "ml-auto"
                                        : "mr-auto"
                                    } flex flex-col`}
                                  >
                                    {eachMessage?.message}
                                    <span className="ml-auto text-[13px] font-extralight text-[rgba(255,255,255,0.65)]">
                                      {time12Hour}
                                    </span>
                                  </motion.span>
                                );
                              }
                            )
                          : null}
                      </div>
                    </div>
                    <div className="w-full h-[65px] flex items-center justify-between gap-[15px] px-[15px]">
                      <div className="w-full h-full flex items-center justify-center">
                        <input
                          ref={contactMessageInput}
                          type="text"
                          className="w-full h-[45px] transition-all duration-150 ease-in border-[1px] border-top_nav_second_color text-top_nav_second_color bg-main_website_color_1 rounded-[8px] outline-none pl-[12px] text-[16px]"
                          placeholder={`Send Message to ( ${context.account.user_name} )`}
                        />
                      </div>
                      <div className="w-fit h-full flex items-center justify-center">
                        <button
                          type="button"
                          onClick={setMessage}
                          className="w-[45px] h-[45px] rounded-full transition-all duration-100 ease-in bg-main_website_color_1 flex items-center justify-center cursor-pointer group hover:bg-top_nav_second_color"
                          title="Send Message"
                        >
                          <svg
                            className="w-[22px] h-[22px] transition-all duration-100 ease-in fill-top_nav_second_color group-hover:fill-main_website_color_1"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </>
          ) : (
            <div className="w-fit h-fit flex items-center justify-center gap-[35px]">
              <div className="w-fit h-fit flex flex-col items-center justify-center gap-[15px]">
                <h1 className="text-2xl text-[rgba(255,255,255,0.65)]">
                  You Don't Have Any Account?
                </h1>
                <Link
                  to={"/signup"}
                  className="text-[18px] text-main_website_color_2 bg-top_nav_second_color rounded-[3px] px-[20px] py-[5px] outline-none font-bold cursor-pointer"
                >
                  Create Account
                </Link>
              </div>
              <motion.div
                initial={{ height: "0" }}
                exit={{ height: 0 }}
                transition={{
                  ease: "easeOut",
                  duration: 0.35,
                }}
                animate={{
                  height: "160px",
                  transition: { duration: 0.65, ease: "easeOut" },
                }}
                className="w-[1px] bg-top_nav_second_color flex"
              ></motion.div>
              <div className="w-fit h-fit flex flex-col items-center justify-center gap-[15px]">
                <h1 className="text-2xl text-[rgba(255,255,255,0.65)]">
                  Already Have An Account?
                </h1>
                <Link
                  to={"/login"}
                  className="text-[18px] text-main_website_color_2 bg-top_nav_second_color rounded-[3px] px-[20px] py-[5px] outline-none font-bold cursor-pointer"
                >
                  Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
// profession
// :
// "Web Developer"
// userImageUniqueId
// :
// "istockphoto-1252851477-612x612-1742459788595"
// useremail
// :
// "sn9273671@gmail.com"
// username
// :
// "F23BSEEN1E02188"
