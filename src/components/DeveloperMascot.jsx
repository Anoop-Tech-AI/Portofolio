import { useState, useCallback } from "react";
import IntroExperience from "./byte-intro/IntroExperience";
import FloatingByteAssistant from "./byte-intro/FloatingByteAssistant";
import { useReducedMotion } from "../hooks/useAnimations";

export default function DeveloperMascot({ onOpenResume }) {
  const shouldReduceMotion = useReducedMotion();

  const [isIntroActive, setIsIntroActive] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (
        urlParams.get("intro") === "true" ||
        urlParams.get("replay") === "1"
      ) {
        return true;
      }
      return sessionStorage.getItem("anoop_byte_intro_played") !== "true";
    } catch {
      return true;
    }
  });

  const handleCompleteIntro = useCallback((targetSection) => {
    setIsIntroActive(false);

    if (targetSection) {
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 350);
    }
  }, []);

  const handleReplayIntro = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsIntroActive(true);
  }, []);

  const activeIntro = !shouldReduceMotion && isIntroActive;

  return (
    <>
      {activeIntro && <IntroExperience onCompleteIntro={handleCompleteIntro} />}
      {!activeIntro && (
        <FloatingByteAssistant
          onOpenResume={onOpenResume}
          onReplayIntro={handleReplayIntro}
        />
      )}
    </>
  );
}
