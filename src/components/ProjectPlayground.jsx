import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Lock,
} from "lucide-react";

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

const FORENSIC_PRESETS = [
  {
    caseId: "CASE-2026-089A",
    title: "Ransomware C2 Exfiltration",
    targetDomain: "Enterprise Domain Controller & S3 Buckets",
    risk: "CRITICAL SEVERITY",
    riskColor: "text-red-700 bg-red-500/10 border-red-500/30 dark:text-red-400",
    evidenceFiles: [
      { name: "auth_secure.log", type: "LOG", size: "14.2 MB", sha256: "9f83a1b...e421c" },
      { name: "powershell_audit.json", type: "JSON", size: "3.8 MB", sha256: "c14d89e...588fa" },
      { name: "pcap_traffic.csv", type: "CSV", size: "112.4 MB", sha256: "a77e092...1309d" },
      { name: "sysmon_events.evtx", type: "EVTX", size: "45.1 MB", sha256: "4b91f08...677e2" },
    ],
    timeline: [
      { time: "03:14:22 UTC", event: "Brute-force SSH ingress from external IP 198.51.100.44", tag: "Initial Ingress" },
      { time: "03:22:05 UTC", event: "Base64 encoded PowerShell script invoking memory injection", tag: "Privilege Escalation" },
      { time: "03:28:40 UTC", event: "Encrypted TLS outbound burst (1.4 GB) to foreign C2 endpoint", tag: "Data Exfiltration" },
      { time: "03:31:15 UTC", event: "VSS shadow copy deletion command intercepted and logged", tag: "Defense Evasion" },
    ],
    correlationFinding:
      "Cross-source correlation between SSH ingress logs and Sysmon Event ID 1 confirms patient-zero compromise via leaked credentials, followed by lateral exfiltration.",
    reportConclusion:
      "Forensic artifacts demonstrate 100% hash integrity matching original disk captures. Case report classified as high-priority APT staging. Emergency firewall containment and token revocation recommended for immediate court submission.",
  },
  {
    caseId: "CASE-2026-104B",
    title: "Insider Database Tampering",
    targetDomain: "Financial Transactions Vault",
    risk: "HIGH SEVERITY",
    riskColor: "text-amber-700 bg-amber-500/10 border-amber-500/30 dark:text-amber-400",
    evidenceFiles: [
      { name: "db_audit_trail.json", type: "JSON", size: "8.6 MB", sha256: "7e2a441...951bf" },
      { name: "vpn_gateway.log", type: "LOG", size: "22.4 MB", sha256: "3d098e2...4c55a" },
      { name: "wire_records.csv", type: "CSV", size: "1.9 MB", sha256: "f811b09...102be" },
    ],
    timeline: [
      { time: "23:45:10 UTC", event: "Off-hours VPN tunnel session matching workstation WS-0914", tag: "Anomalous Timing" },
      { time: "23:51:30 UTC", event: "Direct SQL mutation altering ledger permissions to superadmin", tag: "Privilege Escalation" },
      { time: "00:04:12 UTC", event: "Automated script attempting to truncate transaction logs", tag: "Log Tampering" },
      { time: "00:06:50 UTC", event: "Immutable audit monitor captures and isolates session token", tag: "Forensic Safeguard" },
    ],
    correlationFinding:
      "Correlation of VPN gateway MAC address with Active Directory employee records maps database tampering attempts directly to an internal employee workstation.",
    reportConclusion:
      "Evidence chain of custody verified without alteration. Automated report isolates specific altered SQL transactions, allowing forensic restoration with zero data loss.",
  },
  {
    caseId: "CASE-2026-118C",
    title: "Spear-Phishing & Subnet Sweep",
    targetDomain: "Executive Mailboxes & Corporate Laptops",
    risk: "MODERATE / CONTAINED",
    riskColor: "text-sky-700 bg-sky-500/10 border-sky-500/30 dark:text-sky-400",
    evidenceFiles: [
      { name: "invoice_payload.pdf", type: "PDF", size: "640 KB", sha256: "1a45778...289dc" },
      { name: "edr_telemetry.json", type: "JSON", size: "18.3 MB", sha256: "5c8b901...390e3" },
      { name: "smb_traffic.log", type: "LOG", size: "34.0 MB", sha256: "2d174e9...844fa" },
    ],
    timeline: [
      { time: "09:12:00 UTC", event: "Spoofed executive email delivering weaponized PDF invoice", tag: "Initial Access" },
      { time: "09:15:45 UTC", event: "PDF Reader spawns hidden rundll32.exe child process", tag: "Process Injection" },
      { time: "09:24:10 UTC", event: "Port 445 SMB sweep probing adjacent engineering subnets", tag: "Lateral Discovery" },
      { time: "09:25:02 UTC", event: "EDR endpoint isolation rule triggered automatically", tag: "Host Isolation" },
    ],
    correlationFinding:
      "Malware signature maps to MITRE ATT&CK T1566.001 (Spear-phishing Attachment). Lateral movement halted at engineering subnet gateway.",
    reportConclusion:
      "Forensic analysis confirms zero data exfiltration occurred prior to host containment. Court-ready report compiles full IOC hash list for enterprise-wide threat mitigation.",
  },
];

export default function ProjectPlayground({ projectId }) {
  const [selectedRetailIndex, setSelectedRetailIndex] = useState(0);
  const [selectedForensicIndex, setSelectedForensicIndex] = useState(0);

  if (projectId === "retailmind-ai") {
    const currentRetail = RETAIL_PRESETS[selectedRetailIndex];

    return (
      <div className="p-5 sm:p-6 rounded-2xl bg-zinc-50 dark:bg-[#0c0d12] border border-amber-500/30 dark:border-amber-500/20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rotate-45 bg-amber-500" />
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

  if (projectId === "forensic-ai-writer") {
    const currentForensic = FORENSIC_PRESETS[selectedForensicIndex];

    return (
      <div className="p-5 sm:p-6 rounded-2xl bg-zinc-50 dark:bg-[#0b0e14] border border-cyan-500/30 dark:border-cyan-500/20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
            <span className="font-mono font-bold text-xs uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
              Interactive Digital Forensic Investigation Sandbox
            </span>
          </div>
          <span className="text-[11px] font-mono text-zinc-500">
            Select case to inspect timeline correlation &amp; report
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {FORENSIC_PRESETS.map((preset, idx) => (
            <button
              key={preset.caseId}
              onClick={() => setSelectedForensicIndex(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                selectedForensicIndex === idx
                  ? "bg-cyan-600 text-white font-semibold shadow-sm"
                  : "bg-white dark:bg-[#131620] text-zinc-700 dark:text-zinc-300 border border-black/[0.06] dark:border-white/[0.06] hover:border-cyan-500/40"
              }`}
            >
              {preset.caseId}: {preset.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentForensic.caseId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="p-4 rounded-xl bg-white dark:bg-[#10141d] border border-cyan-500/30 shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Target Domain / Scope
                </span>
                <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white">
                  {currentForensic.targetDomain}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  SHA-256 Verified
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${currentForensic.riskColor}`}
                >
                  {currentForensic.risk}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-semibold mb-2">
                Ingested Evidence Artifacts &amp; Cryptographic Hashes:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                {currentForensic.evidenceFiles.map((file) => (
                  <div
                    key={file.name}
                    className="p-2.5 rounded-lg bg-zinc-50 dark:bg-[#141824] border border-black/[0.06] dark:border-white/[0.05] flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-500/30">
                        {file.type}
                      </span>
                      <span className="text-zinc-800 dark:text-zinc-200 truncate">
                        {file.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-500 shrink-0 ml-2">
                      {file.sha256}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-semibold mb-2">
                Reconstructed Chronological Incident Timeline:
              </span>
              <div className="space-y-1.5">
                {currentForensic.timeline.map((item) => (
                  <div
                    key={item.time}
                    className="p-2 rounded-lg bg-zinc-50 dark:bg-[#141824] border border-black/[0.06] dark:border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-[11px] shrink-0">
                        {item.time}
                      </span>
                      <span className="text-zinc-800 dark:text-zinc-200">
                        {item.event}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium self-start sm:self-auto shrink-0">
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-cyan-500/[0.06] border border-cyan-500/20 text-xs font-mono space-y-1">
              <span className="font-bold text-cyan-800 dark:text-cyan-300 uppercase tracking-wider text-[11px] block">
                AI Cross-Source Correlation Analysis:
              </span>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-[11px]">
                {currentForensic.correlationFinding}
              </p>
            </div>

            <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.05] space-y-1 text-xs font-mono">
              <span className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px] block">
                Automated Court-Ready Report Summary:
              </span>
              <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                {currentForensic.reportConclusion}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return null;
}
