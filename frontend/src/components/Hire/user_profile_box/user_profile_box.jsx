import React, { useContext } from "react";
import user_dp from "../../../assets/images/hire/bike_repairing.jpg";
import { Link } from "react-router";
import { Main_context } from "../../../stores/main_store/main_store";
export function User_profile_box(props) {
  const context = useContext(Main_context);
  return (
    <>
      {context.uiStates.workerProfileData.id !== props.workerId ? (
        <Link
          key={props.compKey}
          to={`/workerProfile/${props.workerId}`}
          className="hire_user_profile_box_cover"
          title={props.userDesc}
        >
          <div className="hire_user_profile_img_box">
            <img src={props.userBanner} alt="Shop Photo" />
          </div>
          <div className="hire_user_profile_bottom_div">
            <div className="hire_user_profile_bottom_detail_cover mt-[10px]">
              <div className="hire_user_profile_dp min-w-[35px] min-h-[35px]">
                <img
                  src={props.userDp || undefined}
                  className="w-full h-full object-cover"
                  alt="User Dp"
                />
              </div>
              <div className="hire_user_profile_name">{props.userName}</div>
            </div>
            <h1 className="hire_user_profile_title line-clamp-1">
              {props.heading}
            </h1>
            <pre className="hire_user_profile_pricing">
              From {"  "}
              {props.userPricing} RS / day
            </pre>
          </div>
        </Link>
      ) : (
        <>
        {/* {context.uiStates.allWorkersProfileData.length <= 1 ? (<h1>No Worker Found Yet</h1>): null} */}
        </>
      )}
    </>
  );
}
