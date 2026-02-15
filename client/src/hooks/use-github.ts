import { useQuery } from "@tanstack/react-query";

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
}

export function useGithubRepos() {
  return useQuery({
    queryKey: ["github-repos"],
    queryFn: async () => {
      const res = await fetch("https://api.github.com/users/Alli-Ekundayo/repos?sort=updated&per_page=12");
      if (!res.ok) {
        throw new Error("Failed to fetch repositories");
      }
      const data = await res.json();
      // Filter out forks if desired, or keep them. Here we just return all.
      // We can also sort manually if needed, but API sort is usually enough.
      return data as GithubRepo[];
    },
  });
}
