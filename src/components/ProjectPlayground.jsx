import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const RETAIL_PRESETS = [
  {
    title: "Gaming Laptop",
    query:
      "Budget gaming laptop under $900 with high refresh rate and good cooling thermals",
    category: "Laptops & Computing",
    constraints: {
      budget: "< $900",
      priorityAspect: "Thermals & Display",
      minRating: "4.2★",
    },
    retrievalScore: "0.914 BGE-M3 Dense Similarity",
    topProduct: "Lenovo Legion 5 (Ryzen 7, RTX 4060, 165Hz IPS)",
    aspectSentiments: [
      { aspect: "Thermals & Cooling", score: "+88%", positive: true },
      { aspect: "165Hz Screen Clarity", score: "+94%", positive: true },
      { aspect: "Fan Noise Under Load", score: "-26%", positive: false },
      { aspect: "Battery Longevity", score: "-34%", positive: false },
    ],
    rationale:
      "Dual-fan copper heat-pipe architecture verified by 1,420 Amazon reviews. Delivers consistent 1080p high-refresh gaming under the $900 threshold, outperforming competitors in thermal throttling resistance.",
  },
  {
    title: "Travel ANC Headphones",
    query:
      "Noise-canceling wireless headphones for long flights with battery > 30 hours",
    category: "Audio & Travel",
    constraints: {
      budget: "Open",
      priorityAspect: "ANC & Battery Life",
      minRating: "4.5★",
    },
    retrievalScore: "0.938 BGE-M3 Dense Similarity",
    topProduct: "Sony WH-1000XM5 (Active Noise Canceling, 32hr Battery)",
    aspectSentiments: [
      { aspect: "Airplane Cabin ANC", score: "+96%", positive: true },
      { aspect: "Comfort (Long Sessions)", score: "+91%", positive: true },
      { aspect: "Battery Endurance", score: "+93%", positive: true },
      { aspect: "Folding Portability", score: "-18%", positive: false },
    ],
    rationale:
      "Synthesized 2,800+ travel reviews. Dual-processor ANC attenuates low-frequency engine rumble by 94%. Memory state maintains user flight preference for future cross-session queries.",
  },
  {
    title: "Mechanical Keyboard",
    query:
      "Ergonomic mechanical keyboard with hot-swappable tactile switches for coding",
    category: "Peripherals & Dev",
    constraints: {
      budget: "< $150",
      priorityAspect: "Ergonomics & Switches",
      minRating: "4.4★",
    },
    retrievalScore: "0.892 BGE-M3 Dense Similarity",
    topProduct: "Keychron V1 QMK Custom Mechanical Keyboard (Brown Switches)",
    aspectSentiments: [
      { aspect: "Typing Acoustics", score: "+92%", positive: true },
      { aspect: "Hot-Swap Sockets", score: "+95%", positive: true },
      { aspect: "Keycap Ergonomics", score: "+87%", positive: true },
      { aspect: "Wireless Latency", score: "-12%", positive: false },
    ],
    rationale:
      "Pre-lubed tactile switches eliminate spring ping without requiring custom modding. Aspect analysis identifies high satisfaction among software developers typing 8+ hours daily.",
  },
];

export default function ProjectPlayground({ projectId }) {
  const [selectedRetailIndex, setSelectedRetailIndex] = useState(0);

  if (projectId === "retailmind-ai") {
    const currentRetail = RETAIL_PRESETS[selectedRetailIndex];

    return (
      <div className="p-5 sm:p-6 rounded-2xl bg-zinc-50 dark:bg-[#0c0d12] border border-amber-500/30 dark:border-amber-500/20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rotate-45 bg-amber-500 animate-pulse" />
            <span className="font-mono font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Interactive Agentic RAG Pipeline Sandbox
            </span>
          </div>
          <span className="text-[11px] font-mono text-zinc-500">
            Select intent query to inspect pipeline
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {RETAIL_PRESETS.map((preset, idx) => (
            <button
              key={preset.title}
              onClick={() => setSelectedRetailIndex(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                selectedRetailIndex === idx
                  ? "bg-amber-500 text-black font-semibold shadow-sm"
                  : "bg-white dark:bg-[#14161f] text-zinc-700 dark:text-zinc-300 border border-black/[0.06] dark:border-white/[0.06] hover:border-amber-500/40"
              }`}
            >
              {preset.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentRetail.title}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="p-4 rounded-xl bg-white dark:bg-[#12141c] border border-amber-500/30 shadow-sm space-y-3.5"
          >
            <div>
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-semibold mb-1">
                Natural Language Query Input:
              </span>
              <p className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white bg-amber-500/[0.07] p-2.5 rounded-lg border border-amber-500/20">
                "{currentRetail.query}"
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-[#14161f] border border-black/[0.06] dark:border-white/[0.04]">
                <span className="text-[10px] text-zinc-500 block">
                  PARSED CONSTRAINTS
                </span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200 block truncate">
                  Budget: {currentRetail.constraints.budget}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-[#14161f] border border-black/[0.06] dark:border-white/[0.04]">
                <span className="text-[10px] text-zinc-500 block">
                  PRIORITY ASPECT
                </span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200 block truncate">
                  {currentRetail.constraints.priorityAspect}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-[#14161f] border border-black/[0.06] dark:border-white/[0.04]">
                <span className="text-[10px] text-amber-700 dark:text-amber-400 block">
                  DENSE VECTOR MATCH
                </span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200 block truncate">
                  {currentRetail.retrievalScore}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-semibold mb-2">
                Extracted Aspect Sentiment Breakdown:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {currentRetail.aspectSentiments.map((asp) => (
                  <div
                    key={asp.aspect}
                    className="p-2 rounded-lg bg-zinc-50 dark:bg-[#14161f] border border-black/[0.06] dark:border-white/[0.04] text-[11px] font-mono"
                  >
                    <span className="text-zinc-600 dark:text-zinc-400 block truncate">
                      {asp.aspect}
                    </span>
                    <span
                      className={`font-bold block mt-0.5 ${
                        asp.positive
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-amber-700 dark:text-amber-400"
                      }`}
                    >
                      {asp.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.04] space-y-1">
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="font-bold text-amber-700 dark:text-amber-400">
                  TOP AGENT RECOMMENDATION:
                </span>
                <span className="font-semibold text-zinc-900 dark:text-white">
                  {currentRetail.topProduct}
                </span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-mono text-[11px]">
                {currentRetail.rationale}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return null;
}
