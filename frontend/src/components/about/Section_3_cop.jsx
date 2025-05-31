import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useNavigate } from "react-router";
gsap.registerPlugin(ScrollTrigger);
export function Section_3_cop(props) {
  let navigator = useNavigate();  
  const section_3_box_cover = useRef(null);
  const section_3_rating_cover = useRef(null);
  const section3_heading = useRef([]);
  function set_refs(refs) {
    section3_heading.current.push(refs);
  }
  useEffect(() => {
    if (props.direction) {
      section_3_box_cover.current.style.flexDirection = "row-reverse";
    } else {
      section_3_box_cover.current.style.flexDirection = "row";
    }
  }, [props.direction]);
  useEffect(() => {
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = `${
            section3_heading.current.indexOf(entry.target) * 0.05
          }s`;
          entry.target.classList.add("show_heading");
          observer.unobserve(entry.target);
        }
      });
    });
    section3_heading.current.forEach((each) => {
      observer.observe(each);
      console.log(each);
    });
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <>
      <div className="section_3_box_cover" ref={section_3_box_cover}>
        <div className="section_3_lft_box">
          <div className="section_3_lft_box_design_1"></div>
          <div className="section_3_lft_box_img_cover">
            <img src={props.img_src} alt="About Image" />
          </div>
        </div>
        <div className="section_3_rgt_box">
          <div className="section_3_rgt_box_btn_box">
            <span className="section_3_rgt_box_btn_box_dot"></span>
            <span className="section_3_rgt_box_btn_box_txt">About</span>
          </div>
          <h1 className="section_3_rgt_heading">
            {props.heading.map((each, index) => {
              return (
                <span
                  key={index}
                  className="s3_heading"
                  ref={(refs) => set_refs(refs)}
                >
                  {each}
                </span>
              );
            })}
          </h1>
          <hr className="section_3_rgt_heading_disc_hr" />
          <div className="section_3_rgt_disc_1_div">
            <h3>{props.disc_1_heading}</h3>
            <p>{props.disc_1_txt}</p>
          </div>
          <div className="section_3_rgt_disc_2_div">
            <h3>{props.disc_2_heading}</h3>
            <p>{props.disc_2_txt}</p>
          </div>
          <div
            className="section_3_rgt_bottom_div"
            ref={section_3_rating_cover}
          >
            <button type="button" onClick={() => navigator('/hire')}>Book an Appointment</button>
            <span className="section_3_rgt_bottom_div_vr"></span>
            <div className="section_3_rgt_bottom_div_rating_div">
              <span className="section_3_rgt_bottom_div_rating_div_star_cover">
                <svg viewBox="0 0 16 16" ref={(refs) => set_refs(refs)}>
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg viewBox="0 0 16 16" ref={(refs) => set_refs(refs)}>
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg viewBox="0 0 16 16" ref={(refs) => set_refs(refs)}>
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg viewBox="0 0 16 16" ref={(refs) => set_refs(refs)}>
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg viewBox="0 0 16 16" ref={(refs) => set_refs(refs)}>
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
              </span>
              <span className="section_3_rgt_bottom_div_rating_disc">
                {props.rating_txt}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
