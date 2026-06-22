import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBoxOpen, FaAngleLeft,FaUserCircle } from "react-icons/fa";
import { MdStore } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import logo from "../../assets/logo.png";
import "./Sidebar.css";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { to: "/", text: "Inicio", icon: <FaHome /> },
        { to: "/products", text: "Productos", icon: <FaBoxOpen /> },
        { to: "/categories", text: "Categorías", icon: <MdStore /> },
    ];

    return (
        <>
            <button className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}>
                {isOpen ? <FaAngleLeft /> : <FiMenu />}
            </button>

            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>

                <nav className="nav">
                    <ul className="nav-links">
                        {navLinks.map((link) => (
                            <li key={link.to} className={`nav-item ${location.pathname === link.to ? 'active' : ''}`}>
                                <Link to={link.to} className="nav-link" onClick={() => setIsOpen(false)}>
                                    <span className="nav-icon">{link.icon}</span>
                                    <span className="nav-text">{link.text}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* --- PERFIL DEL USUARIO  --- */}
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