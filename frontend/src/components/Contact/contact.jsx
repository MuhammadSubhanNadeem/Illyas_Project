import React, { useRef, useState } from "react";
import { Footer } from "../Footer/footer";
import { motion, AnimatePresence, color } from "motion/react";
import axios from "axios";
import Loading from "../Loading/loading";
export function Contact() {
  const copiedSvg = useRef(null);
  const copySvg = useRef(null);
  const contactForm = useRef(null);
  const [contactMessageState, setContactMessageState] = useState(false);
  async function contactFormSubmit(defs) {
    defs.preventDefault();
    setContactMessageState(true);
    let contactFormDataInstance = new FormData(contactForm.current);
    let contactFormData = Object.fromEntries(contactFormDataInstance);
    let contactResponse = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/contact-message`,
      contactFormData,
      {
        withCredentials: true,
      }
    );
    console.log(contactResponse);
    if (
      contactResponse.data.dataStructure &&
      !contactResponse.data.error &&
      contactResponse.data.dataStored
    ) {
      setContactMessageState(false);
      contactForm.current.reset();
      window.alert("Message Send Successfully!");
    } else {
      setContactMessageState(false);
    }
  }

  return (
    <>
      <section className="w-full h-[calc(100%-70px)] min-h-[760px] flex items-center justify-center bg-main_website_color_2">
        <div className="w-full max-w-[1440px] min-w-[320px] h-full py-[75px] flex flex-col items-center justify-start gap-[50px] max-[1440px]:px-[75px] max-[1024px]:px-[35px] max-[768px]:px-[15px]">
          <div className="relative w-full h-fit">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.75, delay: 0.25, ease: "circOut" }}
              exit={{ width: "0%", transition: { duration: 0.45, delay: 0 } }}
              className="absolute h-[2px] bg-[rgba(255,255,255,0.35)] rounded-[50px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-0"
            ></motion.div>
            <h1 className="absolute text-top_nav_second_color text-nowrap text-[42px] font-black font-font_family_lato px-3 bg-main_website_color_2 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] select-none max-[1440px]:text-[36px] max-[1024px]:text-[30px] max-[768px]:text-[28px] max-[425px]:text-[22px]">
              Contact Page
            </h1>
          </div>
          <div className="w-full h-full bg-main_website_color_1 rounded-[10px] flex items-center justify-center overflow-hidden">
            <div className="w-[360px] h-full bg-top_nav_second_color py-[35px] px-[15px] flex flex-col items-center justify-start max-[1440px]:w-[320px] max-[1024px]:w-[280px] max-[768px]:hidden">
              <h2 className="text-main_website_color_1 font-black text-[32px] select-none max-[1440px]:text-[28px] max-[1024px]:text-[26px] max-[768px]:text-[22px]">
                Contact Details
              </h2>
              <p className="w-full h-fit mt-[5px] text-main_website_color_1 text-[16px] select-none text-center">
                Fill this form and our team will contact soon regarding to your
                message.
              </p>
              <div className="relative w-full h-fit mt-[65px]">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.75, delay: 0.5, ease: "circOut" }}
                  exit={{
                    width: "0%",
                    transition: { duration: 0.45, delay: 0 },
                  }}
                  className="absolute h-[2px] bg-main_website_color_2 rounded-[50px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-0"
                ></motion.div>
                <h1 className="absolute text-main_website_color_2 text-[20px] font-black font-font_family_lato px-3 bg-top_nav_second_color top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] select-none">
                  OR
                </h1>
              </div>
              <div className="w-full h-fit mt-[35px] flex flex-col items-center justify-start">
                <h2 className="w-full h-fit text-center text-main_website_color_2 font-font_family_lato">
                  Send Your Message Via
                </h2>
                <div className="w-full h-full flex flex-col items-start justify-start gap-[15px]">
                  <motion.span
                    initial={{ y: 45, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.85,
                      ease: "circOut",
                    }}
                    className="w-full h-full flex items-center justify-start gap-[15px] mt-[35px]"
                  >
                    <div className="w-[40px] h-[30px] rounded-[5px] bg-main_website_color_1 flex items-center justify-center">
                      <svg
                        className="w-[22px] h-[22px] fill-[white]"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
                        <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                      </svg>
                    </div>
                    <h6 className="font-bold font-font_family_lato text-main_website_color_1">
                      ilyasbhutta1515@gmail.com
                    </h6>
                    <motion.div
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.45)" }}
                      className="w-[40px] h-[40px] rounded-full relative ml-auto flex items-center justify-center cursor-pointer"
                      style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                    >
                      <motion.svg
                        whileTap={{
                          scale: 0.75,
                          transition: { duration: 0.15, ease: "circOut" },
                        }}
                        className="absolute w-[18px] h-[18px] fill-main_website_color_2"
                        viewBox="0 0 16 16"
                        ref={copySvg}
                        onMouseUp={async () => {
                          try {
                            await navigator.clipboard.writeText(
                              "sn9273671@gmail.com"
                            );

                            copySvg.current.style.display = "none";
                            copiedSvg.current.style.display = "inline-block";

                            setTimeout(() => {
                              copySvg.current.style.display = "inline-block";
                              copiedSvg.current.style.display = "none";
                            }, 1500);
                          } catch (error) {
                            console.error("Clipboard copy failed:", error);
                          }
                        }}
                      >
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                      </motion.svg>
                      <svg
                        className="absolute w-[18px] h-[18px] fill-[green]"
                        style={{ display: "none" }}
                        ref={copiedSvg}
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"
                        />
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                      </svg>
                    </motion.div>
                  </motion.span>
                </div>
              </div>
            </div>
            <div className="w-[calc(100%-360px)] h-full flex flex-col items-center justify-center max-[1440px]:w-[calc(100%-320px)] max-[1024px]:w-[calc(100%-280px)] max-[768px]:w-full">
              <form
                onSubmit={contactFormSubmit}
                ref={contactForm}
                action="#"
                className="w-full h-full pb-[50px] flex flex-col items-center justify-center max-[425px]:px-[15px]"
              >
                <h1 className="text-top_nav_second_color font-bold text-nowrap text-[32px] mb-[25px] max-[1440px]:text-[28px] max-[1024px]:text-[26px] max-[768px]:text-[22px] max-[425px]:text-[21px]">
                  Contact Form
                </h1>
                <input
                  type="text"
                  name="userName"
                  required
                  className="max-w-[360px] w-full min-w-[220px] h-[35px] border-[rgba(255,255,255,0.35)] border-[2px] rounded-[5px] pl-[10px] outline-none text-white mt-[35px]"
                  maxLength={35}
                  placeholder="Your Full Name"
                />
                <input
                  type="email"
                  name="userEmail"
                  required
                  className="max-w-[360px] w-full min-w-[220px] h-[35px] border-[rgba(255,255,255,0.35)] border-[2px] rounded-[5px] pl-[10px] outline-none text-white mt-[35px]"
                  placeholder="Your Email"
                />
                <textarea
                  name="contactMsg"
                  className="max-w-[360px] w-full min-w-[220px] h-[160px] border-[rgba(255,255,255,0.35)] border-[2px] rounded-[5px] pl-[10px] outline-none text-white resize-none text-[16px] py-[5px] mt-[35px]"
                  maxLength={500}
                  placeholder="Write Message Here"
                ></textarea>
                <button
                  type="submit"
                  className="max-w-[360px] w-full min-w-[220px] h-[35px] border-none rounded-[5px] outline-none text-main_website_color_1 resize-none bg-top_nav_second_color cursor-pointer font-black text-[18px] mt-[35px]"
                  title="Send Your Message To Our Team"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
        {contactMessageState ? (
          <Loading loadingMessage="Message Sending" />
        ) : null}
      </section>
      <Footer />
    </>
  );
}
