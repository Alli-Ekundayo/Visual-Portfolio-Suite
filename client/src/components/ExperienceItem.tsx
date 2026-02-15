import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
  index: number;
}

export function ExperienceItem({ title, company, period, description, skills, index }: ExperienceItemProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-8 md:pl-12 py-6 border-l border-white/10 last:border-0"
    >
      <div className="absolute left-[-5px] top-8 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background" />
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
        <h3 className="text-xl font-bold text-white font-display">{title}</h3>
        <span className="text-sm font-mono text-primary/80 bg-primary/10 px-3 py-1 rounded-full w-fit mt-2 md:mt-0">
          {period}
        </span>
      </div>
      
      <div className="text-lg text-muted-foreground font-medium mb-4 flex items-center gap-2">
        <Briefcase className="w-4 h-4" />
        {company}
      </div>

      <ul className="space-y-2 mb-4">
        {description.map((item, i) => (
          <li key={i} className="text-muted-foreground/80 text-sm leading-relaxed relative pl-4">
            <span className="absolute left-0 top-2 w-1 h-1 bg-white/30 rounded-full" />
            {item}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 mt-4">
        {skills.map(skill => (
          <span key={skill} className="text-xs font-mono px-2 py-1 bg-white/5 border border-white/10 rounded text-muted-foreground">
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
