import { useState, useCallback } from 'react';
import IntroExperience from './byte-intro/IntroExperience';
import FloatingByteAssistant from './byte-intro/FloatingByteAssistant';
import { useReducedMotion } from '../hooks/useAnimations';

/**
 * DeveloperMascot
 * Master coordinator for PROJECT BYTE:
 * 1. Full-Screen Pure Black Cinematic Introduction (with large prominent BYTE,
 *    0-2s black screen, 2-6s walk, stopping & waving, dialogue reveal,
 *    3 interactive navigation options, and camera-jump portal transition).
 * 2. Docked interactive mascot (FloatingByteAssistant) after introduction completes,
 *    supporting full conversational menu, navigation shortcuts, developer jokes,
 *    and one-click replay.
 */
export default function DeveloperMascot({ onOpenResume }) {
  const shouldReduceMotion = useReducedMotion();

  // Initialize: check if intro was already played in this browser session or reduced-motion is requested
  const [isIntroActive, setIsIntroActive] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const alreadyPlayed = sessionStorage.getItem('anoop_byte_intro_played') === 'true';
      return !alreadyPlayed;
    } catch {
      return true;
    }
  });

  // Handle intro completion & scroll to selected target section
  const handleCompleteIntro = useCallback((targetSection) => {
    setIsIntroActive(false);

    if (targetSection) {
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 350);
    }
  }, []);

  // Replay full cinematic introduction
  const handleReplayIntro = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsIntroActive(true);
  }, []);

  // If user prefers reduced motion, never display full-screen intro
  const activeIntro = !shouldReduceMotion && isIntroActive;

  return (
    <>
      {/* ── 1. Full-Screen Cinematic Introduction ── */}
      {activeIntro && (
        <IntroExperience onCompleteIntro={handleCompleteIntro} />
      )}

      {/* ── 2. Docked Interactive Companion (Always available when intro is closed) ── */}
      {!activeIntro && (
        <FloatingByteAssistant
          onOpenResume={onOpenResume}
          onReplayIntro={handleReplayIntro}
        />
      )}
    </>
  );
}
