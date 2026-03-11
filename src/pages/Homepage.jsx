import React, { useRef, useState, useEffect } from "react";
import {
    Card,
    DarkVeil,
    LiquidEther,
    LightRays,
    RotatingText,
    CurvedLoop,
    LogoLoop,
    LaserFlow,
} from "../components";
import FluidGlass from "../components/FluidGlass";
import { motion } from "framer-motion";
import { programs } from "../constants/Events";
import {
    logosvg,
    toparrow,
    downarrow,
} from "../assets";

import "../assets/css/homepage.css";
// import Xarrow from "react-xarrows";
import { slideIn } from "../utils/motion";
import { useProjects } from "../hooks/useProjects";

const DEEP_CORE_VISUAL = {
    lightRaysWrapperClass: "opacity-[0.86] [mask-image:linear-gradient(to_bottom,black_0%,black_48%,transparent_84%)]",
    lightRays: {
        raysOrigin: "top-center",
        raysColor: "#9ad8ff",
        raysSpeed: 1.05,
        lightSpread: 0.94,
        rayLength: 1.55,
        fadeDistance: 1.3,
        saturation: 1.14,
        followMouse: true,
        mouseInfluence: 0.12,
        noiseAmount: 0.028,
        distortion: 0.02,
    },
    darkVeilWrapperClass: "opacity-[0.58]",
    darkVeil: {
        hueShift: 14,
        noiseIntensity: 0.018,
        scanlineIntensity: 0.032,
        speed: 0.5,
        scanlineFrequency: 0.62,
        warpAmount: 0.1,
        resolutionScale: 1,
    },
    liquidEtherWrapperClass: "opacity-[0.52] mix-blend-screen",
    liquidEther: {
        colors: ["#1d2ff2", "#2f86ff", "#8af2ff"],
        mouseForce: 20,
        cursorSize: 94,
        isViscous: true,
        viscous: 26,
        iterationsViscous: 22,
        iterationsPoisson: 20,
        resolution: 0.24,
        autoSpeed: 0.42,
        autoIntensity: 1.8,
        autoResumeDelay: 1000,
    },
    auroraLayerClass:
        "opacity-[0.8] bg-[radial-gradient(58%_44%_at_52%_70%,rgba(74,56,214,0.42)_0%,rgba(74,56,214,0)_70%),radial-gradient(40%_34%_at_14%_64%,rgba(42,137,255,0.33)_0%,rgba(42,137,255,0)_72%),radial-gradient(38%_30%_at_82%_30%,rgba(102,231,255,0.2)_0%,rgba(102,231,255,0)_74%)]",
    prismLayerClass:
        "opacity-[1] bg-[linear-gradient(180deg,rgba(168,220,255,0.14)_0%,rgba(20,44,78,0.06)_24%,rgba(5,10,22,0)_48%),radial-gradient(64%_42%_at_50%_-12%,rgba(171,224,255,0.42)_0%,rgba(171,224,255,0)_62%)]",
    prismLinesClass: "opacity-0",
};

const makeLogo = (name, slug, color = "6ed7ff") => ({
    src: `https://cdn.simpleicons.org/${slug}/${color}`,
    alt: `${name} logo`,
    title: name,
});

const STACK_LOGO_ROWS = [
    {
        key: "frontend",
        label: "前端开发",
        speed: 44,
        direction: "left",
        logos: [
            makeLogo("React", "react"),
            makeLogo("Vue", "vuedotjs"),
            makeLogo("JavaScript", "javascript"),
            makeLogo("TypeScript", "typescript"),
            makeLogo("Tailwind CSS", "tailwindcss"),
            makeLogo("Vite", "vite"),
        ],
    },
    {
        key: "backend",
        label: "后端服务",
        speed: 38,
        direction: "right",
        logos: [
            makeLogo("Java", "openjdk"),
            makeLogo("Spring", "spring"),
            makeLogo("Node.js", "nodedotjs"),
            makeLogo("MySQL", "mysql"),
            makeLogo("Redis", "redis"),
            makeLogo("Docker", "docker"),
        ],
    },
    {
        key: "ai",
        label: "人工智能",
        speed: 34,
        direction: "left",
        logos: [
            makeLogo("Python", "python"),
            makeLogo("PyTorch", "pytorch"),
            makeLogo("TensorFlow", "tensorflow"),
            makeLogo("OpenCV", "opencv"),
            makeLogo("Pandas", "pandas"),
            makeLogo("Jupyter", "jupyter"),
        ],
    },
    {
        key: "embedded",
        label: "嵌入式与硬件",
        speed: 30,
        direction: "right",
        logos: [
            makeLogo("C", "c"),
            makeLogo("C++", "cplusplus"),
            makeLogo("STM32", "stmicroelectronics"),
            makeLogo("Arduino", "arduino"),
            makeLogo("Raspberry Pi", "raspberrypi"),
            makeLogo("Linux", "linux"),
        ],
    },
    {
        key: "product-design",
        label: "产品设计",
        speed: 28,
        direction: "left",
        logos: [
            makeLogo("Figma", "figma"),
            makeLogo("Sketch", "sketch"),
            makeLogo("Framer", "framer"),
            makeLogo("Dribbble", "dribbble"),
            makeLogo("Behance", "behance"),
            makeLogo("Penpot", "penpot"),
        ],
    },
    {
        key: "planning-ops",
        label: "策划运营",
        speed: 26,
        direction: "right",
        logos: [
            makeLogo("Notion", "notion"),
            makeLogo("Trello", "trello"),
            makeLogo("Jira", "jira"),
            makeLogo("Asana", "asana"),
            makeLogo("Discord", "discord"),
            makeLogo("Miro", "miro"),
        ],
    },
];



const Homepage = () => {
    const box1Ref = useRef(null);
    const reviewScrollRef = useRef(null);
    const fluidShowcaseRef = useRef(null);
    const techRevealRef = useRef(null);
    const techMaskRef = useRef(null);
    const { repos, loading, error } = useProjects();
    const [hasContentAnimationStarted, setHasContentAnimationStarted] = useState(false);
    const [fluidScrollProgress, setFluidScrollProgress] = useState(0);
    const [isMobileViewport, setIsMobileViewport] = useState(
        typeof window !== "undefined" ? window.innerWidth < 768 : false
    );
    const contentRef = useRef(null);
    const showcaseRepos = Array.isArray(repos) ? repos : [];
    const marqueeRepos = [...showcaseRepos, ...showcaseRepos];

    useEffect(() => {
        if (hasContentAnimationStarted) return;

        const onScroll = () => {
            if (!contentRef.current) return;
            const navbar = document.querySelector(".navbar");
            const navHeight = navbar instanceof HTMLElement ? navbar.offsetHeight : 0;
            const triggerOffset = 48;
            const distanceToContent =
                contentRef.current.getBoundingClientRect().top - navHeight - triggerOffset;

            if (distanceToContent <= window.innerHeight * 0.72) {
                setHasContentAnimationStarted(true);
            }
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [hasContentAnimationStarted]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileViewport(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize, { passive: true });
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (isMobileViewport) {
            setFluidScrollProgress(0);
            return;
        }

        const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
        const updateFluidProgress = () => {
            if (!fluidShowcaseRef.current) return;
            const navbar = document.querySelector(".navbar");
            const navHeight = navbar instanceof HTMLElement ? navbar.offsetHeight : 80;
            const rect = fluidShowcaseRef.current.getBoundingClientRect();
            const stickyViewportHeight = Math.max(1, window.innerHeight - navHeight);
            const travel = Math.max(1, rect.height - stickyViewportHeight);
            const passed = navHeight - rect.top;
            const nextProgress = clamp(passed / travel, 0, 1);

            setFluidScrollProgress((prev) =>
                Math.abs(prev - nextProgress) > 0.001 ? nextProgress : prev
            );
        };

        updateFluidProgress();
        window.addEventListener("scroll", updateFluidProgress, { passive: true });
        window.addEventListener("resize", updateFluidProgress);

        return () => {
            window.removeEventListener("scroll", updateFluidProgress);
            window.removeEventListener("resize", updateFluidProgress);
        };
    }, [isMobileViewport]);

    const scrollToContent = () => {
        if (!contentRef.current) return;
        setHasContentAnimationStarted(true);
        const navbar = document.querySelector(".navbar");
        const navHeight = navbar instanceof HTMLElement ? navbar.offsetHeight : 0;
        const safeGap = window.innerWidth >= 1024 ? 52 : 38;
        const targetTop =
            contentRef.current.getBoundingClientRect().top +
            window.scrollY -
            navHeight -
            safeGap;

        window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
    };

    const withEntryAnimation = (
        baseClassName,
        animationClassName,
        pendingClassName = "opacity-0 translate-y-4 transition-all duration-300"
    ) =>
        `${baseClassName} ${hasContentAnimationStarted ? animationClassName : pendingClassName}`.trim();

    const scrollReviewCards = (direction) => {
        if (!reviewScrollRef.current) return;
        const cardWidth = 320;
        reviewScrollRef.current.scrollBy({
            left: direction * cardWidth,
            behavior: "smooth",
        });
    };

    const handleTechMouseMove = (event) => {
        const revealLayer = techRevealRef.current;
        const maskLayer = techMaskRef.current;
        if (!revealLayer || !maskLayer) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        revealLayer.style.setProperty("--mx", `${x}px`);
        revealLayer.style.setProperty("--my", `${y + rect.height * 0.5}px`);
        maskLayer.style.setProperty("--mx", `${x}px`);
        maskLayer.style.setProperty("--my", `${y + rect.height * 0.5}px`);
    };

    const handleTechMouseLeave = () => {
        const revealLayer = techRevealRef.current;
        const maskLayer = techMaskRef.current;
        if (!revealLayer || !maskLayer) return;
        revealLayer.style.setProperty("--mx", "-9999px");
        revealLayer.style.setProperty("--my", "-9999px");
        maskLayer.style.setProperty("--mx", "-9999px");
        maskLayer.style.setProperty("--my", "-9999px");
    };

    const indent1 = "\u00A0\u00A0\u00A0\u00A0";
    const indent2 = "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";

    // const [numberOfColorBoxes, setNumberOfColorBoxes] = useState(400);

    // useEffect(() => {
    //   const bgAnimation = document.getElementById('bgAnimation');

    //   for (let i = 0; i < numberOfColorBoxes; i++) {
    //     const colorBox = document.createElement('div');
    //     colorBox.classList.add('colorBox');
    //     bgAnimation.appendChild(colorBox);
    //   }
    // }, [numberOfColorBoxes]);

    return (
        <div className="relative bg-[#04070d]">
            <div className="relative w-full h-screen overflow-hidden">
                <div className={`absolute inset-0 z-[4] pointer-events-none transition-opacity duration-700 ${DEEP_CORE_VISUAL.lightRaysWrapperClass}`}>
                    <LightRays {...DEEP_CORE_VISUAL.lightRays} />
                </div>
                <div className={`absolute top-0 left-0 w-full h-full z-0 transition-opacity duration-700 ${DEEP_CORE_VISUAL.darkVeilWrapperClass}`}>
                    <DarkVeil {...DEEP_CORE_VISUAL.darkVeil} />
                </div>
                <div className={`absolute top-0 left-0 w-full h-full z-[1] transition-opacity duration-700 ${DEEP_CORE_VISUAL.liquidEtherWrapperClass}`}>
                    <LiquidEther {...DEEP_CORE_VISUAL.liquidEther} />
                </div>
                <div
                    aria-hidden="true"
                    className={`absolute inset-0 z-[2] pointer-events-none transition-all duration-700 ${DEEP_CORE_VISUAL.auroraLayerClass}`}
                />
                <div
                    aria-hidden="true"
                    className={`absolute inset-0 z-[5] pointer-events-none transition-all duration-700 ${DEEP_CORE_VISUAL.prismLayerClass}`}
                />
                <div
                    aria-hidden="true"
                    className={`absolute inset-0 z-[6] pointer-events-none transition-opacity duration-700 ${DEEP_CORE_VISUAL.prismLinesClass}`}
                />
                <div className="absolute top-[4.85rem] sm:top-[4.95rem] md:top-[4.45rem] left-0 w-full z-[11] pointer-events-none [mask-image:linear-gradient(to_right,transparent_0%,black_7%,black_93%,transparent_100%)]">
                    <div className="md:hidden">
                        <CurvedLoop
                            marqueeText="KINGCOLA-ICG ✦ INNOVATE ✦ CREATE ✦ GUIDE ✦ "
                            speed={0.95}
                            curveAmount={72}
                            pathPadding={90}
                            viewBoxWidth={560}
                            viewBoxHeight={120}
                            baseY={36}
                            offsetY={-6}
                            preserveAspectRatio="none"
                            textColor="#a8ddff"
                            shine
                            shineColor="#ffffff"
                            shineSpeed={4.1}
                            baseOpacity={0.96}
                            direction="left"
                            interactive={false}
                            containerClassName="w-full h-[142px] flex items-start justify-center pt-0 overflow-visible"
                            className="text-[30px] font-semibold tracking-[0.11em]"
                        />
                    </div>
                    <div className="hidden md:block">
                        <CurvedLoop
                            marqueeText="KINGCOLA-ICG ✦ INNOVATE ✦ CREATE ✦ GUIDE ✦ "
                            speed={1.05}
                            curveAmount={112}
                            edgeBend={26}
                            pathPadding={260}
                            viewBoxWidth={1440}
                            viewBoxHeight={194}
                            baseY={48}
                            offsetY={-12}
                            preserveAspectRatio="xMidYMid meet"
                            textColor="#9fd8ff"
                            shine
                            shineColor="#ffffff"
                            shineSpeed={4.2}
                            baseOpacity={0.88}
                            direction="left"
                            interactive={false}
                            containerClassName="w-full h-[166px] lg:h-[178px] flex items-start justify-center pt-1 overflow-visible"
                            className="text-[28px] lg:text-[30px] font-semibold tracking-[0.2em]"
                        />
                    </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col justify-center items-center pointer-events-none bg-gradient-to-b from-black/16 via-[#03060c]/25 to-[#04070d]/90">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center px-4"
                    >
                        <div className="w-fit mx-auto font-inter font-semibold h-fit text-[#8ed8ff] text-[22px] md:text-[46px] align-middle tracking-[0.03em] leading-[normal] bg-[#28A9E2]/15 border border-[#8ed8ff]/25 px-6 py-3 rounded-2xl text-center whitespace-nowrap mb-6 backdrop-blur-md shadow-[0_0_60px_rgba(40,169,226,0.2)]">
                            KingCola-ICG
                        </div>
                        <h1 className="mb-4 hero-rotating-title">
                            <RotatingText
                                texts={["创新驱动探索", "协作成就未来", "期待你的加入"]}
                                mainClassName="hero-rotating-text justify-center text-4xl md:text-7xl font-bold tracking-tight drop-shadow-[0_8px_28px_rgba(0,0,0,0.46)]"
                                splitLevelClassName="justify-center"
                                elementLevelClassName="hero-rotating-char"
                                transition={{ type: "spring", damping: 20, stiffness: 180, mass: 0.9 }}
                                initial={{ y: "62%", opacity: 0, filter: "blur(10px)", scale: 0.96 }}
                                animate={{ y: 0, opacity: 1, filter: "blur(0px)", scale: 1 }}
                                exit={{ y: "-62%", opacity: 0, filter: "blur(10px)", scale: 1.04 }}
                                rotationInterval={3000}
                                staggerDuration={0.02}
                                staggerFrom="center"
                                animatePresenceMode="wait"
                                auto
                                loop
                            />
                        </h1>
                        <p className="text-lg md:text-2xl text-gray-100/90 mb-12 max-w-2xl mx-auto px-4">
                            Innovation  Create  Guide
                        </p>
                        <div className="pointer-events-auto">
                            <button
                                onClick={scrollToContent}
                                className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full border border-white/35 hover:border-[#8ed8ff]/80 transition-all duration-300 backdrop-blur-sm"
                            >
                                <div className="absolute inset-0 w-0 bg-[#8ed8ff]/15 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                                <span className="relative text-white font-medium text-lg flex items-center gap-2 group-hover:text-[#dff4ff]">
                                    了解更多
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce mt-1">
                                        <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </motion.div>
                </div>
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-28 md:h-36 z-[12] bg-gradient-to-b from-transparent via-[#04070d]/58 to-[#04070d]"
                />
            </div>

            <div ref={contentRef} className="scroll-mt-24 md:scroll-mt-28 md:px-[150px] relative flex flex-col top-2 md:top-20 pt-3 bg-gradient-to-b from-[#04070d] via-[#05090f] to-[#05090f]">
                <div id="grid">
                    <div
                        id="grid1"
                        className={withEntryAnimation(
                            "mt-10 md:mx-0 px-4 w-full mb-16 md:mb:0",
                            "animate__animated animate__backInLeft"
                        )}
                    >
                        <div className="w-fit font-inter font-semibold h-fit text-[#28A9E2] text-[24px] md:text-[32px] align-middle tracking-[0] leading-[normal] bg-[#28A9E2] bg-opacity-20 px-3 py-2 rounded text-center whitespace-nowrap">
                            KingCola-ICG
                        </div>
                        <div className="font-inter text-[#FFFFFF] text-[32px] md:text-[40px] font-semibold tracking-[0] leading-[52.6px] my-2">
                            Innovation  Create  Guide
                        </div>
                        <div className="text-white font-inter text-lg md:text-xl font-semibold tracking-[0] leading-[26.3px] opacity-50 my-2">
                            创新驱动发展，协作成就未来
                        </div>
                        <div className="bg-[#1F2526] font-inconsolata mt-4 w-[90vw] md:w-[450px] rounded ">
                            <div className={withEntryAnimation(
                                "text-[#aaaeb3] text-[13.5px] font-normal tracking-[0] leading-[15.8px] border-b border-[#3C4045] py-2 p-4",
                                "animate__animated animate__fadeInLeft animate__delay-1s"
                            )}>
                                Hi, We are KingCola-ICG Team!
                            </div>
                            <div className={withEntryAnimation(
                                "py-4 pl-4",
                                "animate__animated animate__fadeInLeft animate__delay-2s"
                            )}>
                                <span className="text-[#6E7681] py-4 text-[12px] md:text-[15.2px] mr-1 md:mr-2 text-xs font-normal tracking-[0] leading-[18px]">
                                    1
                                </span>
                                <span className="py-4 text-[#a5d6ff] text-[12px] md:text-[15.2px] font-normal tracking-[0] leading-[18px]">
                                    "探索未知 · 引领科技 · 创新未来"
                                </span>
                            </div>
                        </div>
                    </div>
                    <div
                        id="grid2"
                        className={withEntryAnimation(
                            "mt-[129px] rounded-4xl",
                            "animate__animated animate__fadeInRight animate__delay-1s"
                        )}
                    >
                        <div className="flex mx-6 md:py-[30px] py-[1rem] gap-4">
                            <div className="bg-[#f46b5d] px-2 py-2 rounded-xl"></div>
                            <div className="bg-[#f9bd4e] px-2 py-2 rounded-xl"></div>
                            <div className="bg-[#57c353] px-2 py-2 rounded-xl"></div>
                        </div>
                        <div className="border-b border-[#ffffff50]"></div>
                        <motion.div
                            initial="hidden"
                            animate={hasContentAnimationStarted ? "show" : "hidden"}
                            variants={slideIn(2, 2)}
                            className="px-[30px] font-inconsolata font-normal text-[11px] md:text-[16px] py-[20px] md:py-[40px]"
                        >
                            <span className="text-wrapper text-white">printf(</span>
                            <span className="span text-cyan-300">
                                "Welcome to KingCola-ICG!\n"
                            </span>
                            <span className="text-wrapper text-white">);</span>
                            <br />
                            <span className="text-wrapper-2 text-[#C398FF]">#include</span>
                            <span className="text-white text-wrapper">
                                {" "}
                                &lt;innovation.h&gt;
                            </span>
                            <br />
                            <span className="text-wrapper-2 text-[#C398FF]">int</span>
                            <span className="text-wrapper text-white"> main() {"{"}</span>
                            <br />
                            <span className="text-white">{indent1}</span>
                            <span className="text-wrapper-2 text-[#C398FF]">char</span>
                            <span className="text-white"> team[] = </span>
                            <span className="span text-cyan-300">"KingCola-ICG"</span>
                            <span className="text-white">;</span>
                            <br />
                            <span className="text-white">{indent1}initTeam(team);</span>
                            <span className="text-[#6E7681]"> // KingCola-ICG Team</span>
                            <br />
                            <span className="text-wrapper-2 text-white">{indent1}if</span>
                            <span className="text-wrapper text-white"> (joinUs()) {"{"}</span>
                            <br />
                            <span className="text-white">{indent2}explore(</span>
                            <span className="span text-cyan-300">"projects"</span>
                            <span className="text-white">);</span>
                            <span className="text-[#6E7681]"> // explore projects</span>
                            <br />
                            <span className="text-white">{indent2}collaborate();</span>
                            <span className="text-[#6E7681]"> // be a part of us</span>
                            <br />
                            <span className="text-white">{indent1}{"}"}</span>
                            <br />
                            <span className="text-wrapper-2 text-[#C398FF]">{indent1}return</span>
                            <span className="text-wrapper text-white"> SUCCESS;</span>
                            <br />
                            <span className="text-white">{"}"}</span>
                            <span className="text-[#6E7681]"> // Welcome to join us!</span>
                            <div ref={box1Ref} className="text-center"></div>
                        </motion.div>
                    </div>
                    <div
                        id="grid3"
                        className={withEntryAnimation(
                            "mt-4 relative bg-[#28A9E233] bg-gradient-to-br from-[#1D4B6066] to-[#ffffff00] rounded-4xl",
                            "animate__animated animate__fadeInRight"
                        )}
                    >
                        <motion.div
                            className="z-[3] w-[60px] md:w-[100px] absolute -top-8 left-4 md:-top-16 md:left-4 cursor-pointer"
                            whileHover={{
                                scale: 1.15,
                                rotate: [0, -5, 5, -5, 0],
                                transition: {
                                    rotate: { duration: 0.5, ease: "easeInOut" },
                                    scale: { duration: 0.3 }
                                }
                            }}
                            whileTap={{ scale: 0.95 }}
                            animate={
                                hasContentAnimationStarted
                                    ? {
                                        filter: [
                                            'drop-shadow(0 0 15px rgba(40, 169, 226, 0.8)) drop-shadow(0 0 30px rgba(40, 169, 226, 0.5))',
                                            'drop-shadow(0 0 20px rgba(40, 169, 226, 1)) drop-shadow(0 0 40px rgba(40, 169, 226, 0.7))',
                                            'drop-shadow(0 0 15px rgba(40, 169, 226, 0.8)) drop-shadow(0 0 30px rgba(40, 169, 226, 0.5))'
                                        ]
                                    }
                                    : {
                                        filter:
                                            'drop-shadow(0 0 15px rgba(40, 169, 226, 0.8)) drop-shadow(0 0 30px rgba(40, 169, 226, 0.5))'
                                    }
                            }
                            transition={
                                hasContentAnimationStarted
                                    ? {
                                        filter: {
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
                                    }
                                    : { duration: 0 }
                            }
                        >
                            <motion.img
                                src={logosvg}
                                alt="logosvg"
                                className="w-full h-auto cursor-pointer"
                                initial={{ opacity: 0, y: -20 }}
                                animate={hasContentAnimationStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                                transition={{ duration: hasContentAnimationStarted ? 0.8 : 0.15, ease: "easeOut" }}
                            />
                        </motion.div>
                        <div className="text-[#28A9E2] font-inter pr-5 text-[0.8rem] md:text-[1rem] font-bold py-3 text-right border-b border-[#ffffff50]">
                            KingCola-ICG
                        </div>
                        <div className="text-white text-[12px] font-inconsolata md:text-[15px] font-normal tracking-[0] leading-[23.5px]   mt-[1px] md:mt-[22px] ml-[2rem] md:ml-[3.75rem]">
                            #For a better World!
                        </div>
                    </div>
                </div>
                <div className="px-8 md:px-0 relative flex flex-col-reverse md:flex-col w-fit md:h-4/5 md:w-5/6 justify-start items-end mt-[18rem] md:mt-8">
                    <img
                        className="animate__animated animate__fadeInDown animate__delay-4s"
                        src={toparrow}
                        alt="toparrow"
                    />
                    <div>
                        <div className="animate__animated animate__fadeInRight animate__delay-5s text-end relative md:absolute md:top-[40vh] md:left-[30vw] text-white text-[25px] md:text-[40px] font-semibold leading-[52.61px] ">
                            What we do?
                        </div>
                        <div className="animate__animated animate__fadeInLeft animate__delay-5s relative text-end md:absolute md:bottom-[30vh] md:left-[20vw] text-white text-opacity-50 text-xl  font-semibold leading-relaxed">
                            Innovation, Competition, Learning, Practice, and Collaboration
                        </div>
                    </div>
                </div>
                <div id="gridd" className="md:mt-2 px-8">
                    {" "}
                    <div
                        id="gridd1"
                        className="justify-center mt-24 md:mt-8 md:min-h-[42vh] px-4 md:px-6 py-6 md:py-8 rounded-[22px] bg-[linear-gradient(180deg,rgba(5,11,20,0.58)_0%,rgba(4,8,15,0.38)_100%)] border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.2)] backdrop-blur-[4px]"
                    >
                        <div className="text-white font-[700] mx-1 text-2xl md:text-[2.05rem] tracking-[0.01em]">
                            KingCola-ICG Introduction
                        </div>
                        <div className="mx-1 mt-3 h-[3px] w-24 rounded-full bg-gradient-to-r from-[#8ed8ff] to-[#2ca6e3] shadow-[0_0_12px_rgba(142,216,255,0.55)]" />
                        <div className="px-1 text-[15px] md:text-[1rem] text-[#b9c9d7] text-justify mt-4 font-[500] leading-7">
                            <p>
                                🚀 KingCola-ICG 团队成立于 2017 年 6 月，致力于建设成为湖科大最活跃的自发性学生科研团队，打造开放式创新创业生态。团队成员来自不同学院，学科交叉、优势互补，以综合能力提升为核心，以学科竞赛为实践抓手，持续推动成员成长。
                            </p>
                            <p className="mt-3">
                                🏆 团队深耕数学建模、电子商务、物联网、创新创业、科普作品等方向，累计斩获国家级奖项近 50 项、省级奖项 100 余项、校级奖项百余项；并取得软件著作权 15 项、实用新型专利 2 项、外观设计专利 3 项，发表 SCI 二区论文 4 篇、SCI 四区论文 2 篇。
                            </p>
                            <p className="mt-3">
                                ✨ 目前团队已入驻计算机学院微科创新创业基地 8 年多，持续推进实验室产品研发与落地。
                            </p>
                        </div>
                    </div>
                    <div
                        id="gridd2"
                        className="bg-opacity-99 mt-16 bg-[#1D4B60] rounded-4xl font-inconsolata font-normal"
                    >
                        <div className="flex mx-6 py-4 gap-4">
                            <div className="bg-[#f46b5d] px-2 py-2 rounded-xl"></div>
                            <div className="bg-[#f9bd4e] px-2 py-2 rounded-xl"></div>
                            <div className="bg-[#57c353] px-2 py-2 rounded-xl"></div>
                        </div>
                        <div className="border-b border-[#ffffff50] "></div>
                        <div className="px-4 py-4 text-[11px] md:text-[16px]">
                            <span className="text-whitetext-wrapper text-white ">
                                console.log(
                            </span>
                            <span className="span text-cyan-300">
                                'Innovation Create Guide'
                            </span>
                            <span className="text-wrapper text-white">)</span>
                            <br />
                            <span className="text-wrapper-2 text-[#C398FF]">import</span>
                            <span className="text-white text-wrapper">
                                {" "}
                                {"{"} innovate, create, guide {"}"}{" "}
                            </span>
                            <span className="text-wrapper-2 text-[#C398FF]">from</span>
                            <span className="text-wrapper text-white">&nbsp;</span>
                            <span className="span text-cyan-300">'KingCola-ICG'</span>
                            <br />
                            <span className="text-wrapper text-white">
                                function teamVision() {"{"}
                            </span>
                            <span className="text-wrapper-2 text-[#C398FF]">&nbsp;return</span>
                            <span className="text-wrapper text-white">&nbsp;</span>
                            <span className="span text-cyan-300">'Innovation Create Guide'</span>
                            <span className="text-wrapper text-white"> {"}"}</span>
                            <br />
                            <span className="text-white">const roadmap =</span>{" "}
                            <span className="text-wrapper-2 text-[#C398FF]">await</span>
                            <span className="text-wrapper text-white"> build(</span>
                            <span className="span text-cyan-300">'innovation-create-guide'</span>
                            <span className="text-wrapper text-white">)</span>
                            <br />
                            <span className="text-wrapper-2 text-white">if</span>
                            <span className="text-wrapper text-white"> (roadmap) {"{"}</span>
                            <span className="span text-white">&nbsp;practice++; collaborate++;</span>
                            <span className="text-wrapper text-white"> {"}"}</span>
                            <br />
                            <span className="text-white">commit(</span>
                            <span className="span text-cyan-300">'InnovationCreateGuide'</span>
                            <span className="text-white">)</span>
                            <br />
                            <span className="text-white">guideTeam() // KingCola-ICG</span>
                            <br />
                            <span className="text-white">innovationPath = () =&gt;</span>{" "}
                            <span className="span text-cyan-300">'learn-build-succeed'</span>
                            <br />
                            {/* <span className="text-wrapper text-white">#Innovation </span>
                            <span className="text-wrapper-2 text-[#C398FF]">with</span>
                            <span className="text-wrapper text-white"> Action</span>
                            <br />
                            <span className="text-wrapper text-white">#Create </span>
                            <span className="text-wrapper-2 text-[#C398FF]"> for</span>
                            <span className="text-wrapper text-center text-white">
                                {" "}
                                Impact
                            </span> */}
                            
                        </div>
                    </div>
                    <div
                        id="gridd3"
                        className="bg-opacity-70 mx-6 mt-6 bg-[#1D4B60] rounded-4xl"
                    >
                        {" "}
                    </div>
                </div>

                {/* <Xarrow
          start={box1Ref} //can be react ref
          end="elem2" //or an id
        /> */}
                <div className="mt-[25rem] md:mt-[30rem] md:mx-[-8rem] md:px-14 md:rounded-[4rem] rounded-[2rem] mx-2 bg-gradient-to-b from-[#1d4b6000] via-[#1d4b604d] to-[#1d4b60a4]">
                    <div className="bg-[#326074] mt-8 rounded-lg py-1 mx-auto text-center w-[80vw] md:w-[30vw]">
                        <div className="text-[#a5d6ff] px-6 text-[13.2px] font-normal font-inconsolata tracking-[0] leading-[27px]">
                            &#34;以创新为引擎，以实践为路径，
                        </div>
                        <div className=" border-b border-dotted border-[#a5d6ff] "></div>
                        <div className="text-white px-6 text-[13.2px] font-semibold font-inconsolata tracking-[0] leading-[27px]">
                            以协作共创有社会价值的项目&#34;
                        </div>
                    </div>
                    <div className="mt-10 md:mt-[12rem]">
                        <div className=" text-white text-[24px] md:text-[40px] font-semibold tracking-[0] leading-[52.6px] text-center">
                            项目一览
                        </div>
                        <div className="mt-2 mb-24 text-[#ffffff80] text-center text-l md:text-2xl font-semibold tracking-[0] leading-[26.3px] ">
                            聚焦真实场景问题，用技术创造可落地的社会价值。
                        </div>
                        <div className="project-marquee-shell mx-auto my-8">
                            {loading ? (
                                <p className="text-center text-lg font-medium text-gray-400 animate-pulse">项目加载中...</p>
                            ) : error ? (
                                <p className="text-center text-lg font-medium text-red-500">
                                    项目加载失败: {error.message}
                                </p>
                            ) : (
                                showcaseRepos.length > 0 ? (
                                    <div
                                        className={`project-marquee-track ${hasContentAnimationStarted ? "is-running" : ""}`}
                                    >
                                        {marqueeRepos.map((repo, index) => (
                                            <Card
                                                key={`${repo.id}-${index}`}
                                                repo={repo}
                                                className={
                                                    index % 8 === 0 ||
                                                        index % 8 === 2 ||
                                                        index % 8 === 5 ||
                                                        index % 8 === 7
                                                        ? "even-card"
                                                        : "odd-card"
                                                }
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-lg font-medium text-gray-500">
                                        暂无项目数据。
                                    </p>
                                )
                            )}
                        </div>

                    </div>
                </div>
                <div className="px-8 w-fit flex flex-col justify-center items-start">
                    <img
                        className={withEntryAnimation("", "animate__animated animate__fadeInDown")}
                        src={downarrow}
                        alt="toparrow"
                    />
                    <div>
                        <div className={withEntryAnimation(
                            "text-[#ffffff80] mx-2 text-xl md:text-2xl font-semibold tracking-[0] leading-[26.3px]",
                            "animate__animated animate__fadeInRight animate__delay-2s"
                        )}>
                            KingCola-ICG
                        </div>
                        <div className={withEntryAnimation(
                            "text-white mx-2 text-2xl md:text-[45px] font-semibold tracking-[0] md:leading-[52.6px]",
                            "animate__animated animate__fadeInLeft animate__delay-2s"
                        )}>
                            Our Technology Stack
                        </div>
                    </div>
                </div>
                <div className="mt-8 md:mt-12">
                    <div
                        id="tech-stack-laser-box"
                        className="relative left-1/2 ml-[-50vw] w-screen h-[640px] md:h-[920px] overflow-hidden bg-[#040c18]"
                        onMouseMove={handleTechMouseMove}
                        onMouseLeave={handleTechMouseLeave}
                    >
                        <div className="absolute inset-0 z-[1] opacity-[0.22] pointer-events-none">
                            <div className="absolute inset-x-0 top-[8%] md:top-[13%] space-y-4 md:space-y-8">
                                {STACK_LOGO_ROWS.map((row, index) => (
                                    <LogoLoop
                                        key={`${row.key}-base`}
                                        logos={row.logos}
                                        speed={row.speed}
                                        direction={row.direction}
                                        logoHeight={38}
                                        gap={34}
                                        fadeOut
                                        fadeOutColor="#040c18"
                                        pauseOnHover={false}
                                        className="w-full"
                                        ariaLabel={`技术栈 Logo 背景展示第 ${index + 1} 行`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="absolute inset-0 z-[2]">
                            <LaserFlow
                                horizontalBeamOffset={0.1}
                                verticalBeamOffset={isMobileViewport ? 0.02 : -0.14}
                                color="#7fe1ff"
                                horizontalSizing={isMobileViewport ? 0.74 : 0.5}
                                verticalSizing={isMobileViewport ? 2.8 : 2}
                                wispDensity={1}
                                wispSpeed={15}
                                wispIntensity={isMobileViewport ? 6.2 : 5}
                                flowSpeed={0.35}
                                flowStrength={0.25}
                                fogIntensity={0.45}
                                fogScale={0.3}
                                fogFallSpeed={0.6}
                                decay={1.1}
                                falloffStart={1.2}
                            />
                        </div>

                        <div className="absolute inset-0 z-[3] pointer-events-none bg-[linear-gradient(180deg,rgba(4,10,20,0.25)_0%,rgba(4,11,22,0.34)_100%)]" />
                        <div className="absolute inset-0 z-[4] pointer-events-none bg-[rgba(2,9,19,0.52)]" />

                        <div
                            ref={techRevealRef}
                            className="absolute top-[-50%] left-0 w-full h-[200%] z-[5] opacity-[0.46] mix-blend-lighten pointer-events-none"
                            style={{
                                "--mx": "-9999px",
                                "--my": "-9999px",
                                WebkitMaskImage:
                                    "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",
                                maskImage:
                                    "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",
                                WebkitMaskRepeat: "no-repeat",
                                maskRepeat: "no-repeat",
                            }}
                        >
                            <div className="absolute inset-x-0 top-[28%] md:top-[32%] space-y-4 md:space-y-8">
                                {STACK_LOGO_ROWS.map((row, index) => (
                                    <LogoLoop
                                        key={`${row.key}-reveal`}
                                        logos={row.logos}
                                        speed={row.speed}
                                        direction={row.direction}
                                        logoHeight={38}
                                        gap={34}
                                        fadeOut
                                        fadeOutColor="#040c18"
                                        pauseOnHover={false}
                                        className="w-full"
                                        ariaLabel={`技术栈 Logo 鼠标揭示第 ${index + 1} 行`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div
                            ref={techMaskRef}
                            className="absolute inset-0 z-[5] pointer-events-none bg-[rgba(2,9,19,0.52)]"
                            style={{
                                "--mx": "-9999px",
                                "--my": "-9999px",
                                WebkitMaskImage:
                                    "radial-gradient(circle at var(--mx) var(--my), rgba(0,0,0,0)_0px, rgba(0,0,0,0)_96px, rgba(0,0,0,0.72)_196px, rgba(0,0,0,0.96)_280px)",
                                maskImage:
                                    "radial-gradient(circle at var(--mx) var(--my), rgba(0,0,0,0)_0px, rgba(0,0,0,0)_96px, rgba(0,0,0,0.72)_196px, rgba(0,0,0,0.96)_280px)",
                                WebkitMaskRepeat: "no-repeat",
                                maskRepeat: "no-repeat",
                            }}
                        />

                        <div className="absolute inset-0 z-[6] pointer-events-none opacity-[0.92] mix-blend-screen">
                            <LaserFlow
                                horizontalBeamOffset={0.1}
                                verticalBeamOffset={isMobileViewport ? 0.02 : -0.14}
                                color="#bdf5ff"
                                horizontalSizing={isMobileViewport ? 0.72 : 0.48}
                                verticalSizing={isMobileViewport ? 3.05 : 2.35}
                                wispDensity={1.15}
                                wispSpeed={16}
                                wispIntensity={isMobileViewport ? 9 : 8}
                                flowSpeed={0.36}
                                flowStrength={0.34}
                                fogIntensity={0.64}
                                fogScale={0.3}
                                fogFallSpeed={0.62}
                                decay={1.1}
                                falloffStart={1.2}
                            />
                        </div>

                        <div className="absolute inset-x-0 top-0 h-[46%] z-[7] pointer-events-none bg-[radial-gradient(42%_72%_at_50%_0%,rgba(158,238,255,0.16)_0%,rgba(158,238,255,0)_72%)]" />

                        <div className="absolute top-[48%] md:top-[64%] left-1/2 -translate-x-1/2 w-[90%] md:w-[88%] min-h-[170px] md:h-[26%] z-[8] rounded-[16px] md:rounded-[22px] border-2 border-[#7fdfff8f] bg-[#061323]/88 shadow-[0_0_48px_rgba(127,223,255,0.24)] pointer-events-none">
                            <div className="absolute inset-0 rounded-[14px] md:rounded-[20px] [background-image:radial-gradient(circle,rgba(127,223,255,0.18)_1px,transparent_1.7px)] [background-size:20px_20px] opacity-[0.24]" />
                            <div className="absolute inset-0 flex flex-col items-start md:items-center justify-center px-5 md:px-10 py-3 md:py-0 text-left md:text-center">
                                <p className="text-[#d8f5ff] text-[11px] md:text-xl font-semibold tracking-[0.03em] md:tracking-[0.08em] leading-5 md:leading-normal">
                                    前端 · 后端 · 人工智能 · 嵌入式 全链路协同
                                </p>
                                <p className="mt-1.5 text-[#a9d1e7] text-[10.5px] md:text-sm leading-[1.85] md:leading-6 tracking-[0.01em] max-w-[1100px] text-justify">
                                    我们以 JavaScript/Vue/React 打造高质量交互体验，以 Java 构建稳定可靠的后端服务，
                                    以 Python 驱动机器学习与智能分析，以 C/C++ 连接设备与边缘计算；并由策划运营协同推进、
                                    产品设计持续打磨体验，形成从创意抽象到产品落地的一体化技术栈。
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className="mt-16">
                        <div className="text-[#ffffff80] text-center text-xl md:text-3xl font-semibold tracking-[0] leading-[26.3px]">
                            往期 · 回顾
                        </div>

                        <div className="relative mt-16">
                            <div
                                ref={reviewScrollRef}
                                className="review-scroll-track md:mx-24 mx-6 flex gap-4 overflow-x-auto pb-2"
                                style={{
                                    scrollSnapType: "x mandatory",
                                    scrollBehavior: "smooth",
                                    msOverflowStyle: "none",
                                    scrollbarWidth: "none",
                                }}
                            >
                                {programs.slice(0, 6).map((program, i) => (
                                    <div key={i} className="shrink-0 snap-start">
                                        <div className="w-[308px]">
                                            <img
                                                className="w-full h-[308px] object-cover"
                                                src={program.image}
                                                alt={program.title}
                                                draggable={false}
                                                onDragStart={(e) => e.preventDefault()}
                                            />
                                        </div>
                                        <div className="flex gap-4 w-[308px] min-h-[178px] justify-between px-4 py-3 bg-gradient-to-l from-neutral-900 to-gray-900 rounded">
                                            <div className="align-middle items-center">
                                                <div className="text-center py-2 text-cyan-400 text-xl font-bold">
                                                    {program.mon}
                                                </div>
                                                <div className="text-white text-2xl font-bold">
                                                    {program.date}
                                                </div>
                                                <div className="text-center text-cyan-100/90 text-sm font-semibold tracking-[0.08em]">
                                                    {program.year}
                                                </div>
                                            </div>
                                            <div className="min-w-0">
                                                <div
                                                    className="text-white text-lg font-bold"
                                                    style={{
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    {program.title}
                                                </div>
                                                <div
                                                    className="text-gray-400 text-sm font-normal"
                                                    style={{
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 5,
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    {program.content}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                className="hidden md:flex items-center justify-center p-2 z-20 bg-gray-800/90 text-white rounded-full absolute left-6 top-1/2 -translate-y-1/2"
                                onClick={() => scrollReviewCards(-1)}
                                aria-label="上一组活动"
                            >
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
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                            <button
                                className="hidden md:flex items-center justify-center p-2 z-20 bg-gray-800/90 text-white rounded-full absolute right-6 top-1/2 -translate-y-1/2"
                                onClick={() => scrollReviewCards(1)}
                                aria-label="下一组活动"
                            >
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
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <section
                        ref={fluidShowcaseRef}
                        className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 mt-20 mb-0 bg-[#04070d]"
                    >
                        <div
                            className={`relative ${isMobileViewport
                                ? "h-[30rem] min-h-[26rem]"
                                : "h-[calc((100dvh_-_5rem)_*_1.08)] min-h-[26rem]"
                                }`}
                        >
                            <div
                                className={`${isMobileViewport
                                    ? "h-full"
                                    : "sticky top-[5rem] h-[calc(100dvh_-_5rem)] min-h-[24rem]"
                                    } overflow-hidden bg-[#04070d]`}
                            >
                                <FluidGlass
                                    mode="cube"
                                    progress={fluidScrollProgress}
                                    headline="KingCola ICG"
                                    frontHeadline="KingCola ICG"
                                    backHeadline={"Welcome to\nJoin us."}
                                    showGallery={true}
                                    backgroundColor={0x04070d}
                                    preferStaticFallback={isMobileViewport}
                                    cubeProps={{
                                        scale: isMobileViewport ? 0.19 : 0.25,
                                        ior: 1.15,
                                        thickness: 5,
                                        transmission: 1,
                                        roughness: 0,
                                        chromaticAberration: 0.1,
                                        anisotropy: 0.01,
                                    }}
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
