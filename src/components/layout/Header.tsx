import React from "react";
import NavBar from "./NavBar";

const Header: React.FC = () => (
  <div id="header" className="row">
    <div className="col-12">
      <NavBar />
    </div>
    <div id="Headshot" className="col-sm-8 col-lg-4">
      <img src="/assets/profile_picture.png" alt="Ben Werner Headshot" />
      <div className="content">
        <h1>Ben Werner</h1>
        <div id="socials">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/ben-werner-122b3a172/"
            rel="noopener noreferrer"
            target="_blank"
          >
            {/* prettier-ignore */}
            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>
          </a>
          {/* Github */}
          <a
            href="https://github.com/benwerner01"
            rel="noopener noreferrer"
            target="_blank"
          >
            {/* prettier-ignore */}
            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM277.3 415.7c-8.4 1.5-11.5-3.7-11.5-8 0-5.4.2-33 .2-55.3 0-15.6-5.2-25.5-11.3-30.7 37-4.1 76-9.2 76-73.1 0-18.2-6.5-27.3-17.1-39 1.7-4.3 7.4-22-1.7-45-13.9-4.3-45.7 17.9-45.7 17.9-13.2-3.7-27.5-5.6-41.6-5.6-14.1 0-28.4 1.9-41.6 5.6 0 0-31.8-22.2-45.7-17.9-9.1 22.9-3.5 40.6-1.7 45-10.6 11.7-15.6 20.8-15.6 39 0 63.6 37.3 69 74.3 73.1-4.8 4.3-9.1 11.7-10.6 22.3-9.5 4.3-33.8 11.7-48.3-13.9-9.1-15.8-25.5-17.1-25.5-17.1-16.2-.2-1.1 10.2-1.1 10.2 10.8 5 18.4 24.2 18.4 24.2 9.7 29.7 56.1 19.7 56.1 19.7 0 13.9.2 36.5.2 40.6 0 4.3-3 9.5-11.5 8-66-22.1-112.2-84.9-112.2-158.3 0-91.8 70.2-161.5 162-161.5S388 165.6 388 257.4c.1 73.4-44.7 136.3-110.7 158.3zm-98.1-61.1c-1.9.4-3.7-.4-3.9-1.7-.2-1.5 1.1-2.8 3-3.2 1.9-.2 3.7.6 3.9 1.9.3 1.3-1 2.6-3 3zm-9.5-.9c0 1.3-1.5 2.4-3.5 2.4-2.2.2-3.7-.9-3.7-2.4 0-1.3 1.5-2.4 3.5-2.4 1.9-.2 3.7.9 3.7 2.4zm-13.7-1.1c-.4 1.3-2.4 1.9-4.1 1.3-1.9-.4-3.2-1.9-2.8-3.2.4-1.3 2.4-1.9 4.1-1.5 2 .6 3.3 2.1 2.8 3.4zm-12.3-5.4c-.9 1.1-2.8.9-4.3-.6-1.5-1.3-1.9-3.2-.9-4.1.9-1.1 2.8-.9 4.3.6 1.3 1.3 1.8 3.3.9 4.1zm-9.1-9.1c-.9.6-2.6 0-3.7-1.5s-1.1-3.2 0-3.9c1.1-.9 2.8-.2 3.7 1.3 1.1 1.5 1.1 3.3 0 4.1zm-6.5-9.7c-.9.9-2.4.4-3.5-.6-1.1-1.3-1.3-2.8-.4-3.5.9-.9 2.4-.4 3.5.6 1.1 1.3 1.3 2.8.4 3.5zm-6.7-7.4c-.4.9-1.7 1.1-2.8.4-1.3-.6-1.9-1.7-1.5-2.6.4-.6 1.5-.9 2.8-.4 1.3.7 1.9 1.8 1.5 2.6z"></path></svg>
          </a>
          {/* Twitter */}
          <a
            href="https://twitter.com/benwerner01"
            rel="noopener noreferrer"
            target="_blank"
          >
            {/* prettier-ignore */}
            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"></path></svg>
          </a>
          {/* Dribbble */}
          <a
            href="https://dribbble.com/benwerner01"
            rel="noopener noreferrer"
            target="_blank"
          >
            {/* prettier-ignore */}
            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="dribbble-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M90.2 228.2c8.9-42.4 37.4-77.7 75.7-95.7 3.6 4.9 28 38.8 50.7 79-64 17-120.3 16.8-126.4 16.7zM314.6 154c-33.6-29.8-79.3-41.1-122.6-30.6 3.8 5.1 28.6 38.9 51 80 48.6-18.3 69.1-45.9 71.6-49.4zM140.1 364c40.5 31.6 93.3 36.7 137.3 18-2-12-10-53.8-29.2-103.6-55.1 18.8-93.8 56.4-108.1 85.6zm98.8-108.2c-3.4-7.8-7.2-15.5-11.1-23.2C159.6 253 93.4 252.2 87.4 252c0 1.4-.1 2.8-.1 4.2 0 35.1 13.3 67.1 35.1 91.4 22.2-37.9 67.1-77.9 116.5-91.8zm34.9 16.3c17.9 49.1 25.1 89.1 26.5 97.4 30.7-20.7 52.5-53.6 58.6-91.6-4.6-1.5-42.3-12.7-85.1-5.8zm-20.3-48.4c4.8 9.8 8.3 17.8 12 26.8 45.5-5.7 90.7 3.4 95.2 4.4-.3-32.3-11.8-61.9-30.9-85.1-2.9 3.9-25.8 33.2-76.3 53.9zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-64 176c0-88.2-71.8-160-160-160S64 167.8 64 256s71.8 160 160 160 160-71.8 160-160z"></path></svg>
          </a>
        </div>
      </div>
    </div>
    <div id="hi-there" className="col-lg-8">
      <NavBar />
      <div>
        <h3>Hi there,</h3>
        <p>
          I'm a <b>programmer</b> studying computer science at King's College
          London, and a product architect at{" "}
          <a
            href="https://sohostrategy.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Soho Strategy
          </a>
          .
        </p>
      </div>
    </div>
  </div>
);

export default Header;