import { faHome, faTruck, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import NavItem from "../atoms/navItem";

export default function Sidebar() {
    return (
        <div>
            <nav className="sidebar">
                <ul className="nav flex-column component">
                    <NavItem href="/dashboard">
                        <FontAwesomeIcon icon={faHome} className="fa-fw" />
                        <span className="ms-2">Beranda</span>
                    </NavItem>
                    <NavItem href="/dashboard/users">
                        <FontAwesomeIcon icon={faUser} className="fa-fw" />
                        <span className="ms-2">Users</span>
                    </NavItem>
                    <NavItem href="/dashboard/zipick">
                        <FontAwesomeIcon icon={faTruck} className="fa-fw" />
                        <span className="ms-2">ZiPick</span>
                    </NavItem>
                </ul>
            </nav>
        </div>
    )
}