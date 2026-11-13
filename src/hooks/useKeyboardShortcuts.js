import { useEffect, useState } from "react";
import { useTheme } from "./useTheme";

const SECTION_MAP = {
  "0": "hero",
  h: "hero",
  H: "hero",
  "1": "about",
  "2": "journey",
  "3": "skills",
  "4": "projects",
  "5": "problem-solving",
  "6": "contact",
};

const SECTION_LABELS = {
  "0": "Hero Overview",
  h: "Hero Overview",
  H: "Hero Overview",
  "1": "01. About & Education",
  "2": "02. Engineering Journey",
  "3": "03. Technical Skills",
  "4": "04. Featured Projects",
  "5": "05. Problem Solving & DSA",
  "6": "06. Contact",
};

export function useKeyboardShortcuts() {
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState(null);
  const { toggleTheme, theme } = useTheme();

  const showFeedback = (text) => {
    setActiveFeedback(text);
    setTimeout(() => {
      setActiveFeedback((curr) => (curr === text ? null : curr));
    }, 1400);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const activeEl = document.activeElement;
      const isInputFocused =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.isContentEditable);

      if (e.key === "Escape") {
        if (isInputFocused) {
          activeEl.blur();
          return;
        }
        if (isShortcutsOpen) {
          setIsShortcutsOpen(false);
          return;
        }
      }

      if (isInputFocused) return;

      if (e.key === "?") {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
        return;
      }

      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        toggleTheme();
        showFeedback(theme === "dark" ? "Theme: Light Mode" : "Theme: Dark Mode");
        return;
      }

      if (e.key === "/") {
        e.preventDefault();
        const searchInput =
          document.getElementById("terminal-input") ||
          document.querySelector('input[type="text"]');
        if (searchInput) {
          searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(() => searchInput.focus(), 220);
          showFeedback("Search Focused");
        }
        return;
      }

      const targetSection = SECTION_MAP[e.key];
      if (targetSection) {
        e.preventDefault();
        if (targetSection === "hero") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const el = document.getElementById(targetSection);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
        showFeedback(`Jumped to ${SECTION_LABELS[e.key]}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTheme, theme, isShortcutsOpen]);

  return {
    isShortcutsOpen,
    setIsShortcutsOpen,
    activeFeedback,
  };
}

