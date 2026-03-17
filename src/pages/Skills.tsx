import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import SectionReveal from "@/components/SectionReveal";

const categories = ["All", "Frontend", "Backend", "Tools", "Technologies"];

const skills = [
   { name: "HTML", category: "Frontend" },
    { name: "CSS", category: "Frontend" },
    { name: "JavaScript", category: "Frontend" },
  { name: "React", category: "Frontend" },
  // { name: "TypeScript", category: "Frontend" },
  { name: "Bootstrap", category: "Frontend" },
  // { name: "Tailwind CSS", category: "Frontend" },
  // { name: "Three.js", category: "Frontend" },
  { name: "Framer Motion", category: "Frontend" },
  { name: "Java Core", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "Spring Boot", category: "Backend" },
   { name: "REST APIs", category: "Backend" },
    //  { name: "JPA / Hibernate", category: "Backend" },
    //    { name: "Authentication", category: "Backend" },
  { name: "MYSQL", category: "Backend" },
  // { name: "GraphQL", category: "Backend" },
  // { name: "REST APIs", category: "Backend" },
  { name: "Git", category: "Tools" },
  { name: "Docker", category: "Tools" },
  { name: "VS Code", category: "Tools" },
  { name: "IntelliJ IDEA", category: "Tools" },
  // { name: "AWS", category: "Technologies" },
  // { name: "CI/CD", category: "Technologies" },
  { name: "Microservices", category: "Technologies" },
];

const Skills = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? skills : skills.filter((s) => s.category === active);

  return (
    <PageTransition>
      <section className="min-h-screen pt-28 pb-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-mono mb-3 text-center">Skills</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-foreground">
              My <span className="text-gradient">Tech Stack</span>
            </h1>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActive(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    active === cat
                      ? "bg-primary text-primary-foreground glow-primary"
                      : "glass text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </SectionReveal>

          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((skill) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-6 hover:glow-border transition-all duration-500 group"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">{skill.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Skills;