import { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router";
import { Main_context } from "../../../stores/main_store/main_store";
export function Section_1() {
  let context = useContext(Main_context);
  let navigator = useNavigate();
  let [turbulenceScale, setTurbulenceScale] = useState(0);
  let turbulence_change_interval = null;
  let reverse_turbulence_change_interval = null;
  let turbulence_change_timeout = null;
  let reverse_turbulence_change_timeout = null;
  const img_role_name = useRef(null);
  const s1_right_img_refs = useRef([]);
  const [s1_img_bottom_tag_name, set_s1_img_bottom_tag_name] = useState(
    "Skilled Electrician"
  );
  const [s1_img_change, s1_set_img_change] = useState(0);
  let img_txt_animation_timeout = null;
  const selected_img = useRef(null);
  let [hideImage, setHideImage] = useState([]);
  function hide_image_selection(selected_img_pos) {
    change_img_text_animation();
    if (selected_img_pos === 0) {
      set_s1_img_bottom_tag_name("Electrician");
      setHideImage([
        s1_right_img_refs.current[1],
        s1_right_img_refs.current[2],
      ]);
    } else if (selected_img_pos === 1) {
      set_s1_img_bottom_tag_name("Senior Engineers");
      setHideImage([
        s1_right_img_refs.current[0],
        s1_right_img_refs.current[2],
      ]);
    } else if (selected_img_pos === 2) {
      set_s1_img_bottom_tag_name("Skilled Worker");
      setHideImage([
        s1_right_img_refs.current[0],
        s1_right_img_refs.current[1],
      ]);
    }
  }
  function change_img_text_animation() {
    gsap.to(img_role_name.current, {
      y: "60px",
      duration: 0.35,
      ease: "power2",
    });
    if (img_txt_animation_timeout) {
      clearTimeout(img_txt_animation_timeout);
    }
    img_txt_animation_timeout = setTimeout(() => {
      gsap.fromTo(
        img_role_name.current,
        {
          y: "-60px",
        },
        {
          y: "0px",
          duration: 0.65,
          ease: "power2",
        }
      );
    }, 350);
  }
  function changeTurbulenceValue() {
    if (turbulence_change_interval) {
      clearInterval(turbulence_change_interval);
    }
    turbulence_change_interval = setInterval(() => {
      setTurbulenceScale((prev) => prev + 14);
    }, 20);
    if (turbulence_change_timeout) {
      clearTimeout(turbulence_change_timeout);
    }
    turbulence_change_timeout = setTimeout(() => {
      clearInterval(turbulence_change_interval);
    }, 150);
    if (reverse_turbulence_change_timeout) {
      clearTimeout(reverse_turbulence_change_timeout);
    }
    reverse_turbulence_change_timeout = setTimeout(() => {
      reverse_turbulence_change_interval = setInterval(() => {
        setTurbulenceScale((prev) => {
          if (prev > 0) {
            return prev - 14;
          } else {
            return prev;
          }
        });
      }, 20);
      setTimeout(() => {
        clearInterval(reverse_turbulence_change_interval);
      }, 150);
    }, 150);
  }
  function changeTurbulence(showImg, hideImg) {
    changeTurbulenceValue();
    gsap.to(showImg, {
      duration: 0.15,
      scale: 1,
      delay: 0.15,
      opacity: 1,
      onStart: () => {
        showImg.style.display = "inline-block";
      },
    });
    gsap.to(hideImg, {
      duration: 0.15,
      scale: 1,
      delay: 0.15,
      opacity: 0,
      onComplete: () => {
        hideImg.forEach((each) => {
          each.style.display = "none";
        });
      },
    });
  }
  useEffect(() => {
    if (selected_img.current) {
      changeTurbulence(selected_img.current, hideImage);
    }
  }, [selected_img.current]);
  useEffect(() => {
    hide_image_selection(s1_img_change);
    selected_img.current = s1_right_img_refs.current[s1_img_change];
  }, [s1_img_change]);
  function left_click() {
    s1_set_img_change((prev) => {
      return prev > 0 ? prev - 1 : prev;
    });
  }
  function right_click() {
    s1_set_img_change((prev) => {
      return prev <= 1 ? prev + 1 : prev;
    });
  }
  return (
    <>
      <section id="section_1">
        <div className="s1_top_page_style">
          <div className="s1_top_box_icon_cover">
            <svg
              viewBox="0 0 16 16"
            >
              <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" />
            </svg>
          </div>
          <span className="s1_top_box_text">Come With Us</span>
        </div>
        <div className="s1_left_box">
          <h6 className="s1_left_box_sub_heading">
            Lorem ipsum dolor sit amet.
          </h6>
          <h1 className="s1_left_box_heading">
            Our Registered <strong>Workers</strong>
            <br /> Will Help You a lot.
          </h1>
          <p className="s1_left_box_paragraph">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
            voluptatibus illo nostrum dolorum distinctio. Pariatur distinctio
            dignissimos molestiae esse at quas doloribus! Commodi atque eaque
            totam minima quo. Laudantium quos repudiandae quo? Minima
            perspiciatis.
          </p>
          <button type="button" onClick={() => {
            navigator("/hire_worker");
            {context.account.login || context.account.signup ? navigator('/hire') : navigator('/login')}
          }} className="s1_left_hire_button ">
            Hire Them
          </button>
        </div>
        <div className="s1_center_vr"></div>
        <div className="s1_right_box">
          <div className="s1_img_content_cover_box">
            <div className="s1_img_cover">
              <img
                src="/images/section_1/s1_engeneeir_image_1.webp"
                className="s1_imgs"
                ref={(reference) => s1_right_img_refs.current.push(reference)}
                alt="Engineer 1"
              />
              <img
                src="/images/section_1/s1_engeneeir_image_2.webp"
                className="s1_imgs"
                ref={(reference) => s1_right_img_refs.current.push(reference)}
                alt="Engineer 2"
              />
              <img
                src="/images/section_1/s1_engeneeir_image_3.webp"
                className="s1_imgs"
                ref={(reference) => s1_right_img_refs.current.push(reference)}
                alt="Engineer 3"
              />
            </div>
            <div className="change_img_arrow_box">
              <svg
                viewBox="0 0 16 16"
                className="s1_img_change_left_arrow"
                onClick={left_click}
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
                />
              </svg>
              <h3 className="img_role_name" ref={img_role_name}>
                {s1_img_bottom_tag_name}
              </h3>
              <svg
                className="s1_img_change_right_arrow"
                onClick={right_click}
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                />
              </svg>
            </div>
          </div>
          <svg
            width={"100%"}
            height={"100%"}
            viewBox="0 0 1080 1920"
            style={{ display: "none" }}
          >
            <defs>
              <filter
                id="spread_filter"
                colorInterpolationFilters="linearRGB"
                filterUnits="objectBoundingBox"
                primitiveUnits="userSpaceOnUse"
              >
                <feTurbulence
                  type="turbulence"
                  baseFrequency="0.039 0.059"
                  numOctaves="8"
                  seed="4"
                  stitchTiles="stitch"
                  x="0%"
                  y="0%"
                  width="100%"
                  height="100%"
                  result="turbulence"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="turbulence"
                  scale={`${turbulenceScale}`}
                  xChannelSelector="R"
                  yChannelSelector="B"
                  x="0%"
                  y="0%"
                  width="100%"
                  height="100%"
                  result="displacementMap"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
}
