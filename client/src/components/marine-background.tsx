import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface MarineBackgroundProps {
  intensity?: "low" | "medium" | "high";
  theme?: "default" | "dark" | "blue";
}

export function MarineBackground({ intensity = "medium", theme = "default" }: MarineBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const getColors = () => {
    switch (theme) {
      case "dark":
        return {
          bubbles: ["bg-slate-300/10", "bg-slate-400/8", "bg-slate-200/12"],
          waves: "text-slate-500/5",
          ripples: ["from-transparent via-slate-300/15 to-transparent", "from-transparent via-slate-400/10 to-transparent"],
        };
      case "blue":
        return {
          bubbles: ["bg-blue-300/20", "bg-cyan-300/15", "bg-teal-300/25"],
          waves: "text-blue-500/8",
          ripples: ["from-transparent via-blue-300/20 to-transparent", "from-transparent via-cyan-300/15 to-transparent"],
        };
      default:
        return {
          bubbles: ["bg-cyan-300/15", "bg-blue-300/12", "bg-teal-300/18"],
          waves: "text-cyan-500/6",
          ripples: ["from-transparent via-cyan-300/18 to-transparent", "from-transparent via-blue-300/12 to-transparent"],
        };
    }
  };

  const colors = getColors();
  const bubbleCount = intensity === "low" ? 3 : intensity === "medium" ? 6 : 9;
  const animationSpeed = intensity === "low" ? 12 : intensity === "medium" ? 8 : 6;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated bubbles */}
      {Array.from({ length: bubbleCount }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${colors.bubbles[i % colors.bubbles.length]}`}
          style={{
            width: `${Math.random() * 20 + 10}px`,
            height: `${Math.random() * 20 + 10}px`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ 
            y: "-20vh",
            x: [0, Math.random() * 60 - 30, Math.random() * 40 - 20, Math.random() * 80 - 40],
            opacity: [0, 0.8, 0.6, 0]
          }}
          transition={{ 
            duration: animationSpeed + Math.random() * 4,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
        />
      ))}

      {/* Floating particles */}
      {Array.from({ length: Math.floor(bubbleCount / 2) }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className={`absolute w-1 h-1 rounded-full ${colors.bubbles[0]}`}
          style={{
            left: `${Math.random() * 100}%`,
          }}
          initial={{ y: "100vh" }}
          animate={{ 
            y: "-10vh",
            x: [0, Math.random() * 30 - 15, Math.random() * 20 - 10],
          }}
          transition={{ 
            duration: animationSpeed * 1.5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 3
          }}
        />
      ))}

      {/* Flowing water ripples */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className={`absolute top-1/6 left-0 w-full h-px bg-gradient-to-r ${colors.ripples[0]}`} />
        <div className={`absolute top-2/6 left-0 w-full h-px bg-gradient-to-r ${colors.ripples[1]}`} />
        <div className={`absolute top-4/6 left-0 w-full h-px bg-gradient-to-r ${colors.ripples[0]}`} />
        <div className={`absolute top-5/6 left-0 w-full h-px bg-gradient-to-r ${colors.ripples[1]}`} />
      </motion.div>

      {/* Subtle wave pattern */}
      <motion.svg
        className={`absolute bottom-0 left-0 w-full h-24 opacity-5 ${colors.waves}`}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        initial={{ x: -1200 }}
        animate={{ x: [0, 1200, 0] }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          fill="currentColor"
        />
      </motion.svg>

      {/* Swimming fish silhouettes (subtle) */}
      {intensity === "high" && (
        <>
          <motion.div
            className="absolute w-8 h-4 opacity-5"
            style={{ top: "30%", left: "-10%" }}
            initial={{ x: "-100px" }}
            animate={{ x: "calc(100vw + 100px)" }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: 3
            }}
          >
            <svg viewBox="0 0 32 16" fill="currentColor" className={colors.waves}>
              <path d="M2 8c0-2 4-6 12-6s12 4 12 6-4 6-12 6S2 10 2 8z" />
              <path d="M0 8l4-2v4l-4-2z" />
              <circle cx="20" cy="6" r="1" />
            </svg>
          </motion.div>
          
          <motion.div
            className="absolute w-6 h-3 opacity-3"
            style={{ top: "70%", left: "-8%" }}
            initial={{ x: "-80px" }}
            animate={{ x: "calc(100vw + 80px)" }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              delay: 8
            }}
          >
            <svg viewBox="0 0 24 12" fill="currentColor" className={colors.waves}>
              <path d="M2 6c0-1.5 3-4.5 9-4.5s9 3 9 4.5-3 4.5-9 4.5S2 7.5 2 6z" />
              <path d="M0 6l3-1.5v3L0 6z" />
              <circle cx="15" cy="5" r="0.8" />
            </svg>
          </motion.div>
        </>
      )}
    </div>
  );
}