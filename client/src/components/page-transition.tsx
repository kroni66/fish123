import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { MarineBackground } from "./marine-background";
import { useLocation } from "wouter";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  const [location] = useLocation();
  
  // Determine marine background intensity and theme based on route
  const getMarineConfig = () => {
    if (location === "/") return { intensity: "high" as const, theme: "default" as const };
    if (location === "/inspiration") return { intensity: "medium" as const, theme: "blue" as const };
    if (location === "/about") return { intensity: "low" as const, theme: "default" as const };
    if (location === "/contact") return { intensity: "low" as const, theme: "dark" as const };
    if (location.startsWith("/product")) return { intensity: "medium" as const, theme: "default" as const };
    if (location === "/checkout") return { intensity: "low" as const, theme: "dark" as const };
    return { intensity: "low" as const, theme: "default" as const };
  };

  const marineConfig = getMarineConfig();

  // Page-specific entrance animations
  const getPageVariants = () => {
    if (location === "/") {
      return {
        initial: { opacity: 0, scale: 0.95, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 1.05, y: -20 }
      };
    }
    
    if (location === "/inspiration") {
      return {
        initial: { opacity: 0, x: -50, rotateY: -10 },
        animate: { opacity: 1, x: 0, rotateY: 0 },
        exit: { opacity: 0, x: 50, rotateY: 10 }
      };
    }
    
    if (location.startsWith("/product")) {
      return {
        initial: { opacity: 0, y: 30, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -30, scale: 1.02 }
      };
    }
    
    if (location === "/checkout") {
      return {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 }
      };
    }
    
    // Default animation
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    };
  };

  const variants = getPageVariants();

  return (
    <motion.div
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      className={`relative ${className}`}
    >
      {/* Marine-themed animated background */}
      <MarineBackground 
        intensity={marineConfig.intensity} 
        theme={marineConfig.theme} 
      />

      {/* Page transition overlay effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.1, 0] }}
        exit={{ opacity: [0, 0.2, 0] }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5" />
      </motion.div>

      {/* Page content with stagger animation */}
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <PageTransition>
        {children}
      </PageTransition>
    </AnimatePresence>
  );
}