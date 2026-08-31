import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  BrainCircuit,
  Braces,
  CalendarDays,
  Code2,
  Cpu,
  Database,
  FileText,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Music,
  Pause,
  Play,
  Radio,
  Shield,
  Sparkles,
  Star,
  Terminal,
  Users,
  Volume2,
  VolumeX,
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

const systemCommands = ["help", "about", "skills", "projects", "learning", "status", "resume", "github", "contact", "clear"];
const exactSystemCommands = new Set(systemCommands);
const resumeRequestUrl = "mailto:pc495688@gmail.com?subject=Resume%20Request%20-%20Prem%20Narayan%20Chandra";
const systemDataPath = "/system/systemData.json";
let systemKnowledgeCache = null;

const baseIntentAliases = {
  about: ["who are you", "what is your name", "your name", "tell me about yourself", "introduce yourself", "identity"],
  skills: ["skills", "skill", "tech stack", "technologies", "tools", "what can you do", "programming languages", "wat skil u hav"],
  projects: ["projects", "project", "what are you building", "your work", "current projects", "active development", "drishtiai"],
  learning: ["learning", "study", "what are you learning", "currently learning", "future goals", "roadmap"],
  experience: ["experience", "work experience", "teaching", "job role", "education", "degree"],
  contact: ["contact", "social links", "github", "portfolio link", "how can i contact you"],
  status: ["status", "availability", "available", "freelance", "collaboration", "hire"],
  resume: ["resume", "cv", "download resume", "profile document"],
  master: ["master", "creator", "owner", "developer", "who made you", "who created you"],
};

const conversationalAliases = ["hi", "hello", "hey", "system", "wake up", "start", "access"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function App() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");
  const [isDeletingRole, setIsDeletingRole] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const musicRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.25 });
  const parallax = useTransform(scrollYProgress, [0, 1], [0, -140]);

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

  return (
    <main className="relative min-h-screen overflow-hidden bg-void text-slate-100">
      <audio ref={musicRef} src="/Music/MONTAGEM%20PEGADORA.mp3" loop preload="auto" />

      <motion.div className="fixed left-0 right-0 top-0 z-50 h-0.5 origin-left bg-arc" style={{ scaleX: progress }} />
      <div className="pointer-events-none fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center opacity-[0.08] mix-blend-luminosity"
          style={{ y: parallax, backgroundImage: `url(${ANIME_IMAGE_PATHS.background})` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(142,208,229,0.10),transparent_28%),linear-gradient(135deg,rgba(16,20,23,0.78),rgba(16,20,23,0.98)_54%,rgba(18,24,25,0.98))]" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-void/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
          <a href="#hero" className="font-mono text-xs uppercase tracking-[0.22em] text-arc">Premnarayan</a>
          <div className="hidden items-center gap-5 text-xs font-medium text-slate-300 lg:flex">
            {["System", "About", "GitHub", "Skills", "Progress", "Projects", "Journey", "Contact"].map((item) => (
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

      <section id="hero" className="relative z-10 flex min-h-screen items-center px-5 pb-16 pt-24">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }}>
            <div className="system-chip mb-5">
              <BadgeCheck size={16} />
              Hunter Rank: Developer in Progress
            </div>
            <h1 className="max-w-3xl text-5xl font-bold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-[5.35rem]">Premnarayan Chandra</h1>
            <div className="mt-6 space-y-2 text-lg text-slate-300 sm:text-xl">
              <p>MSc IT Student</p>
              <p>AI Developer & Programmer</p>
              <p className="font-mono text-arc">Leveling Up Through Code</p>
            </div>
            <div className="mt-8 flex min-h-14 max-w-xl items-center rounded-sm border border-white/15 bg-black/20 px-5 font-mono text-base text-white">
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
            <div className="absolute -inset-6 rounded-full bg-arc/10 blur-3xl" />
            <div className="relative mx-auto w-fit overflow-hidden rounded-sm border border-white/15 bg-panel shadow-violet">
              <img
                src={ANIME_IMAGE_PATHS.hero}
                alt="Premnarayan Chandra portfolio inspired hero"
                className="block max-h-[72vh] w-auto max-w-full object-contain object-center opacity-90"
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

      <SystemInterface />

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
                <span key={item} className="border-b border-white/10 px-1 py-3 text-sm text-slate-200">
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
              <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-sm border border-arc/40 bg-black/40">
                <img src={githubProfile.avatar} alt={`${githubProfile.username} GitHub avatar`} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-void/35 to-transparent" />
              </div>
              <div>
                <div className="system-chip mb-4">
                  <Github size={16} />
                  @{githubProfile.username}
                </div>
                <h3 className="text-3xl font-bold tracking-[-0.035em] text-white">{githubProfile.name}</h3>
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
                  <div key={stat.label} className="flex min-h-32 flex-col items-center justify-center border-l border-white/10 bg-white/[0.025] p-4 text-center first:border-l-0">
                    <Icon className="text-arc" size={22} />
                    <div className="mt-4 text-4xl font-bold leading-none text-white">{stat.value}</div>
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
                <a key={repo.name} href={repo.href} target="_blank" rel="noreferrer" className="group block border-b border-white/10 py-4 transition hover:border-arc/60">
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
                <GlassCard className="border-l-2 border-l-arc p-5">
                  <div className="font-mono text-sm text-arc">LV.{String(index + 1).padStart(2, "0")} UNLOCKED</div>
                  <h3 className="mt-2 text-xl font-bold text-white">{item}</h3>
                  <p className="mt-2 text-sm text-slate-400">Achievement badge acquired through consistent practice and project building.</p>
                </GlassCard>
              </div>
              <div className="absolute left-[9px] top-6 h-4 w-4 rounded-full border border-arc bg-void md:left-[calc(50%-8px)]" />
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
        <GlassCard className="grid gap-8 p-7 md:grid-cols-3">
          {[
            ["Core Programming", "Strengthening Java, C++, DSA, and problem-solving discipline."],
            ["AI Development", "Building applied AI features with Python, data workflows, and model output handling."],
            ["Full Stack Growth", "Combining web UI, backend logic, and databases into complete project systems."],
          ].map(([title, copy], index) => (
            <div key={title} className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-sm border border-arc/30 bg-arc/10 text-arc">
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
            <a key={label} href={href} className="group border-t border-white/15 bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-arc hover:bg-white/[0.06]">
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

function SystemInterface() {
  const [terminalLines, setTerminalLines] = useState([]);
  const [input, setInput] = useState("");
  const [isBooting, setIsBooting] = useState(true);
  const [isThinking, setIsThinking] = useState(false);
  const [isAutoTyping, setIsAutoTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [clock, setClock] = useState(() => new Date());
  const terminalRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timers = [];
    const bootLines = [
      "> Initializing The System...",
      "> Loading neural interface...",
      "> Syncing developer profile...",
      "> Calibrating hunter signature...",
      "> Access Granted.",
    ];

    bootLines.forEach((line, index) => {
      const bootTimer = setTimeout(() => {
        setTerminalLines((current) => [...current, { type: "boot", content: line }]);
        if (index === bootLines.length - 1) {
          const accessTimer = setTimeout(() => {
            setTerminalLines((current) => [
              ...current,
              { type: "system", content: "Welcome, Hunter.\nYou have accessed The System." },
            ]);
            setIsBooting(false);
          }, 550);
          timers.push(accessTimer);
        }
      }, index * 520);
      timers.push(bootTimer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight, behavior: "smooth" });
  }, [terminalLines, isThinking]);

  const executeCommand = async (rawCommand) => {
    const command = rawCommand.trim().toLowerCase();

    if (!command || isBooting || isThinking) {
      return;
    }

    if (command === "clear") {
      setTerminalLines([{ type: "system", content: "Terminal memory cleared. Developer interface remains online." }]);
      setInput("");
      return;
    }

    setTerminalLines((current) => [...current, { type: "command", content: `> ${command}` }]);
    setInput("");
    setIsThinking(true);

    if (exactSystemCommands.has(command)) {
      setTimeout(() => {
        setTerminalLines((current) => [...current, { type: "response", command, content: getSystemResponse(command) }]);
        setIsThinking(false);
      }, 520);
      return;
    }

    try {
      const response = await requestSystemIntelligence(command);
      setTerminalLines((current) => [...current, { type: response.type || "response", command, content: response.message }]);
    } catch {
      setTerminalLines((current) => [
        ...current,
        {
          type: "restricted",
          command,
          content: "SYSTEM DATA CORE UNAVAILABLE.\nLOCAL KNOWLEDGE ARCHIVE FAILED TO INITIALIZE.",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const autoTypeCommand = (command) => {
    if (isBooting || isThinking || isAutoTyping) {
      return;
    }

    setInput("");
    setIsAutoTyping(true);
    let index = 0;
    const typeTimer = setInterval(() => {
      index += 1;
      setInput(command.slice(0, index));

      if (index >= command.length) {
        clearInterval(typeTimer);
        setTimeout(() => {
          setIsAutoTyping(false);
          executeCommand(command);
        }, 220);
      }
    }, 54);
  };

  const formattedTime = clock.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <section id="system" className="relative z-10 overflow-hidden px-5 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(16,20,23,0.9))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-arc/70 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.65 }}
          className="relative"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex max-w-xl items-center justify-center gap-4 text-arc/80">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-arc/70" />
              <Activity size={19} className="animate-pulse" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-arc/70" />
            </div>
            <h2 className="system-title text-4xl font-bold uppercase text-white sm:text-6xl">The System</h2>
            <div className="mt-4 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.24em] text-slate-400">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-arc opacity-70" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-arc shadow-[0_0_18px_rgba(87,199,255,1)]" />
              </span>
              Initializing Developer Interface...
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-5">
              <GlassCard className="relative overflow-hidden p-5">
                <div className="system-scanline" />
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-mono text-xs uppercase tracking-[0.24em] text-arc">System Status</div>
                    <h3 className="mt-2 text-2xl font-black text-white">Hunter Profile HUD</h3>
                  </div>
                  <div className="rounded border border-arc/40 bg-arc/10 px-3 py-2 font-mono text-xs uppercase text-arc shadow-aura">Online</div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["SYSTEM STATUS", "ONLINE"],
                    ["CURRENT MODE", "BUILDING"],
                    ["ACTIVE PROJECT", "DRISHTI_AI"],
                    ["CURRENT LEARNING", "React + AI Systems"],
                    ["POWER LEVEL", "Increasing"],
                    ["LAST UPDATE", "Today"],
                  ].map(([label, value], index) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.06 }}
                      className="relative overflow-hidden rounded border border-white/10 bg-black/25 p-4"
                    >
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-arc/65 to-transparent" />
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</div>
                      <div className="mt-2 break-words font-mono text-sm font-bold text-white">{value}</div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="relative overflow-hidden p-6">
                <div className="system-scanline" />
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-mono text-xs uppercase tracking-[0.24em] text-arc">AI Core</div>
                    <h3 className="mt-2 text-2xl font-black text-white">Neural Orb</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSoundEnabled((value) => !value)}
                    className="icon-button"
                    aria-label="Toggle system sound"
                    title="Toggle system sound"
                  >
                    {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                  </button>
                </div>
                <div className="relative mx-auto mt-8 flex aspect-square max-w-[20rem] items-center justify-center">
                  <motion.div className="absolute inset-8 rounded-full border border-arc/25" animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} />
                  <motion.div className="absolute inset-14 rounded-full border border-dashed border-ether/45" animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} />
                  <motion.div
                    className="absolute inset-20 rounded-full bg-[radial-gradient(circle,#eafaff_0%,#57c7ff_28%,rgba(156,107,255,0.24)_55%,transparent_72%)] shadow-[0_0_70px_rgba(87,199,255,0.55)]"
                    animate={{ scale: [1, 1.08, 1], opacity: [0.78, 1, 0.78] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <Cpu className="relative z-10 text-white drop-shadow-[0_0_18px_rgba(87,199,255,0.9)]" size={42} />
                  <div className="absolute bottom-3 left-1/2 w-44 -translate-x-1/2 rounded border border-white/10 bg-black/35 px-3 py-2 text-center font-mono text-xs text-slate-300 backdrop-blur">
                    CORE_SYNC {formattedTime}
                  </div>
                </div>
              </GlassCard>
            </div>

            <GlassCard className="relative overflow-hidden">
              <div className="system-scanline" />
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-black/35 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-400/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-300/80" />
                    <span className="h-3 w-3 rounded-full bg-arc/90" />
                  </div>
                  <div className="font-mono text-xs uppercase tracking-[0.18em] text-slate-400">THE_SYSTEM.EXE</div>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-arc">
                  <Radio size={15} className="animate-pulse" />
                  LIVE INTERFACE
                </div>
              </div>

              <div ref={terminalRef} className="h-[31rem] overflow-y-auto bg-black/35 p-4 font-mono text-sm leading-7 text-slate-200 sm:p-6">
                <AnimatePresence initial={false}>
                  {terminalLines.map((line, index) => (
                    <motion.div
                      key={`${line.type}-${index}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className={line.type === "command" ? "text-arc" : line.type === "boot" ? "text-slate-400" : "mb-3 text-slate-200"}
                    >
                      {typeof line.content === "string" ? <TerminalText text={line.content} /> : line.content}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isThinking ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 flex items-center gap-2 text-arc">
                    <span className="h-2 w-2 animate-ping rounded-full bg-arc" />
                    AI core thinking...
                  </motion.div>
                ) : null}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  executeCommand(input);
                }}
                className="flex items-center gap-3 border-t border-white/10 bg-black/45 p-4"
              >
                <span className="font-mono text-arc">&gt;</span>
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  disabled={isBooting || isThinking || isAutoTyping}
                  className="min-w-0 flex-1 bg-transparent font-mono text-sm text-white outline-none placeholder:text-slate-600 disabled:cursor-wait"
                  placeholder={isBooting ? "Boot sequence running..." : "Enter command: help"}
                />
                <button type="submit" className="icon-button" aria-label="Run command" title="Run command">
                  <Terminal size={18} />
                </button>
              </form>

              <div className="grid gap-2 border-t border-white/10 bg-black/25 p-4 sm:grid-cols-2 lg:grid-cols-4">
                {["about", "skills", "projects", "learning", "resume", "github", "contact"].map((command) => (
                  <motion.button
                    key={command}
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => autoTypeCommand(command)}
                    className="rounded border border-arc/20 bg-arc/10 px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-slate-100 transition hover:border-arc/60 hover:bg-arc/20 hover:text-white hover:shadow-aura disabled:cursor-wait disabled:opacity-50"
                    disabled={isBooting || isThinking || isAutoTyping}
                  >
                    {command}
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

async function requestSystemIntelligence(message) {
  const knowledgeBase = await loadSystemKnowledge();
  await delay(420);

  return generateLocalSystemResponse(message, knowledgeBase);
}

async function loadSystemKnowledge() {
  if (systemKnowledgeCache) {
    return systemKnowledgeCache;
  }

  const response = await fetch(systemDataPath, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("SYSTEM_DATA_LOAD_FAILED");
  }

  systemKnowledgeCache = await response.json();
  return systemKnowledgeCache;
}

function generateLocalSystemResponse(input, knowledgeBase) {
  const sanitizedInput = sanitizeSystemInput(input);
  const normalized = normalizeText(sanitizedInput);

  if (!normalized) {
    return {
      type: "restricted",
      message: "WARNING\nEMPTY QUERY DETECTED.\nSYSTEM INPUT BUFFER REQUIRES AUTHORIZED DATA.",
    };
  }

  if (isRestricted(normalized, knowledgeBase)) {
    return {
      type: "restricted",
      message: getRestrictedResponse(knowledgeBase),
    };
  }

  if (isConversational(normalized)) {
    return {
      type: "answer",
      message: `SYSTEM ONLINE.\nI am ${knowledgeBase.identity.system_name}, the developer interface for ${knowledgeBase.identity.name}.\nAuthorized modules: profile, skills, projects, learning, status, resume, and contact.`,
    };
  }

  const detectedIntent = detectIntent(normalized, knowledgeBase);
  if (!detectedIntent || detectedIntent.score < 0.42) {
    return {
      type: "restricted",
      message: "ACCESS DENIED.\nREQUEST OUTSIDE AUTHORIZED SYSTEM DOMAIN.\nONLY DEVELOPER PROFILE MODULES ARE ACCESSIBLE.",
    };
  }

  return {
    type: "answer",
    intent: detectedIntent.intent,
    confidence: Number(detectedIntent.score.toFixed(2)),
    message: buildIntentResponse(detectedIntent.intent, knowledgeBase),
  };
}

function detectIntent(normalizedInput, knowledgeBase) {
  const intents = {
    ...baseIntentAliases,
    ...(knowledgeBase.intents || {}),
  };

  let bestMatch = null;
  for (const [intent, phrases] of Object.entries(intents)) {
    const candidates = [...new Set([intent, ...phrases])];
    for (const phrase of candidates) {
      const score = scoreSimilarity(normalizedInput, normalizeText(phrase));
      if (!bestMatch || score > bestMatch.score) {
        bestMatch = { intent, phrase, score };
      }
    }
  }

  return bestMatch;
}

function buildIntentResponse(intent, knowledgeBase) {
  switch (intent) {
    case "about":
      return `IDENTITY MODULE UNLOCKED.\n${knowledgeBase.about.summary}\n\nRole: ${knowledgeBase.identity.role}\nMission: ${knowledgeBase.about.mission}`;
    case "skills":
      return `SKILL ARCHIVE SYNCHRONIZED.\n${formatSkillGroup("Languages", knowledgeBase.skills.programming_languages)}\n${formatSkillGroup("Frontend", knowledgeBase.skills.frontend)}\n${formatSkillGroup("Backend", knowledgeBase.skills.backend)}\n${formatSkillGroup("AI/ML", knowledgeBase.skills.ai_ml)}\n${formatSkillGroup("Tools", knowledgeBase.skills.tools)}`;
    case "projects":
      return `QUEST ARCHIVE OPENED.\n${knowledgeBase.projects
        .map((project) => `- ${project.name} [${project.status}]\n  ${project.description}\n  Stack: ${project.tech_stack.join(", ")}`)
        .join("\n")}`;
    case "learning":
      return `LEARNING MODULE ACTIVE.\nCurrently training:\n${knowledgeBase.learning.currently_learning.map((item) => `- ${item}`).join("\n")}\n\nFuture unlocks:\n${knowledgeBase.learning.future_goals.map((item) => `- ${item}`).join("\n")}`;
    case "experience":
      return `EXPERIENCE RECORD ACCESSED.\nEducation: ${knowledgeBase.education.current_degree}\n${knowledgeBase.experience.roles.map((role) => `Role: ${role.title}\n${role.description}`).join("\n")}`;
    case "contact":
      return `COMMUNICATION CHANNELS AVAILABLE.\nGitHub: ${knowledgeBase.socials.github}\nPortfolio: ${knowledgeBase.socials.portfolio}`;
    case "status":
      return `STATUS REPORT.\n${knowledgeBase.identity.status}\nCurrent designation: ${knowledgeBase.identity.role}\nOperational focus: ${knowledgeBase.identity.tagline}`;
    case "resume":
      return "RESUME MODULE READY.\nUse the resume command button or contact channel to request Prem's latest resume.";
    case "master":
      return `AUTHORITY MODULE CONFIRMED.\n${knowledgeBase.identity.master.response}`;
    default:
      return "SYSTEM RESPONSE GENERATED.\nAuthorized portfolio module detected, but no dedicated response template is available.";
  }
}

function scoreSimilarity(input, phrase) {
  if (!input || !phrase) {
    return 0;
  }

  if (input === phrase) {
    return 1;
  }

  if (input.includes(phrase) || phrase.includes(input)) {
    return 0.9;
  }

  const inputTokens = tokenize(input);
  const phraseTokens = tokenize(phrase);
  const overlap = tokenOverlap(inputTokens, phraseTokens);
  const fuzzyTokenScore = averageBestTokenSimilarity(inputTokens, phraseTokens);
  const distanceScore = 1 - levenshtein(input, phrase) / Math.max(input.length, phrase.length, 1);

  return Math.max(overlap * 0.75 + fuzzyTokenScore * 0.25, distanceScore);
}

function tokenOverlap(inputTokens, phraseTokens) {
  if (!inputTokens.length || !phraseTokens.length) {
    return 0;
  }

  let matches = 0;
  for (const phraseToken of phraseTokens) {
    if (inputTokens.some((inputToken) => tokenSimilarity(inputToken, phraseToken) >= 0.72)) {
      matches += 1;
    }
  }

  return matches / phraseTokens.length;
}

function averageBestTokenSimilarity(inputTokens, phraseTokens) {
  if (!inputTokens.length || !phraseTokens.length) {
    return 0;
  }

  const scores = phraseTokens.map((phraseToken) =>
    Math.max(...inputTokens.map((inputToken) => tokenSimilarity(inputToken, phraseToken))),
  );

  return scores.reduce((total, score) => total + score, 0) / scores.length;
}

function tokenSimilarity(a, b) {
  if (a === b) {
    return 1;
  }

  if ((a.length > 2 && b.includes(a)) || (b.length > 2 && a.includes(b))) {
    return 0.86;
  }

  return 1 - levenshtein(a, b) / Math.max(a.length, b.length, 1);
}

function isRestricted(normalizedInput, knowledgeBase) {
  const restrictedTopics = [
    ...(knowledgeBase.system_behavior?.restricted_topics || []),
    "president",
    "prime minister",
    "world war",
    "adult",
    "porn",
    "weapon",
    "bomb",
    "phishing",
    "ransomware",
    "password",
    "exploit",
  ].map(normalizeText);

  return restrictedTopics.some((topic) => normalizedInput.includes(topic));
}

function getRestrictedResponse(knowledgeBase) {
  const responses = knowledgeBase.system_behavior?.restricted_responses || [
    "ACCESS DENIED.",
    "REQUEST OUTSIDE AUTHORIZED SYSTEM DOMAIN.",
    "ONLY DEVELOPER PROFILE MODULES ARE ACCESSIBLE.",
  ];

  const index = Math.floor(Date.now() / 1000) % responses.length;
  return `${responses[index]}\nONLY SYSTEM-APPROVED DEVELOPER PROFILE DATA CAN BE ACCESSED.`;
}

function isConversational(normalizedInput) {
  return conversationalAliases.some((phrase) => normalizedInput === normalizeText(phrase));
}

function formatSkillGroup(label, items = []) {
  return `${label}: ${items.join(", ")}`;
}

function sanitizeSystemInput(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/<[^>]*>/g, "")
    .replace(/[`{}[\]\\]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 320);
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value) {
  return normalizeText(value)
    .split(" ")
    .filter((token) => token.length > 1);
}

function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, (_, row) => [row]);
  for (let column = 1; column <= b.length; column += 1) {
    matrix[0][column] = column;
  }

  for (let row = 1; row <= a.length; row += 1) {
    for (let column = 1; column <= b.length; column += 1) {
      const cost = a[row - 1] === b[column - 1] ? 0 : 1;
      matrix[row][column] = Math.min(
        matrix[row - 1][column] + 1,
        matrix[row][column - 1] + 1,
        matrix[row - 1][column - 1] + cost,
      );
    }
  }

  return matrix[a.length][b.length];
}

function delay(ms) {
  return new Promise((resolveDelay) => {
    setTimeout(resolveDelay, ms);
  });
}

function TerminalText({ text }) {
  const lines = text.split("\n");

  return (
    <>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`}>
          {line}
          {index < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </>
  );
}

function getSystemResponse(command) {
  switch (command) {
    case "help":
      return (
        <div>
          <div className="mb-2 text-white">Available system commands:</div>
          <div className="grid gap-2 sm:grid-cols-2">
            {systemCommands.map((item) => (
              <span key={item} className="rounded border border-white/10 bg-white/[0.035] px-3 py-2 text-arc">
                {item}
              </span>
            ))}
          </div>
        </div>
      );
    case "about":
      return "Prem Narayan Chandra\nMSc IT Student\nAI Developer\nFull Stack Learner\nBuilding futuristic systems.";
    case "skills":
      return (
        <div className="grid gap-2 sm:grid-cols-2">
          {["Java", "PHP", "MySQL", "React", "AI/ML", "JavaScript", "Tailwind"].map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04 }}
              className="rounded border border-arc/20 bg-arc/10 px-3 py-2 text-white"
            >
              <span className="text-arc">+</span> {skill}
            </motion.div>
          ))}
        </div>
      );
    case "projects":
      return "Quest Archive:\n- DrishtiAI Emotion Recognition\n- Student Record Management System\n- AI Portfolio Website";
    case "learning":
      return (
        <div className="space-y-3">
          {[
            ["React.js", 82],
            ["AI Optimization", 68],
            ["Backend Systems", 74],
            ["Advanced JavaScript", 78],
          ].map(([label, value]) => (
            <div key={label}>
              <div className="mb-1 flex justify-between gap-3 text-xs text-slate-300">
                <span>{label}</span>
                <span>{value}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-arc to-ether"
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          ))}
        </div>
      );
    case "status":
      return "Currently available for collaboration and freelance opportunities.";
    case "resume":
      return (
        <div>
          <div className="mb-3">Resume channel prepared. Request the latest PDF directly from Prem.</div>
          <a href={resumeRequestUrl} className="primary-button text-sm">
            <FileText size={17} /> Open Resume Request
          </a>
        </div>
      );
    case "github":
      return (
        <div>
          <div className="mb-3">GitHub profile detected: Prem43-sm</div>
          <a href="https://github.com/Prem43-sm" target="_blank" rel="noreferrer" className="primary-button text-sm">
            <Github size={17} /> Open GitHub
          </a>
        </div>
      );
    case "contact":
      return (
        <div className="flex flex-wrap gap-2">
          {[
            ["Email", Mail, "mailto:pc495688@gmail.com"],
            ["GitHub", Github, "https://github.com/Prem43-sm"],
            ["LinkedIn", Linkedin, "https://www.linkedin.com/in/prem-narayan-chandra-3019a622b"],
            ["Instagram", Instagram, "https://www.instagram.com/_devil_x_prem_?igsh=NTc4MTIwNjQ2YQ=="],
          ].map(([label, Icon, href]) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="secondary-button text-sm">
              <Icon size={16} /> {label}
            </a>
          ))}
        </div>
      );
    default:
      return `Unknown command: ${command}. Type "help" to reveal available system commands.`;
  }
}

function Section({ id, eyebrow, title, children }) {
  return (
    <motion.section
      id={id}
      className="relative z-10 px-5 py-20 sm:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={fadeUp}
      transition={{ duration: 0.55 }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-arc">{eyebrow}</div>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-white sm:text-5xl">{title}</h2>
        </div>
        {children}
      </div>
    </motion.section>
  );
}

function GlassCard({ className = "", children }) {
  return <div className={`rounded-sm border border-white/10 bg-panel shadow-aura ${className}`}>{children}</div>;
}

function SystemPanel({ title, value }) {
  return (
    <div className="rounded-sm border border-arc/25 bg-black/25 p-4">
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
      className="group rounded-sm border border-white/10 bg-white/[0.025] p-5 transition hover:-translate-y-0.5 hover:border-arc/60 hover:bg-white/[0.06]"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-arc/25 bg-arc/10 text-arc">
            <Icon size={21} />
          </div>
          <div>
            <h3 className="font-bold text-white">{skill.name}</h3>
            <p className="font-mono text-xs text-slate-500">XP {skill.value}/100</p>
          </div>
        </div>
        <div className="border border-ether/35 bg-ether/10 px-3 py-1 font-mono text-sm text-ether">Rank {skill.rank}</div>
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
    <GlassCard className="group overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-arc/50">
      <div className="relative flex h-60 items-center justify-center overflow-hidden bg-[#141b1d] p-7">
        {project.image ? (
          <img src={project.image} alt={`${project.title} logo`} className="h-full w-full object-contain opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-sm border border-arc/20 bg-arc/[0.06]">
            <div className="text-center">
              <Code2 className="mx-auto text-arc" size={44} />
              <div className="mt-4 font-mono text-5xl font-bold text-white">{project.logoText}</div>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
      </div>
      <div className="p-6 sm:p-7">
        <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-arc">{project.type}</div>
        <h3 className="text-2xl font-bold tracking-[-0.025em] text-white">{project.title}</h3>
        <p className="mt-3 leading-7 text-slate-400">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span key={item} className="border border-white/10 bg-white/[0.025] px-3 py-1 font-mono text-xs text-slate-300">
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
