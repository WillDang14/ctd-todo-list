import { NavLink } from 'react-router';

import styles from './Header.module.css';

/* ======================================================== */

function Header({ title }) {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>

      <nav>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
              to="/"
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
              to="/about"
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

/* ======================================================== */

export default Header;
