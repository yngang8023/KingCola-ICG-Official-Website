import { useMemo } from "react";
import { projectsData } from "../constants/projectsData";

export const useProjects = () => {
  const repos = useMemo(() => projectsData, []);
  return { repos, loading: false, error: null };
};
