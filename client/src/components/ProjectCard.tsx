import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork, Code } from "lucide-react";
import { GithubRepo } from "@/hooks/use-github";

interface ProjectCardProps {
  repo: GithubRepo;
  index: number;
}

export function ProjectCard({ repo, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <div className="h-full mechanical-panel bg-secondary/20 border border-white/5 p-6 flex flex-col hover:border-primary/50 transition-colors duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:text-white group-hover:bg-primary transition-colors">
            <Code className="w-6 h-6" />
          </div>
          <div className="flex gap-3 text-muted-foreground text-xs font-mono">
            {repo.stargazers_count > 0 && (
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3" /> {repo.stargazers_count}
              </span>
            )}
            {repo.forks_count > 0 && (
              <span className="flex items-center gap-1">
                <GitFork className="w-3 h-3" /> {repo.forks_count}
              </span>
            )}
          </div>
        </div>

        <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {repo.name}
        </h3>
        
        <p className="text-muted-foreground text-sm flex-grow mb-6 line-clamp-3">
          {repo.description || "No description provided."}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {repo.language && (
            <span className="text-xs font-mono px-2 py-1 bg-white/5 rounded text-primary border border-primary/20">
              {repo.language}
            </span>
          )}
          {repo.topics?.slice(0, 3).map(topic => (
            <span key={topic} className="text-xs font-mono px-2 py-1 bg-white/5 rounded text-muted-foreground border border-white/5">
              {topic}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" /> Code
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors ml-auto"
            >
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
