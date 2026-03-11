import React from "react";
import "./css/Card.css"; // Import the CSS file for the card design
import { fork, likes, watch } from "../assets";
import { Link } from "react-router-dom";
import { getProjectIcon } from "../constants/projectIcons";
import 'animate.css';

function Card({ repo, className }) {
  const maintainers = Array.isArray(repo.contributors) ? repo.contributors.slice(0, 3) : [];
  const keywords = Array.isArray(repo.keywords) && repo.keywords.length > 0
    ? repo.keywords.slice(0, 6)
    : maintainers.map((maintainer) => maintainer.login);
  const techStack = Array.isArray(repo.techStack) && repo.techStack.length > 0
    ? repo.techStack
    : (repo.language ? [repo.language] : []);
  const ProjectIcon = getProjectIcon(repo);

  return (
    <div
      // whileHover={{ scale: 1.5}}
      // whileTap={{ scale: 0.8 }}
      className={`card animate__animated animate__slideInDown ${className}`}
    >
      <div className="card-inner">
        <div className="card-front gap-4">
          <div className="card-upperrow">
            <div className="card-icon" aria-hidden="true">
              <ProjectIcon className="card-avatar-icon" />
            </div>
          </div>
          <h1 className="card-title">{repo.name}</h1>
          <div className="flex flex-row gap-2 items-start">
            <h3 className="card-tech shrink-0">技术栈:</h3>
            <div className="card-tech2">
              {techStack.map((tech, index) => (
                <span
                  key={`${repo.id}-${tech}-${index}`}
                  className="inline-flex px-2 py-[2px] rounded-md bg-[#2ca6e328] border border-[#7ed7ff40] text-[#d9efff] text-[0.83rem]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-row gap-2 items-start">
            <h3 className="card-tech shrink-0">关键词:</h3>
            <div className="card-keyword-list">
              {keywords.map((keyword, index) => (
                <span
                  key={`${repo.id}-kw-${keyword}-${index}`}
                  className="card-keyword-chip"
                >
                  <span className="card-keyword-dot" />
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <div className="card-mobile-extra">
            <p className="card-mobile-desc">{repo.description || "暂无项目简介"}</p>
            <div className="card-mobile-stats">
              <div className="component">
                <img src={likes} alt="stars" />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="component">
                <img src={fork} alt="forks" />
                <span>{repo.forks_count}</span>
              </div>
              <div className="component">
                <img src={watch} alt="watchers" />
                <span>{repo.watchers_count}</span>
              </div>
            </div>
            <Link
              key={`${repo.id}-mobile-link`}
              className="card-readmore pointer-events-auto"
              to={`/projects/${repo.id}`}
              style={{ pointerEvents: "auto" }}
            >
              查看项目详情
            </Link>
          </div>
        </div>
        <div className="card-back">
          <div className="card-upperrow">
            <div className="card-icon" aria-hidden="true">
              <ProjectIcon className="card-avatar-icon" />
            </div>
            <div className="card-innerrow ">
              <div className="component">
                <img src={likes} alt="Example" />
                <span>{repo.stargazers_count}</span>
              </div>

              <div className="component">
                <img src={fork} alt="Example" />
                <span>{repo.forks_count}</span>
              </div>
              <div className="component">
                <img src={watch} alt="Example" />
                <span>{repo.watchers_count}</span>
              </div>
            </div>
          </div>
          <h1 className="card-title">{repo.name}</h1>
          <p className="card-description">{repo.description}</p>
          <Link
            key={repo.id}
            className="card-readmore pointer-events-auto"
            to={`/projects/${repo.id}`}
            style={{pointerEvents:'auto'}}
          >
            查看项目详情
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
