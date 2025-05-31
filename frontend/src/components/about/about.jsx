import React from "react";
import { Section_3_cop } from "./Section_3_cop";
import about_img_1 from "../../assets/images/about/about_img_1.webp";
import { Footer } from "../Footer/footer";
export default function About() {
  return (
    <>
      <section id="about_section_3">
        <div className="about_section_3_cover">
          <Section_3_cop
            direction={false}
            img_src={about_img_1}
            heading={["An Agency With Classic", "Revolutionary Skills!"]}
            disc_1_heading="Your Success, Our Priority"
            disc_1_txt="At Landin, we believe in empowering our clients to achieve their goals. Our team works closely with you."
            disc_2_heading="Partners You Can Rely On"
            disc_2_txt="Landin is here to ensure your success with expert guidance and collaborative teamwork."
            rating_txt="200+ Agencies Rated"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
