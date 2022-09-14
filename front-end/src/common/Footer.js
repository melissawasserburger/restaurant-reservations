import React from "react";

function Footer() {
  return (
    <div
      style={{
        backgroundColor: "#141C2C",
        height: "10rem",
      }}
      className="mt-5 row d-flex justify-content-center"
    >
      <div className="col col-12">
        <h5
          style={{
            color: "#8494B4",
            marginTop: "2rem",
            fontFamily: "Satisfy",
            fontSize: "1.75rem",
          }}
          className="d-flex justify-content-center"
        >
          Periodic Table
        </h5>
      </div>
      <div
        style={{
          color: "#8494B4",
          fontFamily: "sans serif",
        }}
        className="col col-6 d-flex justify-content-around"
      >
        <p>Terms of Service</p>
        <p>Privacy Policy</p>
        <p>Contact Us</p>
        <p>Sitemap</p>
      </div>
    </div>
  );
}

export default Footer;
