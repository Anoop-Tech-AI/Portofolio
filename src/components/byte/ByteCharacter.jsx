import { useEffect, useRef, useState } from "react";
import ByteRig from "./ByteRig";
import { ByteAnimationController } from "./ByteAnimationController";

/**
 * ByteCharacter
 * Coordinates the articulated SVG rig with the GSAP animation engine.
 */
export default function ByteCharacter({
  state = "idle",
  mouthOpen = 0,
  onAnimationEnd,
  className = "",
}) {
  const controllerRef = useRef(null);
  const [rigState, setRigState] = useState({
    bodyY: 0,
    bodyScaleX: 1,
    bodyScaleY: 1,
    bodyTilt: 0,
    shadowScale: 1,
    shadowOpacity: 0.35,
    headY: 0,
    headTilt: 0,
    glassesOffset: 0,
    isBlinking: false,
    eyeDirection: "center",
    expression: "idle",
    mouthOpen: 0,
    leftWingAngle: 0,
    rightWingAngle: 0,
    leftLegAngle: 0,
    rightLegAngle: 0,
    legSquash: 0,
    showLaptop: false,
    laptopTyping: false,
  });

  // Initialize GSAP animation controller
  useEffect(() => {
    const controller = new ByteAnimationController((newState) => {
      setRigState(newState);
    });
    controllerRef.current = controller;

    return () => {
      controller.destroy();
    };
  }, []);

  // Update animation state when prop changes
  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.setState(state, { onComplete: onAnimationEnd });
    }
  }, [state, onAnimationEnd]);

  // Synchronize mouth flap when talking
  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.setMouthPulse(mouthOpen);
    }
  }, [mouthOpen]);

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center ${className}`}
    >
      <ByteRig {...rigState} />
    </div>
  );
}
