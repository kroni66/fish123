import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  amplitude?: number;
}

export function FloatingElement({ children, delay = 0, duration = 3, amplitude = 10 }: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [0, -amplitude, 0],
        rotate: [0, 1, -1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

interface HoverWaveProps {
  children: ReactNode;
  intensity?: "subtle" | "medium" | "strong";
}

export function HoverWave({ children, intensity = "medium" }: HoverWaveProps) {
  const scales = {
    subtle: 1.02,
    medium: 1.05,
    strong: 1.08,
  };

  return (
    <motion.div
      whileHover={{
        scale: scales[intensity],
        rotateY: 5,
        rotateX: 2,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="transform-gpu"
    >
      {children}
    </motion.div>
  );
}

interface BubbleTrailProps {
  children: ReactNode;
  bubbleCount?: number;
}

export function BubbleTrail({ children, bubbleCount = 3 }: BubbleTrailProps) {
  return (
    <motion.div
      className="relative"
      whileHover="hover"
      initial="rest"
    >
      {children}
      
      {/* Bubble trail on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
      >
        {Array.from({ length: bubbleCount }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-cyan-200/60 to-cyan-400/40 rounded-full"
            style={{
              left: `${20 + i * 20}%`,
              top: `${80 - i * 15}%`,
            }}
            variants={{
              rest: { scale: 0, y: 0 },
              hover: { 
                scale: [0, 1, 0],
                y: [-20, -40, -60],
                opacity: [0, 1, 0],
              },
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

interface RippleEffectProps {
  children: ReactNode;
  color?: string;
}

export function RippleEffect({ children, color = "rgb(34, 211, 238)" }: RippleEffectProps) {
  return (
    <motion.div
      className="relative overflow-hidden"
      whileTap="tap"
      initial="rest"
    >
      {children}
      
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={{
          rest: { scale: 0, opacity: 0 },
          tap: { scale: 4, opacity: [0, 0.3, 0] },
        }}
        transition={{ duration: 0.6 }}
        style={{
          background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

interface UnderwaterGlowProps {
  children: ReactNode;
  glowColor?: string;
  intensity?: number;
}

export function UnderwaterGlow({ children, glowColor = "#22d3ee", intensity = 0.5 }: UnderwaterGlowProps) {
  return (
    <motion.div
      className="relative"
      whileHover={{
        filter: `drop-shadow(0 0 20px ${glowColor}${Math.floor(intensity * 255).toString(16).padStart(2, '0')})`,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
      
      {/* Ambient glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: intensity }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(ellipse at center, ${glowColor}10 0%, transparent 70%)`,
          filter: "blur(10px)",
        }}
      />
    </motion.div>
  );
}