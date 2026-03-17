import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, ZoomIn } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SectionReveal from "@/components/SectionReveal";

const PublicationsAndConferences = [
  {
    title: "Comparative Analysis of Capsule Networks and Graph Convolutional Networks",
    excerpt:
      "Presented a research paper analyzing Capsule Networks and Graph Convolutional Networks for emotion, age, and gender detection in facial images at an international conference organized by NIT Rourkela.",
    date: "Dec 4–5, 2024",
    readTime: "Research Presentation",
    image: "D.yuthra sabapathy 1.png", 
  },
  {
    title: "Enhanced Emotion, Age, and Gender Detection using Capsule Networks",
    excerpt:
      "Presented a research manuscript on modern facial analytics using Capsule Networks for improved emotion, age, and gender prediction at ICACITES-24 International Conference.",
    date: "Dec 19–20, 2024",
    readTime: "Conference Presenter",
    image: "D.yuthra sabapathy 2.png", 

  },
];

type Publication = (typeof PublicationsAndConferences)[number];

const ImageModal = ({
  publication,
  onClose,
}: {
  publication: Publication;
  onClose: () => void;
}) => (
  <AnimatePresence>
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
    >
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl glass rounded-2xl overflow-hidden shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/60 backdrop-blur hover:bg-background/90 text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image */}
        <div className="relative bg-muted/30 flex items-center justify-center min-h-[280px] sm:min-h-[380px]">
          <img
            src={publication.image}
            alt={publication.title}
            className="w-full h-auto object-contain max-h-[60vh]"
            onError={(e) => {
              // Fallback placeholder if image is missing
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Fallback when no image */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground pointer-events-none select-none">
            <ZoomIn className="w-10 h-10 mb-2 opacity-20" />
            <span className="text-xs opacity-30">Image preview</span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Calendar className="w-3 h-3" />
            <span>{publication.date}</span>
            <span>·</span>
            <span>{publication.readTime}</span>
          </div>
          <h2 className="text-lg font-bold text-foreground leading-snug">
            {publication.title}
          </h2>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

const PublicationsAndConferencesPage = () => {
  const [selected, setSelected] = useState<Publication | null>(null);

  return (
    <PageTransition>
      <section className="min-h-screen pt-28 pb-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-mono mb-3 text-center">
              Publications & Conferences
            </p>
          </SectionReveal>

          <div className="space-y-6">
            {PublicationsAndConferences.map((article, i) => (
              <SectionReveal key={article.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ x: 8 }}
                  onClick={() => setSelected(article)}
                  className="block glass rounded-2xl p-8 hover:glow-border transition-all duration-500 group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {article.date}
                        </span>
                        <span>·</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                    <ZoomIn className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      {selected && (
        <ImageModal publication={selected} onClose={() => setSelected(null)} />
      )}
    </PageTransition>
  );
};

export default PublicationsAndConferencesPage;