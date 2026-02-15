import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ChevronDown, 
  Cpu, 
  Database, 
  Network, 
  Terminal,
  Download
} from "lucide-react";

import { insertMessageSchema } from "@shared/schema";
import { useCreateMessage } from "@/hooks/use-messages";
import { useGithubRepos } from "@/hooks/use-github";
import { MechanicalButton } from "@/components/MechanicalButton";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { ExperienceItem } from "@/components/ExperienceItem";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Import Assets
// Note: We are using the paths provided in the prompt.
// For the video, we'll assume it's served from the public/static folder if copied, 
// OR we use the @assets alias if Vite is configured. 
// Given instructions: "use one of these approaches... @assets/..."
import videoBg from "@assets/Blueprint_Noir_Jet_Engine_Exploded_View_1771125827598.mp4";
import resumePdf from "@assets/Alli_Abdulmalik_CV_1771125827598.pdf";

const contactSchema = insertMessageSchema.extend({
  email: z.string().email("Please enter a valid email address"),
});

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: repos, isLoading: isReposLoading } = useGithubRepos();
  const createMessage = useCreateMessage();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    createMessage.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  const experienceData = [
    {
      title: "AI Engineer",
      company: "Direction7 Limited",
      period: "Nov 2024 - Present",
      description: [
        "Architected scalable AI-driven solutions using LLMs and RAG frameworks.",
        "Optimized model inference pipelines resulting in 30% latency reduction.",
        "Integrated multi-agent systems for complex task automation."
      ],
      skills: ["LangChain", "OpenAI API", "Python", "Vector DBs"]
    },
    {
      title: "AI Engineer",
      company: "Dala Innovation",
      period: "Jun 2024 - Nov 2024",
      description: [
        "Developed custom chatbots for client support automation.",
        "Implemented secure data processing pipelines for sensitive fintech data.",
        "Collaborated with cross-functional teams to deploy models to production."
      ],
      skills: ["FastAPI", "Docker", "PostgreSQL", "React"]
    }
  ];

  const techStack = [
    { icon: <Cpu className="w-8 h-8" />, name: "AI/ML", items: "PyTorch, TensorFlow, Scikit-learn" },
    { icon: <Network className="w-8 h-8" />, name: "LLM Ops", items: "LangChain, RAG, LlamaIndex" },
    { icon: <Terminal className="w-8 h-8" />, name: "Backend", items: "Python, FastAPI, Django, Node.js" },
    { icon: <Database className="w-8 h-8" />, name: "Data", items: "PostgreSQL, MongoDB, Pinecone" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="text-2xl font-bold font-display tracking-tighter">
            AE<span className="text-primary">.</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8 font-mono text-sm">
            <a href="#about" className="hover:text-primary transition-colors">/ABOUT</a>
            <a href="#experience" className="hover:text-primary transition-colors">/EXPERIENCE</a>
            <a href="#projects" className="hover:text-primary transition-colors">/PROJECTS</a>
            <a href="#contact" className="hover:text-primary transition-colors">/CONTACT</a>
            <MechanicalButton href={resumePdf} variant="outline" className="py-2 px-4 text-xs">
              RESUME
            </MechanicalButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="space-y-2">
              <span className={`block w-8 h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
              <span className={`block w-8 h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-8 h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-b border-white/10"
            >
              <div className="flex flex-col p-6 space-y-4 font-mono">
                <a href="#about" onClick={() => setIsMenuOpen(false)}>ABOUT</a>
                <a href="#experience" onClick={() => setIsMenuOpen(false)}>EXPERIENCE</a>
                <a href="#projects" onClick={() => setIsMenuOpen(false)}>PROJECTS</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)}>CONTACT</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src={videoBg} type="video/mp4" />
          </video>
          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px]" />
        </div>

        <div className="container relative z-10 px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <p className="font-mono text-primary mb-4 tracking-wide">
              Hello, I'm
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 tracking-tight">
              Alli Ekundayo<span className="text-primary">.</span>
            </h1>
            <div className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light mb-8 h-20 md:h-auto">
              I build{" "}
              <span className="text-white font-medium">
                <TypeAnimation
                  sequence={[
                    "intelligent systems.",
                    2000,
                    "RAG pipelines.",
                    2000,
                    "AI agents.",
                    2000,
                    "scalable backends.",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <MechanicalButton href="#projects">
                View My Work
              </MechanicalButton>
              <MechanicalButton href="#contact" variant="outline">
                Contact Me
              </MechanicalButton>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="w-6 h-6 text-primary/50" />
        </motion.div>
      </section>

      {/* Tech Stack / About Preview */}
      <section id="about" className="py-24 bg-secondary/10 grid-bg border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 border border-white/5 bg-background/50 backdrop-blur hover:border-primary/30 transition-colors group"
              >
                <div className="mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <h3 className="text-lg font-bold font-display text-white mb-2">{tech.name}</h3>
                <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                  {tech.items}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeading 
            title="Experience" 
            subtitle="My professional journey in building AI and software solutions."
          />
          
          <div className="mt-12 space-y-0">
            {experienceData.map((exp, index) => (
              <ExperienceItem key={index} index={index} {...exp} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-secondary/5 border-y border-white/5">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="Projects" 
            subtitle="A selection of open-source contributions and personal builds."
            align="center"
          />

          {isReposLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {repos?.map((repo, index) => (
                <ProjectCard key={repo.id} repo={repo} index={index} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <MechanicalButton href="https://github.com/Alli-Ekundayo" variant="outline">
              <Github className="w-4 h-4 mr-2" /> View More on GitHub
            </MechanicalButton>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <SectionHeading 
                title="Get in Touch" 
                subtitle="Have a project in mind or want to discuss AI integration? Let's talk."
              />
              
              <div className="space-y-6 mt-8">
                <div className="flex items-center gap-4 text-muted-foreground hover:text-white transition-colors">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-mono text-primary/80">Email Me</p>
                    <p className="text-lg font-medium">hello@alliekundayo.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-muted-foreground hover:text-white transition-colors">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-primary">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-mono text-primary/80">LinkedIn</p>
                    <a href="https://linkedin.com/in/alli-ekundayo" className="text-lg font-medium hover:underline">Alli Ekundayo</a>
                  </div>
                </div>

                <div className="mt-12 pt-12 border-t border-white/10">
                  <p className="text-muted-foreground mb-6">Download my resume for a detailed overview.</p>
                  <MechanicalButton href={resumePdf} variant="outline">
                    <Download className="w-4 h-4 mr-2" /> Download CV
                  </MechanicalButton>
                </div>
              </div>
            </div>

            <div className="bg-secondary/20 p-8 border border-white/10 backdrop-blur-sm rounded-lg">
              <h3 className="text-2xl font-display font-bold text-white mb-6">Send a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-background/50 border-white/10" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" className="bg-background/50 border-white/10" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell me about your project..." 
                            className="bg-background/50 border-white/10 min-h-[150px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <MechanicalButton 
                    type="submit" 
                    className="w-full"
                    disabled={createMessage.isPending}
                  >
                    {createMessage.isPending ? "Sending..." : "Send Message"}
                  </MechanicalButton>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 bg-background text-center">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-muted-foreground">
          <p>© 2024 Alli Ekundayo. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-6">
            <a href="https://github.com/Alli-Ekundayo" className="hover:text-primary transition-colors">GITHUB</a>
            <a href="https://linkedin.com/in/alli-ekundayo" className="hover:text-primary transition-colors">LINKEDIN</a>
            <a href="mailto:hello@alliekundayo.com" className="hover:text-primary transition-colors">EMAIL</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
