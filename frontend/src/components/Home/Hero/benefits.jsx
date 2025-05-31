// import React, { useRef } from "react";
// import Lottie from "lottie-react";
// export function Benefits(props) {
//   return (
//     // <>
//     //   <div className="benefit_box" onMouseEnter={() => {global_animation.current.goToAndPlay(0)}}>
//     //     <div className="benefit_box_animation">
//     //       <Lottie lottieRef={global_animation} animationData={props.lottieAnimation} loop={false} renderer="svg" />
//     //     </div>
//     //     <h1 className="benefit_box_heading">{props.heading}</h1>
//     //     <p className="benefit_box_disc">{props.disc}</p>
//     //   </div>
//     // </>

//   );
// }

import React, { useRef } from "react";
import Lottie from "lottie-react";

export function Benefits(props) {
  const global_animation = useRef(null);

  return (
    <div
      // className="w-[calc(100%-70px)] h-[calc(40%-70px)] flex flex-wrap items-end justify-center gap-4
      className="grow h-fit basis-[280px] flex flex-wrap items-end justify-center gap-4
                  sm:w-[calc(100%-30px)] sm:gap-2 "
    >
      <div
        className="flex-grow flex-shrink basis-[280px] min-w-[280px] h-full bg-[rgba(27,37,41,1)] py-[15px] 
                backdrop-blur-[50px] rounded-[35px] pl-6 shadow-[0_0_20px_var(--main_website_color_1)] 
                border-2 border-[var(--main_website_color_2)] flex flex-col items-start overflow-hidden 
                relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 
                before:-translate-x-1/2 before:-translate-y-1/2 before:opacity-0 before:w-[20%] 
                before:h-[50%] before:rounded-full before:bg-[rgba(255,166,0,0.75)] before:blur-[50px] 
                before:transition-all before:duration-300 hover:before:opacity-100
                md:min-w-[240px] sm:min-w-[160px] sm:rounded-[20px] sm:pl-4 benefit_box"
        onMouseEnter={() => {
          global_animation.current.goToAndPlay(0);
        }}
      >
        <div className="w-[80px] h-[80px] mt-[5px] sm:w-[60px] sm:h-[60px]">
          <Lottie
            lottieRef={global_animation}
            animationData={props.lottieAnimation}
            loop={false}
            renderer="svg"
          />
        </div>

        <h1
          className="text-[22px] font-[var(--font_family_lato)] text-[var(--top_nav_second_color)] 
                    mt-[10px] font-bold md:text-[20px] sm:text-[18px]"
        >
          {props.heading}
        </h1>

        <p
          className="w-[70%] text-white font-light text-[14px] mt-[15px] font-[var(--font_family_lato)] 
                  sm:w-[90%] sm:text-[12px]"
        >
          {props.disc}
        </p>
      </div>
    </div>
  );
}

// Benefits container parent component
// export function BenefitsContainer({ children }) {
//   return (
//     <div className="w-[calc(100%-70px)] h-[calc(40%-70px)] flex flex-wrap items-end justify-center gap-4
//                   sm:w-[calc(100%-30px)] sm:gap-2">
//       {children}
//     </div>
//   );
// }
