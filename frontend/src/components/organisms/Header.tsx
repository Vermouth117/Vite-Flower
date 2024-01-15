import { MouseEventHandler, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

import styles from "./Header.module.scss";

const Header = () => {
  const navigate = useNavigate();

  const handleClick: MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      navigate(`${e.currentTarget.getAttribute("href")}`);
    },
    [navigate]
  );

  return (
    <header>
      <nav>
        <h1>
          <a href="/" onClick={handleClick}>
            Vermouth
          </a>
        </h1>
        <ul>
          <li>
            <a href="/" onClick={handleClick}>
              Home
            </a>
          </li>
          <li>
            <a href="/about" onClick={handleClick}>
              About
            </a>
          </li>
          <li>
            <a href="/contact" onClick={handleClick}>
              Contact
            </a>
          </li>
          <li>
            <a href="/order" onClick={handleClick}>
              Order
            </a>
          </li>
          <li>
            <a href="/online-shop" onClick={handleClick}>
              Online Shop
            </a>
          </li>
          <li>
            <a className={styles.cart} href="/cart" onClick={handleClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </a>
          </li>
          <li>
            <a className={styles.user} href="/user" onClick={handleClick}>
              <PermIdentityIcon />
            </a>
          </li>
        </ul>
      </nav>
      <div className={styles.address}>
        〒123-4567　福岡県北九州市小倉北区0-0-00　1F
        <span>
          <svg
            width="1em"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="phone"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            data-fa-i2svg=""
          >
            <path
              fill="currentColor"
              d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"
            ></path>
          </svg>{" "}
          000-0000-0000
        </span>
      </div>
    </header>
  );
};

export default Header;
