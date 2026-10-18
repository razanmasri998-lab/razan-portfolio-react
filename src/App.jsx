import { useState, useEffect, useRef } from "react";

/* ============================================================
   DATEN
   ============================================================ */
const PROJECTS = [
  {
    id: 1,
    name: "E-Commerce Platform",
    desc: "A full-stack e-commerce solution with real-time inventory management and payment processing.",
    tags: ["React", "Node.js", "PostgreSQL"],
    img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
    url: "#",
  },
  {
    id: 2,
    name: "Task Management App",
    desc: "Collaborative project management tool with drag-and-drop kanban boards and team features.",
    tags: ["TypeScript", "React", "Firebase"],
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    url: "#",
  },
  {
    id: 3,
    name: "API Gateway Service",
    desc: "Scalable microservices gateway with rate limiting, authentication, and request routing.",
    tags: ["Node.js", "Docker", "Redis"],
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    url: "#",
  },
  {
    id: 4,
    name: "Design System Kit",
    desc: "Comprehensive UI component library with accessibility built-in and theming support.",
    tags: ["React", "TypeScript", "Storybook"],
    img: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&q=80",
    url: "#",
  },
];

const SKILLS = [
  { label: "JavaScript", cls: "sb-js" },
  { label: "TypeScript", cls: "sb-ts" },
  { label: "React",      cls: "sb-react" },
  { label: "Node.js",    cls: "sb-node" },
  { label: "Python",     cls: "sb-py" },
  { label: "PostgreSQL", cls: "sb-pg" },
  { label: "MongoDB",    cls: "sb-mongo" },
  { label: "AWS",        cls: "sb-aws" },
  { label: "Docker",     cls: "sb-docker" },
  { label: "Git",        cls: "sb-git" },
  { label: "REST APIs",  cls: "sb-rest" },
  { label: "GraphQL",    cls: "sb-gql" },
];

/* ============================================================
   HOOK: Intersection Observer
   ============================================================ */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ============================================================
   HOOK: Typewriter
   ============================================================ */
function useTypewriter(text, speed = 60) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return displayed;
}

/* ============================================================
   ICONS
   ============================================================ */
const IconCode = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const IconExternal = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
const IconMail = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const IconGithub = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const IconLinkedin = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);

/* ============================================================
   NAV
   ============================================================ */
function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["home", "projects", "skills", "contact"];

  return (
    <nav style={{
      ...styles.nav,
      boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.07)" : "none",
    }}>
      <a href="#home" style={styles.navLogo}>
        <IconCode /> Portfolio
      </a>
      <ul style={styles.navLinks}>
        {links.map(l => (
          <li key={l}>
            <a
              href={`#${l}`}
              style={{
                ...styles.navLink,
                color: active === l ? "#7c3aed" : "#6b7280",
                borderBottom: active === l ? "2px solid #7c3aed" : "2px solid transparent",
              }}
            >
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero() {
  const typed = useTypewriter("Full Stack Developer & Designer", 65);
  const [ref, visible] = useInView(0.1);

  return (
    <section id="home" ref={ref} style={{ ...styles.section, paddingTop: 96, paddingBottom: 96 }}>
      <h1 style={{
        ...styles.heroTitle,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}>
        {typed}
        <span style={styles.cursor}>|</span>
      </h1>
      <p style={{
        ...styles.heroDesc,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
      }}>
        I build modern web applications with a focus on clean code, user experience,
        and scalable architecture. Passionate about turning ideas into elegant digital solutions.
      </p>
      <div style={{
        ...styles.heroButtons,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s",
      }}>
        <a href="#projects" style={styles.btnPrimary}>View Projects</a>
        <a href="#contact" style={styles.btnOutline}>Get in Touch</a>
      </div>
    </section>
  );
}

/* ============================================================
   PROJECT CARD
   ============================================================ */
function ProjectCard({ project, delay }) {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.card,
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-4px)" : "translateY(0)"
          : "translateY(24px)",
        boxShadow: hovered ? "0 8px 32px rgba(124,58,237,0.13)" : "none",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.4s ease, box-shadow 0.3s ease`,
      }}
    >
      <img src={project.img} alt={project.name} style={styles.cardImg} />
      <div style={styles.cardBody}>
        <div style={styles.cardHeader}>
          <a href={project.url} style={styles.cardName}>{project.name}</a>
          <button
            onClick={() => window.open(project.url, "_blank")}
            style={styles.extBtn}
          >
            <IconExternal />
          </button>
        </div>
        <p style={styles.cardDesc}>{project.desc}</p>
        <div style={styles.tags}>
          {project.tags.map(t => <span key={t} style={styles.tag}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PROJECTS
   ============================================================ */
function Projects() {
  return (
    <section id="projects" style={styles.section}>
      <h2 style={styles.sectionTitle}>Featured Projects</h2>
      <div style={styles.grid}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} delay={i * 100} />
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   SKILLS
   ============================================================ */
function Skills() {
  const [ref, visible] = useInView(0.2);

  return (
    <section id="skills" ref={ref} style={styles.section}>
      <h2 style={styles.sectionTitle}>Skills &amp; Technologies</h2>
      <p style={styles.skillsDesc}>
        I work with modern technologies to build fast, scalable, and user-friendly applications.
      </p>
      <div style={styles.badges}>
        {SKILLS.map((s, i) => (
          <span
            key={s.label}
            style={{
              ...styles.badge,
              ...badgeColors[s.cls],
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.95)",
              transition: `opacity 0.35s ease ${i * 60}ms, transform 0.35s ease ${i * 60}ms`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {s.label}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */
function Contact() {
  const [ref, visible] = useInView(0.15);

  return (
    <section id="contact" ref={ref} style={{ ...styles.section, borderBottom: "none" }}>
      <h2 style={{
        ...styles.sectionTitle,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}>
        Let's Work Together
      </h2>
      <p style={{
        ...styles.contactDesc,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
      }}>
        I'm always interested in hearing about new projects and opportunities.
        Feel free to reach out if you'd like to collaborate or just want to say hello.
      </p>
      <div style={{
        ...styles.contactButtons,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease 0.3s",
      }}>
        <a href="mailto:hello@portfolio.dev" style={styles.btnPrimary}>
          <IconMail /> Email Me
        </a>
        <a href="#" style={styles.btnOutline}><IconGithub /> GitHub</a>
        <a href="#" style={styles.btnOutline}><IconLinkedin /> LinkedIn</a>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer style={styles.footer}>
      <a href="#home" style={styles.navLogo}><IconCode /> Portfolio</a>
      <span style={{ color: "#9ca3af", fontSize: 14 }}>© {new Date().getFullYear()} All rights reserved.</span>
      <div style={{ display: "flex", gap: 18 }}>
        {[IconGithub, IconLinkedin, IconMail].map((Icon, i) => (
          <a key={i} href="#" style={styles.footerIcon}><Icon /></a>
        ))}
      </div>
    </footer>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.4 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={styles.app}>
      <Navbar active={activeSection} />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* ============================================================
   STYLES
   ============================================================ */
const styles = {
  app: { fontFamily: "'Inter', sans-serif", background: "#fff", color: "#111827" },
  nav: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "18px 80px", borderBottom: "1px solid #e5e7eb",
    position: "sticky", top: 0, background: "#fff", zIndex: 100,
    transition: "box-shadow 0.3s",
  },
  navLogo: {
    display: "flex", alignItems: "center", gap: 8,
    fontWeight: 700, fontSize: 16, color: "#111827", textDecoration: "none",
  },
  navLinks: { display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0 },
  navLink: {
    textDecoration: "none", fontSize: 15, fontWeight: 500,
    paddingBottom: 2, transition: "color 0.2s",
  },
  section: {
    padding: "72px 80px",
    borderBottom: "1px solid #e5e7eb",
  },
  sectionTitle: { fontSize: 24, fontWeight: 700, color: "#7c3aed", marginBottom: 36 },
  heroTitle: {
    fontSize: 36, fontWeight: 700, color: "#7c3aed",
    marginBottom: 20, minHeight: 46,
  },
  cursor: {
    display: "inline-block", marginLeft: 2, color: "#7c3aed",
    animation: "blink 0.8s step-end infinite",
  },
  heroDesc: {
    color: "#6b7280", fontSize: 15, lineHeight: 1.75,
    maxWidth: 640, marginBottom: 36,
  },
  heroButtons: { display: "flex", gap: 16, flexWrap: "wrap" },
  btnPrimary: {
    background: "linear-gradient(135deg,#6d28d9,#a855f7)",
    color: "#fff", border: "none", padding: "13px 28px",
    borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer",
    textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
    boxShadow: "0 4px 18px rgba(124,58,237,0.35)",
    transition: "opacity 0.2s, transform 0.15s",
  },
  btnOutline: {
    background: "transparent", color: "#111827",
    border: "2px solid #7c3aed", padding: "13px 28px",
    borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer",
    textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
    transition: "background 0.2s, color 0.2s, transform 0.15s",
  },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 },
  card: {
    border: "1px solid #e5e7eb", borderRadius: 14,
    overflow: "hidden", background: "#fff",
  },
  cardImg: { width: "100%", height: 220, objectFit: "cover", display: "block" },
  cardBody: { padding: "20px 22px 24px" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 },
  cardName: { fontSize: 16, fontWeight: 600, color: "#7c3aed", textDecoration: "none" },
  extBtn: { background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 0 },
  cardDesc: { fontSize: 14, color: "#6b7280", lineHeight: 1.65, marginBottom: 16 },
  tags: { display: "flex", flexWrap: "wrap", gap: 8 },
  tag: {
    border: "1px solid #e5e7eb", borderRadius: 999,
    padding: "4px 14px", fontSize: 12.5, color: "#6b7280", background: "#fff",
  },
  skillsDesc: { color: "#6b7280", fontSize: 15, marginBottom: 32 },
  badges: { display: "flex", flexWrap: "wrap", gap: 12 },
  badge: {
    color: "#fff", borderRadius: 10, padding: "11px 22px",
    fontSize: 14, fontWeight: 600, cursor: "default",
  },
  contactDesc: { color: "#6b7280", maxWidth: 560, marginBottom: 32, fontSize: 15, lineHeight: 1.8 },
  contactButtons: { display: "flex", gap: 14, flexWrap: "wrap" },
  footer: {
    borderTop: "1px solid #e5e7eb", padding: "28px 80px",
    display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff",
  },
  footerIcon: { color: "#9ca3af", textDecoration: "none" },
};

const badgeColors = {
  "sb-js":     { background: "linear-gradient(135deg,#3b82f6,#6366f1)" },
  "sb-ts":     { background: "linear-gradient(135deg,#8b5cf6,#a855f7)" },
  "sb-react":  { background: "linear-gradient(135deg,#f97316,#ef4444)" },
  "sb-node":   { background: "linear-gradient(135deg,#10b981,#059669)" },
  "sb-py":     { background: "linear-gradient(135deg,#3b82f6,#6366f1)" },
  "sb-pg":     { background: "linear-gradient(135deg,#ec4899,#f43f5e)" },
  "sb-mongo":  { background: "linear-gradient(135deg,#14b8a6,#0891b2)" },
  "sb-aws":    { background: "linear-gradient(135deg,#f59e0b,#f97316)" },
  "sb-docker": { background: "linear-gradient(135deg,#ef4444,#f97316)" },
  "sb-git":    { background: "linear-gradient(135deg,#10b981,#059669)" },
  "sb-rest":   { background: "linear-gradient(135deg,#8b5cf6,#6d28d9)" },
  "sb-gql":    { background: "linear-gradient(135deg,#ec4899,#a855f7)" },
};
