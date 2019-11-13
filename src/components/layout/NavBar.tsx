import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

const NavBar: React.FC<RouteComponentProps> = props => (
  <nav>
    {console.log(props)}
    <span>
      <Link
        className={props.location.pathname === "/" ? "current" : undefined}
        to="/"
      >
        Home
      </Link>
      <Link
        className={props.location.pathname === "/blog" ? "current" : undefined}
        to="/blog"
      >
        Blog
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
