import React, { useContext, useEffect, useRef } from "react";
import { Main_context } from "../../../stores/main_store/main_store";
import axios from "axios";

export function Personal_info() {
  let context = useContext(Main_context);
  const cnicFrontPhoto = useRef(null);
  const cnicFrontCover = useRef(null);
  const cnicFrontPhotoInput = useRef(null);
  const cnicBackPhoto = useRef(null);
  const cnicBackCover = useRef(null);
  const cnicBackPhotoInput = useRef(null);
  function cnicBackImgHandler(defs) {
    let imgFile = defs.currentTarget.files[0];
    if (imgFile) {
      let imgLoader = new FileReader();
      imgLoader.onload = (loadedImg) => {
        cnicBackCover.current.style.display = "inline-block";
        cnicBackPhoto.current.src = loadedImg.currentTarget.result;
      };
      imgLoader.readAsDataURL(imgFile);
    }
  }
  function cnicFrontImgHandler(defs) {
    let imgFile = defs.currentTarget.files[0];
    if (imgFile) {
      let imgLoader = new FileReader();
      imgLoader.onload = (loadedImg) => {
        cnicFrontCover.current.style.display = "inline-block";
        cnicFrontPhoto.current.src = loadedImg.currentTarget.result;
      };
      imgLoader.readAsDataURL(imgFile);
    }
  }
  useEffect(() => {
    if (
      context.uiStates.workerProfileData.gig_imgs.cnic_front &&
      context.uiStates.workerProfileData.gig_imgs.cnic_front
    ) {
      cnicFrontCover.current.style.display = "inline-block";
      cnicFrontPhoto.current.src =
        context.uiStates.workerProfileData.gig_imgs.cnic_front;
      cnicBackCover.current.style.display = "inline-block";
      cnicBackPhoto.current.src =
        context.uiStates.workerProfileData.gig_imgs.cnic_back;
    }
  }, [
    context.uiStates.workerProfileData.gig_imgs.cnic_front,
    context.uiStates.workerProfileData.gig_imgs.cnic_front,
  ]);
  return (
    <>
      <h1 className="text-main_website_color_1 text-[28px] font-black mb-[15px]">
        Personal Info
      </h1>
      <div className="w-full h-fit flex flex-wrap items-center justify-between gap-[15px] mt-[20px]">
        <input
          type="text"
          name="username"
          value={context.uiStates.workerProfileData.username}
          onChange={(defs) =>
            context.uiStates.setInputStateValue(
              defs,
              context.uiStates.setWorkerProfileData,
              "username"
            )
          }
          className="grow-1 max-w-[390px] basis-[220px] h-[40px] border-[2px] border-main_website_color_1 outline-none pl-[15px] rounded-[5px]"
          placeholder="Username (Must be Unique)"
        />
        <select
          name="gender"
          className="basis-[120px] grow-1 h-[40px] border-[2px] border-main_website_color_1 outline-none pl-[15px] rounded-[5px]"
          onChange={(defs) =>
            context.uiStates.setInputStateValue(
              defs,
              context.uiStates.setWorkerProfileData,
              "gender"
            )
          }
          // defaultValue={context.uiStates.workerProfileData.gender}
          value={context.uiStates.workerProfileData.gender}
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="w-full h-fit flex flex-wrap items-center justify-between gap-[15px] mt-[35px]">
        <input
          type="number"
          name="phoneNumber"
          value={context.uiStates.workerProfileData.phoneNumber}
          onChange={(defs) =>
            context.uiStates.setInputStateValue(
              defs,
              context.uiStates.setWorkerProfileData,
              "phoneNumber"
            )
          }
          className="grow-1 max-w-[390px] basis-[220px] h-[40px] border-[2px] border-main_website_color_1 outline-none pl-[15px] rounded-[5px]"
          placeholder="Phone Number eg, (03*****)"
        />
        <span className="relative basis-[120px] grow-1 h-fit flex items-center justify-between gap-[15px]">
          <span className="absolute text-[rgba(0,0,0,0.45)] font-bold text-[15px] -top-[20px] left-[5px]">
            Date of Birth
          </span>
          <input
            type="date"
            name="dob"
            value={context.uiStates.workerProfileData.dob}
            onChange={(defs) =>
              context.uiStates.setInputStateValue(
                defs,
                context.uiStates.setWorkerProfileData,
                "dob"
              )
            }
            title="Date of Birth"
            className="w-full h-[40px] border-[2px] border-main_website_color_1 outline-none pl-[15px] rounded-[5px]"
            placeholder="Username (Must be Unique)"
          />
        </span>
      </div>
      <div className="w-full h-fit flex flex-wrap items-center justify-between gap-[15px] mt-[35px]">
        <select
          name="countryName"
          onChange={(defs) =>
            context.uiStates.setInputStateValue(
              defs,
              context.uiStates.setWorkerProfileData,
              "countryName"
            )
          }
          value={context.uiStates.workerProfileData.countryName}
          className="w-full h-[40px] basis-[120px] border-[2px] border-main_website_color_1 outline-none pl-[15px] rounded-[5px]"
        >
          <option value="" disabled>
            Select Your Location
            {/* Select Your Country */}
          </option>
          {context.uiStates.allCountries.map((eachCountry, idx) => {
            return (
              <option key={idx} value={eachCountry}>
                {eachCountry}
              </option>
            );
          })}
        </select>
        <span className="relative grow-1 basis-[220px] max-w-[390px] h-fit flex items-center justify-between gap-[15px]">
          <span className="absolute text-[rgba(0,0,0,0.45)] font-bold text-[15px] -top-[20px] left-[5px]">
            Address
          </span>
          <input
            type="text"
            name="address"
            value={context.uiStates.workerProfileData.address}
            onChange={(defs) =>
              context.uiStates.setInputStateValue(
                defs,
                context.uiStates.setWorkerProfileData,
                "address"
              )
            }
            title="Date of Birth"
            className="w-full h-[40px] min-w-[220px] border-[2px] border-main_website_color_1 outline-none pl-[15px] rounded-[5px]"
            placeholder="Green Town Street No. 25"
          />
        </span>
      </div>
      <div className="w-full h-fit flex flex-wrap items-center justify-between gap-[15px] mt-[35px]">
        <input
          ref={cnicFrontPhotoInput}
          type="file"
          name="cnic_front"
          id="cnic_front"
          onChange={cnicFrontImgHandler}
          className="hidden"
          accept=".png,.jpg,.jpeg"
        />
        <div className="relative w-full h-[160px] overflow-hidden">
          <label
            htmlFor="cnic_front"
            className="grow-[0.5] h-full min-w-[220px] flex items-center justify-center flex-col rounded-[7px] border-[2px] border-main_website_color_1 cursor-pointer hover:bg-[rgba(255,255,255,0.1)] transition-all duration-150 ease-in"
          >
            <span className="text-[rgba(0,0,0,0.65)] font-bold text-[15px]">
              Upload CNIC Front Photo
            </span>
            <span className="text-[rgba(0,0,0,0.7)] font-normal text-[14px]">
              Format only | .png | .jpg | .jpeg |
            </span>
          </label>
          <div
            ref={cnicFrontCover}
            className="absolute w-full h-full hidden object-cover top-0 left-0 overflow-hidden"
          >
            <img
              ref={cnicFrontPhoto}
              className="absolute w-full h-full object-cover top-0 left-0 flex items-center justify-center flex-col rounded-[7px] border-[2px] border-main_website_color_1 cursor-pointer bg-red-600"
              alt="CNIC Back Photo"
            />
            <svg
              onClick={() => {
                cnicFrontPhoto.current.src = "";
                cnicFrontPhotoInput.current.value = "";
                cnicFrontCover.current.style.display = "none";
              }}
              className="absolute w-[26px] h-[26px] top-[5px] right-[5px] transition-all duration-150 ease-in fill-[rgba(255,255,255,0.5)] hover:fill-[rgba(255,255,255,0.65)] cursor-pointer"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
            </svg>
          </div>
        </div>
        <input
          type="file"
          name="cnic_back"
          id="cnic_back"
          ref={cnicBackPhotoInput}
          className="hidden"
          onChange={cnicBackImgHandler}
          accept=".png,.jpg,.jpeg"
        />
        <div className="relative w-full h-[160px] overflow-hidden">
          <label
            htmlFor="cnic_back"
            className="grow-[0.5] h-full min-w-[220px] flex items-center justify-center flex-col rounded-[7px] border-[2px] border-main_website_color_1 cursor-pointer hover:bg-[rgba(255,255,255,0.1)] transition-all duration-150 ease-in"
          >
            <span className="text-[rgba(0,0,0,0.65)] font-bold text-[15px]">
              Upload CNIC Back Photo
            </span>
            <span className="text-[rgba(0,0,0,0.7)] font-normal text-[14px]">
              Format only | .png | .jpg | .jpeg |
            </span>
          </label>
          <div
            ref={cnicBackCover}
            className="absolute w-full h-full hidden object-cover top-0 left-0 overflow-hidden"
          >
            <img
              ref={cnicBackPhoto}
              className="absolute w-full h-full object-cover top-0 left-0 flex items-center justify-center flex-col rounded-[7px] border-[2px] border-main_website_color_1 cursor-pointer bg-red-600"
              alt="CNIC Back Photo"
            />
            <svg
              onClick={() => {
                cnicBackPhoto.current.src = "";
                cnicBackPhotoInput.current.value = "";
                cnicBackCover.current.style.display = "none";
              }}
              className="absolute w-[26px] h-[26px] top-[5px] right-[5px] transition-all duration-150 ease-in fill-[rgba(255,255,255,0.5)] hover:fill-[rgba(255,255,255,0.65)] cursor-pointer"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
