import {
  FaHeartbeat,
  FaShieldAlt,
  FaRoute,
  FaBlind,
  FaRoad,
  FaRobot,
  FaMobileAlt,
  FaRecycle,
  FaBullhorn,
  FaSeedling,
  FaStar,
  FaFolderOpen,
} from "react-icons/fa";

const ICON_COMPONENTS = {
  rehab: FaHeartbeat,
  shield: FaShieldAlt,
  route: FaRoute,
  blind: FaBlind,
  road: FaRoad,
  robot: FaRobot,
  mobile: FaMobileAlt,
  recycle: FaRecycle,
  bullhorn: FaBullhorn,
  seedling: FaSeedling,
  star: FaStar,
  folder: FaFolderOpen,
};

const ID_ICON_FALLBACK = {
  "lumix-agent": "mobile",
  "zihu-star": "rehab",
  "jinshen-zhikong": "shield",
  "wenshu-suixing": "route",
  "zhihu-mangtu": "blind",
  "zhitu-anxing": "road",
  "yuntai-zhiji": "robot",
  "jietu-zhixing": "recycle",
  "wenming-weishi": "bullhorn",
  "nongyun-shidai": "seedling",
  "xinghe-growth": "star",
};

export const getProjectIconKey = (project) => {
  const explicitIcon = typeof project?.icon === "string" ? project.icon.trim().toLowerCase() : "";
  if (explicitIcon && ICON_COMPONENTS[explicitIcon]) return explicitIcon;
  if (ID_ICON_FALLBACK[project?.id]) return ID_ICON_FALLBACK[project.id];
  return "folder";
};

export const getProjectIcon = (project) => ICON_COMPONENTS[getProjectIconKey(project)] || FaFolderOpen;
