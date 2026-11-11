import { useState, useEffect, useRef } from "react";
import { Check, Copy, RotateCcw, CornerDownLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const PRESET_COMMANDS = {
  whoami: {
    label: "whoami",
    output: [
      { text: "anoop", type: "primary" },
      { text: "B.Tech Computer Science & Engineering", type: "muted" },
      {
        text: "Keshav Memorial Institute of Technology, Hyderabad",
        type: "muted",
      },
      { text: "Class of 2028 (Undergraduate)", type: "muted" },
      { text: "", type: "break" },
      { text: "skills & technical stack:", type: "accent" },
      {
        text: "  [✓] C++       STL · Data Structures & Algorithms",
        type: "success",
      },
      {
        text: "  [✓] Python    Machine Learning · FastAPI · Backend",
        type: "success",
      },
      { text: "  [✓] Java      OOP · Problem Solving", type: "success" },
      {
        text: "  [✓] React     Frontend Development · Modern UI",
        type: "success",
      },
      {
        text: "  [✓] Node.js   REST APIs · Express · MongoDB",
        type: "success",
      },
    ],
  },
  "git log": {
    label: "git log --oneline -n 6",
    output: [
      {
        text: "a9f3c21  RetailMind-AI: integrate BGE-M3 embeddings + ChromaDB retrieval",
        type: "success",
      },
      {
        text: "4b81e09  RetailMind-AI: architect LangGraph multi-agent query pipeline",
        type: "success",
      },
      {
        text: "c72ad44  MedSafe AI: FastAPI prescription NER extraction endpoints",
        type: "muted",
      },
      {
        text: "8f1d90e  MedSafe AI: React alert dashboard + JSON normalization",
        type: "muted",
      },
    ],
  },
  "ls projects": {
    label: "ls -la ~/projects/",
    output: [
      {
        text: "drwx  RetailMind-AI/       [flagship] agentic RAG · LangGraph · BGE-M3",
        type: "accent",
      },
      {
        text: "drwx  MedSafe-AI/          [healthcare] clinical NER · FastAPI · React",
        type: "accent",
      },
      { text: "", type: "break" },
      { text: "2 engineering repositories cataloged", type: "muted" },
    ],
  },
  echo: {
    label: "echo $STATUS",
    output: [
      {
        text: "Status:   Actively seeking Software Engineering & AI Internships",
        type: "success",
      },
      { text: "Location: Hyderabad, India (On-site / Remote)", type: "muted" },
      {
        text: "Focus:    Intelligent Systems · Scalable Backends · Applied AI",
        type: "accent",
      },
      { text: "", type: "break" },
      {
        text: "→ Let's build something thoughtful and resilient.",
        type: "primary",
      },
    ],
  },
};

const TABS = [
  { key: "whoami", label: "$ whoami" },
  { key: "git log", label: "$ git log" },
  { key: "ls projects", label: "$ ls projects" },
  { key: "echo", label: "$ echo $STATUS" },
];

function useTypewriter(text, speed = 24, trigger = 0) {
  const [displayed, setDisplayed] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    let i = 0;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timerRef.current);
    }, speed);
    return () => clearInterval(timerRef.current);
  }, [text, trigger, speed]);

  return displayed;
}

export default function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState("whoami");
  const [tabTrigger, setTabTrigger] = useState(0);
  const [copied, setCopied] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [customHistory, setCustomHistory] = useState([]);

  const currentPreset = PRESET_COMMANDS[activeTab];
  const typedLabel = useTypewriter(
    currentPreset ? currentPreset.label : activeTab,
    24,
    tabTrigger,
  );

  const handleTabSwitch = (key) => {
    setActiveTab(key);
    setCustomHistory([]);
    setTabTrigger((t) => t + 1);
  };

  const handleReplay = () => {
    setCustomHistory([]);
    setTabTrigger((t) => t + 1);
  };

  const handleCopy = () => {
    const lines =
      customHistory.length > 0
        ? customHistory.map((l) => l.text).join("\n")
        : currentPreset.output.map((line) => line.text).join("\n");
    navigator.clipboard.writeText(lines);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = userInput.trim().toLowerCase();
    if (!cmd) return;

    setUserInput("");
    if (cmd === "clear") {
      setCustomHistory([]);
      return;
    }

    if (cmd === "help") {
      setCustomHistory([
        { text: "Available commands:", type: "accent" },
        {
          text: "  whoami      - Developer profile & verified stack",
          type: "success",
        },
        { text: "  git log     - Recent engineering commits", type: "muted" },
        {
          text: "  projects    - List active software projects",
          type: "success",
        },
        {
          text: "  skills      - Show core technical proficiencies",
          type: "accent",
        },
        { text: "  contact     - Reach out to Anoop directly", type: "muted" },
        { text: "  clear       - Clear terminal output", type: "muted" },
      ]);
      return;
    }

    if (cmd === "whoami") {
      handleTabSwitch("whoami");
      return;
    }

    if (cmd === "git log" || cmd === "git") {
      handleTabSwitch("git log");
      return;
    }

    if (cmd === "projects" || cmd === "ls" || cmd === "ls projects") {
      handleTabSwitch("ls projects");
      return;
    }

    if (cmd === "skills") {
      setCustomHistory([
        {
          text: "Core Languages: C++, Python, Java, JavaScript",
          type: "primary",
        },
        {
          text: "AI & ML:        RAG, BGE-M3, ChromaDB, LangGraph, NLP",
          type: "accent",
        },
        {
          text: "Web & Backend:  React.js, Node.js, Express, FastAPI, REST",
          type: "success",
        },
        {
          text: "Storage:        MongoDB, SQL, FAISS Vector Store",
          type: "muted",
        },
      ]);
      return;
    }

    if (cmd === "contact") {
      setCustomHistory([
        { text: "Get in touch with Anoop:", type: "accent" },
        {
          text: "  Institution:  KMIT, Hyderabad (Class of 2028)",
          type: "muted",
        },
        {
          text: "  Focus:        Software Engineering & AI Internships",
          type: "success",
        },
        {
          text: "  Action:       Scroll to #contact or click 'GET IN TOUCH' above",
          type: "primary",
        },
      ]);
      return;
    }

    setCustomHistory([
      { text: `bash: command not found: ${cmd}`, type: "muted" },
      {
        text: `Type 'help' for a list of supported terminal commands.`,
        type: "accent",
      },
    ]);
  };

  const displayedOutput =
    customHistory.length > 0
      ? customHistory
      : currentPreset
        ? currentPreset.output
        : [];

  return (
    <div className="w-full max-w-xl mx-auto lg:max-w-none rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0d0e13] shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)] transition-all duration-300 hover:shadow-2xl hover:border-amber-500/40">
      
      <div className="flex items-center justify-between px-5 py-3 bg-zinc-100/90 dark:bg-[#13151d] border-b border-black/[0.06] dark:border-white/[0.06]">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="text-[11px] font-mono text-zinc-600 dark:text-zinc-500 ml-3 hidden sm:inline tracking-wide font-medium">
            anoop@kmit — ~/workspace
          </span>
        </div>

        <div className="flex items-center space-x-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleReplay}
            aria-label="Replay command"
            title="Replay command"
            className="p-1.5 rounded-full text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleCopy}
            aria-label="Copy terminal output"
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400">
                  copied
                </span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>copy</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-50 dark:bg-[#0f1118] border-b border-black/[0.06] dark:border-white/[0.04] overflow-x-auto">
        {TABS.map(({ key, label }) => (
          <motion.button
            key={key}
            whileHover={{ y: -1.5, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleTabSwitch(key)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-mono whitespace-nowrap transition-all border cursor-pointer flex items-center gap-1.5 ${
              activeTab === key && customHistory.length === 0
                ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/40 font-semibold shadow-md"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60 dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-white/[0.03] border-transparent hover:border-black/[0.06] dark:hover:border-white/[0.06]"
            }`}
          >
            {activeTab === key && customHistory.length === 0 && (
              <span className="w-1.5 h-1.5 rotate-45 bg-amber-500 shrink-0" />
            )}
            <span>{label}</span>
          </motion.button>
        ))}
      </div>

      <div className="p-5 sm:p-6 font-mono text-xs sm:text-[13px] leading-relaxed min-h-[240px] select-text">
        
        <div className="flex items-center space-x-1.5 text-zinc-500 dark:text-zinc-400 mb-3 flex-wrap">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
            anoop
          </span>
          <span className="text-zinc-400 dark:text-zinc-600">@</span>
          <span className="text-sky-600 dark:text-sky-400 font-medium">
            kmit
          </span>
          <span className="text-zinc-400 dark:text-zinc-600">:</span>
          <span className="text-zinc-600 dark:text-zinc-400">~/workspace</span>
          <span className="text-zinc-400 dark:text-zinc-600">$</span>
          <span className="text-zinc-900 dark:text-zinc-100 ml-1 font-semibold">
            {typedLabel}
          </span>
          <motion.span
            className="inline-block w-[7px] h-[14px] bg-amber-500 ml-0.5"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${tabTrigger}-${customHistory.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="space-y-[5px]"
          >
            {displayedOutput.map((line, idx) => {
              if (line.type === "break")
                return <div key={idx} className="h-2" />;

              const colorMap = {
                primary: "text-zinc-900 dark:text-white font-semibold",
                accent: "text-amber-700 dark:text-amber-400 font-semibold",
                success: "text-emerald-700 dark:text-emerald-400",
                muted: "text-zinc-600 dark:text-zinc-400",
              };

              return (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.22,
                    delay: 0.08 + idx * 0.04,
                    ease: "easeOut",
                  }}
                  className={
                    colorMap[line.type] ?? "text-zinc-600 dark:text-zinc-400"
                  }
                >
                  {line.text}
                </motion.p>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <form
          onSubmit={handleCommandSubmit}
          className="mt-4 pt-3 border-t border-black/[0.05] dark:border-white/[0.05] flex items-center gap-2"
        >
          <div className="flex items-center space-x-1 text-xs text-amber-600 dark:text-amber-400 font-semibold shrink-0">
            <span>&gt;</span>
          </div>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type 'help', 'skills', 'projects', or 'clear'..."
            className="w-full bg-transparent text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none font-mono"
            aria-label="Interactive terminal input"
          />
          <button
            type="submit"
            aria-label="Run command"
            className="p-1 rounded text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors shrink-0"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      <div className="flex items-center justify-between px-4 py-2 bg-zinc-100 dark:bg-[#0a0b0e] border-t border-black/[0.06] dark:border-white/[0.04] text-[10px] font-mono text-zinc-600 dark:text-zinc-500">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <span>KMIT, Hyderabad · Class of 2028</span>
        </div>
        <span>interactive shell · UTF-8</span>
      </div>
    </div>
  );
}
