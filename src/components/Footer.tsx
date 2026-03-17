import { Github, Linkedin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/yuthra007" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/yuthra-sabapathy-718649233?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },

];

const codingProfiles = [
  { label: "GitHub", href: "https://github.com/yuthra007", color: "185 85% 50%" },
  { label: "LeetCode", href: "https://leetcode.com", color: "40 100% 50%" },

];

const Footer = () => (
  <footer className="relative z-10 border-t border-border/50">
    {/* Coding Profiles */}
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6 text-center">
        Coding Profiles
      </h3>
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {codingProfiles.map((p) => (
          <motion.a
            key={p.label}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="glass px-5 py-3 rounded-xl flex items-center gap-2 text-sm font-medium text-foreground hover:glow-border transition-all duration-300"
          >
            {p.label}
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
          </motion.a>
        ))}
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-4 mb-8">
        {socials.map((s) => (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-border transition-all duration-300"
            title={s.label}
          >
            <s.icon className="w-4.5 h-4.5" />
          </motion.a>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Yuthra sabapathy.All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
