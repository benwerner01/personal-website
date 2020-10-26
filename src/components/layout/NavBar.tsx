import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

const NavBar: React.FC<RouteComponentProps> = props => (
  <nav>
    <span>
      <Link
        className={props.location.pathname === "/" ? "current" : undefined}
        to="/"
      >
        Home
      </Link>
    </span>
    <span>
      <Link
        className={
          props.location.pathname === "/contact" ? "current" : undefined
        }
        to="/contact"
      >
        Contact Me
      </Link>
    </span>
  </nav>
);

export default withRouter(NavBar);
