import gsap from "gsap";

/**
 * ByteAnimationController
 *
 * Professional 2D character animation engine powered by GSAP.
 * Controls joint kinematics, squash-and-stretch, anticipation,
 * secondary motion, speech mouth flap, and seamless state transitions.
 */
export class ByteAnimationController {
  constructor(onUpdate) {
    this.onUpdate = onUpdate;
    this.currentState = "idle";
    this.currentTimeline = null;
    this.blinkTimer = null;
    this.idleLookTimer = null;
    this.mouthPulse = 0;

    // Master rig transform state
    this.state = {
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
    };
  }

  emit() {
    if (this.onUpdate) {
      this.onUpdate({ ...this.state });
    }
  }

  stopCurrentAnimation() {
    if (this.currentTimeline) {
      this.currentTimeline.kill();
      this.currentTimeline = null;
    }
    if (this.blinkTimer) clearTimeout(this.blinkTimer);
    if (this.idleLookTimer) clearTimeout(this.idleLookTimer);
  }

  setState(newState, options = {}) {
    this.stopCurrentAnimation();
    this.currentState = newState;
    this.state.expression = newState;

    switch (newState) {
      case "idle":
        this.playIdle();
        break;
      case "walking":
        this.playWalk();
        break;
      case "waving":
        this.playWave();
        break;
      case "jumping":
        this.playJump(options.onComplete);
        break;
      case "celebrating":
        this.playCelebrate();
        break;
      case "sleeping":
        this.playSleep();
        break;
      case "talking":
        this.playTalking();
        break;
      case "pointing":
        this.playPointing();
        break;
      case "typing":
        this.playTyping();
        break;
      default:
        this.playIdle();
    }
  }

  // ─── 1. IDLE STATE: Continuous Breathing & Looking Around ───
  playIdle() {
    this.state.showLaptop = false;
    this.state.laptopTyping = false;
    this.state.leftLegAngle = 0;
    this.state.rightLegAngle = 0;
    this.state.legSquash = 0;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    // Subtle breathing cycle (chest expand, head bob, soft wing sway)
    tl.to(this.state, {
      bodyScaleY: 0.97,
      bodyScaleX: 1.02,
      bodyY: 1.5,
      headY: 1,
      headTilt: -1,
      leftWingAngle: -3,
      rightWingAngle: 3,
      duration: 1.6,
      ease: "sine.inOut",
      onUpdate: () => this.emit(),
    });

    this.currentTimeline = tl;
    this.startRandomBlinks();
    this.startRandomEyeShifts();
  }

  startRandomBlinks() {
    const triggerBlink = () => {
      if (this.currentState === "sleeping") return;

      this.state.isBlinking = true;
      this.emit();

      setTimeout(() => {
        this.state.isBlinking = false;
        this.emit();
        // Schedule next blink (between 2.5s and 6s)
        this.blinkTimer = setTimeout(triggerBlink, 2500 + Math.random() * 3500);
      }, 130);
    };

    this.blinkTimer = setTimeout(triggerBlink, 2000 + Math.random() * 2000);
  }

  startRandomEyeShifts() {
    const shiftEyes = () => {
      if (this.currentState !== "idle") return;

      const directions = ["center", "center", "left", "right", "up"];
      const nextDir = directions[Math.floor(Math.random() * directions.length)];
      this.state.eyeDirection = nextDir;

      // Occasional cool sunglasses push
      if (Math.random() > 0.65) {
        gsap.to(this.state, {
          glassesOffset: -3,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
          onUpdate: () => this.emit(),
        });
      }

      this.emit();
      this.idleLookTimer = setTimeout(shiftEyes, 3000 + Math.random() * 3000);
    };

    this.idleLookTimer = setTimeout(shiftEyes, 2500);
  }

  // ─── 2. WALKING STATE: Articulated 2D Walk Cycle ───
  playWalk() {
    this.state.showLaptop = false;
    this.state.expression = "idle";
    const tl = gsap.timeline({ repeat: -1 });

    const stepDuration = 0.22;

    // Left step forward, right back
    tl.to(this.state, {
      leftLegAngle: 22,
      rightLegAngle: -22,
      leftWingAngle: -14,
      rightWingAngle: 14,
      bodyY: -4,
      headY: 1.5,
      bodyTilt: -2.5,
      shadowScale: 0.94,
      duration: stepDuration,
      ease: "power1.inOut",
      onUpdate: () => this.emit(),
    })
      // Passing position
      .to(this.state, {
        bodyY: 0,
        bodyTilt: 0,
        shadowScale: 1.0,
        duration: stepDuration * 0.5,
        ease: "power1.inOut",
        onUpdate: () => this.emit(),
      })
      // Right step forward, left back
      .to(this.state, {
        leftLegAngle: -22,
        rightLegAngle: 22,
        leftWingAngle: 14,
        rightWingAngle: -14,
        bodyY: -4,
        headY: 1.5,
        bodyTilt: 2.5,
        shadowScale: 0.94,
        duration: stepDuration,
        ease: "power1.inOut",
        onUpdate: () => this.emit(),
      })
      // Return passing position
      .to(this.state, {
        bodyY: 0,
        bodyTilt: 0,
        shadowScale: 1.0,
        duration: stepDuration * 0.5,
        ease: "power1.inOut",
        onUpdate: () => this.emit(),
      });

    this.currentTimeline = tl;
    this.startRandomBlinks();
  }

  // ─── 3. WAVING STATE: Articulated Wing Wave & Tilt ───
  playWave() {
    this.state.showLaptop = false;
    this.state.leftWingAngle = -4;
    this.state.expression = "waving";
    this.state.headTilt = 7;

    const tl = gsap.timeline({ repeat: -1 });

    // Raise wing up
    tl.to(this.state, {
      rightWingAngle: -85,
      headTilt: 8,
      duration: 0.35,
      ease: "back.out(1.5)",
      onUpdate: () => this.emit(),
    })
      // Rapid wave flutter
      .to(this.state, {
        rightWingAngle: -65,
        duration: 0.18,
        ease: "sine.inOut",
        onUpdate: () => this.emit(),
      })
      .to(this.state, {
        rightWingAngle: -95,
        duration: 0.18,
        ease: "sine.inOut",
        onUpdate: () => this.emit(),
      })
      .to(this.state, {
        rightWingAngle: -65,
        duration: 0.18,
        ease: "sine.inOut",
        onUpdate: () => this.emit(),
      })
      .to(this.state, {
        rightWingAngle: -95,
        duration: 0.18,
        ease: "sine.inOut",
        onUpdate: () => this.emit(),
      });

    this.currentTimeline = tl;
    this.startRandomBlinks();
  }

  // ─── 4. JUMPING STATE: Squash-and-Stretch Cartoon Jump ───
  playJump(onComplete) {
    this.state.showLaptop = false;
    this.state.expression = "excited";
    const tl = gsap.timeline({
      onComplete: () => {
        this.setState("idle");
        if (onComplete) onComplete();
      },
    });

    // 1. Anticipation: Crouch down & squash
    tl.to(this.state, {
      bodyY: 10,
      bodyScaleY: 0.8,
      bodyScaleX: 1.18,
      legSquash: 1,
      headY: 4,
      leftWingAngle: 25,
      rightWingAngle: -25,
      shadowScale: 1.15,
      shadowOpacity: 0.45,
      duration: 0.18,
      ease: "power2.in",
      onUpdate: () => this.emit(),
    })
      // 2. Launch: Spring upward & stretch
      .to(this.state, {
        bodyY: -32,
        bodyScaleY: 1.25,
        bodyScaleX: 0.85,
        legSquash: 0,
        headY: -4,
        leftWingAngle: -45,
        rightWingAngle: 45,
        shadowScale: 0.45,
        shadowOpacity: 0.15,
        duration: 0.32,
        ease: "power2.out",
        onUpdate: () => this.emit(),
      })
      // 3. Apex: Wing flap hover
      .to(this.state, {
        bodyScaleY: 1.0,
        bodyScaleX: 1.0,
        leftWingAngle: -55,
        rightWingAngle: 55,
        duration: 0.12,
        ease: "sine.inOut",
        onUpdate: () => this.emit(),
      })
      // 4. Fall & Landing squash
      .to(this.state, {
        bodyY: 8,
        bodyScaleY: 0.82,
        bodyScaleX: 1.16,
        legSquash: 0.8,
        leftWingAngle: 10,
        rightWingAngle: -10,
        shadowScale: 1.1,
        shadowOpacity: 0.42,
        duration: 0.24,
        ease: "power2.in",
        onUpdate: () => this.emit(),
      })
      // 5. Recovery to standing
      .to(this.state, {
        bodyY: 0,
        bodyScaleY: 1,
        bodyScaleX: 1,
        legSquash: 0,
        leftWingAngle: 0,
        rightWingAngle: 0,
        shadowScale: 1,
        shadowOpacity: 0.35,
        duration: 0.22,
        ease: "elastic.out(1.2, 0.4)",
        onUpdate: () => this.emit(),
      });

    this.currentTimeline = tl;
  }

  // ─── 5. CELEBRATING STATE: Joyful Hops & Raised Wings ───
  playCelebrate() {
    this.state.showLaptop = false;
    this.state.expression = "excited";
    const tl = gsap.timeline({ repeat: -1 });

    tl.to(this.state, {
      bodyY: -14,
      bodyScaleY: 1.12,
      bodyScaleX: 0.92,
      leftWingAngle: -70,
      rightWingAngle: 70,
      headTilt: -5,
      shadowScale: 0.75,
      duration: 0.22,
      ease: "power2.out",
      onUpdate: () => this.emit(),
    })
      .to(this.state, {
        bodyY: 4,
        bodyScaleY: 0.9,
        bodyScaleX: 1.08,
        leftWingAngle: -60,
        rightWingAngle: 60,
        headTilt: 5,
        shadowScale: 1.05,
        duration: 0.2,
        ease: "power2.in",
        onUpdate: () => this.emit(),
      });

    this.currentTimeline = tl;
    this.startRandomBlinks();
  }

  // ─── 6. SLEEPING STATE: Deep Slow Breathing ───
  playSleep() {
    this.state.showLaptop = false;
    this.state.expression = "sleep";
    this.state.headTilt = 6;
    this.state.headY = 4;
    this.state.isBlinking = true; // Closed eyes

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(this.state, {
      bodyScaleY: 0.94,
      bodyScaleX: 1.04,
      bodyY: 3,
      headY: 6,
      duration: 2.2,
      ease: "sine.inOut",
      onUpdate: () => this.emit(),
    });

    this.currentTimeline = tl;
  }

  // ─── 7. TALKING STATE: Beak Movement & Expressive Gestures ───
  playTalking() {
    this.state.expression = "talk";
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(this.state, {
      headTilt: 4,
      headY: 1,
      rightWingAngle: -22,
      leftWingAngle: -6,
      duration: 0.45,
      ease: "power1.inOut",
      onUpdate: () => this.emit(),
    });

    this.currentTimeline = tl;
    this.startRandomBlinks();
  }

  // ─── 8. POINTING STATE: Right Wing Outstretched Toward Content ───
  playPointing() {
    this.state.showLaptop = false;
    this.state.expression = "pointing";
    this.state.headTilt = 6;
    this.state.leftWingAngle = -6;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    // Gentle pulse while pointing
    tl.to(this.state, {
      bodyTilt: 2,
      headY: -1,
      duration: 1.2,
      ease: "sine.inOut",
      onUpdate: () => this.emit(),
    });

    this.currentTimeline = tl;
    this.startRandomBlinks();
  }

  // ─── 9. TYPING STATE: Laptop Open & Typing Wings ───
  playTyping() {
    this.state.showLaptop = true;
    this.state.laptopTyping = true;
    this.state.expression = "idle";
    this.state.headTilt = 2;
    this.state.headY = 3;

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(this.state, {
      leftWingAngle: -20,
      rightWingAngle: 15,
      duration: 0.12,
      ease: "sine.inOut",
      onUpdate: () => this.emit(),
    }).to(this.state, {
      leftWingAngle: -12,
      rightWingAngle: 25,
      duration: 0.12,
      ease: "sine.inOut",
      onUpdate: () => this.emit(),
    });

    this.currentTimeline = tl;
    this.startRandomBlinks();
  }

  // ─── Beak Lip-Sync Pulse (Called by ByteVoice) ───
  setMouthPulse(amplitude) {
    this.mouthPulse = amplitude;
    this.state.mouthOpen = amplitude;
    this.emit();
  }

  destroy() {
    this.stopCurrentAnimation();
  }
}
