import React, { useContext, useRef, useState } from "react";
import { User_profile_box } from "./user_profile_box/user_profile_box";
import { Main_context } from "../../stores/main_store/main_store";
import { Footer } from "../Footer/footer";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import defaultDp from '../../assets/images/default_Images/defaultPic_cropped.webp';
export function Hire() {
  let store = useContext(Main_context);
  let [pageNumber, setPageNumber] = useState(1);
  let experienceFilterRef = useRef(null);
  let priceFilterRef = useRef(null);
  let locationFilterRef = useRef(null);
  let categoryFilterRef = useRef(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ["workers", pageNumber, store.uiStates.workerProfileDataFilter],
    queryFn: getAllWorkers,
    keepPreviousData: true,
  });
  async function getAllWorkers() {
    let bodyData = {
      offset: pageNumber * 20,
      filter: store.uiStates.workerProfileDataFilter,
    };
    let response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/workers_shop`,
      bodyData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
  useEffect(() => {
    let shopData = data?.workerData
      ? data?.workerData.filter((each) => each !== null)
      : [];
    store.uiStates.setAllWorkersProfileData((prev) => {
      if (shopData.length > 0) {
        return [...data.workerData];
      } else {
        return [];
      }
    });
  }, [data?.workerData]);
  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    console.log(store.uiStates.allWorkersProfileData.length > 0);
  }, [store.uiStates.allWorkersProfileData]);
  return (
    <>
      <section id="hire_filter_section">
        <div className="hire_filter_section_inner_cover">
          <div className="hire_filter_bar my-[20px] px-[15px]">
            <div className="hire_filter_left_box">
              <h1 className="hire_filter_heading w-full">Filters</h1>
              <svg viewBox="0 0 16 16" className="hire_filter_icon">
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
              </svg>
            </div>
            <div className="hire_filter_right_box gap-[35px] max-[768px]:gap-[15px]">
              <select
                id="category_filter"
                ref={categoryFilterRef}
                className="w-[140px] h-full text-[18px] max-[1024px]:text-[17px] max-[1024px]:w-[120px] max-[768px]:w-[100px] max-[768px]:text-[16px] max-[425px]:text-[13px]"
                defaultValue=""
                onChange={() => {
                  store.uiStates.setWorkerProfileDataFilter((prev) => {
                    return {
                      ...prev,
                      category: categoryFilterRef.current.value,
                    };
                  });
                }}
              >
                <option
                  value=""
                  disabled
                  style={{ color: "rgba(0, 0, 0, 0.45)" }}
                >
                  Category
                </option>
                {store.uiStates.allProfessionsList.map((eachCategory, idx) => {
                  return (
                    <option key={idx} value={eachCategory}>
                      {eachCategory}
                    </option>
                  );
                })}
              </select>
              <select
                id="location_filter"
                ref={locationFilterRef}
                className="w-[160px] h-full text-[18px] max-[1024px]:text-[17px] max-[1024px]:w-[140px] max-[768px]:w-[115px] max-[768px]:text-[16px] max-[425px]:text-[13px]"
                defaultValue=""
                onChange={() => {
                  store.uiStates.setWorkerProfileDataFilter((prev) => {
                    return {
                      ...prev,
                      location: locationFilterRef.current.value,
                    };
                  });
                }}
              >
                <option
                  value=""
                  disabled
                  style={{ color: "rgba(0, 0, 0, 0.45)" }}
                >
                  Location
                </option>
                {store.uiStates.allCountries.map((eachCountry, idx) => {
                  return (
                    <option value={eachCountry} key={idx}>
                      {eachCountry}
                    </option>
                  );
                })}
              </select>
              {/* <select
                id="price_filter"
                ref={priceFilterRef}
                className="w-[110px] h-full text-[18px] max-[1024px]:text-[17px] max-[1024px]:w-[90px] max-[768px]:w-[80px] max-[768px]:text-[16px] max-[425px]:text-[13px]"
                defaultValue=""
                onChange={() => {
                  store.uiStates.setWorkerProfileDataFilter((prev) => {
                    return { ...prev, price: priceFilterRef.current.value };
                  });
                }}
              >
                <option
                  value=""
                  disabled
                  style={{ color: "rgba(0, 0, 0, 0.45)" }}
                >
                  Price
                </option>
                <option value="20">500</option>
                <option value="50">1000</option>
                <option value="70">1500</option>
                <option value="80">2000</option>
                <option value="80">2000</option>
                <option value="80">3000</option>
                <option value="80">4000</option>
                <option value="80">6000</option>
                <option value="80">10000</option>
              </select> */}
              <select
                id="experience_filter"
                ref={experienceFilterRef}
                className="w-[180px] h-full text-[18px] max-[1024px]:text-[17px] max-[1024px]:w-[160px] max-[768px]:w-[130px] max-[768px]:text-[16px] max-[425px]:text-[13px]"
                defaultValue=""
                onChange={() => {
                  store.uiStates.setWorkerProfileDataFilter((prev) => {
                    return {
                      ...prev,
                      experience: experienceFilterRef.current.value,
                    };
                  });
                }}
              >
                <option
                  value=""
                  disabled
                  style={{ color: "rgba(0, 0, 0, 0.45)" }}
                >
                  Experience
                </option>
                <option value="1">1 or less Year</option>
                <option value="2">2 Year</option>
                <option value="3">3 Year</option>
              </select>
            </div>
          </div>
          <hr className="hire_section_context_divider" />
          {store.uiStates.allWorkersProfileData.length > 0 ? (
            <div className="hire_section_main_context border-none">
              {store.uiStates.allWorkersProfileData.map(
                (each_Lancer, index) => {
                  return (
                    <User_profile_box
                      key={each_Lancer?._id}
                      workerId={each_Lancer?._id}
                      heading={each_Lancer?.gig_title}
                      userName={each_Lancer?.username}
                      userBanner={`https://res.cloudinary.com/dgazver6h/image/upload/worker_profile_imgs/${each_Lancer?.gig_imgs?.gig_banners[0]}`}
                      userPricing={each_Lancer?.gig_basic_price}
                      userDesc={each_Lancer?.gig_description}
                      // userDp={`https://res.cloudinary.com/dgazver6h/image/upload/worker_profile_imgs/${store.account.userDp}`}
                      userDp={each_Lancer?.workerDp ? `https://res.cloudinary.com/dgazver6h/image/upload/userDp/${each_Lancer?.workerDp}`: defaultDp}
                    />
                  );
                }
              )}
              
            </div>
          ) : (
            <div className="w-full h-auto min-h-[720px] flex items-center justify-center">
              <h1 className="w-full h-full text-center content-center text-3xl text-top_nav_second_color/90">
                We Don't Have Any Worker RFor{" "}
              </h1>
            </div>
          )}
          <div className="w-full h-fit flex items-center justify-center border my-[35px] gap-[15px]">
            <button
              type="button"
              disabled
              className="bg-top_nav_second_color rounded-[5px] text-[18px] font-semibold px-[15px] py-[5px] cursor-pointer disabled:opacity-[0.65] disabled:cursor-default"
            >
              Back
            </button>

            <button
              type="button"
              className="border-[2px] border-top_nav_second_color text-top_nav_second_color rounded-[5px] text-[18px] font-semibold px-[15px] py-[5px] cursor-pointer hover:bg-top_nav_second_color hover:text-main_website_color_2"
            >
              1
            </button>
            <button
              type="button"
              className="border-[2px] border-top_nav_second_color text-top_nav_second_color rounded-[5px] text-[18px] font-semibold px-[15px] py-[5px] cursor-pointer hover:bg-top_nav_second_color hover:text-main_website_color_2"
            >
              2
            </button>

            <button
              type="button"
              disabled
              className="bg-top_nav_second_color rounded-[5px] text-[18px] font-semibold px-[15px] py-[5px] cursor-pointer disabled:opacity-[0.65] disabled:cursor-default"
            >
              Next
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
