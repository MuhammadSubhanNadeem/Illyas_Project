import { useContext, useRef, useState } from "react";
import { Main_context } from "../../stores/main_store/main_store";
import Loading from "./../Loading/loading";
import defaultDp from "../../assets/images/default_Images/defaultPic_cropped.webp";
import { Footer } from "../Footer/footer";
import axios from "axios";
import { Un_found_page } from "../404/un_found_page";
import { useNavigate } from "react-router";
function Profile() {
  let navigate = useNavigate();
  let profileContext = useContext(Main_context);
  const userNameUpdate = useRef(null);
  const userEmailUpdate = useRef(null);
  const userPasswordUpdate = useRef(null);
  const userDpUpdate = useRef(null);
  let [userDpUpdateUrl, setUserDpUpdateUrl] = useState("");
  let [changeProfileData, setChangeProfileData] = useState(true);
  let [profileEditClicked, setProfileEditClicked] = useState(false);
  let [updatePending, setUpdatePending] = useState(false);
  let [passView, setPassView] = useState(false);
  function profileEditIconHandler() {
    setProfileEditClicked(true);
  }
  async function submitUpdateData() {
    if (!changeProfileData) {
      setUpdatePending(true);
      if (
        userNameUpdate.current.value !== "" &&
        userEmailUpdate.current.value !== "" &&
        userPasswordUpdate.current.value !== ""
      ) {
        let response = await profileContext.apiCalls.updateUserProfileData(
          userDpUpdate.current.files[0],
          userNameUpdate.current.value,
          userEmailUpdate.current.value,
          userPasswordUpdate.current.value
        );
        if (!response?.data?.error && response?.data?.dataUpdateStatus) {
          setUpdatePending(false);
          setChangeProfileData(true);
          setPassView(false);
          setProfileEditClicked(false);
        } else {
          setUpdatePending(false);
          setChangeProfileData(true);
          setProfileEditClicked(true);
          setPassView(false);
          alert("Data Updating Failed");
        }
        console.log(response);
      } else {
        alert("Please Fill Data Completely!");
        setUpdatePending(false);
      }
    }
  }
  async function deleteAccountHandler() {
    let userAccount = profileContext.account.user_id;
    let response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/delete_user?user_id=${userAccount}`,
      { withCredentials: true }
    );
    console.log(response);
    if (response.success) {
      profileContext.setAccount({
        login: false,
        signup: false,
        user_id: "",
        user_name: "",
        user_email: "",
        user_password: "",
        userDp: defaultDp,
      });
      profileContext.uiStates.setWorkerProfileData({
        id: "",
        useremail: "",
        username: "",
        gender: "",
        phoneNumber: "",
        dob: "",
        countryName: "",
        address: "",
        gig_imgs: {
          cnic_front: null,
          cnic_back: null,
          gig_banners: [],
        },
        profession: "",
        experience: "",
        education: {},
        social_link: {},
        gig_title: "",
        worker_bio: "",
        gig_description: "",
        gig_langs: [],
        gig_basic_title: "",
        gig_basic_desc: "",
        gig_basic_price: "",
        gig_standard_title: "",
        gig_standard_desc: "",
        gig_standard_price: "",
        gig_premium_title: "",
        gig_premium_desc: "",
        gig_premium_price: "",
      });
      navigate('/signup');
    }
  }
  return (
    <>
      {profileContext?.account.login || profileContext?.account.signup ? (
        <>
          <section className="relative w-full h-[calc(100%-70px)] min-h-[720px] bg-main_website_color_2 flex items-center justify-around">
            {updatePending ? (
              <>
                <Loading loadingMessage="Data Updating ..." />
              </>
            ) : null}
            {profileEditClicked ? (
              <>
                <div className="absolute w-full h-full max-w-[1440px] min-h-[720px] z-20"></div>
                <div className="absolute w-[30%] px-[35px] pt-[55px] pb-[70px] h-fit min-w-[320px] bg-main_website_color_2 z-20 border-[rgba(255,255,255,0.5)] border-[0.5px] border-solid rounded-[15px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center justify-center gap-[35px] shadow-[0_0_35px_rgba(0,0,0,0.5)]">
                  <div className="relative w-[110px] h-[110px] rounded-full border-[2px] border-top_nav_second_color p-[2px]">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src={
                          userDpUpdateUrl
                            ? userDpUpdateUrl
                            : profileContext.account.userDp || defaultDp
                        }
                        className="w-full h-full object-cover"
                        alt="Your DP"
                      />
                    </div>
                    <input
                      type="file"
                      onChange={() => {
                        let fileReader = new FileReader();
                        fileReader.onload = (event) => {
                          setUserDpUpdateUrl(event.target.result);
                        };
                        fileReader.readAsDataURL(userDpUpdate.current.files[0]);
                        setChangeProfileData(false);
                      }}
                      id="changeDp"
                      ref={userDpUpdate}
                      className="hidden"
                      accept=".jpg, .png, .webp, .jpeg"
                    />
                    <label htmlFor="changeDp">
                      <div className="absolute w-[30px] h-[30px] bottom-[0px] right-[0px] border-[1px] border-[rgba(255,255,255,0.25)] flex items-center justify-center cursor-pointer bg-main_website_color_2 rounded-full overflow-hidden">
                        <svg
                          viewBox="0 -960 960 960"
                          className="w-[18px] h-[18px] fill-[white]"
                        >
                          <path d="M480-480ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h320v80H200v560h560v-320h80v320q0 33-23.5 56.5T760-120H200Zm40-160h480L570-480 450-320l-90-120-120 160Zm440-320v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z" />
                        </svg>
                      </div>
                    </label>
                  </div>
                  <input
                    type="text"
                    ref={userNameUpdate}
                    value={profileContext.account.user_name}
                    onChange={(defs) => {
                      profileContext.setAccount((prev) => ({
                        ...prev,
                        user_name: defs.target.value,
                      }));
                      setChangeProfileData(false);
                    }}
                    className="w-[80%] h-[40px] border-[2px] border-[rgba(255,255,255,0.45)] outline-none pl-[15px] text-[rgba(255,255,255,0.85)] font-font_family_lato rounded-[8px] content-center"
                    placeholder="Your Name"
                  />
                  <input
                    ref={userEmailUpdate}
                    type="email"
                    value={profileContext.account.user_email}
                    onChange={(defs) => {
                      profileContext.setAccount((prev) => ({
                        ...prev,
                        user_email: defs.target.value,
                      }));
                      setChangeProfileData(false);
                    }}
                    className="w-[80%] h-[40px] border-[2px] border-[rgba(255,255,255,0.45)] outline-none pl-[15px] text-[rgba(255,255,255,0.85)] font-font_family_lato rounded-[8px] content-center"
                    placeholder="Email"
                  />
                  <div className="relative w-[80%] h-[40px] flex items-center justify-between gap-[5px]">
                    <input
                      type={passView ? "text" : "password"}
                      ref={userPasswordUpdate}
                      value={profileContext.account.user_password}
                      onChange={(defs) => {
                        profileContext.setAccount((prev) => ({
                          ...prev,
                          user_password: defs.target.value,
                        }));
                        setChangeProfileData(false);
                      }}
                      className="w-[calc(100%-75px)] h-[40px] border-[2px] border-[rgba(255,255,255,0.45)] outline-none pl-[15px] text-[rgba(255,255,255,0.85)] font-font_family_lato rounded-[8px] content-center"
                      placeholder="Account Password"
                    />
                    {passView ? (
                      <span
                        onClick={() => {
                          setPassView(false);
                        }}
                        className="w-[75px] h-full text-[rgba(255,255,255,0.45)] select-none text-center content-center hover:bg-[rgba(255,255,255,0.05)] cursor-pointer duration-150 ease-in transition-all font-font_family_lato font-black border-[2px] rounded-[8px]"
                      >
                        Show
                      </span>
                    ) : (
                      <span
                        onClick={() => {
                          setPassView(true);
                        }}
                        className="w-[75px] h-full text-[rgba(255,255,255,0.45)] select-none text-center content-center hover:bg-[rgba(255,255,255,0.05)] cursor-pointer duration-150 ease-in transition-all font-font_family_lato font-black border-[2px] rounded-[8px]"
                      >
                        Hide
                      </span>
                    )}
                  </div>
                  <div className="w-[80%] h-[40px] flex flex-row items-center justify-between gap-[7px] select-none">
                    <button
                      type="button"
                      disabled={changeProfileData}
                      onClick={submitUpdateData}
                      className="w-[65%] h-[40px] bg-top_nav_second_color disabled:opacity-[0.45] disabled:pointer-events-none disabled:grayscale-[0.7] rounded-[8px] cursor-pointer text-[20px] font-font_family_lato text-main_website_color_1 uppercase font-black my-[15px]"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileEditClicked(false);
                        setChangeProfileData(true);
                        if (!changeProfileData) {
                          profileContext.apiCalls.checkUserLoginStatus();
                        }
                      }}
                      className="w-[35%] h-[40px] bg-transparent border-[2px] border-[rgba(255,255,255,0.35)] rounded-[8px] cursor-pointer duration-150 ease-in transition-all text-[20px] font-font_family_lato text-[rgba(255,255,255,0.65)] capitalize font-normal my-[15px] hover:bg-[rgba(255,255,255,0.05)]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </>
            ) : null}
            <div className="relative w-full h-full max-w-[1440px] py-[35px] grid grid-cols-[0.65fr_1.35fr] grid-rows-[1.2fr_0.8fr] gap-4">
              <div className="relative border-[1px] border-[rgba(128,128,128,0.25)] p-[35px] border-solid rounded-[15px] bg-[rgba(27,37,41,0.45)] flex flex-col items-center justify-start">
                <div
                  className="absolute top-[15px] right-[15px] group w-[45px] h-[45px] rounded-full bg-main_website_color_2 border-[2px] border-[rgba(255,255,255,0.35)] flex items-center justify-center cursor-pointer overflow-hidden"
                  title="Edit Profile Data"
                  onClick={profileEditIconHandler}
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="w-[20px] h-[20px] fill-[white] duration-150 transition-all ease-in pointer-events-none group-hover:rotate-[-45deg]  group-hover:scale-[1.1]"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                  </svg>
                </div>
                <div className="relative w-[180px] h-[180px] rounded-full flex items-center justify-center mt-[35px]">
                  <div className="w-full h-full rounded-full overflow-hidden border-[2px] border-top_nav_second_color">
                    <img
                      src={profileContext.account.userDp || defaultDp}
                      className="w-full h-full object-cover select-none"
                      alt="Your Dp"
                    />
                  </div>
                </div>
                <h1 className="w-fit h-fit text-[32px] text-[white] leading-[1.1] select-none mt-[35px]">
                  {profileContext.account.user_name}
                </h1>
                <h6 className="w-full h-fit font-bold text-[rgba(255,255,255,0.45)] text-[18px] mt-[15px]">
                  {profileContext.account.user_email}
                </h6>
              </div>
              <div className="relative border-[1px] border-[rgba(128,128,128,0.25)] border-solid rounded-[15px] bg-transparent z-[1] overflow-hidden">
                <div className="absolute w-[30%] h-full top-[50%] right-0 -translate-y-[50%] translate-x-[50%] bg-[rgba(255,166,0,0.25)] -z-10 rounded-tl-[50%] rounded-bl-[50%] blur-[150px]"></div>
                <div className="absolute w-full h-full top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] bg-[rgba(27,37,41,0.45)] z-[0]"></div>
              </div>
              <div className="border-[1px] border-[rgba(128,128,128,0.25)] border-solid rounded-[15px] bg-[rgba(27,37,41,0.45)] flex items-center justify-center">
                <button
                  type="button"
                  onClick={deleteAccountHandler}
                  className="relative px-[25px] py-[6px] bg-red-500 rounded-[5px] text-white text-[18px] font-bold cursor-pointer flex items-center justify-center gap-[7px]"
                >
                  <svg
                    className="w-[20px] h-[20px] fill-white"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                  </svg>
                  Delete Your Account
                </button>
              </div>
              <div className="border-[1px] border-[rgba(128,128,128,0.25)] border-solid rounded-[15px] bg-[rgba(27,37,41,0.45)]"></div>
            </div>
          </section>
          <Footer />
        </>
      ) : (
        <Un_found_page />
      )}
    </>
  );
}
export default Profile;
