import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, DollarSign, Clock, X, ChevronLeft, ChevronRight } from "lucide-react";
import { createPortal } from "react-dom";

const categories = ["All", "Zapier", "Make", "n8n", "GoHighLevel", "Landing Page"] as const;
type Category = (typeof categories)[number];

interface Project {
  title: string;
  desc: string;
  category: Category;
  tag?: string;
  image?: string;
  results?: string[];
  savings?: { money: string; time: string };
  techStack?: string[];
}

const projects: Project[] = [
  {
    title: "Asana CRM Lead Workflow",
    desc: "Automated CRM workflow that manages the entire lead lifecycle inside Asana—from lead intake to deal closure. The system tracks pipeline stages, triggers automated email follow-ups, and uses AI to personalize client communication based on the lead status.",
    category: "Zapier",
    tag: "CRM AUTOMATION • Asana / Zapier",
    image: "/images/portfolio/asana-crm-workflow.png",
    results: [
      "Automated lead pipeline tracking in Asana",
      "Smart follow-up sequences for unresponsive leads",
      "AI-generated personalized client emails",
      "Fully automated status-based workflow routing",
    ],
    savings: { money: "$2,000+/mo saved", time: "35 hrs/mo saved" },
    techStack: ["Asana", "Zapier", "Gmail", "Google Drive", "AI (Zapier AI)"],
  },
  {
    title: "AI Content Repurposing",
    desc: "Automated content repurposing system that converts long-form video or audio content into written blog posts and multiple social media posts, then automatically distributes them across platforms using AI and workflow automation.",
    category: "Zapier",
    tag: "CONTENT AUTOMATION • Zapier",
    image: "/images/portfolio/ai-content-repurposing.png",
    results: [
      "AI-generated transcription from uploaded media files",
      "Automatically converts content into blog posts and social media snippets",
      "Multi-platform publishing to Facebook and LinkedIn",
      "Reduced manual content repurposing time by 90%",
    ],
    savings: { money: "$1,500/mo saved", time: "30 hrs/mo saved" },
    techStack: ["Zapier", "OpenAI", "Google Drive", "Facebook Pages", "LinkedIn"],
  },
  {
    title: "Xero to Asana Transaction Export",
    desc: "Automated financial workflow that captures completed tasks from Asana, processes related transactions in Xero, structures the data in Google Sheets, and automatically attaches organized financial records back to Asana for reporting and tracking.",
    category: "Make",
    tag: "FINANCE AUTOMATION • Make (Integromat)",
    image: "/images/portfolio/xero-asana-transaction.png",
    results: [
      "Automatically syncs completed Asana tasks with Xero transactions",
      "Structures financial data into organized Google Sheets reports",
      "Generates and uploads transaction summaries back to Asana",
      "Eliminates manual finance reporting and reconciliation workflows",
    ],
    savings: { money: "$1,200/mo saved", time: "25 hrs/mo saved" },
    techStack: ["Make (Integromat)", "Asana", "Xero", "Google Sheets"],
  },
  {
    title: "AI Email Attachment Organizer",
    desc: "Automated email processing system that detects incoming Gmail attachments, analyzes and renames files using AI, stores them in Google Drive, logs activity in Google Sheets, and sends automated notifications.",
    category: "Make",
    tag: "EMAIL AUTOMATION • Make (Integromat)",
    image: "/images/portfolio/ai-email-attachment.png",
    results: [
      "Automatically detects and extracts Gmail attachments",
      "AI-powered file naming and document organization",
      "Secure storage of files in Google Drive",
      "Real-time logging and email notifications for processed files",
    ],
    savings: { money: "$900/mo saved", time: "20 hrs/mo saved" },
    techStack: ["Make (Integromat)", "Gmail", "Google Drive", "Google Sheets", "AI Processing"],
  },
  {
    title: "AI HubSpot Contact Enrichment System",
    desc: "AI-powered HubSpot contact enrichment workflow that automatically researches companies, scrapes website and LinkedIn data, analyzes business information with AI, updates HubSpot CRM properties, and notifies the sales team—eliminating manual research and improving lead quality.",
    category: "n8n",
    tag: "AI CRM AUTOMATION • N8N",
    image: "/images/portfolio/ai-hubspot-enrichment.png",
    results: [
      "Automatically enriches every new HubSpot contact",
      "Scrapes company websites and LinkedIn company profiles",
      "AI extracts industry, company summary, products, and services",
      "Updates HubSpot CRM with structured enrichment data",
      "Sends real-time Slack notifications to the sales team",
    ],
    savings: { money: "95% less manual research", time: "8–12 min/contact saved" },
    techStack: ["n8n", "OpenAI", "HubSpot", "HTTP Request", "LinkedIn", "Google Sheets", "Slack", "JavaScript"],
  },
  {
    title: "AI Resume Screening & Candidate Ranking System",
    desc: "An AI-powered recruitment workflow that automatically screens resumes, analyzes candidate qualifications against job requirements, ranks applicants based on AI scoring, and notifies hiring teams with the best-fit candidates—reducing manual screening and accelerating recruitment.",
    category: "n8n",
    tag: "AI HR AUTOMATION • N8N",
    image: "/images/portfolio/ai-resume-screening.png",
    results: [
      "Automatically receives and processes new job applications",
      "Extracts resume data from uploaded PDF files",
      "AI compares candidate qualifications with job descriptions",
      "Scores and ranks applicants based on skills and experience",
      "Recommends interview, talent pool, or rejection decisions",
      "Sends hiring notifications and logs screening results automatically",
    ],
    savings: { money: "90% less manual resume screening", time: "30+ hrs/month saved" },
    techStack: ["n8n", "OpenAI", "Google Drive", "Gmail", "Google Sheets", "Webhook", "PDF Parser", "HTTP Request", "JavaScript"],
  },
  {
    title: "AI Facebook Support Agent",
    desc: "Automated AI support agent that processes incoming webhook requests from Facebook, retrieves knowledge documents, generates intelligent responses using an AI model, and returns automated replies through API integration.",
    category: "n8n",
    tag: "AI AGENT AUTOMATION • n8n",
    image: "/images/portfolio/ai-facebook-agent.png",
    results: [
      "AI-powered automated responses for Facebook inquiries",
      "Knowledge-based responses using document retrieval",
      "Context-aware conversations with AI memory",
      "Reduced manual customer support workload by 80%",
    ],
    savings: { money: "$1,300/mo saved", time: "28 hrs/mo saved" },
    techStack: ["n8n", "OpenRouter", "AI Agent", "Webhooks", "HTTP API"],
  },
  {
    title: "AI Job Scraper & Resume Optimizer",
    desc: "Automated AI-powered job search assistant that monitors Slack job channels, analyzes job listings, retrieves resume data, generates tailored resumes using AI, and automatically sends optimized applications via email.",
    category: "n8n",
    tag: "AI JOB AUTOMATION • n8n",
    image: "/images/portfolio/ai-job-scraper.png",
    results: [
      "Automatically monitors job postings from Slack channels",
      "AI analyzes job requirements and extracts key qualifications",
      "Generates tailored resumes using AI based on job descriptions",
      "Automatically prepares and sends optimized job applications",
    ],
    savings: { money: "$1,700/mo saved", time: "40 hrs/mo saved" },
    techStack: ["n8n", "OpenAI", "Slack", "Google Drive", "Gmail"],
  },
  {
    title: "RAG AI Knowledge Base Agent",
    desc: "AI-powered Retrieval-Augmented Generation (RAG) system that automatically ingests documents from cloud storage, converts them into vector embeddings, and enables intelligent AI responses through semantic search. The workflow syncs files from Google Drive and updates the vector database in real time to ensure the AI agent always uses the latest knowledge.",
    category: "n8n",
    tag: "AI & KNOWLEDGE BASE • n8n",
    image: "/images/portfolio/rag-knowledge-base.png",
    results: [
      "Intelligent document-aware responses",
      "Automatic knowledge base synchronization",
      "Semantic vector search for accurate retrieval",
      "Real-time document updates from cloud storage",
    ],
    savings: { money: "$2,500/mo saved", time: "35 hrs/mo saved" },
    techStack: ["n8n", "OpenRouter", "Google Drive", "Supabase Vector Store", "Google Vertex AI"],
  },
  {
    title: "AI ASMR Video Creator",
    desc: "Automated AI-powered system that generates relaxing ASMR-style videos by creating scripts, producing visuals and audio through AI tools, and automatically rendering and publishing ready-to-watch content for social media platforms.",
    category: "n8n",
    tag: "CONTENT AUTOMATION • n8n",
    image: "/images/portfolio/ai-asmr-video.png",
    results: [
      "AI-generated ASMR scripts and sound concepts",
      "Automated video and audio generation",
      "Consistent production of relaxing short-form content",
      "Ready-to-publish videos optimized for social media",
    ],
    savings: { money: "$1,400/mo saved", time: "32 hrs/mo saved" },
    techStack: ["n8n", "OpenRouter", "AI Video API", "YouTube API"],
  },
  {
    title: "AI Receptionist",
    desc: "Automated AI receptionist system that answers customer inquiries, manages appointment scheduling, and handles booking, rescheduling, and cancellations through voice or chat interactions integrated with Vapi, Google Calendar, and Airtable.",
    category: "n8n",
    tag: "VOICE AI & SCHEDULING • n8n",
    image: "/images/portfolio/ai-receptionist.png",
    results: [
      "24/7 AI-powered call and chat handling",
      "Smart calendar availability detection",
      "Automated booking, rescheduling, and cancellations",
      "Instant appointment confirmations",
    ],
    savings: { money: "$2,500/mo saved", time: "40 hrs/mo saved" },
    techStack: ["n8n", "Vapi", "Google Calendar", "Airtable"],
  },
  {
    title: "AI Lead Qualification & Client Notification System (Real Estate)",
    desc: "Automated lead qualification pipeline that captures leads via webhook, extracts lead information, and uses an AI agent with OpenRouter to analyze and score prospects. High-value leads are automatically added to the CRM, notified to the sales team, and emailed instantly, while low-value leads are enrolled in an automated email nurturing sequence.",
    category: "n8n",
    tag: "AI LEAD QUALIFICATION • n8n",
    image: "/images/portfolio/ai-lead-qualification.png",
    results: [
      "Automated lead scoring using AI",
      "CRM contact creation and lead storage",
      "Instant Telegram notifications for high-value leads",
      "Automated email nurturing for low-value leads",
    ],
    savings: { money: "$3,000/mo saved", time: "40 hrs/mo saved" },
    techStack: ["n8n", "Webhook", "AI Agent", "OpenRouter", "Google Sheets CRM", "Gmail", "Telegram"],
  },
  {
    title: "Appointment Booking & Lead Qualification System (Dental Clinic)",
    desc: "Automated appointment management workflow built in n8n that processes patient requests submitted through Jotform. The system automatically handles booking, cancellation, and rescheduling, checks availability in Google Calendar, and records patient appointments in Google Sheets CRM. It prevents double bookings, updates appointment statuses, and sends automatic email confirmations to patients. This workflow helps dental clinics reduce manual scheduling work and ensures all appointment requests are processed instantly and accurately.",
    category: "n8n",
    tag: "APPOINTMENT AUTOMATION • n8n",
    image: "/images/portfolio/appointment-booking-dental.png",
    results: [
      "Prevents double bookings automatically",
      "Handles BOOK / CANCEL / RESCHEDULE requests",
      "Automatically creates and updates Google Calendar events",
      "Maintains a Google Sheets appointment database",
      "Sends automatic Gmail confirmations to patients",
      "Ensures appointment records stay updated",
    ],
    savings: { money: "$1,500+/mo saved", time: "30 hrs/mo saved" },
    techStack: ["n8n", "Jotform Webhook", "Google Calendar", "Google Sheets", "Gmail"],
  },
  {
    title: "AI Social Media Automation – Facebook & Instagram Poster",
    desc: "An automated content publishing system that pulls content from a database, enhances it using AI, and publishes posts to Facebook and Instagram — completely hands-free. Smart filtering prevents duplicate posts, while AI-generated captions boost engagement. The system handles the full workflow from content selection to multi-platform publishing with real-time status tracking.",
    category: "n8n",
    tag: "SOCIAL MEDIA AUTOMATION • n8n",
    image: "/images/portfolio/ai-social-media-automation.jpg",
    results: [
      "Fully automated posting — no manual work needed",
      "AI-generated captions for better engagement",
      "Multi-platform publishing (Facebook + Instagram)",
      "Smart filtering to avoid duplicate posts",
      "Auto status tracking in database",
      "Consistent daily posting with zero missed schedules",
      "Reduced operational costs while increasing content output",
    ],
    savings: { money: "$2,000+/mo saved", time: "25 hrs/mo saved" },
    techStack: ["n8n", "Google Sheets", "OpenRouter / AI Model", "Facebook Graph API", "Instagram Graph API", "Imgur API"],
  },
  {
    title: "DRIPTEA Milk Tea Website",
    desc: "Modern responsive website designed for a milk tea brand, featuring a visually engaging landing page, interactive menu section, and optimized user experience to showcase products and drive customer orders.",
    category: "Landing Page",
    tag: "WEB DEVELOPMENT • Antigravity",
    image: "/images/portfolio/driptea-website.png",
    results: [
      "Modern and responsive landing page design",
      "Interactive menu browsing for customers",
      "Optimized layout for mobile and desktop devices",
      "Improved brand presence and online visibility",
    ],
    savings: { money: "$1,000/mo saved", time: "20 hrs/mo saved" },
    techStack: ["Antigravity", "Responsive UI/UX", "Website Builder", "Modern Landing Page Design"],
  },
  {
    title: "Curbside Café Website",
    desc: "Modern café website built using Lovable, designed to showcase handcrafted coffee, highlight the brand identity, and provide a smooth customer experience with easy menu browsing and online ordering.",
    category: "Landing Page",
    tag: "WEB DEVELOPMENT • LOVABLE",
    image: "/images/portfolio/curbside-cafe-website.png",
    results: [
      "Modern landing page design tailored for a café brand",
      "Clear call-to-action for ordering and customer engagement",
      "Fully responsive layout for mobile and desktop users",
      "Improved online presence and customer accessibility",
    ],
    savings: { money: "$900/mo saved", time: "18 hrs/mo saved" },
    techStack: ["Lovable", "Responsive UI/UX", "Landing Page Design", "Website Builder"],
  },
];

const DetailedCard = ({ p, i, compact = false }: { p: Project; i: number; compact?: boolean }) => {
  const [imageOpen, setImageOpen] = useState(false);

  if (compact) {
    return (
      <>
        <motion.div
          key={p.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="bg-card/60 border border-border/50 rounded-xl hover:border-primary/40 hover:shadow-[0_0_30px_-8px_rgba(0,255,138,0.25)] group overflow-hidden cursor-pointer flex flex-col transition-all duration-300"
        >
          <div
            className="relative h-52 bg-secondary overflow-hidden cursor-zoom-in"
            onClick={(e) => { e.stopPropagation(); setImageOpen(true); }}
          >
            <img src={p.image} alt={p.title} decoding="sync" loading="eager" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
            <div className="absolute top-3 left-3">
              <span className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-primary border border-primary/30">{p.tag}</span>
            </div>
          </div>
          <div className="p-5 flex flex-col flex-1">
            <h3 className="font-heading text-base font-bold mb-2 text-foreground">{p.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{p.desc}</p>
            {p.savings && (
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="flex items-center gap-1.5 text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full border border-primary/20">
                  <DollarSign size={11} /> {p.savings.money}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold bg-secondary px-2.5 py-1 rounded-full border border-border/40 text-foreground/80">
                  <Clock size={11} className="text-primary" /> {p.savings.time}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {imageOpen && createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setImageOpen(false)}>
            <div className="absolute inset-0 bg-black/90" />
            <div className="relative z-10 max-w-[95vw] max-h-[95vh] w-full bg-background border border-border rounded-lg overflow-hidden shadow-[0_0_40px_-5px_rgba(0,255,138,0.3)]" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                <h3 className="font-heading text-base font-semibold">{p.title}</h3>
                <button onClick={() => setImageOpen(false)} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"><X className="h-5 w-5" /></button>
              </div>
              <div className="overflow-auto max-h-[calc(95vh-52px)] p-3 will-change-contents">
                <img src={p.image} alt={p.title} decoding="sync" loading="eager" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </div>,
          document.body
        )}
      </>
    );
  }

  return (
    <>
      <motion.div
        key={p.title}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: i * 0.08 }}
        className="bg-card/60 border border-border/50 rounded-xl hover:border-primary/40 hover:shadow-[0_0_40px_-10px_rgba(0,255,138,0.3)] group overflow-hidden cursor-pointer col-span-1 sm:col-span-2 lg:col-span-3 transition-all duration-300"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[420px]">
          {/* Image */}
          <div
            className="relative h-64 lg:h-full bg-secondary overflow-hidden cursor-zoom-in"
            onClick={(e) => { e.stopPropagation(); setImageOpen(true); }}
          >
            <img
              src={p.image}
              alt={p.title}
              decoding="sync"
              loading="eager"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500" />
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs text-white/80 bg-black/60 backdrop-blur-sm px-2 py-1 rounded">Click to enlarge</span>
            </div>
          </div>
          {/* Content */}
          <div className="p-7 md:p-9 flex flex-col justify-center">
            <span className="text-xs text-primary font-semibold tracking-widest uppercase mb-2">{p.tag}</span>
            <h3 className="font-heading text-xl font-bold mb-3 text-foreground">{p.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">{p.desc}</p>

            {p.results && (
              <div className="mb-5">
                <h4 className="text-sm font-bold mb-3 text-foreground">Key Results</h4>
                <ul className="space-y-2">
                  {p.results.map((r) => (
                    <li key={r} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="text-primary mt-0.5 shrink-0">✔</span> {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {p.savings && (
              <div className="flex flex-wrap gap-3 mb-5">
                <span className="flex items-center gap-1.5 text-sm font-semibold bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/25">
                  <DollarSign size={13} /> {p.savings.money}
                </span>
                <span className="flex items-center gap-1.5 text-sm font-medium bg-secondary px-3 py-1.5 rounded-full border border-border/50 text-foreground/85">
                  <Clock size={13} className="text-primary" /> {p.savings.time}
                </span>
              </div>
            )}

            {p.techStack && (
              <div>
                <h4 className="text-sm font-bold mb-2.5 text-foreground">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {p.techStack.map((t) => (
                    <span key={t} className="text-xs bg-secondary text-muted-foreground px-3 py-1 rounded-full border border-border/50 hover:border-primary/30 hover:text-foreground transition-colors duration-200">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

  {imageOpen && createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setImageOpen(false)}>
      <div className="absolute inset-0 bg-black/90" />
      <div
        className="relative z-10 max-w-[95vw] max-h-[95vh] w-full bg-background border border-border rounded-lg overflow-hidden shadow-[0_0_40px_-5px_rgba(0,255,138,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <h3 className="font-heading text-base font-semibold">{p.title}</h3>
          <button
            onClick={() => setImageOpen(false)}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-auto max-h-[calc(95vh-52px)] p-3 will-change-contents">
          <img
            src={p.image}
            alt={p.title}
            decoding="sync"
            loading="eager"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>,
    document.body
  )}
</>
);
};

const SimpleCard = ({ p, i }: { p: Project; i: number }) => (
  <motion.div
    key={p.title}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: i * 0.08 }}
    className="glass-card hover-blink group overflow-hidden cursor-pointer"
  >
    <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <ExternalLink className="text-primary/40" size={24} />
        </div>
      </div>
      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-primary font-medium text-sm flex items-center gap-2">
          View Project <ExternalLink size={16} />
        </span>
      </div>
    </div>
    <div className="p-6">
      <span className="text-xs text-primary font-medium mb-2 inline-block">{p.category}</span>
      <h3 className="font-heading text-base font-semibold mb-2">{p.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
    </div>
  </motion.div>
);

const ITEMS_PER_PAGE_ALL = 4;
const ITEMS_PER_PAGE_OTHER = 2;

const Portfolio = () => {
  const [active, setActive] = useState<Category>("All");
  const [page, setPage] = useState(0);

  // Preload all portfolio images on mount
  useEffect(() => {
    projects.forEach((p) => {
      if (p.image) {
        const img = new Image();
        img.src = p.image;
      }
    });
  }, []);

  const isAll = active === "All";
  const itemsPerPage = isAll ? ITEMS_PER_PAGE_ALL : ITEMS_PER_PAGE_OTHER;
  const allFiltered = isAll ? projects : projects.filter((p) => p.category === active);
  const totalPages = Math.ceil(allFiltered.length / itemsPerPage);
  const filtered = allFiltered.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  // Reset page when tab changes
  useEffect(() => { setPage(0); }, [active]);

  return (
    <section id="portfolio" className="section-padding bg-secondary/30 relative overflow-hidden">
      {/* Network line pattern background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="network-grid" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="0" cy="0" r="1.5" fill="#00FF8A" />
            <circle cx="120" cy="0" r="1.5" fill="#00FF8A" />
            <circle cx="0" cy="120" r="1.5" fill="#00FF8A" />
            <circle cx="120" cy="120" r="1.5" fill="#00FF8A" />
            <circle cx="60" cy="60" r="1.5" fill="#00FF8A" />
            <line x1="0" y1="0" x2="60" y2="60" stroke="#00FF8A" strokeWidth="0.5" />
            <line x1="120" y1="0" x2="60" y2="60" stroke="#00FF8A" strokeWidth="0.5" />
            <line x1="0" y1="120" x2="60" y2="60" stroke="#00FF8A" strokeWidth="0.5" />
            <line x1="120" y1="120" x2="60" y2="60" stroke="#00FF8A" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="120" y2="0" stroke="#00FF8A" strokeWidth="0.3" />
            <line x1="0" y1="0" x2="0" y2="120" stroke="#00FF8A" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#network-grid)" />
      </svg>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Portfolio</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3 text-foreground">Previous Works</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base">AI-powered workflows and integrations designed to connect tools, automate processes, and improve productivity.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                active === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary/60 text-muted-foreground border-border/30 hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${active}-${page}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={isAll ? "grid grid-cols-1 sm:grid-cols-2 gap-6" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"}
          >
            {filtered.map((p, i) =>
              p.image ? <DetailedCard key={p.title} p={p} i={i} compact={isAll} /> : null
            )}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center border border-border/30 hover:border-primary/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === page ? "bg-primary scale-125" : "bg-muted-foreground/40 hover:bg-muted-foreground/70"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center border border-border/30 hover:border-primary/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
