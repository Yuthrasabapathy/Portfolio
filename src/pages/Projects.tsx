import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SectionReveal from "@/components/SectionReveal";

interface Project {
  id: number;
  title: string;
  description: string;
  longDesc: string;
  tags: string[];
  image: string;
  demo: string;
  github: string;
}

const projects: Project[] = [
  {
    id: 1, title: "FACIAL ATTRIBUTE RECOGNITION FOR ADVANCED HEALTHCARE AND SURVEILLANCE", description: "A full-featured online store with real-time inventory.",
    longDesc: "Built with React, Node.js, and PostgreSQL. Features include real-time inventory management, Stripe payments, and admin dashboard.",
    tags: ["React", "Node.js", "SQL"], image: "Facial Recognition.png ", demo: "#", github: "#",
  },
 
  {
    id: 2, title: "Portfolio Generator", description: "Generate stunning portfolios from a simple config file.",
    longDesc: "A meta-project that generates beautiful portfolio websites from YAML configuration. Supports multiple themes and deployment targets.",
    tags: ["React", "Tailwind", "Vite"], image: "portfolio_image.png", demo: "#", github: "#",
  },
  {
  id: 3,
  title: "SPAM MAIL DETECTION USING MACHINE LEARNING",
  description: "A machine learning system that classifies emails as spam or legitimate using NLP and supervised learning algorithms.",
  longDesc: "This project builds an intelligent spam detection system using machine learning techniques. The model is trained on an email dataset to identify spam and ham messages by analyzing textual patterns. The workflow includes data preprocessing, text cleaning, stopword removal, and feature extraction using TF-IDF. Machine learning algorithms such as Naive Bayes and Support Vector Machine are used to train the classifier. The model is evaluated using metrics like accuracy and precision to ensure reliable spam detection and improve email security.",
  tags: ["Python", "Machine Learning", "NLP", "Scikit-learn", "TF-IDF"],image: "spam mail detection.png",demo: "#",github: "#"},

];

const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const filtered = filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <PageTransition>
      <section className="min-h-screen pt-28 pb-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionReveal>
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-mono mb-3 text-center">Portfolio</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-foreground">
              Featured <span className="text-gradient">Projects</span>
            </h1>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {allTags.map((tag) => (
                <motion.button
                  key={tag}
                  onClick={() => setFilter(tag)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                    filter === tag ? "bg-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </SectionReveal>

          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelected(project)}
                  className="glass rounded-2xl overflow-hidden cursor-pointer hover:glow-border transition-all duration-500 group"
                >
                  <div className="aspect-video overflow-hidden">
                  <img src={project.image}alt={project.title}className="w60 h-70 object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((t) => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground font-mono">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-strong rounded-2xl max-w-lg w-full p-8 glow-border"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="text-4xl">{selected.image}</div>
                  <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground p-1">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">{selected.title}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">{selected.longDesc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selected.tags.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground font-mono">{t}</span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href={selected.demo} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm">
                    Live Demo <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a href={selected.github} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass glow-border font-medium text-sm text-foreground">
                    <Github className="w-3.5 h-3.5" /> Source
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </PageTransition>
  );
};

export default Projects;
