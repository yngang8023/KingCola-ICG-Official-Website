import React, { useEffect, useRef, useState } from "react";
import "./css/Navbar.css";
import { logonav } from "../assets";
import { Link, useLocation } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Navbar = ({ navOpacity = 1 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const clampedOpacity = Math.min(1, Math.max(0, navOpacity));
  const isTransparent = clampedOpacity <= 0.02;

  const navStyle = {
    backgroundColor: `rgba(10, 18, 34, ${0.46 * clampedOpacity})`,
    borderColor: `rgba(255, 255, 255, ${0.08 * clampedOpacity})`,
    boxShadow: `0 10px 26px rgba(0, 0, 0, ${0.18 * clampedOpacity})`,
    backdropFilter: `blur(${10 * clampedOpacity}px) saturate(${100 + 30 * clampedOpacity}%)`,
    WebkitBackdropFilter: `blur(${10 * clampedOpacity}px) saturate(${100 + 30 * clampedOpacity}%)`,
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavLinkClick = () => {
    closeAllMenus();
  };

  useEffect(() => {
    closeAllMenus();
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onPointerDown = (event) => {
      const target = event.target;
      const clickedInsideMenu = menuRef.current?.contains(target);
      const clickedMobileToggle = mobileToggleRef.current?.contains(target);
      if (!clickedInsideMenu && !clickedMobileToggle) {
        closeAllMenus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`navbar z-50 ${isTransparent ? "navbar--transparent" : "navbar--solid"}`}
      style={navStyle}
    >
      <div className="navbar__left">
        <Link to="/" className="navbar__logo">
          <img src={logonav} alt="logonav" style={{ width: '75px', height: 'auto' }} />
        </Link>
        <Link to="/" >
          <span className="navbar__company-name">KingCola-ICG</span>
        </Link>

      </div>
      <div className="navbar__right">
        <div ref={menuRef} className={`navbar__menu ${isMobileMenuOpen ? "open" : ""}`}>
          {!isHomePage && (
            <Link to="/" className="navbar__link" onClick={handleNavLinkClick}>
              首页
            </Link>
          )}
          <Link to="/projects" className="navbar__link" onClick={handleNavLinkClick}>
            团队项目
          </Link>
          <Link to="/development" className="navbar__link" onClick={handleNavLinkClick}>
            团队发展
          </Link>
          <Link to="/envents" className="navbar__link" onClick={handleNavLinkClick}>
            团队活动
          </Link>
          <Link to="/skills" className="navbar__link" onClick={handleNavLinkClick}>
            团队技能
          </Link>
          <a
            href="https://github.com/yngang8023/KingCola-ICG-Official-Website"
            target="_blank"
            rel="noreferrer noopener"
            className="navbar__github-link"
            aria-label="GitHub Star"
            title="GitHub Star"
            onClick={handleNavLinkClick}
          >
            <FaGithub className="navbar__github-icon" />
            <span className="navbar__github-label">GitHub</span>
          </a>
          <a
            href="https://blog.kingcola-icg.cn/"
            target="_blank"
            rel="noreferrer noopener"
            onClick={handleNavLinkClick}
          >
            <button className="navbar__button">博客</button>
          </a>
        </div>
        <div
          ref={mobileToggleRef}
          className="navbar__mobile-menu"
          onClick={toggleMobileMenu}
        >
          <div
            className={`navbar__hamburger ${isMobileMenuOpen ? "open" : ""}`}
          />
          <div className={"ham_bar"}></div>
          <div className={"ham_bar"}></div>
          <div className={"ham_bar"}></div>
          <div className={"ham_bar"}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
