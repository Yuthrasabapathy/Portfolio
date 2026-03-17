import { lazy, Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Download, X } from "lucide-react";
import TypeWriter from "@/components/TypeWriter";
import MagneticButton from "@/components/MagneticButton";
import SectionReveal from "@/components/SectionReveal";
import PageTransition from "@/components/PageTransition";

const Hero3D = lazy(() => import("@/components/Hero3D"));

const Index = () => {
  const [showResume, setShowResume] = useState(false);

  return (
    <PageTransition>
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 gradient-blob animate-blob-move rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 gradient-blob-accent animate-blob-move rounded-full" style={{ animationDelay: "-7s" }} />

        <Suspense fallback={null}>
          <Hero3D />
        </Suspense>

        <div className="relative z-10 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 font-mono"
            >
              Welcome to my world
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-[0.95]"
            >
              <span className="text-gradient">Creative</span>
              <br />
              <span className="text-foreground">Developer</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl sm:text-2xl font-light mb-4 h-9"
            >
              I build{" "}
              <TypeWriter
                words={["web applications", "user experiences", "scalable systems", "beautiful interfaces"]}
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mb-10"
            >
              Crafting pixel-perfect, performant digital experiences with modern technologies and a keen eye for design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <MagneticButton>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm glow-primary hover:opacity-90 transition-opacity"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <button
                  onClick={() => setShowResume(true)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl glass glow-border font-semibold text-sm text-foreground hover:text-primary transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Resume
                </button>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-mono mb-3">What I do</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Building the future, one line at a time</h2>
            </div>
          </SectionReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Frontend", desc: "Crafting responsive, accessible, and beautiful user interfaces with React and modern CSS." },
              { title: "Backend", desc: "Building robust APIs and scalable server architectures with Node.js and cloud services." },
            ].map((item, i) => (

              <SectionReveal key={item.title} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass rounded-2xl p-8 hover:glow-border transition-all duration-500"
                >
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResume(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl glass rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setShowResume(false)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/60 backdrop-blur hover:bg-background/90 text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="bg-muted/30 flex items-center justify-center min-h-[400px]">
                <img
                  src="/Resume.jpg"
                  alt="Resume"
                  className="w-full h-auto object-contain max-h-[70vh]"
                />
              </div>

              <div className="p-5 flex justify-center border-t border-white/10">
                <a
                  href="/Resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm glow-primary hover:opacity-90 transition-opacity"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default Index;