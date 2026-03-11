import React, { useState, useRef, useMemo, useEffect } from "react";
import { HeaderDot, Card } from "../components";
import "../assets/css/projects.css";
import Xarrow from "react-xarrows";
import { FaFilter } from "react-icons/fa";
import { projectsData } from "../constants/projectsData";
const Projects = () => {
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const dropdownRef = useRef(null);
  const [selectedTech, setSelectedTech] = useState("");
  const repos = useMemo(() => projectsData, []);
  const normalizeTech = (value = "") => value.trim().toLowerCase();

  const filteredRepos = useMemo(() => {
    if (!selectedTech) return repos;
    const selected = normalizeTech(selectedTech);
    return repos.filter((repo) => {
      const stack = Array.isArray(repo.techStack) ? repo.techStack : [];
      return stack.some((tech) => normalizeTech(tech) === selected);
    });
  }, [repos, selectedTech]);

  const techOptions = useMemo(
    () =>
      Array.from(
        new Set(
          repos
            .flatMap((repo) => (Array.isArray(repo.techStack) ? repo.techStack : []))
            .filter(Boolean)
        )
      ),
    [repos]
  );

  const handleTechSelect = (tech) => {
    setSelectedTech(tech);
    setIsDropdownOpen(false);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (!isDropdownOpen) return;

    const onPointerDown = (event) => {
      const target = event.target;
      if (!dropdownRef.current?.contains(target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isDropdownOpen]);

  return (
      <div>
        <div className="p-4 md:p-8">
          <div className="flex flex-row gap-2 md:gap-10">
            {/* <div style={{ position: "relative" }}> */}
              <Xarrow
                start={box2Ref}
                end={box1Ref}
                color="#2B86AE"
                strokeWidth={2}
                headSize={15}
                tailSize={15}
                showHead={false}
                startAnchor="bottom"
                endAnchor="left"
                path="smooth"
                edge={5}
                zIndex={0}
                lineColor="#2B86AE"
                pathColor="#2B86AE"
                startEdge={5}
                endEdge={5}
              />
            {/* </div> */}

            <div className="HeaderDot" ref={box2Ref}>
              <HeaderDot />
            </div>
            <h1 className="relative text-white text-[40px] font-semibold leading-10">
              项目展示
            </h1>
          </div>
          <div className="relative flex flex-row gap-6 py-4 px-2 md:px-4">
            <div className="w-full max-w-[1320px] mx-auto">
              <div className="pointer-events-auto flex flex-col md:flex-row-reverse justify-between sm:mb-5 md:mb-10 ">
                <div ref={dropdownRef} className="flex flex-col-reverse items-end">
                  <button className="filter-icon" onClick={toggleDropdown}>
                    <FaFilter />
                  </button>
                  {isDropdownOpen && (
                    <div className="dropdown-menu flex flex-col justify-end">
                      <button
                        className={`dropdown-item ${selectedTech === "" ? "selected" : ""
                          }`}
                        onClick={() => handleTechSelect("")}
                      >
                        ALL
                      </button>
                      {techOptions.map((tech) => (
                        <button
                          key={tech}
                          className={`dropdown-item ${selectedTech === tech ? "selected" : ""}`}
                          onClick={() => handleTechSelect(tech)}
                        >
                          {tech}
                        </button>
                      ))}
                      {/* Add more buttons for other languages */}
                    </div>
                  )}
                </div>
                    <h1 ref={box1Ref} className="repo-name font-[600]">
                  {selectedTech || "展示"} 项目
                </h1>
              </div>
              <div className="repo-cards">
                {Array.isArray(filteredRepos) ? (
                  filteredRepos.map((repo, index) => (
                    <Card
                      key={repo.id}
                      repo={repo}
                      className={
                        index % 8 === 0 ||
                          index % 8 === 2 ||
                          index % 8 === 5 ||
                          index % 8 === 7
                          ? "even-card animate__animated animate__backInLeft"
                          : "odd-card animate__animated animate__backInRight"
                      }
                    />
                  ))
                ) : (
                  <p>暂无项目数据</p>
                )}
              </div>
              {/* <AdvancedCarousel/> */}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Projects;
