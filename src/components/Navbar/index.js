import React from "react";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useIdleTimer } from "react-idle-timer";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getLoggedUserInfo } from "../../utils/helpers";

const NavBar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleOnIdle = () => {
    localStorage.setItem(
      "loggedout",
      JSON.stringify({
        message: "You are logged out due to the long time of inactivity",
        path: `${window.location.pathname}${window.location.search}`,
      })
    );
    logout();
  };

  useIdleTimer({
    timeout: 1000 * 60 * 15,
    onIdle: handleOnIdle,
  });

  const { name } = getLoggedUserInfo();
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand to="#home">Gwiza</Navbar.Brand>
      <Nav className="mr-auto">
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
        <Link to="/groups" className="nav-link text_white">
          Groups
        </Link>
        <Link to="/migration" className="nav-link text_white">
          Migration
        </Link>
        <NavDropdown style={{ minWidth: "150px" }} title="Support">
          <NavDropdown.Item href="/support">
            Logs
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav>
        <NavDropdown style={{ minWidth: "150px" }} title={name}>
          <NavDropdown.Item href="#" onClick={logout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};
export default NavBar;
