const markdownModules = import.meta.glob("../assets/md/projects/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const ARRAY_KEYS = new Set(["techStack", "keywords"]);
const NUMBER_KEYS = new Set([
  "stargazers_count",
  "forks_count",
  "watchers_count",
  "open_issues",
  "order",
]);

const STACK_PATTERNS = [
  { label: "JavaScript", pattern: /\bjavascript\b|\bjs\b/i },
  { label: "TypeScript", pattern: /\btypescript\b|\bts\b/i },
  { label: "Vue", pattern: /\bvue\b/i },
  { label: "React", pattern: /\breact\b/i },
  { label: "Java", pattern: /\bjava\b/i },
  { label: "Python", pattern: /\bpython\b/i },
  { label: "UniApp", pattern: /\buni-?app\b/i },
  { label: "C++", pattern: /\bc\+\+\b/i },
  { label: "C", pattern: /(^|[^+])\bc\b([^+]|$)/i },
  { label: "Go", pattern: /\bgo\b|\bgolang\b/i },
  { label: "Rust", pattern: /\brust\b/i },
];

const stripQuotes = (value = "") => value.replace(/^['"]|['"]$/g, "").trim();

const normalizeTechLabel = (value = "") => {
  const normalized = value.trim().toLowerCase();
  const map = {
    javascript: "JavaScript",
    js: "JavaScript",
    typescript: "TypeScript",
    ts: "TypeScript",
    vue: "Vue",
    react: "React",
    java: "Java",
    python: "Python",
    "uni-app": "UniApp",
    uniapp: "UniApp",
    "c++": "C++",
    c: "C",
    go: "Go",
    golang: "Go",
    rust: "Rust",
  };
  return map[normalized] || value.trim();
};

const parseListValue = (value = "") => {
  const normalized = value.replace(/^\[/, "").replace(/\]$/, "");
  return normalized
    .split(/[,\uFF0C]/)
    .map((item) => stripQuotes(item))
    .filter(Boolean);
};

const parseFrontmatter = (rawContent = "") => {
  const frontmatterMatch = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!frontmatterMatch) {
    return { meta: {}, body: rawContent.trim() };
  }

  const lines = frontmatterMatch[1].split(/\r?\n/);
  const meta = {};

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) return;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (!key || !value) return;

    if (ARRAY_KEYS.has(key)) {
      const parsedList = parseListValue(value);
      meta[key] = key === "techStack"
        ? parsedList.map((item) => normalizeTechLabel(item))
        : parsedList;
      return;
    }

    if (NUMBER_KEYS.has(key)) {
      const parsed = Number(stripQuotes(value));
      if (Number.isFinite(parsed)) meta[key] = parsed;
      return;
    }

    meta[key] = stripQuotes(value);
  });

  return { meta, body: rawContent.slice(frontmatterMatch[0].length).trim() };
};

const getFileNameWithoutExt = (path = "") => {
  const fileName = path.split("/").pop() || "";
  return fileName.replace(/\.md$/i, "");
};

const getFirstHeading = (markdown = "") => {
  const headingMatch = markdown.match(/^#\s+(.+)$/m);
  return headingMatch ? headingMatch[1].trim() : "";
};

const getFirstParagraph = (markdown = "") => {
  const lines = markdown.split(/\r?\n/);
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith("#")) continue;
    if (line.startsWith("- ")) continue;
    if (line.startsWith(">")) continue;
    if (line.startsWith("```")) continue;
    return line;
  }
  return "";
};

const inferTechStackFromBody = (markdown = "") => {
  const found = STACK_PATTERNS.filter(({ pattern }) => pattern.test(markdown)).map(
    ({ label }) => label
  );
  return Array.from(new Set(found));
};

const inferLanguage = (metaLanguage, techStack) => {
  if (metaLanguage) return normalizeTechLabel(metaLanguage);
  if (techStack.includes("Vue")) return "Vue";
  if (techStack.includes("UniApp")) return "UniApp";
  if (techStack.includes("JavaScript")) return "JavaScript";
  if (techStack.length > 0) return techStack[0];
  return "未分类";
};

const toContributors = (keywords, htmlUrl) =>
  keywords.map((keyword, index) => ({
    id: index + 1,
    login: keyword,
    html_url: htmlUrl || "",
  }));

const parsedProjects = Object.entries(markdownModules)
  .filter(([path]) => !getFileNameWithoutExt(path).startsWith("_"))
  .map(([path, rawContent], index) => {
    const fileKey = getFileNameWithoutExt(path);
    const { meta, body } = parseFrontmatter(rawContent);

    const techStack =
      Array.isArray(meta.techStack) && meta.techStack.length > 0
        ? meta.techStack
        : inferTechStackFromBody(body);

    const keywords =
      Array.isArray(meta.keywords) && meta.keywords.length > 0
        ? meta.keywords
        : [];

    const name = meta.name || getFirstHeading(body) || fileKey;
    const description = meta.description || getFirstParagraph(body) || `${name} 项目详情`;
    const htmlUrl = meta.html_url || "";

    return {
      id: meta.id || fileKey,
      name,
      icon: meta.icon || "",
      language: inferLanguage(meta.language, techStack),
      techStack,
      keywords,
      description,
      html_url: htmlUrl,
      homepage: meta.homepage || "",
      stargazers_count: Number.isFinite(meta.stargazers_count) ? meta.stargazers_count : 0,
      forks_count: Number.isFinite(meta.forks_count) ? meta.forks_count : 0,
      watchers_count: Number.isFinite(meta.watchers_count) ? meta.watchers_count : 0,
      open_issues: Number.isFinite(meta.open_issues) ? meta.open_issues : 0,
      contributors: toContributors(keywords, htmlUrl),
      detail: body,
      __order: Number.isFinite(meta.order) ? meta.order : index + 1,
    };
  })
  .sort((a, b) => {
    if (a.__order !== b.__order) return a.__order - b.__order;
    return a.name.localeCompare(b.name, "zh-Hans-CN");
  })
  .map(({ __order, ...project }) => project);

export const projectsData = parsedProjects;

export const findProjectById = (id) =>
  projectsData.find((project) => String(project.id) === String(id));
