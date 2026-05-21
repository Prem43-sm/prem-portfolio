import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  BrainCircuit,
  Braces,
  CalendarDays,
  Code2,
  Database,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Music,
  Pause,
  Play,
  Shield,
  Sparkles,
  Star,
  Terminal,
  Users,
  Zap,
} from "lucide-react";
import { ANIME_IMAGE_PATHS } from "./config/animeImages";

const typingRoles = [
  "Java Developer",
  "AI Builder",
  "Web Developer",
  "Problem Solver",
  "MSc IT Student",
  "Full Stack Learner",
  "PHP & MySQL Dev",
  "DSA Explorer",
  "DBMS Learner",
  "Frontend Creator",
  "Backend Builder",
  "System Designer",
  "Tech Explorer",
  "Code Leveling...",
  "Future AI Engineer",
  "Creative Programmer",
  "Smart Project Builder",
  "Learning Never Stops"
];

const githubProfile = {
  name: "Prem Narayan Chandra",
  username: "Prem43-sm",
  avatar: "https://avatars.githubusercontent.com/u/147651813?v=4",
  url: "https://github.com/Prem43-sm",
  joined: "Oct 11, 2023",
  updated: "May 20, 2026",
  bio: "MSc IT student focused on software development, AI-based systems, web technologies, and practical projects that turn learning into working tools.",
  stats: [
    { label: "Repositories", value: "8", icon: Github },
    { label: "Followers", value: "1", icon: Users },
    { label: "Following", value: "1", icon: Users },
    { label: "Total Stars", value: "8", icon: Star },
  ],
  links: [
    { label: "GitHub", icon: Github, href: "https://github.com/Prem43-sm" },
    { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/prem-narayan-chandra-3019a622b" },
    { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/_devil_x_prem_?igsh=NTc4MTIwNjQ2YQ==" },
  ],
};

const githubRepos = [
  { name: "prem-portfolio", language: "JavaScript", stars: 1, updated: "May 21, 2026", href: "https://github.com/Prem43-sm/prem-portfolio" },
  { name: "LeafGuard", language: "Python", stars: 1, updated: "May 20, 2026", href: "https://github.com/Prem43-sm/LeafGuard" },
  { name: "2D_Sanke_game", language: "C++", stars: 1, updated: "May 20, 2026", href: "https://github.com/Prem43-sm/2D_Sanke_game" },
  { name: "Model_Train_for_Emotion_Detection", language: "Python", stars: 1, updated: "May 20, 2026", href: "https://github.com/Prem43-sm/Model_Train_for_Emotion_Detection" },
  { name: "DrishtiAI-0.1", language: "Python", stars: 1, updated: "May 20, 2026", href: "https://github.com/Prem43-sm/DrishtiAI-0.1" },
  { name: "Chess-using-Pyside6", language: "Python", stars: 1, updated: "May 20, 2026", href: "https://github.com/Prem43-sm/Chess-using-Pyside6" },
];

const skills = [
  { name: "Java", value: 86, icon: Code2, rank: "A" },
  { name: "Python", value: 82, icon: BrainCircuit, rank: "A" },
  { name: "C++", value: 72, icon: Braces, rank: "B+" },
  { name: "PHP", value: 70, icon: Terminal, rank: "B+" },
  { name: "MySQL / DBMS", value: 78, icon: Database, rank: "A-" },
  { name: "DSA", value: 74, icon: Zap, rank: "B+" },
  { name: "HTML / CSS / JS", value: 84, icon: Code2, rank: "A" },
  { name: "AI Project Development", value: 80, icon: Sparkles, rank: "A-" },
  { name: "Photo & Video Editing", value: 76, icon: Shield, rank: "B+" },
];

const timeline = [
  "Beginner Programmer",
  "Learning Java",
  "Web Development",
  "AI Projects",
  "Building DrishtiAI",
  "Advanced Developer Journey",
];

const projects = [
  {
    title: "Prem Portfolio",
    logoText: "WEB",
    description:
      "Personal React portfolio with a Solo Leveling-inspired interface, animated sections, GitHub profile highlights, project cards, contact links, and a deployed Vercel demo.",
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/Prem43-sm/prem-portfolio",
    demo: "https://prem-portfolio-kohl.vercel.app",
    type: "Web Portfolio",
  },
  {
    title: "DrishtiAI 0.1",
    image: "/projects/drishtiai-logo.png",
    description:
      "Desktop classroom analytics app with PySide6, OpenCV, TensorFlow, face recognition, attendance tracking, multi-camera monitoring, timetable workflows, emotion analytics, and reporting.",
    stack: ["Python", "PySide6", "OpenCV", "TensorFlow", "Face Recognition"],
    github: "https://github.com/Prem43-sm/DrishtiAI-0.1",
    type: "AI Desktop App",
  },
  {
    title: "Emotion Detection Training",
    image: "/projects/emotion-detection-logo.png",
    description:
      "End-to-end facial emotion model training workspace using TensorFlow/Keras, EfficientNetV2B1, mixed precision, evaluation artifacts, webcam utilities, and attendance helpers.",
    stack: ["Python", "TensorFlow", "Keras", "EfficientNet", "ML"],
    github: "https://github.com/Prem43-sm/Model_Train_for_Emotion_Detection",
    type: "AI Model Training",
  },
  {
    title: "Chess Using PySide6",
    image: "/projects/chess-logo.png",
    description:
      "Python desktop chess app with Human vs Human, Human vs AI, legal move highlights, visual move arrows, undo, FEN/PGN tools, and offline learning hints.",
    stack: ["Python", "PySide6", "python-chess", "Minimax"],
    github: "https://github.com/Prem43-sm/Chess-using-Pyside6",
    type: "Desktop Game",
  },
  {
    title: "2D Snake Game",
    image: "/projects/snake-logo.png",
    description:
      "Beginner-friendly C++ Snake project with console and SFML versions, game loop logic, keyboard input, collision detection, score tracking, and CMake setup.",
    stack: ["C++", "SFML", "CMake", "Game Logic"],
    github: "https://github.com/Prem43-sm/2D_Sanke_game",
    type: "C++ Game",
  },
  {
    title: "Emotion Model for DrishtiAI",
    image: "/projects/emotion-detection-logo.png",
    description:
      "Early DrishtiAI emotion-model workspace with preprocessing, dataset splitting, fine-tuning, Grad-CAM, real-time emotion scripts, attendance, and reporting utilities.",
    stack: ["Python", "AI", "Emotion Detection", "Grad-CAM"],
    github: "https://github.com/Prem43-sm/Emotion_Model_train_for_DrishtiAI",
    type: "AI Research",
  },
  {
    title: "LeafGuard",
    image: "/projects/leafguard-logo.png",
    description:
      "A public project repository focused around the LeafGuard concept. The repository currently has limited public metadata, so this card keeps the description concise and honest.",
    stack: ["Project Prototype", "Research", "GitHub"],
    github: "https://github.com/Prem43-sm/LeafGuard",
    type: "Prototype",
  },
  {
    title: "CPP Practice",
    logoText: "C++",
    description:
      "C++ fundamentals practice repository with first programs, basic operations, bitwise operations, loops, and early programming exercises.",
    stack: ["C++", "Programming Basics", "Practice"],
    github: "https://github.com/Prem43-sm/CPP",
    type: "Learning Archive",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function App() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");
  const [isDeletingRole, setIsDeletingRole] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const musicRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.25 });
  const parallax = useTransform(scrollYProgress, [0, 1], [0, -140]);

  useEffect(() => {
    const handlePointer = (event) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", handlePointer);

    return () => {
      window.removeEventListener("pointermove", handlePointer);
    };
  }, []);

  useEffect(() => {
    const currentRole = typingRoles[roleIndex];
    const isWordComplete = typedRole === currentRole;
    const isWordCleared = typedRole.length === 0;
    const delay = isWordComplete && !isDeletingRole ? 1100 : isDeletingRole ? 42 : 72;

    const typingTimer = setTimeout(() => {
      if (!isDeletingRole && isWordComplete) {
        setIsDeletingRole(true);
        return;
      }

      if (isDeletingRole && isWordCleared) {
        setIsDeletingRole(false);
        setRoleIndex((current) => (current + 1) % typingRoles.length);
        return;
      }

      setTypedRole((current) =>
        isDeletingRole ? current.slice(0, -1) : currentRole.slice(0, current.length + 1),
      );
    }, delay);

    return () => clearTimeout(typingTimer);
  }, [isDeletingRole, roleIndex, typedRole]);

  useEffect(() => {
    const music = musicRef.current;

    if (!music) {
      return;
    }

    music.volume = 0.35;

    if (musicOn) {
      music.play().catch(() => {
        setMusicOn(false);
      });
      return;
    }

    music.pause();
  }, [musicOn]);

  const particles = useMemo(
    () =>
      Array.from({ length: 36 }, (_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        top: `${(index * 19) % 100}%`,
        duration: 5 + (index % 7),
        delay: (index % 11) * 0.2,
      })),
    [],
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-void text-slate-100">
      <audio ref={musicRef} src="/Music/MONTAGEM%20PEGADORA.mp3" loop preload="auto" />

      <motion.div className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-arc via-ether to-fuchsia-400" style={{ scaleX: progress }} />
      <div className="pointer-events-none fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center opacity-[0.16] mix-blend-screen"
          style={{ y: parallax, backgroundImage: `url(${ANIME_IMAGE_PATHS.background})` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(87,199,255,0.19),transparent_28%),radial-gradient(circle_at_82%_24%,rgba(156,107,255,0.18),transparent_31%),linear-gradient(135deg,rgba(6,8,19,0.78),rgba(8,11,23,0.96)_48%,rgba(7,4,17,0.98))]" />
        <div className="absolute inset-0 bg-grid opacity-35" />
        <div className="absolute inset-0 animate-rain bg-rain opacity-[0.08]" />
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="absolute h-1 w-1 rounded-full bg-arc/70 shadow-[0_0_18px_rgba(87,199,255,0.9)]"
            style={{
              left: particle.left,
              top: particle.top,
              animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div
        className="pointer-events-none fixed z-40 hidden h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-arc/10 blur-3xl md:block"
        style={{ left: cursor.x, top: cursor.y }}
      />

      <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-void/55 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#hero" className="font-mono text-sm uppercase tracking-[0.32em] text-arc">Premnarayan</a>
          <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            {["About", "GitHub", "Skills", "Progress", "Projects", "Journey", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-arc">
                {item}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setMusicOn((value) => !value)}
            className="icon-button"
            aria-label="Toggle background music"
            title="Toggle background music"
          >
            {musicOn ? <Pause size={18} /> : <Play size={18} />}
            <Music size={16} />
          </button>
        </nav>
      </header>

      <section id="hero" className="relative z-10 flex min-h-screen items-center px-5 pb-16 pt-28">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.04fr_0.96fr]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }}>
            <div className="system-chip mb-5">
              <BadgeCheck size={16} />
              Hunter Rank: Developer in Progress
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.96] text-white sm:text-6xl lg:text-7xl">Premnarayan Chandra</h1>
            <div className="mt-6 space-y-3 text-xl text-slate-300 sm:text-2xl">
              <p>MSc IT Student</p>
              <p>AI Developer & Programmer</p>
              <p className="font-mono text-arc">Leveling Up Through Code</p>
            </div>
            <div className="mt-8 flex min-h-14 max-w-xl items-center rounded border border-arc/30 bg-black/30 px-5 font-mono text-lg text-white shadow-aura">
              <Terminal className="mr-3 text-arc" size={22} />
              <span className="mr-2 text-slate-500">&gt;</span>
              <span className="typing-text">{typedRole}</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="primary-button">
                View Projects <ArrowUpRight size={18} />
              </a>
              <a href="#contact" className="secondary-button">
                Contact <Mail size={18} />
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative">
            <div className="absolute -inset-8 rounded-full bg-ether/20 blur-3xl" />
            <div className="relative mx-auto w-fit overflow-hidden rounded border border-white/15 bg-panel shadow-violet backdrop-blur-xl">
              <img
                src={ANIME_IMAGE_PATHS.hero}
                alt="Premnarayan Chandra portfolio inspired hero"
                className="block max-h-[78vh] w-auto max-w-full object-contain object-center opacity-90 drop-shadow-[0_0_34px_rgba(87,199,255,0.18)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <SystemPanel title="SYSTEM QUEST" value="Build. Learn. Ship. Repeat." />
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-arc to-ether" initial={{ width: "18%" }} animate={{ width: "78%" }} transition={{ duration: 1.4, delay: 0.4 }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Section id="about" eyebrow="Profile" title="About Me">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <GlassCard className="p-6">
            <img
              src="/profile/prem-about-image.png"
              alt="Premnarayan Chandra portrait"
              className="mb-5 h-[28rem] w-full rounded object-cover object-[center_34%] opacity-95 sm:h-[32rem] lg:h-[34rem]"
            />
            <SystemPanel title="CURRENT CLASS" value="MSc IT Student" />
          </GlassCard>
          <GlassCard className="p-7">
            <p className="text-lg leading-8 text-slate-300">
              A passionate developer learning and growing step-by-step like a system progression journey. Premnarayan Chandra focuses on practical programming,
              AI project development, database foundations, and building cleaner user experiences with each new project.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {["Java", "C++", "Python", "PHP", "MySQL", "DBMS", "DSA", "HTML/CSS/JS", "AI Project Development", "Photo & Video Editing"].map((item) => (
                <span key={item} className="rounded border border-white/10 bg-white/[0.04] px-3 py-3 text-sm text-slate-200">
                  {item}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>
      </Section>

      <Section id="github" eyebrow="Developer Signal" title="GitHub Profile">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <GlassCard className="overflow-hidden p-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded border border-arc/40 bg-black/40 shadow-aura">
                <img src={githubProfile.avatar} alt={`${githubProfile.username} GitHub avatar`} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-void/35 to-transparent" />
              </div>
              <div>
                <div className="system-chip mb-4">
                  <Github size={16} />
                  @{githubProfile.username}
                </div>
                <h3 className="text-3xl font-black text-white">{githubProfile.name}</h3>
                <p className="mt-3 max-w-2xl leading-7 text-slate-300">{githubProfile.bio}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {githubProfile.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a key={link.label} href={link.href} className="secondary-button text-sm" target="_blank" rel="noreferrer">
                        <Icon size={17} /> {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {githubProfile.stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex min-h-40 flex-col items-center justify-center rounded border border-white/10 bg-white/[0.04] p-4 text-center">
                    <Icon className="text-arc" size={22} />
                    <div className="mt-4 text-4xl font-black leading-none text-white">{stat.value}</div>
                    <div className="mt-3 max-w-full break-words font-mono text-[11px] uppercase leading-5 tracking-[0.12em] text-slate-500">{stat.label}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2 rounded border border-white/10 bg-black/20 px-3 py-2">
                <CalendarDays size={16} className="text-arc" /> Joined {githubProfile.joined}
              </span>
              <span className="inline-flex items-center gap-2 rounded border border-white/10 bg-black/20 px-3 py-2">
                <Zap size={16} className="text-arc" /> Updated {githubProfile.updated}
              </span>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.22em] text-arc">Latest Public Repos</div>
                <h3 className="mt-2 text-2xl font-black text-white">Code Archive</h3>
              </div>
              <a href={githubProfile.url} className="icon-button" target="_blank" rel="noreferrer" aria-label="Open GitHub profile" title="Open GitHub profile">
                <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="space-y-3">
              {githubRepos.map((repo) => (
                <a key={repo.name} href={repo.href} target="_blank" rel="noreferrer" className="group block rounded border border-white/10 bg-white/[0.035] p-4 transition hover:-translate-y-0.5 hover:border-arc/45 hover:bg-arc/10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-white transition group-hover:text-arc">{repo.name}</h4>
                      <div className="mt-2 flex flex-wrap gap-2 font-mono text-xs text-slate-500">
                        <span>{repo.language}</span>
                        <span>Stars {repo.stars}</span>
                        <span>Updated {repo.updated}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="shrink-0 text-slate-500 transition group-hover:text-arc" size={18} />
                  </div>
                </a>
              ))}
            </div>
          </GlassCard>
        </div>
      </Section>

      <Section id="skills" eyebrow="Stats" title="Skill Arsenal">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </Section>

      <Section id="progress" eyebrow="Level Progression" title="Unlocked Milestones">
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-arc via-ether to-transparent md:left-1/2" />
          {timeline.map((item, index) => (
            <motion.div
              key={item}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.45 }}
              variants={fadeUp}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className={`relative mb-8 grid gap-4 pl-12 md:grid-cols-2 md:pl-0 ${index % 2 ? "md:text-left" : "md:text-right"}`}
            >
              <div className={index % 2 ? "md:col-start-2 md:pl-10" : "md:pr-10"}>
                <GlassCard className="p-5">
                  <div className="font-mono text-sm text-arc">LV.{String(index + 1).padStart(2, "0")} UNLOCKED</div>
                  <h3 className="mt-2 text-xl font-bold text-white">{item}</h3>
                  <p className="mt-2 text-sm text-slate-400">Achievement badge acquired through consistent practice and project building.</p>
                </GlassCard>
              </div>
              <div className="absolute left-[9px] top-6 h-4 w-4 rounded-full border border-arc bg-void shadow-[0_0_18px_rgba(87,199,255,0.85)] md:left-[calc(50%-8px)]" />
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="projects" eyebrow="Quests" title="Project Archive">
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </Section>

      <Section id="journey" eyebrow="Learning Journey" title="Next Level Loading">
        <GlassCard className="grid gap-6 p-7 md:grid-cols-3">
          {[
            ["Core Programming", "Strengthening Java, C++, DSA, and problem-solving discipline."],
            ["AI Development", "Building applied AI features with Python, data workflows, and model output handling."],
            ["Full Stack Growth", "Combining web UI, backend logic, and databases into complete project systems."],
          ].map(([title, copy], index) => (
            <div key={title} className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded border border-arc/30 bg-arc/10 text-arc">
                <BookOpen size={22} />
              </div>
              <div className="font-mono text-xs text-slate-500">PATH {index + 1}</div>
              <h3 className="mt-2 text-xl font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
            </div>
          ))}
        </GlassCard>
      </Section>

      <Section id="contact" eyebrow="Party Invite" title="Contact Premnarayan">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["GitHub", Github, "https://github.com/Prem43-sm"],
            ["LinkedIn", Linkedin, "https://www.linkedin.com/in/prem-narayan-chandra-3019a622b"],
            ["Instagram", Instagram, "https://www.instagram.com/_devil_x_prem_?igsh=NTc4MTIwNjQ2YQ=="],
            ["Email", Mail, "mailto:pc495688@gmail.com"],
          ].map(([label, Icon, href]) => (
            <a key={label} href={href} className="group rounded border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:-translate-y-1 hover:border-arc/50 hover:bg-arc/10 hover:shadow-aura">
              <Icon className="text-arc transition group-hover:scale-110" size={26} />
              <div className="mt-5 font-semibold text-white">{label}</div>
              <div className="mt-2 font-mono text-xs text-slate-500">OPEN_CHANNEL</div>
            </a>
          ))}
        </div>
      </Section>
    </main>
  );
}

function Section({ id, eyebrow, title, children }) {
  return (
    <motion.section
      id={id}
      className="relative z-10 px-5 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={fadeUp}
      transition={{ duration: 0.55 }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-9">
          <div className="font-mono text-sm uppercase tracking-[0.28em] text-arc">{eyebrow}</div>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">{title}</h2>
        </div>
        {children}
      </div>
    </motion.section>
  );
}

function GlassCard({ className = "", children }) {
  return <div className={`rounded border border-white/10 bg-panel shadow-aura backdrop-blur-xl ${className}`}>{children}</div>;
}

function SystemPanel({ title, value }) {
  return (
    <div className="rounded border border-arc/25 bg-black/35 p-4 backdrop-blur">
      <div className="font-mono text-xs uppercase tracking-[0.24em] text-arc">{title}</div>
      <div className="mt-1 text-lg font-bold text-white">{value}</div>
    </div>
  );
}

function SkillCard({ skill, index }) {
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className="group rounded border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:border-arc/50 hover:bg-white/[0.07] hover:shadow-aura"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded border border-arc/25 bg-arc/10 text-arc">
            <Icon size={21} />
          </div>
          <div>
            <h3 className="font-bold text-white">{skill.name}</h3>
            <p className="font-mono text-xs text-slate-500">XP {skill.value}/100</p>
          </div>
        </div>
        <div className="rounded border border-ether/35 bg-ether/10 px-3 py-1 font-mono text-sm text-ether">Rank {skill.rank}</div>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-[linear-gradient(90deg,#57c7ff,#9c6bff,#57c7ff)] bg-[length:200%_100%] animate-shimmer"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 }}
        />
      </div>
    </motion.div>
  );
}

function ProjectCard({ project }) {
  return (
    <GlassCard className="group overflow-hidden">
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-[#070d19] p-6">
        {project.image ? (
          <img src={project.image} alt={`${project.title} logo`} className="h-full w-full object-contain opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded border border-arc/20 bg-[linear-gradient(135deg,rgba(87,199,255,0.12),rgba(156,107,255,0.08))]">
            <div className="text-center">
              <Code2 className="mx-auto text-arc" size={44} />
              <div className="mt-4 font-mono text-5xl font-black text-white">{project.logoText}</div>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
      </div>
      <div className="p-6">
        <div className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-arc">{project.type}</div>
        <h3 className="text-2xl font-black text-white">{project.title}</h3>
        <p className="mt-3 leading-7 text-slate-400">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span key={item} className="rounded border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-slate-300">
              {item}
            </span>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <a href={project.github} className="secondary-button text-sm" target="_blank" rel="noreferrer">
            <Github size={17} /> GitHub
          </a>
          {project.demo ? (
            <a href={project.demo} className="primary-button text-sm" target="_blank" rel="noreferrer">
              <ArrowUpRight size={17} /> Demo
            </a>
          ) : (
            <span className="inline-flex items-center justify-center gap-2 rounded border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-slate-500">
              <ArrowUpRight size={17} /> No Demo
            </span>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

export default App;
