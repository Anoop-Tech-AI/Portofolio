import { useState, useEffect, useRef, useCallback } from "react";
import ByteCharacter from "./ByteCharacter";
import ByteDialogue from "./ByteDialogue";
import ByteChatPanel from "./ByteChatPanel";
import { byteVoice } from "./ByteVoice";
import { BYTE_DIALOGUES } from "./byteDialogues";
import { MessageSquare, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/**
 * MiniByteAssistant
 * The interactive animated 2D companion living in the portfolio.
 */
export default function MiniByteAssistant() {
  const [animState, setAnimState] = useState("idle");
  const [mouthOpen, setMouthOpen] = useState(0);
  const [currentSpeech, setCurrentSpeech] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(byteVoice.getMuted());
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);
  const idleTimerRef = useRef(null);
  const speechDismissTimerRef = useRef(null);

  // Speak with speech synthesis + mouth sync + speech bubble
  const triggerSpeech = useCallback((text, stateOverride = "talking", duration = 4000) => {
    if (speechDismissTimerRef.current) {
      clearTimeout(speechDismissTimerRef.current);
    }

    setCurrentSpeech(text);
    setIsSpeaking(true);
    setAnimState(stateOverride);

    byteVoice.speak(text, {
      onStart: () => {
        setIsSpeaking(true);
      },
      onMouthPulse: (pulse) => {
        setMouthOpen(pulse);
      },
      onEnd: () => {
        setIsSpeaking(false);
        setMouthOpen(0);
        // Transition back to idle after speech finishes
        setAnimState("idle");

        // Keep subtitle bubble visible briefly, then fade out
        speechDismissTimerRef.current = setTimeout(() => {
          setCurrentSpeech(null);
        }, 1500);
      },
    });

    // Fallback dismiss timer
    speechDismissTimerRef.current = setTimeout(() => {
      setCurrentSpeech(null);
      setIsSpeaking(false);
      setMouthOpen(0);
      setAnimState("idle");
    }, duration + 2000);
  }, []);

  // Initial welcome greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      const welcome = BYTE_DIALOGUES.welcome[0];
      triggerSpeech(welcome.text, welcome.state, 4500);
    }, 1400);

    return () => clearTimeout(timer);
  }, [triggerSpeech]);

  // Reset idle timer on user activity
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    idleTimerRef.current = setTimeout(() => {
      // Pick random idle quip
      const idleItems = BYTE_DIALOGUES.idle;
      const randomItem = idleItems[Math.floor(Math.random() * idleItems.length)];
      triggerSpeech(randomItem.text, randomItem.state, 3500);
    }, 32000); // Trigger after 32s of inactivity
  }, [triggerSpeech]);

  useEffect(() => {
    window.addEventListener("scroll", resetIdleTimer, { passive: true });
    window.addEventListener("mousemove", resetIdleTimer, { passive: true });
    resetIdleTimer();

    return () => {
      window.removeEventListener("scroll", resetIdleTimer);
      window.removeEventListener("mousemove", resetIdleTimer);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (speechDismissTimerRef.current) clearTimeout(speechDismissTimerRef.current);
      byteVoice.stop();
    };
  }, [resetIdleTimer]);

  // Handle clicking on BYTE
  const handleByteClick = () => {
    clickCountRef.current += 1;

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    clickTimerRef.current = setTimeout(() => {
      const count = clickCountRef.current;
      clickCountRef.current = 0;

      if (count >= 3) {
        // Multi-click reaction: Jump!
        const reaction = BYTE_DIALOGUES.clickReactions[3];
        triggerSpeech(reaction.text, "jumping", 3000);
      } else if (count === 2) {
        // Double click: Celebrating
        const reaction = BYTE_DIALOGUES.clickReactions[2];
        triggerSpeech(reaction.text, "celebrating", 3000);
      } else {
        // Single click: Toggle chat/navigation drawer
        if (!isPanelOpen) {
          setIsPanelOpen(true);
          const reaction = BYTE_DIALOGUES.clickReactions[0];
          triggerSpeech(reaction.text, "waving", 2800);
        } else {
          setIsPanelOpen(false);
        }
      }
    }, 280);
  };

  // Handle section navigation
  const handleNavigate = (sectionId) => {
    setIsPanelOpen(false);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const dialogue = BYTE_DIALOGUES.sections[sectionId];
    if (dialogue) {
      triggerSpeech(dialogue.text, dialogue.state, 4000);
    }
  };

  // Mascot action trick
  const handleAction = (actionState) => {
    setIsPanelOpen(false);
    if (actionState === "jumping") {
      setAnimState("jumping");
      triggerSpeech("Woohoo! Look at that cartoon air-time!", "jumping", 2500);
    } else if (actionState === "waving") {
      setAnimState("waving");
      triggerSpeech("Hello! Hope you're enjoying Anoop's portfolio!", "waving", 2500);
    } else if (actionState === "typing") {
      setAnimState("typing");
      triggerSpeech("git commit -m 'Building cool stuff with Anoop!'", "typing", 3000);
    } else if (actionState === "sleeping") {
      setAnimState("sleeping");
      triggerSpeech("Zzz... dreaming in binary algorithms...", "sleeping", 3000);
    }
  };

  // Toggle Mute
  const handleToggleMute = (e) => {
    if (e) e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    byteVoice.setMuted(nextMuted);
  };

  return (
    <div
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 select-none"
      aria-label="MINI BYTE Assistant"
    >
      <div className="relative flex flex-col items-end">
        {/* Dialogue Bubble */}
        <ByteDialogue
          text={currentSpeech}
          isSpeaking={isSpeaking}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onClose={() => setCurrentSpeech(null)}
        />

        {/* Chat / Navigation Panel */}
        <AnimatePresence>
          {isPanelOpen && (
            <ByteChatPanel
              isOpen={isPanelOpen}
              onClose={() => setIsPanelOpen(false)}
              onNavigate={handleNavigate}
              onAction={handleAction}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
            />
          )}
        </AnimatePresence>

        {/* Character & Action Bubble Wrapper */}
        <div className="relative group flex items-end">
          {/* Quick Menu Button / Indicator */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className="absolute bottom-2 -left-2 z-10 w-7 h-7 rounded-full bg-amber-500 text-white shadow-md flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer"
            title="Open Assistant Menu"
            aria-label="Open Assistant Menu"
          >
            {isPanelOpen ? (
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "3s" }} />
            ) : (
              <MessageSquare className="w-3.5 h-3.5" />
            )}
          </motion.button>

          {/* Interactive Character Container */}
          <div
            onClick={handleByteClick}
            className="w-28 h-32 md:w-36 md:h-40 cursor-pointer transform hover:scale-105 active:scale-95 transition-transform duration-200"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleByteClick();
            }}
            title="Click BYTE to interact or explore!"
          >
            <ByteCharacter
              state={animState}
              mouthOpen={mouthOpen}
              onAnimationEnd={() => setAnimState("idle")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
