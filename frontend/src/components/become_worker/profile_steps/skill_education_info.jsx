import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Main_context } from "../../../stores/main_store/main_store";
export function Skill_education_info() {
  let context = useContext(Main_context);
  let [educationCounter, setEducationCounter] = useState([1]);
  const educationSectionRef = useRef([]);
  const allProfessionsList = [
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
  ];
  const educationList = [
    "Primary (5 Year Education)",
    "Middle (8 Year Education)",
    "Matriculation (10 Year Education)",
    "Intermediate / O-Level (12 Year Education)",
    "BS Qualification (14 or 16 Year Education)",
  ];
  function addEducationHandler(defs) {
    setEducationCounter((prev) => {
      if (prev.length < 5) {
        return [...prev, prev.length + 1];
      }
      return [...prev];
    });
  }
  useEffect(() => {
    console.log(context.uiStates.workerProfileData);
  }, [context.uiStates.workerProfileData]);
  function educationSectionRefSetter(refs) {
    educationSectionRef.current.push(refs);
  }
  return (
    // <>
    //   <h1 className="text-main_website_color_1 text-[28px] font-black mb-[15px]">
    //     Professional Info
    //   </h1>
    //   <div className="w-full h-fit flex items-center justify-between gap-[15px] mt-[45px]">
    //     <input
    //       type="text"
    //       list="professionList"
    //       name="profession"
    //       onChange={(defs) => {
    //         context.uiStates.setInputStateValue(
    //           defs,
    //           context.uiStates.setWorkerProfileData,
    //           "profession"
    //         );
    //       }}
    //       value={context?.uiStates?.workerProfileData?.profession}
    //       className="w-full max-w-[420px] h-[40px] border-[2px] border-main_website_color_1 outline-none pl-[15px] rounded-[5px] user_profession"
    //       placeholder="Profession/Occupation"
    //       required
    //     />
    //     <datalist id="professionList">
    //       {context.uiStates.allProfessionsList.map((profession, index) => {
    //         return <option key={index} value={profession} />;
    //       })}
    //     </datalist>
    //     <select
    //       name="experience"
    //       className="w-full max-w-[240px] h-[40px] border-[2px] border-main_website_color_1 outline-none pl-[15px] rounded-[5px] cursor-pointer"
    //       required
    //       onChange={(defs) => {
    //         context.uiStates.setInputStateValue(
    //           defs,
    //           context.uiStates.setWorkerProfileData,
    //           "experience"
    //         );
    //       }}
    //       value={context.uiStates.workerProfileData.experience}
    //       // value={context.uiStates.workerProfileData.experience}
    //     >
    //       <option value="" disabled>
    //         Work Experience
    //       </option>
    //       <option value={0.1}>Less than 0.5 Year</option>
    //       <option value={0.5}>0.5 Year</option>
    //       <option value={1}>1 Year</option>
    //       <option value={2}>2 Years</option>
    //       <option value={3}>3 Years</option>
    //       <option value={4}>4 Years</option>
    //       <option value={5}>More than 4 Years</option>
    //     </select>
    //   </div>
    //   <div className="w-full h-fit flex flex-col mt-[25px]">
    //     <div className="w-full h-fit flex items-center justify-between">
    //       <span className="font-black text-[18px] text-main_website_color_1">
    //         Add Education
    //       </span>
    //       <div className="w-fit h-fit flex  gap-[15px]">
    //         {educationCounter.length > 1 ? (
    //           <div
    //             className="w-[35px] h-[35px] border-[2px] border-top_nav_second_color flex items-center justify-center rounded-[5px] bg-main_website_color_1 cursor-pointer"
    //             title="Delete this Education"
    //             onClick={() => {
    //               setEducationCounter((prev) => {
    //                 if (prev.length > 1) {
    //                   return [...prev.slice(0, prev.length - 1)];
    //                 }
    //                 return [...prev];
    //               });
    //             }}
    //           >
    //             <svg
    //               className="w-[18px] h-[18px] fill-top_nav_second_color"
    //               viewBox="0 0 16 16"
    //             >
    //               <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
    //             </svg>
    //           </div>
    //         ) : null}
    //         <motion.svg
    //           initial={{ scale: 1 }}
    //           whileHover={{ scale: 1.1 }}
    //           transition={{ duration: 0.15 }}
    //           onClick={addEducationHandler}
    //           className="w-[32px] h-[32px] fill-main_website_color_1 cursor-pointer"
    //           viewBox="0 0 16 16"
    //         >
    //           <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
    //         </motion.svg>
    //       </div>
    //     </div>
    //     {educationCounter.map((counter, index) => {
    //       return (
    //         <div
    //           key={index}
    //           ref={(refs) => educationSectionRefSetter(refs)}
    //           className="w-full h-fit flex items-center justify-between mt-[30px]"
    //         >
    //           <select
    //             name="edu_class"
    //             className="w-full max-w-[320px] h-[40px] border-[2px] border-main_website_color_1 outline-none pl-[15px] rounded-[5px] cursor-pointer"
    //             onChange={(defs) => {
    //               context.uiStates.setWorkerProfileData((prev) => {
    //                 return {
    //                   ...prev,
    //                   education: {
    //                     ...prev.education,
    //                     edu_class: defs.target.value,
    //                   },
    //                 };
    //               });
    //               console.log(
    //                 educationList.indexOf(
    //                   context.uiStates.workerProfileData.education.edu_class
    //                 )
    //               );
    //             }}
    //             // value={educationList[educationList.indexOf(context.uiStates.workerProfileData.education.edu_class)]}
    //             value={
    //               context?.uiStates?.workerProfileData?.education?.edu_class ??
    //               educationList[index] ??
    //               ""
    //             }
    //             required
    //             // defaultValue={educationList[index]}
    //           >
    //             {educationList.map((education, innerIndex) => {
    //               return (
    //                 <option key={innerIndex} value={education}>
    //                   {education}
    //                 </option>
    //               );
    //             })}
    //           </select>
    //           <div className="w-fit h-fit flex items-center justify-center gap-[15px]">
    //             <span className="relative w-fit max-w-[220px] h-fit flex items-center justify-between gap-[15px]">
    //               <span className="absolute text-[rgba(0,0,0,0.45)] font-bold text-[15px] -top-[20px] left-[5px]">
    //                 Start From
    //               </span>
    //               <input
    //                 type="date"
    //                 name="edu_from"
    //                 onChange={(defs) => {
    //                   context.uiStates.setWorkerProfileData((prev) => {
    //                     return {
    //                       ...prev,
    //                       education: {
    //                         ...prev.education,
    //                         edu_from: defs.target.value,
    //                       },
    //                     };
    //                   });
    //                 }}
    //                 value={
    //                   context.uiStates?.workerProfileData?.education
    //                     ?.edu_from || ""
    //                 }
    //                 title="Start From"
    //                 className="w-full max-w-[140px] h-[40px] border-[2px] border-main_website_color_1 outline-none pl-[15px] rounded-[5px] cursor-pointer"
    //               />
    //             </span>
    //             <span className="relative w-fit max-w-[220px] h-fit flex items-center justify-between gap-[15px]">
    //               <span className="absolute text-[rgba(0,0,0,0.45)] font-bold text-[15px] -top-[20px] left-[5px]">
    //                 End To
    //               </span>
    //               <input
    //                 type="date"
    //                 name="edu_to"
    //                 onChange={(defs) => {
    //                   context.uiStates.setWorkerProfileData((prev) => {
    //                     return {
    //                       ...prev,
    //                       education: {
    //                         ...prev.education,
    //                         edu_to: defs.target.value,
    //                       },
    //                     };
    //                   });
    //                 }}
    //                 value={
    //                   context.uiStates?.workerProfileData?.education?.edu_to ||
    //                   ""
    //                 }
    //                 title="End To"
    //                 className="w-full max-w-[140px] h-[40px] border-[2px] border-main_website_color_1 outline-none pl-[15px] rounded-[5px] cursor-pointer"
    //               />
    //             </span>
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </>
    <>
  <h1 className="text-main_website_color_1 text-[28px] font-black mb-[15px]">
    Professional Info
  </h1>

  <div className="w-full h-fit flex flex-col md:flex-row items-center justify-between gap-[15px] mt-[45px]">
    <input
      type="text"
      list="professionList"
      name="profession"
      onChange={(defs) => {
        context.uiStates.setInputStateValue(
          defs,
          context.uiStates.setWorkerProfileData,
          "profession"
        );
      }}
      value={context?.uiStates?.workerProfileData?.profession}
      className="w-full md:max-w-[420px] h-[40px] border-[2px] border-main_website_color_1 outline-none pl-[15px] rounded-[5px] user_profession"
      placeholder="Profession/Occupation"
      required
    />
    <datalist id="professionList">
      {context.uiStates.allProfessionsList.map((profession, index) => {
        return <option key={index} value={profession} />;
      })}
    </datalist>
    <select
      name="experience"
      className="w-full md:max-w-[240px] h-[40px] border-[2px] border-main_website_color_1 outline-none pl-[15px] rounded-[5px] cursor-pointer"
      required
      onChange={(defs) => {
        context.uiStates.setInputStateValue(
          defs,
          context.uiStates.setWorkerProfileData,
          "experience"
        );
      }}
      value={context.uiStates.workerProfileData.experience}
    >
      <option value="" disabled>
        Work Experience
      </option>
      <option value={0.1}>Less than 0.5 Year</option>
      <option value={0.5}>0.5 Year</option>
      <option value={1}>1 Year</option>
      <option value={2}>2 Years</option>
      <option value={3}>3 Years</option>
      <option value={4}>4 Years</option>
      <option value={5}>More than 4 Years</option>
    </select>
  </div>

  <div className="w-full h-fit flex flex-col mt-[25px]">
    <div className="w-full h-fit flex flex-row items-start sm:items-center justify-between gap-[10px]">
      <span className="font-black text-[18px] text-main_website_color_1">
        Add Education
      </span>
      <div className="w-fit h-fit flex gap-[15px]">
        {educationCounter.length > 1 ? (
          <div
            className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] border-[2px] border-top_nav_second_color flex items-center justify-center rounded-[5px] bg-main_website_color_1 cursor-pointer"
            title="Delete this Education"
            onClick={() => {
              setEducationCounter((prev) => {
                if (prev.length > 1) {
                  return [...prev.slice(0, prev.length - 1)];
                }
                return [...prev];
              });
            }}
          >
            <svg
              className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] fill-top_nav_second_color"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
            </svg>
          </div>
        ) : null}
        <motion.svg
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.15 }}
          onClick={addEducationHandler}
          className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] fill-main_website_color_1 cursor-pointer"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
        </motion.svg>
      </div>
    </div>

    {educationCounter.map((counter, index) => {
      return (
        <div
          key={index}
          ref={(refs) => educationSectionRefSetter(refs)}
          className="w-full h-fit flex flex-wrap items-start md:items-center justify-between gap-[15px] mt-[30px]"
        >
          <select
            name="edu_class"
            className="w-full h-[40px] border-[2px] border-main_website_color_1 outline-none pl-[15px] rounded-[5px] cursor-pointer"
            onChange={(defs) => {
              context.uiStates.setWorkerProfileData((prev) => {
                return {
                  ...prev,
                  education: {
                    ...prev.education,
                    edu_class: defs.target.value,
                  },
                };
              });
            }}
            value={
              context?.uiStates?.workerProfileData?.education?.edu_class ??
              educationList[index] ??
              ""
            }
            required
          >
            {educationList.map((education, innerIndex) => {
              return (
                <option key={innerIndex} value={education}>
                  {education}
                </option>
              );
            })}
          </select>

          <div className="grow-[2] h-fit flex flex-row flex-wrap basis-[130px] items-start sm:items-center justify-center gap-[15px] mt-[15px]">
            <span className="relative grow basis-[120px]">
              <span className="absolute text-[rgba(0,0,0,0.45)] font-bold text-[15px] -top-[20px] left-[5px]">
                Start From
              </span>
              <input
                type="date"
                name="edu_from"
                onChange={(defs) => {
                  context.uiStates.setWorkerProfileData((prev) => {
                    return {
                      ...prev,
                      education: {
                        ...prev.education,
                        edu_from: defs.target.value,
                      },
                    };
                  });
                }}
                value={
                  context.uiStates?.workerProfileData?.education?.edu_from || ""
                }
                title="Start From"
                className="w-full h-[40px] border-[2px] border-main_website_color_1 outline-none pl-[15px] rounded-[5px] cursor-pointer"
              />
            </span>

            <span className="relative grow basis-[120px]">
              <span className="absolute text-[rgba(0,0,0,0.45)] font-bold text-[15px] -top-[20px] left-[5px]">
                End To
              </span>
              <input
                type="date"
                name="edu_to"
                onChange={(defs) => {
                  context.uiStates.setWorkerProfileData((prev) => {
                    return {
                      ...prev,
                      education: {
                        ...prev.education,
                        edu_to: defs.target.value,
                      },
                    };
                  });
                }}
                value={
                  context.uiStates?.workerProfileData?.education?.edu_to || ""
                }
                title="End To"
                className="w-full h-[40px] border-[2px] border-main_website_color_1 outline-none pl-[15px] rounded-[5px] cursor-pointer"
              />
            </span>
          </div>
        </div>
      );
    })}
  </div>
</>


  );
}

// Essential Information (Must-have)
// Full Name (tick)
// Username (Unique) (tick)
// Email Address (tick)
// Phone Number (tick)
// Profile Picture (tick)
// Date of Birth (tick)
// Gender (tick)
// Address (City, Country) (tick)

// Professional Information (If needed)
// Occupation (tick)
// Company/Organization
// Education (tick)
// Work Experience (tick)

// Social & Additional Info (Optional)
// Bio/About Me
// Website/Portfolio Link
// Social Media Links (Facebook, LinkedIn, etc.)
// Interests & Hobbies
// Languages Spoken

// Security & Preferences
// Account Privacy Settings
// Two-Factor Authentication (2FA) Option
// Notification Preferences
// Let me know if you n
