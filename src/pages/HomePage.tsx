import React from 'react';

const HomePage: React.FC = () => (
  <div id="home-page" className="row page">
    <div className="col">
      <div id="hi-there">
        <h3>Hi there,</h3>
        <p>
          {"I'm a "}
          <b>programmer</b>
          {" studying computer science at King's College London, currently building "}
          <a
            href="https://cortexnotes.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Cortex
          </a>
          .
        </p>
      </div>
    </div>
  </div>
);

export default HomePage;
