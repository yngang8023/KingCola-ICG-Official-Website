import React, { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "./components";
import { Footer } from "./components";
import BackToTopButton from "./components/BackToTopButton";
import LoadingPage from "./components/LoadingPage";

const Homepage = lazy(() => import("./pages/Homepage"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const Envents = lazy(() => import("./pages/Envents"));
const Development = lazy(() => import("./pages/Development"));
const Skills = lazy(() => import("./pages/Skills"));
const Error = lazy(() => import("./pages/Error"));
const ROUTE_LOADING_BLOCKING_MS = 1800;
const ROUTE_LOADING_TIMEOUT_MS = 7000;

const wrapWithRouteTransition = (element) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.24, ease: "easeOut" }}
  >
    {element}
  </motion.div>
);

const RouteReady = ({ onReady, children }) => {
  useLayoutEffect(() => {
    onReady();
  }, [onReady]);

  return children;
};

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isEnventsPage = location.pathname === "/envents";
  const [homeNavOpacity, setHomeNavOpacity] = useState(0);
  const [lastReadyPath, setLastReadyPath] = useState("");
  const [isRouteLoading, setIsRouteLoading] = useState(true);
  const [isRouteTimedOut, setIsRouteTimedOut] = useState(false);
  const hasMainContentShown = lastReadyPath !== "";
  const isRoutePending = lastReadyPath !== location.pathname;
  const useOverlayNavbar = isHomePage || isEnventsPage;
  const effectiveOverlayNavbar = useOverlayNavbar && !isRouteTimedOut;
  const shouldUseRouteLoader = !hasMainContentShown;
  const canShowPersistentUi = hasMainContentShown && !isRoutePending;

  const markRouteReady = useCallback(() => {
    setLastReadyPath(location.pathname);
    setIsRouteTimedOut(false);
    setIsRouteLoading(false);
  }, [location.pathname]);

  const handleRouteTimeout = useCallback(() => {
    setIsRouteTimedOut(true);
    setIsRouteLoading(false);
  }, []);

  const handleRouteRetry = useCallback(() => {
    window.location.reload();
  }, []);

  const handleGoHome = useCallback(() => {
    if (location.pathname === "/") {
      window.location.reload();
      return;
    }
    window.location.href = "/";
  }, [location.pathname]);

  const renderRouteElement = (PageComponent) =>
    wrapWithRouteTransition(
      <Suspense
        fallback={
          shouldUseRouteLoader ? (
            <LoadingPage
              compact={!isRouteLoading}
              fullscreen={!isRouteTimedOut && isRouteLoading}
              timeoutMs={ROUTE_LOADING_TIMEOUT_MS}
              onTimeout={handleRouteTimeout}
              onRetry={handleRouteRetry}
              onGoHome={handleGoHome}
            />
          ) : null
        }
      >
        <RouteReady onReady={markRouteReady}>
          <PageComponent />
        </RouteReady>
      </Suspense>
    );

  useLayoutEffect(() => {
    setIsRouteTimedOut(false);

    if (hasMainContentShown) {
      setIsRouteLoading(false);
      return;
    }
    setIsRouteLoading(true);
  }, [location.pathname, hasMainContentShown]);

  useEffect(() => {
    if (hasMainContentShown) return undefined;

    const blockerTimer = window.setTimeout(() => {
      setIsRouteLoading(false);
    }, ROUTE_LOADING_BLOCKING_MS);

    return () => {
      window.clearTimeout(blockerTimer);
    };
  }, [location.pathname, hasMainContentShown]);

  useEffect(() => {
    if (!isHomePage && !isEnventsPage) {
      setHomeNavOpacity(1);
      return;
    }

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const updateNavOpacity = () => {
      const scrollY = window.scrollY || 0;
      let nextOpacity = 1;

      if (isHomePage) {
        const fadeStart = window.innerHeight; // 先完整滑过一屏再开始显现
        const fadeDistance = Math.max(220, window.innerHeight * 0.28);
        nextOpacity = clamp((scrollY - fadeStart) / fadeDistance, 0, 1);
      } else if (isEnventsPage) {
        // Envents 顶部轮播阶段保持透明，滚动后逐渐实底
        const heroHeight = window.innerWidth >= 768 ? 380 : 460;
        const fadeDistance = Math.max(220, heroHeight * 0.8);
        nextOpacity = clamp(scrollY / fadeDistance, 0, 1);
      }

      setHomeNavOpacity(nextOpacity);
    };

    updateNavOpacity();
    window.addEventListener("scroll", updateNavOpacity, { passive: true });
    window.addEventListener("resize", updateNavOpacity);
    return () => {
      window.removeEventListener("scroll", updateNavOpacity);
      window.removeEventListener("resize", updateNavOpacity);
    };
  }, [isHomePage, isEnventsPage]);

  // const [loading, setLoading] = useState(true);
  // const location = useLocation();
  // const [vantaEffect, setVantaEffect] = useState(null);
  // const myRef = useRef(null);
  // useEffect(() => {
  //   if (!vantaEffect) {
  //     setVantaEffect(
  //       GLOBE({
  //         el: myRef.current,
  //         mouseControls: true,
  //         touchControls: true,
  //         gyroControls: true,
  //         minHeight: 20.0,
  //         minWidth: 20.0,
  //         scale: 0.05,
  //         scaleMobile: 1.0,
  //         size: 0.5,
  //       })
  //     );
  //   }
  //   return () => {
  //     if (vantaEffect) vantaEffect.destroy();
  //   };
  // }, [vantaEffect]);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  // if (loading) {
  //   return <LoadingPage />;
  // }
  return (
    <div className="min-h-screen bg-[#04070d]">
      {/* <div className="overlay">
        <div ref={myRef} className="bg" id="vanta">
          {" "}
        </div>
      </div> */}
      <Navbar navOpacity={effectiveOverlayNavbar ? homeNavOpacity : 1} />
      <div className={effectiveOverlayNavbar ? "" : "pt-20"}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={renderRouteElement(Homepage)}></Route>
            <Route path="/projects" element={renderRouteElement(Projects)}></Route>
            <Route path="/projects/:id" element={renderRouteElement(ProjectPage)}></Route>
            <Route path="/envents" element={renderRouteElement(Envents)}></Route>
            <Route path="/development" element={renderRouteElement(Development)}></Route>
            <Route path="/skills" element={renderRouteElement(Skills)}></Route>
            <Route path="*" element={renderRouteElement(Error)}></Route>
          </Routes>
        </AnimatePresence>
      </div>
      {canShowPersistentUi && <BackToTopButton />}

      {canShowPersistentUi && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

// homepage , projects ,project,blog, community,programs
