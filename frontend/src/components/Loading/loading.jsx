import React from "react";
import Lottie from "lottie-react";
import LoadingAnimation from "../../assets/animations/lottie/loading_animation.json";
function Loading(props) {
  return (
    <div className="fixed w-full min-h-full max-h-auto z-[500] bg-[rgba(0,0,0,0.45)] flex items-center border justify-center top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] pointer-events-none">
      <div className="flex flex-col w-fit h-fit items-center justify-center gap-8">
        <Lottie
          animationData={LoadingAnimation}
          loop={true}
          autoPlay={false}
          className="w-[120px]"
        />
        <p className="text-[20px] font-font_family_lato font-light text-top_nav_second_color">{props.loadingMessage}</p>
      </div>
    </div>
  );
}

export default Loading;
