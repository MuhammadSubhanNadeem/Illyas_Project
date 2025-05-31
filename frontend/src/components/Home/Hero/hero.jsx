import { useContext, useRef } from "react";
import { Main_context } from "../../../stores/main_store/main_store";
import { Benefits } from "./benefits";
import globalAnimation from "./animation/global_animation.json";
import interfaceAnimation from "./animation/interface_animation.json";
import verifyAnimation from "./animation/verified_animation.json";
import { useNavigate } from "react-router";
export function Hero() {
  let context = useContext(Main_context);
  const navigator = useNavigate();
  // let hero_top_search_bar_suggestions_cover = useRef(null);
  let hero_top_search_bar_input_icon_cover = useRef(null);
  function search_value_clicked(defs) {
    context.refs.home_refs.hero_refs.top_search_bar_ref.value =
      defs.target.textContent;
    context.refs.home_refs.hero_refs.top_search_bar_ref.focus();
  }
  return (
    // <section id="hero_section" className="w-full min-h-[100vh]">
    //   <div className="relative w-full max-w-[1440px] h-full min-h-auto flex flex-col justify-center items-center gap-[15px]">
    //     <div className="hero_img_div w-[calc(100%-70px)] min-h-[60vh]">
    //       <div className="hero_img_div_cover_box"></div>
    //       <h1 className="hero_top_heading">Workers Done Your Work</h1>
    //       <div className="hero_top_search_bar_cover">
    //         <div className="hero_top_search_bar_input_cover">
    //           <input
    //             type="text"
    //             className="hero_top_search_bar_input"
    //             ref={(reference) => {
    //               context.refs.home_refs.hero_refs.top_search_bar_ref =
    //                 reference;
    //             }}
    //             placeholder="Search for services, e.g., Electrician"
    //             onFocus={() => {
    //               hero_top_search_bar_input_icon_cover.current.style.border =
    //                 "2px solid orange";
    //             }}
    //             onBlur={() => {
    //               hero_top_search_bar_input_icon_cover.current.style.border =
    //                 "2px solid gray";
    //             }}
    //           />
    //           <button
    //             type="button"
    //             className="hero_top_search_bar_input_icon_cover"
    //             onClick={() => {
    //               navigator("/hire");
    //             }}
    //             title="Search"
    //             ref={hero_top_search_bar_input_icon_cover}
    //           >
    //             <svg
    //               viewBox="0 0 16 16"
    //               className="hero_top_search_bar_input_icon"
    //             >
    //               <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
    //             </svg>
    //           </button>
    //         </div>
    //         <div
    //           className="hero_top_search_bar_suggestions_cover"
    //           ref={hero_top_search_bar_suggestions_cover}
    //         >
    //           <span
    //             className="hero_top_search_bar_suggestion"
    //             onClick={search_value_clicked}
    //           >
    //             Plumber
    //           </span>
    //           <span
    //             className="hero_top_search_bar_suggestion"
    //             onClick={search_value_clicked}
    //           >
    //             Electrician
    //           </span>
    //           <span
    //             className="hero_top_search_bar_suggestion"
    //             onClick={search_value_clicked}
    //           >
    //             Helper
    //           </span>
    //           <span
    //             className="hero_top_search_bar_suggestion"
    //             onClick={search_value_clicked}
    //           >
    //             Web Developer
    //           </span>
    //           <span
    //             className="hero_top_search_bar_suggestion"
    //             onClick={search_value_clicked}
    //           >
    //             Engineer
    //           </span>
    //         </div>
    //       </div>
    //       <p className="hero_top_sub_heading">
    //         Find and hire highly skilled professionals to complete your tasks
    //         with speed and precision
    //       </p>
    //     </div>
    //     <div className="benefits_main_div">
    //       <Benefits
    //         lottieAnimation={globalAnimation}
    //         heading="Global Access"
    //         disc={
    //           <>
    //             We Provide Our Services on Local <br /> & Global Level
    //           </>
    //         }
    //       />
    //       <Benefits
    //         lottieAnimation={interfaceAnimation}
    //         heading="Simple Interface"
    //         disc={
    //           <>
    //             Our Platform is Easy to Use & <br /> Easy to Understand
    //           </>
    //         }
    //       />
    //       <Benefits
    //         lottieAnimation={verifyAnimation}
    //         heading="Verified Workers"
    //         disc={
    //           <>
    //             We Assure that Workers are Skilled <br /> & Authentic
    //           </>
    //         }
    //       />
    //       <Benefits
    //         lottieAnimation={globalAnimation}
    //         heading="Global Access"
    //         disc="We Provide Our Services on Global Level"
    //       />
    //     </div>
    //   </div>
    // </section>
    <section
      id="hero_section"
      className="w-full bg-[var(--main_website_color_2)] flex flex-col items-center justify-start gap-4 border-b-4 border-red-500"
      style={{
        minHeight: "calc(100vh - var(--top_nav_height))",
        height: "fit-content",
      }}
    >
      <div className="relative w-full max-w-[1440px] h-full flex flex-col items-center gap-4 pb-[35px] box-border">
        {/* Hero Image Container */}
        <div
          className="relative w-[calc(100%-70px)] min-h-[60vh] bg-[url('../assets/images/hero/hero_1.webp')] 
                bg-cover bg-center flex flex-col items-center justify-center rounded-[35px] overflow-hidden
                mx-[35px] mt-[35px] md:w-[calc(100%-40px)] md:mx-[20px] sm:w-[calc(100%-30px)] sm:mx-[15px]"
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-75 transition-opacity duration-300 hover:opacity-100 z-0"></div>

          {/* Main Heading */}
          <h1
            className="absolute top-[12%] left-1/2 -translate-x-1/2 text-[var(--top_nav_second_color)] text-4xl 
                     font-[var(--font_family_lato)] z-[2] whitespace-nowrap
                     md:text-3xl sm:text-2xl xs:text-xl"
          >
            Workers Done Your Work
          </h1>

          {/* Search Container */}
          <div
            className="z-[2] w-[45%] mt-[35px] flex flex-col items-center gap-4
                    md:w-[60%] sm:w-[80%] xs:w-[95%]"
          >
            {/* Search Input */}
            <div className="w-full flex">
              <input
                type="text"
                ref={(reference) => {
                  context.refs.home_refs.hero_refs.top_search_bar_ref =
                    reference;
                }}
                className="w-[calc(100%-75px)] h-[45px] rounded-l-lg border-2 border-r-0 border-gray-500 
                     bg-white/65 pl-4 text-lg outline-none transition-all duration-300
                     focus:border-[var(--top_nav_second_color)]
                     md:h-[40px] md:text-base sm:h-[35px] sm:text-sm"
                onFocus={() => {
                  hero_top_search_bar_input_icon_cover.current.style.border =
                    "2px solid orange";
                }}
                onBlur={() => {
                  hero_top_search_bar_input_icon_cover.current.style.border =
                    "2px solid gray";
                }}
                placeholder="Search for services, e.g., Electrician"
              />
              <button
                type="button"
                className="w-[75px] h-[45px] bg-[var(--top_nav_second_color)] border-2 border-l-0 border-gray-500 
                      rounded-r-lg flex items-center justify-center transition-all duration-100
                      md:h-[40px] md:w-[80px] sm:h-[35px] sm:w-[65px]"
                ref={hero_top_search_bar_input_icon_cover}
                title="Search"
                onClick={() => {
                  navigator("/hire");
                }}
              >
                <svg
                  viewBox="0 0 16 16"
                  className="w-[22px] fill-white transition-transform duration-500"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </button>
            </div>

            {/* Search Suggestions */}
            <div
              className="w-full flex justify-evenly flex-wrap gap-2
                      sm:gap-1 sm:text-sm xs:text-xs"
            >
              {[
                "Electrician",
              ].map((item) => (
                <span
                  key={item}
                  onClick={search_value_clicked}
                  className="text-white underline cursor-pointer hover:text-[var(--top_nav_second_color)]"
                >
                  {item}
                </span>
              ))}
              {/* {[
                "Plumber",
                "Electrician",
                "Helper",
                "Web Developer",
                "Engineer",
              ].map((item) => (
                <span
                  key={item}
                  onClick={search_value_clicked}
                  className="text-white underline cursor-pointer hover:text-[var(--top_nav_second_color)]"
                >
                  {item}
                </span>
              ))} */}
            </div>
          </div>

          {/* Sub Heading */}
          <p
            className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[var(--top_nav_second_color)] 
                  text-base w-[80%] text-center font-[var(--font_family_lato)]
                  md:text-sm sm:text-xs sm:w-[90%]"
          >
            Find and hire highly skilled professionals to complete your tasks
            with speed and precision
          </p>
        </div>

        {/* Benefits Container */}
        <div
          className="w-[calc(100%-70px)] flex flex-wrap justify-center gap-4 
                  md:gap-3 sm:gap-2 sm:w-[calc(100%-30px)]"
        >
          {[
            {
              lottie: globalAnimation,
              heading: "Global Access",
              disc: "We Provide Our Services on Local & Global Level",
            },
            {
              lottie: interfaceAnimation,
              heading: "Simple Interface",
              disc: "Our Platform is Easy to Use & Understand",
            },
            {
              lottie: verifyAnimation,
              heading: "Verified Workers",
              disc: "We Assure that Workers are Skilled & Authentic",
            },
            {
              lottie: globalAnimation,
              heading: "Global Access",
              disc: "We Provide Our Services on Global Level",
            },
          ].map((benefit, index) => (
            <Benefits
              key={index}
              lottieAnimation={benefit.lottie}
              heading={benefit.heading}
              disc={benefit.disc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
