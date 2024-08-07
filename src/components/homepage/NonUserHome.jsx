import { Link } from "react-router-dom";
import "./homepage.css";

export const NonUserHome = () => {
  return (
    <div className="homepage-container">
      <h1>
        <span>Welcome to</span>
        <span>The Chronicle Channel</span>
      </h1>
      <h3>Map Out Events, One Timeline at a Time</h3>
      <div>
        <Link to="/login">
          <button className="btn-primary">CREATE A TIMELINE</button>
        </Link>
      </div>
    </div>
  );
};

{/* <main>
<section className="homepage-container">
  <div className="section-1_box">
    <div className="section-1_header_container">
      <div className="section-1_header">
        <div>
          <h1>
            <span>The Chronicle Channel</span>
          </h1>
          <h3>Map Out Events, One Timeline at a Time</h3>
        </div>
      </div>
      <div className="section-1_button">
        <Link to="/login">
          <button className="btn-primary">CREATE A TIMELINE</button>
        </Link>
      </div>
    </div>
  </div>
</section>
<section className="faq">
  <h2 className="faq_header">FAQs for The Chronicle Channel</h2>
  <div className="faq_content">
    <div className="faq_content_box">
      <div className="faq_content_header">
        <h3 className="faq_content_header_text">
          How do I sign up for The Chronicle Channel?
        </h3>
        <button className="faq_content_header_icon">
          <img
            src="/assets/img/marketing/up_arrow.svg"
            alt="Collapse FAQ Content"
            className="faq_content_header_image"
          />
        </button>
      </div>
      <div className="faq_content_body faq_content_body_active">
        <p className="faq_content_body_text">
          To start using our timeline creator, register on The Chronicle
          Channel through our Register page using a username, password,
          and email. Creating an account is free and provides you access
          to basic features.
        </p>
      </div>
    </div>
    <div className="faq_content_box">
      <div className="faq_content_header">
        <h3 className="faq_content_header_text">
          Why is The Chronicle Channel the best tool to create my
          timeline?
        </h3>
        <button className="faq_content_header_icon">
          <img
            src="/assets/img/marketing/down_arrow.svg"
            alt="Expand FAQ Content"
            className="faq_content_header_image"
          />
        </button>
      </div>
      <div className="faq_content_body">
        <p className="faq_content_body_text">
          "Our users say: "The Chronicle Channel offers the best variety of
          professional templates, the most flexible design features, and
          unbeatable customer service." If you're looking to create a
          truly professional timeline, our user-friendly timeline maker
          and extensive template selection will help you get started
          quickly.""
        </p>
      </div>
    </div>
    <div className="faq_content_box">
      <div className="faq_content_header">
        <h3 className="faq_content_header_text">
          What else can I make with The Chronicle Channel?
        </h3>
        <button className="faq_content_header_icon">
          <img
            src="/assets/img/marketing/down_arrow.svg"
            alt="Expand FAQ Content"
            className="faq_content_header_image"
          />
        </button>
      </div>
      <div className="faq_content_body">
        <p className="faq_content_body_text">
          The Chronicle Channel is your go-to platform for visual design.
          Once you sign up for a free account, you can create timelines,
          roadmaps, reports, project management plans, white papers, data
          visualizations, history presentations, and more.
        </p>
      </div>
    </div>
  </div>
  <div className="faq_button">
    <Link to="/login">
      <button className="btn-primary">CREATE A TIMELINE</button>
    </Link>
  </div>
</section>
</main>
);
}; */}