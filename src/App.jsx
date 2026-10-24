import React, { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, Phone, ArrowUpRight, Menu, X, Sun, Moon } from "lucide-react";

/* ---------------------------------------------------------
   DATA — edit here to update the content
--------------------------------------------------------- */

// Portrait photo, embedded directly so the file has zero extra setup steps.
const PROFILE_PHOTO = "data:image/jpeg;base64,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";const PROFILE = {
  name: "Mohit Kumar Verma",
  photo: PROFILE_PHOTO,
  role: "Software Engineer",
  base: "Haridwar, Uttarakhand, IN",
  email: "mohit22600@gmail.com",
  github: "https://github.com/Mohit46200",
  githubLabel: "github.com/Mohit46200",
  linkedin: "https://www.linkedin.com/in/mohit-kumar-verma-07066437a/",
  linkedinLabel: "linkedin.com/in/mohit-kumar-verma",
};

const PROJECTS = [
  {
    code: "BUILD-01",
    title: "Real-Time Video Call App",
    status: "LIVE",
    description:
      "A browser-based video calling app, built to understand real-time communication from the frontend side — connecting people into a live call through a clean, distraction-free room.",
    points: [
      "Live audio/video calling between users",
      "Minimal, focused call-room interface",
      "Built and deployed independently, end to end",
    ],
    stack: ["WebRTC", "React", "Javascript"],
    href: "https://vediocall.memohit.space",
    href2: "https://github.com/Mohit46200/Vedio-call"
  },
  {
    code: "BUILD-02",
    title: "AI GitHub Code Reviewer",
    status: "NOT DEPLOYED",
    description:
      "An autonomous AI agent that clones a GitHub repository, understands the codebase with embeddings and RAG, finds and fixes a bug, writes a regression test, runs the full suite inside an isolated Docker sandbox, has its own change reviewed, and opens a draft pull request for a human to approve.",
    points: [
      "Multi-step LangGraph workflow: setup → planner → coder → tester → reviewer → draft PR",
      "Semantic code search with local embeddings stored in PostgreSQL + pgvector",
      "Runs repo code in a network-isolated Docker sandbox and diffs test results against a baseline to catch regressions",
      "Quality gate opens a PR only when the reviewer approves and no tests regress, otherwise loops back to the coder",
      "Next.js dashboard streams every agent action live over Server-Sent Events",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "Claude API", "PostgreSQL", "pgvector", "Docker", "Next.js", "TypeScript"],
  },
  {
    code: "BUILD-03",
    title: "AI Mail Sorting",
    status: "NOT DEPLOYED",
    description:
      "A Gmail assistant that sorts your inbox for you. Sign in with Google, pick a date range, and the app fetches your emails, uses AI to sort each one into important, spam, fraud or other, and drafts replies for the important ones, which you can edit, copy or save as Gmail drafts. Nothing is ever sent automatically.",
    points: [
      "Secure Google OAuth sign-in with the Gmail API (no passwords handled by the app)",
      "Gemini classifies each email as important, spam, fraud or other",
      "GPT writes reply drafts for important emails",
      "Edit, copy, or save replies straight to Gmail drafts",
      "Prompts treat email content as untrusted to resist prompt injection",
    ],
    stack: ["Node.js", "Express", "Gmail API", "Google OAuth", "Gemini API", "OpenAI API", "Jev AI", "JavaScript"],
  },
  {
    code: "BUILD-04",
    title: "ZenithIndia Animated Landing Page",
    status: "LIVE",
    description:
      "Zenith Indian is an animated landing page built with GSAP, featuring smooth interactions and cinematic visuals using Google Flow video converted into optimized AVIF frames.",
    points: [
      "Built with GSAP animations",
      "Cinematic scroll-based visual effects",
      "Google Flow video converted to AVIF",
      "Optimized frames for faster loading",
      
    ],
    stack: ["React", "JavaScript", "GSAP Library"],
    href: "https://zenith.memohit.space/",
    href2: "https://github.com/Mohit46200/Zenith"
  },
];

const SKILLS = [
  {
    group: "Languages & Markup",
    items: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "Python"],
  },
  {
    group: "Frontend & Styling",
    items: ["React", "Next.js", "Tailwind CSS", "GSAP", "WebRTC"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express", "FastAPI", "Server-Sent Events"],
  },
  {
    group: "Databases",
    items: ["MongoDB", "PostgreSQL", "pgvector"],
  },
  {
    group: "AI & LLMs",
    items: ["Claude API", "Gemini API", "OpenAI API", "Jev AI", "LangGraph", "RAG & Embeddings"],
  },
  {
    group: "APIs & Tools",
    items: ["Docker", "Gmail API", "Google OAuth", "Git & GitHub"],
  },
];

/* ---------------------------------------------------------
   HELPERS
--------------------------------------------------------- */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`bp-reveal ${visible ? "bp-reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function CornerMark({ className = "" }) {
  return (
    <svg
      className={`absolute w-4 h-4 ${className}`}
      viewBox="0 0 16 16"
      style={{ color: "var(--bp-blue)" }}
    >
      <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function PhotoFrame({ src, initials }) {
  return (
    <div className="flex flex-col items-center gap-2 flex-shrink-0">
      <div className="relative w-36 h-36 md:w-44 md:h-44">
        <CornerMark className="-top-1 -left-1" />
        <CornerMark className="-top-1 -right-1" />
        <CornerMark className="-bottom-1 -left-1" />
        <CornerMark className="-bottom-1 -right-1" />
        <div
          className="w-full h-full rounded-full border overflow-hidden flex items-center justify-center"
          style={{ borderColor: "var(--bp-blue)", background: "var(--bp-card-bg)" }}
        >
          {src ? (
            <img src={src} alt="Portrait" className="w-full h-full object-cover" />
          ) : (
            <span className="font-display text-4xl" style={{ color: "var(--bp-blue)" }}>
              {initials}
            </span>
          )}
        </div>
      </div>
      <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: "var(--bp-ink-soft)" }}>
        MKV
      </span>
    </div>
  );
}

function SheetHeader({ index, total, label, title, dark = false }) {
  return (
    <div
      className="mb-10 md:mb-14 pb-4 border-b flex items-end justify-between"
      style={{ borderColor: dark ? "rgba(243,245,247,0.18)" : "var(--bp-line)" }}
    >
      <div>
        <span
          className="font-mono text-[11px] md:text-xs tracking-[0.2em]"
          style={{ color: "var(--bp-blue)" }}
        >
          {/* SHEET {index}/{total} — {label} */}
        </span>
        <h2
          className="font-display text-3xl md:text-[2.5rem] leading-tight mt-2"
          style={{ color: dark ? "var(--bp-on-dark)" : "var(--bp-ink)" }}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   MAIN COMPONENT
--------------------------------------------------------- */

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const navLinks = [
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="bp-root" data-theme={theme}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .bp-root {
          --bp-paper: #F8F3F6;
          --bp-line: #E4D3DC;
          --bp-ink: #2B1F28;
          --bp-ink-soft: #6E5568;
          --bp-blue: #8B5D78;
          --bp-blue-deep: #2E1A29;
          --bp-amber: #E2790F;
          --bp-amber-soft: #FCEEDD;
          --bp-card-bg: #FFFFFF;
          --bp-hero-bg: rgba(255,255,255,0.6);
          --bp-on-dark: #F8F3F6;
          background: var(--bp-paper);
          color: var(--bp-ink);
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          transition: background 0.25s ease, color 0.25s ease;
        }

        /* Dark theme keeps the same mauve family, deepened into a plum */
        .bp-root[data-theme="dark"] {
          --bp-paper: #1D1119;
          --bp-line: rgba(248,243,246,0.13);
          --bp-ink: #F8F3F6;
          --bp-ink-soft: #C6A9BC;
          --bp-blue: #D9A0BF;
          --bp-blue-deep: #140A12;
          --bp-amber: #F0922D;
          --bp-amber-soft: rgba(226,121,15,0.16);
          --bp-card-bg: #2C1A28;
          --bp-hero-bg: rgba(255,255,255,0.03);
        }
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

        .bp-grid-bg {
          background-image:
            linear-gradient(var(--bp-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--bp-line) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        .bp-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .bp-reveal-visible { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          .bp-reveal { opacity: 1; transform: none; transition: none; }
        }

        .bp-btn-amber {
          background: var(--bp-amber);
          color: #fff;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .bp-btn-amber:hover { transform: translateY(-2px); box-shadow: 0 8px 20px -8px rgba(226,121,15,0.6); }

        .bp-btn-outline {
          border: 1px solid var(--bp-blue-deep);
          color: var(--bp-paper);
          transition: background 0.15s ease, color 0.15s ease;
        }
        .bp-btn-outline:hover { background: var(--bp-paper); color: var(--bp-blue-deep); }

        .bp-card {
          background: var(--bp-card-bg);
          border: 1px solid var(--bp-line);
          transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .bp-card:hover {
          border-color: var(--bp-blue);
          transform: translateY(-4px);
          box-shadow: 0 16px 32px -20px rgba(20,33,61,0.35);
        }

        .bp-chip {
          font-family: 'IBM Plex Mono', ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.04em;
          border: 1px solid var(--bp-line);
          color: var(--bp-ink-soft);
        }

        .bp-nav-link { position: relative; }
        .bp-nav-link::after {
          content: "";
          position: absolute;
          left: 0; bottom: -4px;
          width: 0%; height: 1px;
          background: var(--bp-amber);
          transition: width 0.2s ease;
        }
        .bp-nav-link:hover::after { width: 100%; }

        .bp-focus:focus-visible {
          outline: 2px solid var(--bp-amber);
          outline-offset: 3px;
        }

        .bp-theme-toggle {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--bp-line);
          border-radius: 2px;
          color: var(--bp-ink);
          transition: border-color 0.15s ease, transform 0.15s ease;
        }
        .bp-theme-toggle:hover { border-color: var(--bp-amber); transform: rotate(12deg); }

        html { scroll-behavior: smooth; }
      `}</style>

      {/* ---------------- NAV ---------------- */}
      <header
        className="w-full"
        style={{ background: "var(--bp-paper)" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a
            href="#top"
            className="font-mono text-sm tracking-widest bp-focus rounded"
            style={{ color: "var(--bp-ink)" }}
          >
            MKV<span style={{ color: "var(--bp-amber)" }}>.</span>SPACE
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="bp-nav-link font-mono text-xs tracking-widest uppercase bp-focus rounded"
                style={{ color: "var(--bp-ink)" }}
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="bp-theme-toggle bp-focus"
              aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <a
              href={`mailto:${PROFILE.email}`}
              className="bp-btn-amber font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-sm bp-focus"
            >
              Hire Me
            </a>
          </nav>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="bp-theme-toggle bp-focus"
              aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <button
              className="bp-focus rounded"
              style={{ color: "var(--bp-ink)" }}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="md:hidden px-6 pb-6 flex flex-col gap-4"
            style={{ borderTop: "1px solid var(--bp-line)" }}
          >
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="font-mono text-xs tracking-widest uppercase pt-4"
                style={{ color: "var(--bp-ink)" }}
              >
                {l.label}
              </a>
            ))}
            <a
              href={`mailto:${PROFILE.email}`}
              className="bp-btn-amber font-mono text-xs tracking-widest uppercase px-4 py-3 rounded-sm text-center"
            >
              Hire Me
            </a>
          </div>
        )}
      </header>

      {/* ---------------- HERO ---------------- */}
      <section id="top" className="bp-grid-bg pt-16 pb-16 md:pt-20 md:pb-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="relative border px-6 py-10 md:px-14 md:py-16" style={{ borderColor: "var(--bp-blue)", background: "var(--bp-hero-bg)" }}>
            <CornerMark className="-top-2 -left-2" />
            <CornerMark className="-top-2 -right-2" />
            <CornerMark className="-bottom-2 -left-2" />
            <CornerMark className="-bottom-2 -right-2" />

            <div className="flex flex-col-reverse md:flex-row md:items-start md:justify-between gap-10">
              <div className="flex-1">
                <p className="font-mono text-xs md:text-sm tracking-[0.25em]" style={{ color: "var(--bp-blue)" }}>
                  // Software Engineer
                </p>

                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] mt-4" style={{ color: "var(--bp-ink)" }}>
                  {PROFILE.name}
                </h1>

                <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed" style={{ color: "var(--bp-ink-soft)" }}>
                  B.Tech student at SLIET Longowal, building interactive interfaces with React.
                  I learn by shipping — three live projects below, and a growing grip on the full MERN stack.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a href="#projects" className="bp-btn-amber font-mono text-xs tracking-widest uppercase px-6 py-3 rounded-sm bp-focus inline-flex items-center gap-2">
                    View Projects <ArrowUpRight size={14} />
                  </a>
                  
                </div>
              </div>

              <PhotoFrame src={PROFILE.photo} initials="MKV" />
            </div>

            {/* title block strip */}
           
          </div>

          <div className="flex gap-5 mt-6 pl-1">
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="bp-focus rounded" style={{ color: "var(--bp-ink-soft)" }} aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="bp-focus rounded" style={{ color: "var(--bp-ink-soft)" }} aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${PROFILE.email}`} className="bp-focus rounded" style={{ color: "var(--bp-ink-soft)" }} aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </section>


      
      {/* ---------------- PROJECTS ---------------- */}
      <section id="projects" className="bp-grid-bg px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SheetHeader index="02" total="04" label="PROJECT LOG" title="Things I've Build" />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.code} delay={i * 100}>
                <div className="bp-card h-full flex flex-col p-6 md:p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.2em]" style={{ color: "var(--bp-blue)" }}>{p.code}</span>
                    <span
                      className="font-mono text-[10px] tracking-[0.2em] px-2 py-1 rounded-sm"
                      style={{ background: "var(--bp-amber-soft)", color: "var(--bp-amber)" }}
                    >
                      ● {p.status}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl md:text-[1.7rem] mt-4" style={{ color: "var(--bp-ink)" }}>
                    {p.title}
                  </h3>

                  <p className="mt-3 text-sm md:text-base leading-relaxed" style={{ color: "var(--bp-ink-soft)" }}>
                    {p.description}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-sm" style={{ color: "var(--bp-ink-soft)" }}>
                        <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--bp-blue)" }} />
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="bp-chip px-2.5 py-1 rounded-sm">{s}</span>
                    ))}
                  </div>

                  {[
                    [p.href2, "Github Repo", "Github Repo — Not deployed yet"],
                    [p.href, "Live Demo", "Live Demo — Not deployed yet"],
                  ].map(([url, label, fallback]) => (
                    <div key={label} className="mt-6 pt-6 border-t" style={{ borderColor: "var(--bp-line)" }}>
                      {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase bp-focus rounded"
                          style={{ color: "var(--bp-amber)" }}
                        >
                          {label} <ArrowUpRight size={14} />
                        </a>
                      ) : (
                        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--bp-ink-soft)" }}>
                          {fallback}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SKILLS ---------------- */}
      <section id="skills" className="px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SheetHeader index="03" total="04" label="TOOLKIT" title="What I build with" />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {SKILLS.map((group, i) => (
              <Reveal key={group.group} delay={i * 100}>
                <div>
                  <h3 className="font-mono text-[11px] tracking-[0.2em] pb-3 border-b" style={{ color: "var(--bp-blue)", borderColor: "var(--bp-line)" }}>
                    {group.group}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--bp-amber)" }} />
                        <span className="font-display text-lg" style={{ color: "var(--bp-ink)" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CONTACT / FOOTER ---------------- */}
      <footer id="contact" className="px-6 md:px-10 pt-20 md:pt-28 pb-10" style={{ background: "var(--bp-blue-deep)" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SheetHeader index="04" total="04" label="CONTACT" title="Let's build something" dark />
          </Reveal>

          <Reveal delay={100}>
            <p className="max-w-xl text-base md:text-lg leading-relaxed" style={{ color: "rgba(243,245,247,0.75)" }}>
              Open to Full-Stack internship roles — remote. If you've got a team that needs
              an extra pair of hands on the Stack, I'd like to hear about it.
            </p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="bp-btn-amber inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-6 py-3 rounded-sm mt-8 bp-focus"
            >
              Email Me <ArrowUpRight size={14} />
            </a>
          </Reveal>

          <Reveal delay={150}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8" style={{ borderTop: "1px solid rgba(243,245,247,0.18)" }}>
              {[
                [Mail, "EMAIL", PROFILE.email, `mailto:${PROFILE.email}`],
                [Github, "GITHUB", PROFILE.githubLabel, PROFILE.github],
                [Linkedin, "LINKEDIN", PROFILE.linkedinLabel, PROFILE.linkedin],
              ].map(([Icon, label, value, href]) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="group bp-focus rounded"
                >
                  <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em]" style={{ color: "var(--bp-amber)" }}>
                    <Icon size={13} /> {label}
                  </div>
                  <div
                    className="mt-2 text-xs md:text-sm break-all group-hover:underline"
                    style={{ color: "rgba(243,245,247,0.85)" }}
                  >
                    {value}
                  </div>
                </a>
              ))}
            </div>
          </Reveal>

          <div
            className="mt-14 pt-6 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between font-mono text-[11px] tracking-widest"
            style={{ borderTop: "1px solid rgba(243,245,247,0.12)", color: "rgba(243,245,247,0.45)" }}
          >
            <span>DESIGNED &amp; BUILT BY {PROFILE.name.toUpperCase()}</span>
            <span>with help of Claude AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}