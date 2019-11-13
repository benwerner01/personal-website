import React from "react";

const HomePage: React.FC = () => (
  <div id="home-page" className="row page">
    <div className="col">
      <div id="hi-there">
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
      <h3>My primary tools:</h3>
      <ul className="icons">
        <li>
          <span role="img" aria-label="Spanner">
            🔧
          </span>
          <p>Node Microservices</p>
        </li>
        <li>
          <span role="img" aria-label="Hammer">
            🔨
          </span>
          <p>React JS</p>
        </li>
        <li>
          <span role="img" aria-label="Box">
            📦
          </span>
          <p>Docker Containerisation</p>
        </li>
        <li>
          <span role="img" aria-label="Copyright">
            ⚙️
          </span>
          <p>AWS Hosting</p>
        </li>
      </ul>
    </div>
  </div>
);

export default HomePage;
