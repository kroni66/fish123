import { useAnimation, Variants } from "framer-motion";
import { useEffect } from "react";

export interface MarineAnimationConfig {
  delay?: number;
  duration?: number;
  stagger?: number;
  intensity?: "low" | "medium" | "high";
}

export function useMarineAnimations(config: MarineAnimationConfig = {}) {
  const {
    delay = 0,
    duration = 0.6,
    stagger = 0.1,
    intensity = "medium"
  } = config;

  const controls = useAnimation();

  // Container variants for stagger effect
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: stagger,
        delayChildren: delay + 0.1
      }
    }
  };

  // Item variants with marine-themed animations
  const getItemVariants = (): Variants => {
    const baseTransition = { 
      duration, 
      ease: "easeOut",
      type: "spring",
      stiffness: intensity === "high" ? 120 : intensity === "medium" ? 100 : 80,
      damping: intensity === "high" ? 15 : intensity === "medium" ? 20 : 25
    };

    switch (intensity) {
      case "high":
        return {
          hidden: { 
            opacity: 0, 
            y: 40, 
            scale: 0.9,
            rotateX: -15
          },
          visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            rotateX: 0,
            transition: baseTransition
          }
        };
      case "medium":
        return {
          hidden: { 
            opacity: 0, 
            y: 25, 
            x: -10
          },
          visible: { 
            opacity: 1, 
            y: 0, 
            x: 0,
            transition: baseTransition
          }
        };
      case "low":
        return {
          hidden: { 
            opacity: 0, 
            y: 15 
          },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: baseTransition
          }
        };
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: baseTransition }
        };
    }
  };

  // Card-specific animations with floating effect
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      scale: 0.95,
      rotateY: -5
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateY: 0,
      transition: {
        duration: duration + 0.1,
        ease: "easeOut",
        type: "spring",
        stiffness: 90,
        damping: 20
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      rotateY: 2,
      boxShadow: "0 20px 40px rgba(34, 211, 238, 0.15)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Wave-like text animation
  const waveTextVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay
      }
    }
  };

  const waveLetterVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotateX: -90
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Bubble-like floating animations
  const bubbleVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 150,
        damping: 12
      }
    },
    float: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Marine-themed loading animation
  const loadingVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.7, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return {
    controls,
    containerVariants,
    itemVariants: getItemVariants(),
    cardVariants,
    waveTextVariants,
    waveLetterVariants,
    bubbleVariants,
    loadingVariants
  };
}

// Helper function to split text for wave animation
export function splitTextForWave(text: string) {
  return text.split("").map((char, index) => ({
    char: char === " " ? "\u00A0" : char,
    index
  }));
}

// Presets for common use cases
export const marinePresets = {
  heroSection: { delay: 0.2, duration: 0.8, stagger: 0.15, intensity: "high" as const },
  productGrid: { delay: 0.1, duration: 0.6, stagger: 0.08, intensity: "medium" as const },
  articleList: { delay: 0, duration: 0.5, stagger: 0.12, intensity: "medium" as const },
  sidebar: { delay: 0.3, duration: 0.4, stagger: 0.06, intensity: "low" as const },
  modal: { delay: 0, duration: 0.4, stagger: 0.05, intensity: "medium" as const }
};