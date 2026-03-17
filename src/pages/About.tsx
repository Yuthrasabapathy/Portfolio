import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Briefcase, GraduationCap, Code2, Users } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SectionReveal from "@/components/SectionReveal";

const AnimatedCounter = ({ target, label, suffix = "" }: { target: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let current = 0;
        const step = Math.ceil(target / 40);
        const interval = setInterval(() => {
          current += step;
          if (current >= target) { setCount(target); clearInterval(interval); }
          else setCount(current);
        }, 30);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl font-bold text-gradient mb-2">{count}{suffix}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

const timeline = [
  { year: "2026", title: "IBM Certified Java Full-stack Developer", org: "sla Institute ", type: "Certification"},
  { year: "2025", title: "B.E Electronics and communication engineering", org: "Saveetha Engineering College", type: "Education" },
  { year: "2021",title: "Class 12",org: "Montfort Matric Higher Secondary School", type: "Education"},
  { year: "2019", title: "Class 10", org: "Montfort Matric Higher Secondary School",type: "Education",
  },
];

const About = () => (
  <PageTransition>
    <section className="min-h-screen pt-28 pb-20 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-mono mb-3 text-center">About Me</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-foreground">
            Passionate about building <span className="text-gradient">digital experiences</span>
          </h1>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <SectionReveal>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="w-[420px] md:h-[620px] aspect-square rounded-2xl glass glow-border overflow-hidden flex items-center justify-center "
            >
               <img src="my-photo.png" alt="Yuthra Sabapathy" className="w-full h-full object-cover"/>
            </motion.div>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Hello, I'm a D.yuthra sabapathy </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
               I'm a Java Full-Stack Developer passionate about building clean, responsive, and user-friendly web applications. I primarily work with React, Node.js, and modern web technologies to create efficient front-end interfaces and reliable backend services.
                </p>
              <p className="text-muted-foreground leading-relaxed">
                As an aspiring developer, I actively strengthen my skills through hands-on projects, continuous learning, and exploring new tools in the web ecosystem. I'm excited to begin my professional journey and contribute meaningfully to a development team.
              </p>
            </div>
          </SectionReveal>
        </div>


        {/* Timeline */}
        <SectionReveal>
          <h2 className="text-2xl font-bold text-center mb-10 text-foreground">Experience & Education</h2>
        </SectionReveal>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-px w-0.5 h-full bg-border" />
          {timeline.map((item, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <div className={`flex items-center mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className={`hidden md:block w-5/12 ${i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                  <motion.div whileHover={{ scale: 1.03 }} className="glass rounded-xl p-5 hover:glow-border transition-all">
                    <p className="text-primary font-mono text-sm mb-1">{item.year}</p>
                    <h3 className="font-bold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.org}</p>
                  </motion.div>
                </div>
                <div className="relative z-10 w-10 h-10 rounded-full bg-secondary border-2 border-primary/50 flex items-center justify-center mx-auto">
                  {item.type === "work" ? <Briefcase className="w-4 h-4 text-primary" /> : <GraduationCap className="w-4 h-4 text-primary" />}
                </div>
                <div className="md:hidden flex-1 pl-4">
                  <div className="glass rounded-xl p-4">
                    <p className="text-primary font-mono text-sm mb-1">{item.year}</p>
                    <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
                    <p className="text-muted-foreground text-xs">{item.org}</p>
                  </div>
                </div>
                <div className="hidden md:block w-5/12" />
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  </PageTransition>
);

export default About;
