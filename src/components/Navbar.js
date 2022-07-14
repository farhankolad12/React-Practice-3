import React from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">React Practice</Link>
      <ul>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/check-status">Check Status</CustomLink>
      </ul>
    </nav>
  );
};

const CustomLink = ({ to, children }) => {
  const resolvePath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvePath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to}>{children}</Link>
    </li>
  );
};

export default Navbar;
