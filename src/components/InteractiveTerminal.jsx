import { useState, useEffect, useRef } from 'react';
import { Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const COMMANDS = {
  whoami: {
    label: 'whoami',
    output: [
      { text: "anoop", type: "primary" },
      { text: "B.Tech Computer Science & Engineering", type: "muted" },
      { text: "Keshav Memorial Institute of Technology, Hyderabad", type: "muted" },
      { text: "Class of 2028", type: "muted" },
      { text: "", type: "break" },
      { text: "verified stack:", type: "accent" },
      { text: "  [✓] C++       STL · templates · asymptotic analysis", type: "success" },
      { text: "  [✓] Python    AI/ML · FastAPI · data structures", type: "success" },
      { text: "  [✓] Java      OOP · systems architecture", type: "success" },
      { text: "  [✓] React     modern UI · component architecture", type: "success" },
      { text: "  [✓] Node.js   REST APIs · Express · MongoDB", type: "success" },
    ]
  },
  'git log': {
    label: 'git log --oneline',
    output: [
      { text: "a9f3c21  RetailMind-AI: integrate BGE-M3 embeddings + ChromaDB retrieval", type: "success" },
      { text: "4b81e09  RetailMind-AI: architect LangGraph multi-agent query pipeline", type: "success" },
      { text: "c72ad44  MedSafe AI: FastAPI prescription NER extraction endpoints", type: "muted" },
      { text: "8f1d90e  MedSafe AI: React alert dashboard + JSON normalization", type: "muted" },
      { text: "3e6c118  Student CRUD: Mongoose schemas + Express REST endpoints", type: "muted" },
      { text: "d40f72b  DevOps: Jenkinsfile + Dockerfile + k8s deployment YAML", type: "muted" },
    ]
  },
  'ls projects': {
    label: 'ls -la ~/projects/',
    output: [
      { text: "drwx  RetailMind-AI/       [active] agentic RAG · LangGraph · BGE-M3", type: "accent" },
      { text: "drwx  MedSafe-AI/          [active] clinical NER · FastAPI · React", type: "accent" },
      { text: "drwx  Student-CRUD/        [done]   Node.js · Express · MongoDB", type: "success" },
      { text: "drwx  DevOps-Practice/     [labs]   Docker · Jenkins · Kubernetes", type: "muted" },
      { text: "", type: "break" },
      { text: "4 directories, 0 secrets committed", type: "muted" },
    ]
  },
  echo: {
    label: 'echo $AVAILABILITY',
    output: [
      { text: "Status:   Actively seeking Software Engineering & AI Internships", type: "success" },
      { text: "Type:     On-site (Hyderabad) / Remote", type: "muted" },
      { text: "Focus:    Intelligent Systems · Scalable Backends · Applied AI", type: "accent" },
      { text: "", type: "break" },
      { text: "→  Let's build something meaningful.", type: "primary" },
    ]
  }
};

const TABS = [
  { key: 'whoami',      label: '$ whoami' },
  { key: 'git log',     label: '$ git log' },
  { key: 'ls projects', label: '$ ls projects' },
  { key: 'echo',        label: '$ echo' },
];

// Simple typewriter hook
function useTypewriter(text, speed = 28, trigger = 0) {
  const [displayed, setDisplayed] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    setDisplayed('');
    let i = 0;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timerRef.current);
    }, speed);
    return () => clearInterval(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, trigger]);

  return displayed;
}

export default function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState('whoami');
  const [tabTrigger, setTabTrigger] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentCommand = COMMANDS[activeTab];
  const typedLabel = useTypewriter(currentCommand.label, 26, tabTrigger);

  const handleTabSwitch = (key) => {
    setActiveTab(key);
    setTabTrigger(t => t + 1);
  };

  const handleCopy = () => {
    const rawText = currentCommand.output.map(line => line.text).join('\n');
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto lg:max-w-none rounded-xl overflow-hidden border border-white/[0.08] bg-[#0d0e13] shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
      
      {/* ── Title Bar ── */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#13151d] border-b border-white/[0.06]">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="text-[11px] font-mono text-zinc-500 ml-3 hidden sm:inline tracking-wide">
            anoop@kmit — ~/workspace
          </span>
        </div>

        <button
          onClick={handleCopy}
          aria-label="Copy terminal output"
          className="flex items-center space-x-1.5 px-2 py-1 rounded text-[11px] font-mono text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04] transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>copy</span>
            </>
          )}
        </button>
      </div>

      {/* ── Command Tab Bar ── */}
      <div className="flex items-center gap-1 px-3 py-2 bg-[#0f1118] border-b border-white/[0.04] overflow-x-auto">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleTabSwitch(key)}
            className={`px-2.5 py-1 rounded text-[11px] font-mono whitespace-nowrap transition-all border ${
              activeTab === key
                ? 'bg-amber-500/12 text-amber-300 border-amber-500/28 font-semibold'
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03] border-transparent'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Terminal Viewport ── */}
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed min-h-[240px] select-text">
        
        {/* Prompt line with typewriter */}
        <div className="flex items-center space-x-1.5 text-zinc-500 mb-3">
          <span className="text-emerald-400 font-bold">anoop</span>
          <span className="text-zinc-600">@</span>
          <span className="text-sky-400">kmit</span>
          <span className="text-zinc-600">:</span>
          <span className="text-zinc-400">~/workspace</span>
          <span className="text-zinc-600">$</span>
          <span className="text-zinc-100 ml-1">{typedLabel}</span>
          <span
            className="inline-block w-[7px] h-[14px] bg-amber-400 ml-0.5"
            style={{ animation: 'termBlink 1s step-end infinite' }}
          />
        </div>

        {/* Output lines */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="space-y-[5px]"
          >
            {currentCommand.output.map((line, idx) => {
              if (line.type === 'break') return <div key={idx} className="h-2" />;

              const colorMap = {
                primary: 'text-white font-semibold',
                accent:  'text-amber-400',
                success: 'text-emerald-400',
                muted:   'text-zinc-400',
              };

              return (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1, delay: idx * 0.035 }}
                  className={colorMap[line.type] ?? 'text-zinc-400'}
                >
                  {line.text}
                </motion.p>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Status Bar ── */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0a0b0e] border-t border-white/[0.04] text-[10px] font-mono text-zinc-600">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          <span>KMIT, Hyderabad · Class of 2028</span>
        </div>
        <span>bash · UTF-8</span>
      </div>

    </div>
  );
}
