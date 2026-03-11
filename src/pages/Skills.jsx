import React, { useEffect, useState, useRef } from "react";
import { HeaderDot } from "../components";
import "../assets/css/skills.css";
import Xarrow from "react-xarrows";
import { FaFilter } from "react-icons/fa";
import {
  FaCode,
  FaServer,
  FaMicrochip,
  FaBrain,
  FaPalette,
  FaChartLine,
} from "react-icons/fa";
import resources from "../constants/resourcesData"; // Imported resources data

const Skills = () => {
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const filterRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [searchTerm, setSearchTerm] = useState("");

  const resourceTypes = ["全部", ...Array.from(new Set(resources.map((r) => r.type)))];

  const toggleDropdown = () => setIsDropdownOpen((s) => !s);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handlePointerDown = (event) => {
      const target = event.target;
      if (!filterRef.current?.contains(target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDropdownOpen]);

  const filteredResources = resources.filter((res) => {
    const matchesCategory = selectedCategory === "全部" || res.type === selectedCategory;
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      res.name.toLowerCase().includes(q) ||
      res.type.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const directionTags = [
    "前端方向",
    "后端方向",
    "嵌入式方向",
    "人工智能方向",
    "产品设计方向",
    "策划运营方向",
  ];

  const directionCards = [
    {
      title: "前端方向",
      icon: FaCode,
      description:
        "前端开发聚焦网站或应用的用户界面构建，常用 HTML、CSS、JavaScript、React、Vue、Angular 等技术，实现高质量交互与多端适配，为用户提供现代化 Web 体验。",
    },
    {
      title: "后端方向",
      icon: FaServer,
      description:
        "后端开发专注服务器端逻辑，常用 Java、Python、Node.js 等技术，负责数据存储、业务流程与接口服务，确保系统稳定、可扩展且高效运行。",
    },
    {
      title: "嵌入式方向",
      icon: FaMicrochip,
      description:
        "嵌入式开发面向树莓派、单片机等硬件平台，使用 C/C++ 等语言完成硬件控制、驱动与实时系统开发，让设备具备可靠的智能能力。",
    },
    {
      title: "人工智能方向",
      icon: FaBrain,
      description:
        "人工智能通过数据学习模式与规律，在无需显式规则编程的情况下持续优化任务表现，广泛应用于预测、分类、识别与智能决策等场景。",
    },
    {
      title: "产品设计方向",
      icon: FaPalette,
      description:
        "产品设计结合创意与工程实践，覆盖外观设计、Logo、视频剪辑、动画制作、3D 建模与宣传视觉，围绕用户需求打造兼具实用性与吸引力的作品。",
    },
    {
      title: "策划运营方向",
      icon: FaChartLine,
      description:
        "策划运营通过目标设定、资源配置、执行追踪与复盘优化推动组织增长，涉及品牌传播、市场活动、商业模式与文案策划等关键能力。",
    },
  ];

  return (
    <div>
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex flex-row gap-2 md:gap-10">
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
          />
          <div className="HeaderDot" ref={box2Ref}>
            <HeaderDot />
          </div>
          <h1 className="relative text-white text-3xl md:text-5xl font-bold leading-tight">
            团队技能
          </h1>
        </div>

        {/* Content section */}
        <div className="relative flex flex-col md:flex-row sm:ml-0 md:ml-0 gap-10 py-6 px-2 md:px-2 items-start">
          <div className="w-full md:w-2/3">
            <h1 ref={box1Ref} className="repo-name font-[700] text-lg md:text-2xl text-white">
              {selectedCategory === "全部" ? "全部方向" : selectedCategory} 技能资源
            </h1>
            <h1 className="mt-6 md:mt-8 text-white text-2xl md:text-4xl font-bold mb-4">方向总览</h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              我们工作室围绕技术研发与创新实践，重点建设前端、后端、嵌入式、人工智能、
              产品设计、策划运营六大方向，形成“技术实现 + 产品落地 + 运营增长”的协同能力体系。
            </p>
          </div>
          <div className="w-full md:w-1/3 text-left md:text-right space-y-3">
            {directionTags.map((tag, idx, arr) => (
              <div key={idx}>
                <div className="text-sky-100 text-base md:text-lg leading-relaxed font-medium">
                  {tag}
                </div>
                {idx < arr.length - 1 && <hr className="my-3 border-gray-700" />}
              </div>
            ))}
            <hr className="my-3 border-gray-700" />
          </div>
        </div>

        <div className="skills-direction-wrap mb-8 px-2">
          <h2 className="skills-direction-title">方向详情</h2>
          <p className="skills-direction-subtitle">
            选择你最感兴趣的方向深入学习，在真实项目与协作中完成能力进阶。
          </p>
          <div className="skills-direction-grid">
            {directionCards.map((item) => {
              const IconComponent = item.icon;
              return (
                <article key={item.title} className="skills-direction-card">
                  <div className="skills-direction-card-head">
                    <span className="skills-direction-icon" aria-hidden="true">
                      <IconComponent />
                    </span>
                    <h3 className="skills-direction-card-title">{item.title}</h3>
                  </div>
                  <p className="skills-direction-card-desc">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 px-2">
          <input
            type="text"
            placeholder="搜索技能资源..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="skills-search-input"
          />
        </div>

        {/* Category Buttons + Filter */}
        <div className="skills-filter-bar mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-2">
          {/* Category Buttons */}
          <div className="category-buttons flex flex-wrap gap-3">
            {resourceTypes.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`skills-category-btn ${selectedCategory === cat ? "is-active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filter Button */}
          <div className="filter-container relative" ref={filterRef}>
            <button
              onClick={toggleDropdown}
              className="skills-filter-btn"
            >
              <FaFilter />
            </button>
            {isDropdownOpen && (
              <div className="skills-filter-dropdown absolute right-0 mt-2 rounded-lg shadow-lg z-20">
                {resourceTypes.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`skills-filter-dropdown-item ${
                      selectedCategory === cat ? "is-active" : ""
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Resource Cards */}
        <div className="skills-resources-grid px-2 items-stretch">
          {filteredResources.map((res, index) => (
            <div
              key={res.id}
              className={`skills-resource-card ${
                index % 2 === 0
                  ? "animate__animated animate__backInLeft"
                  : "animate__animated animate__backInRight"
              }`}
            >
              <div className="skills-resource-header">
                {res.image && (
                  <span className="skills-resource-logo-wrap">
                    <img
                      src={res.image}
                      alt={res.name}
                      className="skills-resource-logo"
                    />
                  </span>
                )}
                <div className="skills-resource-title-wrap">
                  <h2 className="skills-resource-name">{res.name}</h2>
                  <p className="skills-resource-type">{res.type}</p>
                </div>
              </div>
              {res.description && <p className="skills-resource-desc">{res.description}</p>}
              <div className="skills-resource-actions">
                {res.video && (
                  <a
                    href={res.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="skills-resource-btn skills-resource-btn--video"
                  >
                    B站学习
                  </a>
                )}
                {res.link && (
                  <a
                    href={res.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="skills-resource-btn skills-resource-btn--doc"
                  >
                    官网文档
                  </a>
                )}
              </div>
            </div>
          ))}
          {filteredResources.length === 0 && (
            <p className="text-gray-400">未找到符合条件的资源。</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;
