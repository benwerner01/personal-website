import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

const NavBar: React.FC<RouteComponentProps> = ({ location }) => (
  <nav>
    <span>
      <Link
        className={location.pathname === '/' ? 'current' : undefined}
        to="/"
      >
        Home
      </Link>
    </span>
    <span>
      <Link
        className={
          location.pathname === '/contact' ? 'current' : undefined
        }
        to="/contact"
      >
        Contact Me
      </Link>
    </span>
  </nav>
);

export default withRouter(NavBar);
