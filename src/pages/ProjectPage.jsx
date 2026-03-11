import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { HeaderDot } from "../components";
import { findProjectById } from "../constants/projectsData";
import { getProjectIcon } from "../constants/projectIcons";
import "../assets/css/projectpage.css";

const markdownImageModules = import.meta.glob(
  "../assets/md/projects/**/*.{png,jpg,jpeg,gif,webp,svg,avif}",
  { eager: true, import: "default" }
);

const isExternalUrl = (url = "") =>
  /^(https?:)?\/\//i.test(url) || /^data:|^blob:/i.test(url);

const resolveMarkdownImageSrc = (src = "") => {
  if (!src) return src;
  if (isExternalUrl(src) || src.startsWith("/")) return src;

  const normalized = src.replace(/^\.?\//, "");
  const entries = Object.entries(markdownImageModules);
  const exactMatch = entries.find(([key]) => key.endsWith(`/${normalized}`));

  if (exactMatch) return exactMatch[1];

  const fileName = normalized.split("/").pop();
  if (!fileName) return src;
  const looseMatch = entries.find(([key]) => key.endsWith(`/${fileName}`));

  return looseMatch ? looseMatch[1] : src;
};

function ProjectPage() {
  const { id } = useParams();
  const project = findProjectById(id);
  const techStack =
    Array.isArray(project?.techStack) && project.techStack.length > 0
      ? project.techStack
      : project?.language
        ? [project.language]
      : [];

  useEffect(() => {
    // Ensure detail page always opens from top.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [id]);

  if (!project) {
    return <div className="p-10 text-center text-white/70">未找到对应项目</div>;
  }

  const ProjectIcon = getProjectIcon(project);

  return (
    <div className="project-page-wrap">
      <div className="project-page-inner">
        <header className="project-hero">
          <div className="project-hero-head">
            <div className="project-hero-dot">
              <HeaderDot />
            </div>
            <div className="project-hero-icon" aria-hidden="true">
              <ProjectIcon />
            </div>
            <h1 className="project-hero-title">{project.name}</h1>
          </div>
          <p className="project-hero-subtitle">{project.description}</p>
          <div className="project-hero-stack">
            {techStack.map((tech, index) => (
              <span key={`${project.id}-${tech}-${index}`} className="project-hero-chip">
                {tech}
              </span>
            ))}
          </div>
        </header>

        <article className="project-markdown-shell">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => <h1 className="md-h1" {...props} />,
              h2: ({ node, ...props }) => <h2 className="md-h2" {...props} />,
              h3: ({ node, ...props }) => <h3 className="md-h3" {...props} />,
              p: ({ node, ...props }) => <p className="md-p" {...props} />,
              ul: ({ node, ...props }) => <ul className="md-ul" {...props} />,
              ol: ({ node, ...props }) => <ol className="md-ol" {...props} />,
              li: ({ node, ...props }) => <li className="md-li" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote className="md-blockquote" {...props} />
              ),
              hr: ({ node, ...props }) => <hr className="md-hr" {...props} />,
              table: ({ node, ...props }) => (
                <div className="md-table-wrap">
                  <table className="md-table" {...props} />
                </div>
              ),
              th: ({ node, ...props }) => <th className="md-th" {...props} />,
              td: ({ node, ...props }) => <td className="md-td" {...props} />,
              code: ({ inline, className, children, ...props }) =>
                inline ? (
                  <code className="md-inline-code" {...props}>
                    {children}
                  </code>
                ) : (
                  <code className={`md-code ${className || ""}`} {...props}>
                    {children}
                  </code>
                ),
              pre: ({ node, ...props }) => <pre className="md-pre" {...props} />,
              a: ({ node, ...props }) => (
                <a
                  className="md-link"
                  target="_blank"
                  rel="noreferrer"
                  {...props}
                />
              ),
              img: ({ node, src = "", alt = "", ...props }) => (
                <figure className="md-figure">
                  <img
                    className="md-image"
                    src={resolveMarkdownImageSrc(src)}
                    alt={alt}
                    loading="lazy"
                    {...props}
                  />
                  {alt ? <figcaption className="md-caption">{alt}</figcaption> : null}
                </figure>
              ),
            }}
          >
            {project.detail || "暂无项目详情文档。"}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}

export default ProjectPage;
