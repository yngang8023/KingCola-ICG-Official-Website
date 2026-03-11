import React, { useEffect, useRef, useState } from 'react';
import "./css/Footer.css";
import { logonav } from "../assets";
import kingcolaDrawerBg from "../assets/images/KINGCOLA.png";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useLocation } from "react-router-dom";
import GridDistortion from "./GridDistortion";


const Footer = () => {
    const location = useLocation();
    const drawerRef = useRef(null);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);

    useEffect(() => {
        setIsDrawerVisible(false);
    }, [location.pathname]);

    const handleBackToTop = (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleToBottom = (event) => {
        event.preventDefault();

        const scrollToDrawerEnd = (smooth = true) => {
            const target = document.documentElement.scrollHeight - window.innerHeight;
            window.scrollTo({
                top: Math.max(0, target),
                behavior: smooth ? "smooth" : "auto",
            });
        };

        const followRevealScroll = () => {
            // During expand transition, keep following the growing footer drawer
            // so users feel a continuous "pull down" reveal.
            const followDurations = [120, 280, 460, 680];
            followDurations.forEach((delay) => {
                window.setTimeout(() => scrollToDrawerEnd(false), delay);
            });
        };

        if (!isDrawerVisible) {
            setIsDrawerVisible(true);
            scrollToDrawerEnd(true);
            followRevealScroll();
            return;
        }

        drawerRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        scrollToDrawerEnd(true);
    };

    return (
        <div className="footer-shell">
            <footer className="footer-container">
            <div className="logo-row">
                <img src={logonav} alt="Company Logo" className="logo" />
                <span className="company-name">KingCola-ICG</span>
            </div>
            <hr className="footer-hr" />
            <div className="footer-nav-row">
                <div className="social-icons-row">
                    <a href="https://im.qq.com/" className="social-icon-link" target="_blank" rel="noreferrer">
                        <i className="fab fa-qq social-icon"></i>
                    </a>
                    <a href="https://github.com/yngang8023/KingCola-ICG-Official-Website" className="social-icon-link">
                        <i className="fab fa-github social-icon"></i>
                    </a>
                    <a href="mailto:kingcola_icg@163.com" className="social-icon-link">
                        <i className="far fa-envelope social-icon"></i>
                    </a>
                </div>
                <div className="section-links-row">
                    <Link to="/" className="section-link section-link--home">
                        首页
                    </Link>
                    <div className="section-links-grid">
                        <Link to="/projects" className="section-link">
                            团队项目
                        </Link>
                        <Link to="/development" className="section-link">
                            团队发展
                        </Link>
                        <Link to="/envents" className="section-link">
                            团队活动
                        </Link>
                        <Link to="/skills" className="section-link">
                            团队技能
                        </Link>
                        <Link
                            to="https://computer.hnust.edu.cn/"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="section-link"
                        >
                            学院官网
                        </Link>
                        <Link
                            to="https://blog.kingcola-icg.cn/"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="section-link"
                        >
                            团队博客
                        </Link>
                    </div>
                    <Link to={location.pathname} className="section-link back-top-link" onClick={handleBackToTop}>
                        Back to Top
                    </Link>
                    <Link to={location.pathname} className="section-link to-bottom-link" onClick={handleToBottom}>
                        To the Bottom
                    </Link>
                </div>
            </div>
            <hr className="footer-hr" />
            <div className="footer-bottom">
                <p>&copy; 2025-{new Date().getFullYear()} KingCola-ICG 创新团队 · 版权所有</p>
                <div className="beian-info">
                    <div className="beian-item">
                        <i className="fas fa-certificate icon-beian" aria-hidden="true"></i>
                        <a href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer" className="beian-link">
                            湘ICP备2025119009号-1
                        </a>
                    </div>
                    <a
                        href="https://beian.mps.gov.cn/#/query/webSearch?code=43052302000176"
                        rel="noreferrer"
                        target="_blank"
                        className="beian-link police-beian"
                    >
                        <img
                            src="https://www.beian.gov.cn/img/new/gongan.png"
                            alt="公安备案图标"
                            className="police-icon"
                        />
                        <span>湘公网安备43052302000176号</span>
                    </a>
                </div>
                <div className="security-info-container">
                    <span>本站由</span>
                    <a href="http://defense.yunaq.com" target="_blank" rel="noreferrer" className="yunaq-link">
                        <img
                            src="https://www.yunaq.com/common-module/static/footer/stat3.png"
                            alt="知道创宇云防御"
                            className="yunaq-icon"
                        />
                    </a>
                    <span>提供安全加速CDN服务</span>
                </div>
            </div>
            </footer>

            <section
                ref={drawerRef}
                className={`footer-drawer ${isDrawerVisible ? "footer-drawer--visible" : "footer-drawer--hidden"}`}
                aria-label="KingCola ICG Distortion Drawer"
            >
                <div className="footer-drawer-bg">
                    <GridDistortion
                        className="footer-drawer-grid"
                        imageSrc={kingcolaDrawerBg}
                        fit="cover"
                        grid={20}
                        mouse={0.14}
                        strength={0.2}
                        relaxation={0.92}
                    />
                </div>
                <div className="footer-drawer-overlay" />
            </section>
        </div>
    );
};

export default Footer;
