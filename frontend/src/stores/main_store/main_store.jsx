import { createContext, useEffect, useState } from "react";
// import user_dp from "../../../src/assets/images/hire/bike_repairing.jpg";
import axios from "axios";
import defaultDp from "../../../src/assets/images/default_Images/defaultPic_cropped.webp";
export let Main_context = createContext({});
export function Main_store({ children }) {
  const [workerProfileData, setWorkerProfileData] = useState({
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
  let [userClickDp, setUserClickDp] = useState(false);
  let [loadingState, setLoadingState] = useState(false);
  let [workerProfileDataFilter, setWorkerProfileDataFilter] = useState({
    category: "",
    location: "",
    price: "",
    experience: "",
  });
  // let [user_work_profile, set_user_work_profile] = useState([
  let [allWorkersProfileData, setAllWorkersProfileData] = useState([]);
  // let [allCountries, setAllCountries] = useState([]);
  const [profileStep, setProfileStep] = useState(1);
  let [account, setAccount] = useState({
    login: false,
    signup: false,
    user_id: "",
    user_name: "",
    user_email: "",
    user_password: "",
    userDp: defaultDp,
  });
  let [adminAccount, setadminAccount] = useState({
    login: false,
    user_id: "",
    user_email: "",
    user_password: "",
  });
  let [usersData, setUsersData] = useState([]);
  let [workersData, setWorkersData] = useState([]);
  let [complainData, setComplainData] = useState([]);
  let [selectedContact, setSelectedContact] = useState("");
  let [selectedContactMessageData, setSelectedContactMessageData] = useState(
    {}
  );
  let [selectedContactData, setSelectedContactData] = useState({
    contactName: "",
    contactDp: "",
    contactProfession: "",
  });
  let store = {
    setAccount,
    account,
    apiCalls: {
      checkUserLoginStatus: async function () {
        try {
          let checkSignupRequest = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/check-signup`,
            {
              withCredentials: true,
            }
          );
          let checkSignupData = checkSignupRequest?.data;
          console.log(checkSignupRequest?.data);
          if (checkSignupData?.userFind) {
            setAccount((prev) => ({
              ...prev,
              user_id: checkSignupData?.userData._id,
              user_name: checkSignupData?.userData.userName,
              user_password: checkSignupData?.userData.userPassword,
              user_email: checkSignupData?.userData.userEmail,
              signup: true,
            }));
            if (checkSignupData?.userData.userImageUniqueId !== null) {
              setAccount((prev) => ({
                ...prev,
                userDp: `https://res.cloudinary.com/dgazver6h/image/upload/v1739564757/userDp/${checkSignupData?.userData.userImageUniqueId}`,
              }));
            }
          }
          return checkSignupData;
        } catch (error) {
          return error;
        }
      },
      updateUserProfileData: async function (
        // formSubmittedData,
        userDp,
        userName,
        userEmail,
        userPassword
      ) {
        try {
          let userFormData = new FormData();
          userFormData.append("userDp", userDp);
          userFormData.append("userName", userName);
          userFormData.append("userEmail", userEmail);
          userFormData.append("userPassword", userPassword);
          for (let pair of userFormData.entries()) {
            console.log(pair[0], pair[1]);
          }
          let request = await axios.patch(
            `${import.meta.env.VITE_BACKEND_URL}/update-profile-data`,
            userFormData,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (!request?.data?.error && request?.data?.userUpdateData !== null) {
            checkAccount();
          }
          return request;
        } catch (error) {
          console.log(error);
        }
      },
      loginRequest: async function (userData) {
        if (userData?.isRemember === "on") {
          userData.isRemember = true;
        } else {
          userData.isRemember = false;
        }
        console.log(userData);
        let loginRequestFunc = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/login`,
          userData,
          {
            withCredentials: true,
          }
        );
        let checkLoginData = loginRequestFunc?.data;
        if (
          checkLoginData?.loginStatus &&
          checkLoginData?.yourDataStructure &&
          !checkLoginData?.error &&
          checkLoginData?.userData
        ) {
          console.log(checkLoginData, "good");
          setAccount((prev) => ({
            ...prev,
            user_id: checkLoginData?.userData._id,
            user_name: checkLoginData?.userData.userName,
            user_password: checkLoginData?.userData.userPassword,
            user_email: checkLoginData?.userData.userEmail,
            userDp: checkLoginData?.userData.userImageUniqueId
              ? `https://res.cloudinary.com/dgazver6h/image/upload/v1739564757/userDp/${checkLoginData?.userData.userImageUniqueId}`
              : defaultDp,
            login: true,
          }));
          return true;
        }
        return false;
      },
    },
    refs: {
      side_nav_refs: {
        side_nav_main_box: "",
      },
      top_nav_refs: {
        top_nav_icon: "",
      },
      home_refs: {
        hero_refs: {
          top_search_bar_ref: "",
        },
      },
    },
    uiStates: {
      adminAccount,
      setadminAccount,
      usersData,
      setUsersData,
      workersData,
      setWorkersData,
      complainData,
      setComplainData,
      userClickDp,
      setUserClickDp,
      profileStep,
      setProfileStep,
      loadingState,
      setLoadingState,
      workerProfileData,
      setWorkerProfileData,
      workerProfileDataFilter,
      setWorkerProfileDataFilter,
      selectedContact,
      setSelectedContact,
      selectedContactMessageData,
      setSelectedContactMessageData,
      selectedContactData,
      setSelectedContactData,
      // allCountries: [
      //   "Afghanistan",
      //   "Albania",
      //   "Algeria",
      //   "Andorra",
      //   "Angola",
      //   "Antigua and Barbuda",
      //   "Argentina",
      //   "Armenia",
      //   "Australia",
      //   "Austria",
      //   "Azerbaijan",
      //   "Bahamas",
      //   "Bahrain",
      //   "Bangladesh",
      //   "Barbados",
      //   "Belarus",
      //   "Belgium",
      //   "Belize",
      //   "Benin",
      //   "Bhutan",
      //   "Bolivia",
      //   "Bosnia and Herzegovina",
      //   "Botswana",
      //   "Brazil",
      //   "Brunei",
      //   "Bulgaria",
      //   "Burkina Faso",
      //   "Burundi",
      //   "Cabo Verde",
      //   "Cambodia",
      //   "Cameroon",
      //   "Canada",
      //   "Central African Republic",
      //   "Chad",
      //   "Chile",
      //   "China",
      //   "Colombia",
      //   "Comoros",
      //   "Congo (Congo-Brazzaville)",
      //   "Costa Rica",
      //   "Croatia",
      //   "Cuba",
      //   "Cyprus",
      //   "Czechia",
      //   "Democratic Republic of the Congo",
      //   "Denmark",
      //   "Djibouti",
      //   "Dominica",
      //   "Dominican Republic",
      //   "Ecuador",
      //   "Egypt",
      //   "El Salvador",
      //   "Equatorial Guinea",
      //   "Eritrea",
      //   "Estonia",
      //   "Eswatini",
      //   "Ethiopia",
      //   "Fiji",
      //   "Finland",
      //   "France",
      //   "Gabon",
      //   "Gambia",
      //   "Georgia",
      //   "Germany",
      //   "Ghana",
      //   "Greece",
      //   "Grenada",
      //   "Guatemala",
      //   "Guinea",
      //   "Guinea-Bissau",
      //   "Guyana",
      //   "Haiti",
      //   "Honduras",
      //   "Hungary",
      //   "Iceland",
      //   "India",
      //   "Indonesia",
      //   "Iran",
      //   "Iraq",
      //   "Ireland",
      //   "Israel",
      //   "Italy",
      //   "Ivory Coast",
      //   "Jamaica",
      //   "Japan",
      //   "Jordan",
      //   "Kazakhstan",
      //   "Kenya",
      //   "Kiribati",
      //   "Kuwait",
      //   "Kyrgyzstan",
      //   "Laos",
      //   "Latvia",
      //   "Lebanon",
      //   "Lesotho",
      //   "Liberia",
      //   "Libya",
      //   "Liechtenstein",
      //   "Lithuania",
      //   "Luxembourg",
      //   "Madagascar",
      //   "Malawi",
      //   "Malaysia",
      //   "Maldives",
      //   "Mali",
      //   "Malta",
      //   "Marshall Islands",
      //   "Mauritania",
      //   "Mauritius",
      //   "Mexico",
      //   "Micronesia",
      //   "Moldova",
      //   "Monaco",
      //   "Mongolia",
      //   "Montenegro",
      //   "Morocco",
      //   "Mozambique",
      //   "Myanmar",
      //   "Namibia",
      //   "Nauru",
      //   "Nepal",
      //   "Netherlands",
      //   "New Zealand",
      //   "Nicaragua",
      //   "Niger",
      //   "Nigeria",
      //   "North Korea",
      //   "North Macedonia",
      //   "Norway",
      //   "Oman",
      //   "Pakistan",
      //   "Palau",
      //   "Palestine State",
      //   "Panama",
      //   "Papua New Guinea",
      //   "Paraguay",
      //   "Peru",
      //   "Philippines",
      //   "Poland",
      //   "Portugal",
      //   "Qatar",
      //   "Romania",
      //   "Russia",
      //   "Rwanda",
      //   "Saint Kitts and Nevis",
      //   "Saint Lucia",
      //   "Saint Vincent and the Grenadines",
      //   "Samoa",
      //   "San Marino",
      //   "Sao Tome and Principe",
      //   "Saudi Arabia",
      //   "Senegal",
      //   "Serbia",
      //   "Seychelles",
      //   "Sierra Leone",
      //   "Singapore",
      //   "Slovakia",
      //   "Slovenia",
      //   "Solomon Islands",
      //   "Somalia",
      //   "South Africa",
      //   "South Korea",
      //   "South Sudan",
      //   "Spain",
      //   "Sri Lanka",
      //   "Sudan",
      //   "Suriname",
      //   "Sweden",
      //   "Switzerland",
      //   "Syria",
      //   "Taiwan",
      //   "Tajikistan",
      //   "Tanzania",
      //   "Thailand",
      //   "Timor-Leste",
      //   "Togo",
      //   "Tonga",
      //   "Trinidad and Tobago",
      //   "Tunisia",
      //   "Turkey",
      //   "Turkmenistan",
      //   "Tuvalu",
      //   "Uganda",
      //   "Ukraine",
      //   "United Arab Emirates",
      //   "United Kingdom",
      //   "United States of America",
      //   "Uruguay",
      //   "Uzbekistan",
      //   "Vanuatu",
      //   "Vatican City",
      //   "Venezuela",
      //   "Vietnam",
      //   "Yemen",
      //   "Zambia",
      //   "Zimbabwe",
      // ],
      allCountries: [
        "Fareed Gate",
        "1 Unit Chowk",
        "Model Town A",
        "Model Town B",
        "Satellite Town",
        "Shahi Bazaar",
        "Machli Bazaar",
        "Trust Colony",
        "DC Colony",
        "Cantonment Area",
        "University Chowk",
        "Noor Mahal Area",
        "Darbar Mahal Road",
        "Yazman Road",
        "Bahawalpur Bypass",
        "Cheema Town",
        "Baghdad-ul-Jadeed Campus",
        "Jinnah Colony",
        "Hasilpur Road",
        "Chowk Fawara",
        "Sadiq Colony",
        "Shadab Colony",
        "Mohallah Islamia",
        "Bindra Pull",
        "Gulzar-e-Sadiq",
        "Hashmi Garden",
        "Medical Colony",
        "Khawaja Colony",
        "Rashidabad",
        "Rafi Qamar Road",
        "Ahmedpuri Gate",
        "Circular Road",
        "Lodhi Colony",
        "Channi Goth",
        "College Road",
        "KLP Road",
        "Gulberg Town",
        "Tibba Badar Sher",
        "Basti Al-Noor",
        "Airport Road",
        "Bahawalpur Cantt",
        "Haji Town",
        "Aziz Bhatti Town",
        "Islamia Colony",
        "New Sadiq Colony",
        "Majeed Paradise",
        "Habib Colony",
        "Faisal Colony",
        "Al-Majeed Town",
        "Shamshad Colony",
        "Hameed Town",
        "Muslim Town",
        "Ali Town",
        "Chishtian Road",
        "Mohallah Qasimabad",
        "Ghausia Colony",
        "Mohalla Farooqabad",
        "Iqbalabad",
        "Mandi Yazman",
        "Basti Lar",
      ],
      allProfessionsList: [
        "Plumber",
        "Electrician",
        "Helper",
        "Software Engineer",
        "Web Developer",
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Mobile App Developer",
        "Data Scientist",
        "Machine Learning Engineer",
        "AI Engineer",
        "Cloud Engineer",
        "Cybersecurity Analyst",
        "DevOps Engineer",
        "Database Administrator",
        "Game Developer",
        "UI/UX Designer",
        "Graphic Designer",
        "Product Manager",
        "Project Manager",
        "Digital Marketer",
        "SEO Specialist",
        "Content Writer",
        "Copywriter",
        "Business Analyst",
        "Accountant",
        "Financial Analyst",
        "Marketing Manager",
        "HR Manager",
        "Sales Executive",
        "Doctor",
        "Nurse",
        "Pharmacist",
        "Physiotherapist",
        "Mechanical Engineer",
        "Electrical Engineer",
        "Civil Engineer",
        "Architect",
        "Lawyer",
        "Teacher",
        "Professor",
        "Research Scientist",
        "Psychologist",
        "Social Worker",
        "Photographer",
        "Videographer",
        "Musician",
        "Actor",
        "Chef",
        "Event Planner",
        "Real Estate Agent",
        "Entrepreneur",
      ],
      // user_work_profile,
      // set_user_work_profile,
      allWorkersProfileData,
      setAllWorkersProfileData,
      setInputStateValue: (defs, setStateData, stateSetPart) => {
        setStateData((prev) => {
          return { ...prev, [stateSetPart]: defs.target.value };
        });
      },
    },
    allHumanLanguages: [
      "English",
      "Urdu",
      "Spanish",
      "French",
      "Chinese",
      "Arabic",
      "Hindi",
      "Bengali",
      "Portuguese",
      "Russian",
      "Japanese",
      "German",
      "Korean",
      "Italian",
      "Persian",
      "Turkish",
      "Vietnamese",
      "Polish",
      "Dutch",
      "Swahili",
      "Hebrew",
      "Thai",
      "Greek",
      "Czech",
      "Hungarian",
      "Romanian",
      "Danish",
      "Finnish",
      "Indonesian",
      "Malay",
      "Ukrainian",
    ],
    user_work_profile: [],
  };
  useEffect(() => {
    window.addEventListener("click", window_click_event);
    function window_click_event(defs) {
      // setUserClickDp(false);
      if (
        defs.target === store.refs.top_nav_refs.top_nav_icon ||
        defs.target === store.refs.side_nav_refs.side_nav_main_box
      ) {
        store.refs.side_nav_refs.side_nav_main_box.style.display = "flex";
        store.refs.side_nav_refs.side_nav_main_box.style.left = "0px";
        store.refs.top_nav_refs.top_nav_icon.style.fill =
          "var(--top_nav_second_color)";
      } else {
        if (store.refs.top_nav_refs.top_nav_icon) {
          store.refs.top_nav_refs.top_nav_icon.style.fill = "white";
          store.refs.side_nav_refs.side_nav_main_box.style.left = "-290px";
        }
      }
    }
    return () => {
      window.removeEventListener("click", window_click_event);
    };
  }, [store.refs]);
  async function checkAccount() {
    await store.apiCalls.checkUserLoginStatus();
  }
  async function checkPersonalData() {
    setLoadingState(true);
    let response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/worker_profile/checkWorkerData/`,
      { withCredentials: true }
    );
    console.log(response);
    if (response?.data?.workerData && response.data.dataFind) {
      let workerAllData = response?.data?.workerData;
      if (
        workerAllData?.username !== "" &&
        workerAllData?.username &&
        workerAllData?.profession &&
        workerAllData?.social_link &&
        workerAllData?.gig_basic_title
      ) {
        setProfileStep(4);
      } else if (
        workerAllData?.username !== "" &&
        workerAllData?.username &&
        workerAllData?.profession &&
        workerAllData?.social_link &&
        Object.values(workerAllData.social_link).some(
          (value) => value !== "" && value !== undefined
        )
      ) {
        setProfileStep(3);
      } else if (
        workerAllData?.username !== "" &&
        workerAllData?.username &&
        workerAllData?.profession
      ) {
        setProfileStep(2);
      } else if (workerAllData?.username !== "" && workerAllData?.username) {
        setProfileStep(1);
      } else {
        setProfileStep(0);
      }

      setWorkerProfileData((prev) => {
        let gig_imgs_copy = { ...prev.gig_imgs };
        // console.log(workerAllData?.workerDp);

        return {
          ...prev,
          id: workerAllData?._id || "",
          useremail: workerAllData?.useremail || "",
          username: workerAllData?.username || "",
          phoneNumber: workerAllData?.phoneNumber || "",
          gender: workerAllData?.gender || "",
          dob:
            workerAllData?.dob && !isNaN(new Date(workerAllData?.dob))
              ? new Date(workerAllData.dob).toISOString().split("T")[0]
              : "",
          gig_imgs: {
            ...gig_imgs_copy,
            cnic_front: workerAllData?.gig_imgs?.cnic_front
              ? `https://res.cloudinary.com/dgazver6h/image/upload/worker_profile_imgs/${workerAllData?.gig_imgs.cnic_front}`
              : null,
            cnic_back: workerAllData?.gig_imgs?.cnic_back
              ? `https://res.cloudinary.com/dgazver6h/image/upload/worker_profile_imgs/${workerAllData?.gig_imgs.cnic_back}`
              : null,
            gig_banners:
              Array.isArray(workerAllData?.gig_imgs?.gig_banners) &&
              workerAllData?.gig_imgs?.gig_banners?.length > 0
                ? [
                    ...workerAllData?.gig_imgs?.gig_banners?.map(
                      (eachImgUrl) => {
                        return eachImgUrl
                          ? `https://res.cloudinary.com/dgazver6h/image/upload/worker_profile_imgs/${eachImgUrl}`
                          : null;
                      }
                    ),
                  ]
                : [],
          },
          profession: workerAllData?.profession,
          experience: workerAllData?.experience,
          education: {
            ...workerAllData?.education,
          },
          social_link: {
            ...workerAllData?.social_link,
          },
          gig_title: workerAllData?.gig_title,
          worker_bio: workerAllData?.worker_bio,
          gig_description: workerAllData?.gig_description,
          gig_langs: [
            ...workerAllData?.gig_langs.map((eachLang) => {
              return eachLang ? eachLang : null;
            }),
          ],
          gig_basic_title: workerAllData?.gig_basic_title,
          gig_basic_desc: workerAllData?.gig_basic_desc,
          gig_basic_price: workerAllData?.gig_basic_price,
          gig_standard_title: workerAllData?.gig_standard_title,
          gig_standard_desc: workerAllData?.gig_standard_desc,
          gig_standard_price: workerAllData?.gig_standard_price,
          gig_premium_title: workerAllData?.gig_premium_title,
          gig_premium_desc: workerAllData?.gig_premium_desc,
          gig_premium_price: workerAllData?.gig_premium_price,
        };
      });
    } else {
      setProfileStep(0);
      console.log(response?.data?.workerData);
    }
    setLoadingState(false);
  }
  useEffect(() => {
    checkAccount();
    checkPersonalData();
  }, []);
  return (
    <Main_context.Provider value={store}>{children}</Main_context.Provider>
  );
}
