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

// Custom descriptions based on README analysis
const projectDescriptions: Record<string, string> = {
  "MyOra": "AI-powered health coaching platform with WhatsApp integration, featuring a 16-week curriculum-based coaching experience, 24/7 triage, and personalized health tracking. Built with FastAPI, LangGraph, React, and AWS Serverless.",
  "Fingerprint-Attendance": "IoT-based fingerprint attendance system with Arduino hardware integration and Flask backend. Features biometric verification, course selection, and automatic attendance recording with offline sync capability.",
  "spacecraft-3d-visualizer": "Interactive 3D spacecraft visualization application built with React, TypeScript, and Three.js. Explore detailed spacecraft models with real-time rendering and intuitive controls.",
  "waste-classifier": "Smart waste management application using computer vision and machine learning to classify waste materials. Helps users properly sort recyclables and reduce environmental impact.",
  "Bidsync_contracting_app": "Modern contracting platform for bid management and contractor coordination. Built with React, TypeScript, and Tailwind CSS for a seamless bidding workflow.",
  "DALA_API": "Data analytics and processing API for fintech applications. Features secure data pipelines and AI-powered insights.",
  "Fingerprint_backend": "Backend API for the fingerprint attendance system. Handles fingerprint verification, course management, and attendance recording with Flask and Python.",
  "memory-minder-bot": "Intelligent reminder and memory management bot built with React and TypeScript. Helps users track tasks, set reminders, and manage their daily activities.",
  "DevOps_101": "Comprehensive beginner's guide to DevOps practices, covering CI/CD, containerization, infrastructure as code, and cloud deployment strategies.",
  "3D_backend": "Backend service for 3D visualization applications. Handles asset management, real-time data processing, and API endpoints for 3D rendering.",
  "Diverse_03": "AI agent system with Google Calendar integration for intelligent scheduling and task management.",
  "BINCOM_Solution": "Technical assessment solution demonstrating Python programming skills and problem-solving capabilities.",
};

// Repos to combine (frontend + backend = combined name)
const combinedRepos: Record<string, { combined: string; repos: string[] }> = {
  "MyOra": {
    combined: "MyOra",
    repos: ["MyOra_Frontend", "MyOra_backend"]
  }
};

export function useGithubRepos() {
  return useQuery({
    queryKey: ["github-repos"],
    queryFn: async () => {
      const res = await fetch("https://api.github.com/users/Alli-Ekundayo/repos?sort=updated&per_page=20");
      if (!res.ok) {
        throw new Error("Failed to fetch repositories");
      }
      const data = await res.json() as GithubRepo[];
      
      // Track which repos should be combined
      const reposToSkip = new Set<string>();
      const combinedRepoData: GithubRepo[] = [];
      
      // Process combined repos
      for (const [combinedName, config] of Object.entries(combinedRepos)) {
        const matchingRepos = data.filter(repo => config.repos.includes(repo.name));
        if (matchingRepos.length > 0) {
          // Mark individual repos to be skipped
          matchingRepos.forEach(repo => reposToSkip.add(repo.name));
          
          // Create combined repo entry using the most recently updated one as base
          const sortedByUpdate = matchingRepos.sort(
            (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
          const baseRepo = sortedByUpdate[0];
          
          // Combine stats
          const totalStars = matchingRepos.reduce((sum, r) => sum + r.stargazers_count, 0);
          const totalForks = matchingRepos.reduce((sum, r) => sum + r.forks_count, 0);
          const allTopics = Array.from(new Set(matchingRepos.flatMap(r => r.topics || [])));
          const languages = Array.from(new Set(matchingRepos.map(r => r.language).filter(Boolean)));
          
          combinedRepoData.push({
            ...baseRepo,
            id: baseRepo.id,
            name: combinedName,
            description: projectDescriptions[combinedName] || baseRepo.description,
            html_url: `https://github.com/Alli-Ekundayo?tab=repositories&q=${combinedName.toLowerCase()}`,
            language: languages.join(", ") || baseRepo.language,
            stargazers_count: totalStars,
            forks_count: totalForks,
            topics: allTopics,
          });
        }
      }
      
      // Process regular repos (not combined) and add custom descriptions
      const processedRepos = data
        .filter(repo => !reposToSkip.has(repo.name))
        .filter(repo => !repo.name.includes("Visual-Portfolio-Suite")) // Exclude this portfolio repo
        .map(repo => ({
          ...repo,
          description: projectDescriptions[repo.name] || repo.description || "No description provided.",
        }));
      
      // Combine and sort by update date
      const allRepos = [...combinedRepoData, ...processedRepos]
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        .slice(0, 12);
      
      return allRepos;
    },
  });
}
