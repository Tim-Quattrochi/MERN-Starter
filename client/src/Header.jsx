import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuthContext from "./hooks/useAuthContext";

const Navbar = () => {
  const { authState, handleLogout } = useAuthContext();

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li>
          <NavLink
            exact={true.toString()}
            to="/dashboard"
            style={styles.navLink}
            activestyle={styles.activeNavLink}
          >
            Dashboard
          </NavLink>
        </li>
        <li style={{ marginLeft: "auto" }}>
          {!authState.isAuthenticated ? (
            <>
              <NavLink
                to="/register"
                style={styles.navLink}
                activestyle={styles.activeNavLink}
                exact={true.toString()}
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                style={styles.navLink}
                activestyle={styles.activeNavLink}
              >
                Login
              </NavLink>
            </>
          ) : (
            <>
              Hello, {authState.user.name}
              <Link to="/" style={styles.navLink} onClick={handleLogout}>
                Logout
              </Link>
            </>
          )}
        </li>
      </ul>
    </nav>
    //test
  );
};

const styles = {
  navbar: {
    backgroundColor: "#333",
    padding: "10px",
  },
  navList: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    padding: "8px 16px",
  },
  activeNavLink: {
    fontWeight: "bold",
  },
};

export default Navbar;
