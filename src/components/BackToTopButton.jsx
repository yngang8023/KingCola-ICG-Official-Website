import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const BackToTopButton = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 420);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setShowBackToTop(window.scrollY > 420);
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="返回顶部"
      className={`fixed right-4 md:right-8 bottom-6 md:bottom-8 z-[90] inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#8ed8ff]/45 bg-[#071528]/72 text-[#d8f3ff] shadow-[0_8px_26px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:border-[#8ed8ff]/90 hover:bg-[#0b2340]/85 hover:text-white ${
        showBackToTop
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <KeyboardArrowUpIcon fontSize="medium" />
    </button>
  );
};

export default BackToTopButton;
