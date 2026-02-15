import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MechanicalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline";
  href?: string;
  className?: string;
}

export function MechanicalButton({ 
  children, 
  variant = "primary", 
  href, 
  className,
  ...props 
}: MechanicalButtonProps) {
  
  const baseClasses = "mechanical-btn group relative inline-flex items-center justify-center overflow-hidden border border-primary/20 px-6 py-3 font-mono font-medium transition-colors hover:border-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";
  
  const variantClasses = variant === "primary" 
    ? "bg-primary/10 text-primary" 
    : "bg-transparent text-foreground/80 hover:text-primary";

  const content = (
    <>
      <span className="relative z-10 mr-2">{children}</span>
      <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-primary opacity-50 transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:opacity-100" />
      <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-primary opacity-50 transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:opacity-100" />
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        className={cn(baseClasses, variantClasses, className)}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button 
      className={cn(baseClasses, variantClasses, className)} 
      {...props}
    >
      {content}
    </button>
  );
}
