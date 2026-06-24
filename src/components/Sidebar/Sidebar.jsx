import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBoxOpen, FaUserCircle } from "react-icons/fa";
import { MdStore } from "react-icons/md";
import logo from "../../assets/logo.png";
import "./Sidebar.css";

// 1. Recibimos isOpen y toggleSidebar como props
const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();

    const navLinks = [
        { to: "/", text: "Inicio", icon: <FaHome /> },
        { to: "/products", text: "Productos", icon: <FaBoxOpen /> },
        { to: "/categories", text: "Categorías", icon: <MdStore /> },
    ];

    return (
        <>
            {/* 2. Eliminamos el <button> que estaba acá arriba */}

            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>

                <nav className="nav">
                    <ul className="nav-links">
                        {navLinks.map((link) => (
                            <li key={link.to} className={`nav-item ${location.pathname === link.to ? 'active' : ''}`}>
                                {/* Al hacer click en un link, cerramos el menú en mobile */}
                                <Link to={link.to} className="nav-link" onClick={() => toggleSidebar()}>
                                    <span className="nav-icon">{link.icon}</span>
                                    <span className="nav-text">{link.text}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <Link to="/profile" className="user-profile">
                    <FaUserCircle className="user-avatar-icon" />
                    <span className="user-name">Usuario</span>
                </Link>
            </div>

            {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
        </>
    )
};

export default Sidebar;