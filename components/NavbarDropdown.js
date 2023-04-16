import React from "react";
import Link from "next/link";
import Image from "next/image";
import image from "../assests/default_avatar.png";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/account.module.scss";

function NavbarDropdown({ address }) {
  return (
    <Dropdown>
      <Dropdown.Toggle
        id="dropdown-button-dark-example1"
        variant="secondary"
        className="bg-transparent border-0 d-flex align-items-center"
      >
        <div className="d-flex flex-column align-items-end">
          <div className=" rounded-circle bg-white overflow-hidden nav-img">
            <Image src={image} alt="" className="w-100 nav-img" />
          </div>
          <p className={styles.address}>{address}</p>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu variant="dark">
        <Dropdown.Item href="/">Dashboard</Dropdown.Item>
        <Dropdown.Item href="/Profile">
          <Link href="/Profile" className="text-white text-decoration-none">
            Profile
          </Link>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#/action-4" className="disabled">
          settings
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default NavbarDropdown;
