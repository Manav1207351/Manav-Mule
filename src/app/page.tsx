"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import ParticlesBackground from "@/components/ParticlesBackground";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Send,
  Award,
  BookOpen,
  Code2,
  BrainCircuit,
  ChevronDown,
  CheckCircle2,
  Loader2,
  Home,
  GraduationCap,
  Briefcase,
  FileDown,
  Phone,
} from "lucide-react";

/* ─── Animated section wrapper ─── */
function Section({
  children,
  className = "",
  delay = 0,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─── Heading ─── */
function SectionHeading({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-14">
      {subtitle && (
        <p className="text-blue-400 font-medium text-sm tracking-widest uppercase mb-2">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-5xl font-bold">{title}</h2>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
export default function Portfolio() {
  /* ── Data ── */
  const projects = [
    {
      title: "AI Surveillance System",
      description:
        "Real-time crowd and fight detection using YOLOv8 with a live analytics dashboard.",
      tech: ["YOLOv8", "OpenCV", "Flask", "React", "Socket.IO"],
      impact: "93% detection accuracy • 30% faster incident response",
      github: "https://github.com/Manav1207351",
      image: "/projects/surveillance.svg",
      badge: "AI/ML",
    },
    {
      title: "CARVIS – AI Driver Assistant",
      description:
        "Driver safety system with drowsiness detection and traffic sign recognition.",
      tech: ["Python", "CNN", "OpenCV"],
      impact: "92% drowsiness detection • 95% sign recognition",
      github: "https://github.com/Manav1207351",
      image: "/projects/carvis.svg",
      badge: "AI/ML",
    },
    {
      title: "Smart Finance AI",
      description:
        "AI powered personal finance optimization with anomaly detection.",
      tech: ["Python", "Machine Learning", "Power BI"],
      impact: "15–25% budget optimization",
      github: "https://github.com/Manav1207351",
      image: "/projects/finance.svg",
      badge: "Data Science",
    },
    {
      title: "LLM Essay Feedback System",
      description:
        "Automated essay evaluation using LLaMA for grammar and coherence scoring.",
      tech: ["Python", "NLP", "LLaMA"],
      impact: "70% reduction in manual review",
      github: "https://github.com/Manav1207351",
      image: "/projects/essay.svg",
      badge: "NLP",
    },
  ];

  const skills = [
    "Python",
    "Java",
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "NLP",
    "LLMs",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "OpenCV",
    "SQL",
    "Power BI",
    "Tableau",
    "Flask",
    "Git",
  ];

  const certifications = [
    {
      title: "Fundamentals of Deep Learning",
      issuer: "NVIDIA",
      date: "2025",
      verifyLink: "/nvidia-deep-learning-cert.pdf",
    },
    {
      title: "Java",
      issuer: "Udemy",
      date: "2023",
      verifyLink: null,
    },
    {
      title: "Internet of Things Foundation",
      issuer: "Infosys Springboard",
      date: "2024",
      verifyLink: null,
    },
    {
      title: "Corporate Skills Internship",
      issuer: "Eminence",
      date: "2023",
      verifyLink: null,
    },
    {
      title: "Campus Recruitment Training Program",
      issuer: "Training Institute",
      date: "2025",
      verifyLink: null,
    },
    {
      title: "Power BI",
      issuer: "Infosys Springboard",
      date: "2024",
      verifyLink: null,
    },
    {
      title: "Python",
      issuer: "Infosys Springboard",
      date: "2024",
      verifyLink: null,
    },
  ];

  const research = [
    {
      title: "Human-Centric SAR Image Colorization",
      description:
        "Research focused on improving interpretability of Synthetic Aperture Radar imagery using human-centric colorization techniques for better geospatial decision making.",
      link: null,
    },
    {
      title: "CARVIS: End-to-End Deep Learning Framework for Intelligent Car Assistance",
      description:
        "An end-to-end deep learning framework for intelligent car assistance, integrating driver safety features including drowsiness detection and traffic sign recognition for enhanced road safety.",
      link: "https://ieeexplore.ieee.org/document/11400437",
    },
  ];

  /* ── Contact form state ── */
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  /* ── Typewriter role animation ── */
  const roles = [
    "AI Engineer",
    "Data Engineer",
    "ML Engineer",
    "Python Developer",
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentRole) {
      // Pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayText === "") {
      // Move to next role
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else if (isDeleting) {
      // Delete one character
      timeout = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
      }, 50);
    } else {
      // Type one character
      timeout = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, roles]);

  /* ── Active section tracking ── */
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = ["home", "education", "experience", "skills", "projects", "certifications", "research", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "education", label: "Edu", icon: GraduationCap },
    { id: "experience", label: "Intern", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "projects", label: "Projects", icon: BrainCircuit },
    { id: "certifications", label: "Awards", icon: Award },
    { id: "research", label: "Research", icon: BookOpen },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "8e82c5ff-268a-4d04-8c31-a20d23476f35",
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New Portfolio Message from ${form.name}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  /* ── Mouse glow position ── */
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  /* ── Variants ── */
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
    }),
  };

  return (
    <div className="min-h-screen bg-[#060a14] text-white overflow-x-hidden relative">
      {/* Particles background animation */}
      <ParticlesBackground />

      {/* Mouse-follow blue glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.06), transparent 60%)`,
        }}
      />

      {/* ── Navbar ── */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 px-2 py-2 rounded-full bg-[#0c1222]/90 backdrop-blur-xl border border-blue-500/10 shadow-2xl shadow-blue-900/20">
          {/* MM Brand */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-4 py-2 text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent flex-shrink-0"
          >
            MM.
          </a>

          {/* Nav Items */}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/40"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={16} />
                <span className="hidden md:inline">{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="home" className="relative min-h-screen flex items-center px-6 pt-20">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-6xl mx-auto w-full flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
          {/* Left side — Text */}
          <div className="flex-1 text-center md:text-left">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-blue-400 font-medium mb-3 text-sm tracking-widest uppercase"
            >
              Welcome to my portfolio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
            >
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
                Manav Mule
              </span>
            </motion.h1>

            {/* Typewriter role animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 h-10"
            >
              <span className="text-gray-400">I am a </span>
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {displayText}
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, ease: "linear" as const }}
                className="inline-block w-[3px] h-7 sm:h-8 md:h-9 bg-green-400 ml-1 align-middle"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-gray-400 mb-8 leading-relaxed max-w-xl text-sm md:text-base"
            >
              Passionate AI &amp; Data Science Engineer skilled in Python, Java, Machine Learning,
              Deep Learning, NLP, and Computer Vision. Experienced in building end-to-end AI
              applications, model training, real-time inference, data preprocessing, and REST API
              development. Strong communicator with hands-on project experience in LLMs, YOLO,
              CNNs, analytics dashboards, and automation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-wrap justify-center md:justify-start gap-4"
            >
              <a
                href="https://github.com/Manav1207351"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors"
              >
                <Github size={18} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/manav-mule-757758289/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
              >
                <Mail size={18} /> Contact Me
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/20"
              >
                <FileDown size={18} /> Download Resume
              </a>
            </motion.div>
          </div>

          {/* Right side — Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-400 opacity-20 blur-xl animate-pulse" />
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-blue-500/50 shadow-2xl shadow-blue-500/25">
                <Image
                  src="/profile.png"
                  alt="Manav Mule"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ── Education ── */}
      <Section id="education" className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-blue-400 font-medium text-sm tracking-widest uppercase text-center mb-2">
          MY ACADEMIC JOURNEY
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">Education</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* B.Tech */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-black/60 backdrop-blur-sm border border-blue-500/10 rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 rounded-xl bg-blue-500/10">
                <GraduationCap size={24} className="text-blue-400" />
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                Pursuing
              </span>
            </div>
            <h3 className="text-lg font-bold mb-1">B.Tech in AI & DS</h3>
            <p className="text-gray-400 text-sm mb-4">N.K. Orchid College of Engg & Tech, Solapur</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">2022 – 2026</span>
              <span className="text-cyan-400 font-mono font-bold">65%</span>
            </div>
          </motion.div>

          {/* HSC */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-black/60 backdrop-blur-sm border border-blue-500/10 rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 rounded-xl bg-blue-500/10">
                <GraduationCap size={24} className="text-blue-400" />
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Completed
              </span>
            </div>
            <h3 className="text-lg font-bold mb-1">HSC</h3>
            <p className="text-gray-400 text-sm mb-4">Walchand College of Arts & Science, Maharashtra Board</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">2020 – 2022</span>
              <span className="text-cyan-400 font-mono font-bold">62.50%</span>
            </div>
          </motion.div>

          {/* CBSE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-black/60 backdrop-blur-sm border border-blue-500/10 rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 rounded-xl bg-blue-500/10">
                <GraduationCap size={24} className="text-blue-400" />
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Completed
              </span>
            </div>
            <h3 className="text-lg font-bold mb-1">CBSE (Secondary)</h3>
            <p className="text-gray-400 text-sm mb-4">Kendriya Vidyalaya Central Railway, Solapur</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">2010 – 2020</span>
              <span className="text-cyan-400 font-mono font-bold">72.8%</span>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ── Experience / Internship ── */}
      <Section id="experience" className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeading icon={Briefcase} title="Professional Experience" subtitle="INTERNSHIP" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-black/60 backdrop-blur-md rounded-2xl border border-blue-500/20 p-8 hover:bg-black/80 transition-colors"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white">AI & Decentralized Systems Internship</h3>
              <p className="text-blue-400 font-semibold text-lg mt-1">BlockseBlock</p>
            </div>
            <span className="text-gray-400 text-sm mt-2 md:mt-1 font-mono">Aug 2025 – Oct 2025</span>
          </div>
          <ul className="space-y-4 mb-6">
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-cyan-400 mt-1 flex-shrink-0" />
              <span className="text-gray-300">Developed an NLP-powered essay evaluation system using LLaMA, reducing manual evaluation time by 60%.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-cyan-400 mt-1 flex-shrink-0" />
              <span className="text-gray-300">Created documentation and maintained GitHub repositories, improving onboarding efficiency by 25%.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-cyan-400 mt-1 flex-shrink-0" />
              <span className="text-gray-300">Contributed to Smart Finance AI, realizing a 15% increase in recommendation precision.</span>
            </li>
          </ul>
          <a
            href="https://media.licdn.com/dms/document/media/v2/D4D1FAQFo8-WPCpTKuA/feedshare-document-pdf-analyzed/B4DZmtceymJMAY-/0/1759551552656?e=1773878400&v=beta&t=zod0Tr9RdmYvr-yxMcPdfvG8rg49k3x89EozBkEpz60"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 rounded-lg text-blue-400 hover:text-blue-300 transition-all text-sm font-medium"
          >
            <Award size={16} /> View Certificate
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </Section>

      {/* ── Skills ── */}
      <Section id="skills" className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeading icon={Code2} title="Technical Arsenal" subtitle="SKILLS & TECHNOLOGIES" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ scale: 1.08, backgroundColor: "rgba(59,130,246,0.15)" }}
              className="bg-black/60 backdrop-blur-sm border border-blue-500/10 p-4 rounded-xl text-center text-sm font-medium cursor-default hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── Projects ── */}
      <Section id="projects" className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeading icon={BrainCircuit} title="Featured Projects" subtitle="CODE INTO REALITY" />
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative bg-black/60 backdrop-blur-sm border border-blue-500/10 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:bg-black/80 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
            >
              {/* Project Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badge */}
                <span className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full bg-blue-600/80 backdrop-blur-sm text-white font-medium">
                  {project.badge}
                </span>
              </div>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-green-400 text-sm mb-5 font-medium">
                  {project.impact}
                </p>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  <Github size={16} /> View on GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── Certifications ── */}
      <Section id="certifications" className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeading icon={Award} title="Certifications & Awards" subtitle="CONTINUOUS LEARNING" />
        <div className="grid sm:grid-cols-2 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              className="bg-black/60 backdrop-blur-sm border border-blue-500/10 rounded-2xl p-6 hover:border-yellow-500/40 hover:bg-black/80 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 mt-1">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{cert.title}</h3>
                  <p className="text-gray-400 text-sm">{cert.issuer}</p>
                  <p className="text-gray-500 text-xs mt-1">{cert.date}</p>
                  {cert.verifyLink && (
                    <a
                      href={cert.verifyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-yellow-400 hover:text-yellow-300 transition-colors mt-2 font-medium"
                    >
                      <CheckCircle2 size={14} /> Verify Credential
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── Coding Profiles ── */}
      <Section className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeading icon={Code2} title="Coding Profiles" subtitle="COMPETITIVE EDGE" />
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-black/60 backdrop-blur-sm border border-blue-500/10 rounded-2xl p-6 hover:border-orange-500/40 hover:bg-black/80 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10"
        >
          <h3 className="text-xl font-semibold mb-2">LeetCode</h3>
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
            Practicing Data Structures and Algorithms including arrays, trees,
            graphs, dynamic programming and problem solving.
          </p>
          <a
            href="https://leetcode.com/u/Manav_Mule/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors font-medium"
          >
            View LeetCode Profile <ExternalLink size={14} />
          </a>
        </motion.div>
      </Section>

      {/* ── Research ── */}
      <Section id="research" className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeading icon={BookOpen} title="Research & Publications" subtitle="EXPLORING THE FRONTIER" />
        <div className="grid gap-6">
          {research.map((paper, i) => (
            <motion.div
              key={paper.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-black/60 backdrop-blur-sm border border-blue-500/10 rounded-2xl p-6 hover:border-emerald-500/40 hover:bg-black/80 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              <h3 className="text-xl font-semibold mb-2">{paper.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {paper.description}
              </p>
              {paper.link && (
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  View Publication on IEEE <ExternalLink size={14} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── Contact ── */}
      <Section id="contact" className="max-w-4xl mx-auto px-6 py-24">
        <SectionHeading icon={Mail} title="Get in Touch" subtitle="LET'S BUILD SOMETHING AMAZING TOGETHER" />
        <div className="grid md:grid-cols-2 gap-8">
          {/* Resume + Info Card */}
          <div className="space-y-6">
            <div className="bg-black/60 backdrop-blur-sm border border-blue-500/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4">Let&apos;s Connect</h3>
              <p className="text-gray-400 mb-6">
                Open to AI Engineer, Machine Learning Engineer and Data Science
                opportunities. Drop me a message and I&apos;ll get back to you!
              </p>
              <div className="space-y-3 text-gray-300">
                <a href="mailto:manavmule1207@gmail.com" className="flex items-center gap-3 hover:text-blue-400 transition-colors">
                  <Mail size={18} className="text-blue-400" /> manavmule1207@gmail.com
                </a>
                <a href="tel:+919561383311" className="flex items-center gap-3 hover:text-blue-400 transition-colors">
                  <Phone size={18} className="text-blue-400" /> +91 9561383311
                </a>
                <a href="https://github.com/Manav1207351" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-blue-400 transition-colors">
                  <Github size={18} className="text-blue-400" /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/manav-mule" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-blue-400 transition-colors">
                  <Linkedin size={18} className="text-blue-400" /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-black/60 backdrop-blur-sm border border-blue-500/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300">

          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <CheckCircle2 className="mx-auto mb-4 text-green-400" size={48} />
              <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
              <p className="text-gray-400">
                Thanks for reaching out. I&apos;ll get back to you soon.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-blue-950/20 border border-blue-500/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-blue-950/20 border border-blue-500/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-4 py-3 rounded-xl bg-blue-950/20 border border-blue-500/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/10 transition-all resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-sm">
                  Failed to send. Please try again or email me directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:from-blue-700 hover:to-cyan-600 transition-all flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
          </div>
        </div>
      </Section>

      {/* ── Footer ── */}
      <footer className="border-t border-blue-500/10 py-8 mt-20 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Manav Mule. Built with Next.js &amp; Framer Motion.</p>
      </footer>
    </div>
  );
}
