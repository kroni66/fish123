import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MarineCreature {
  id: string;
  type: 'fish' | 'jellyfish' | 'seahorse' | 'bubble';
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  direction: number;
}

export function MarineCreatures() {
  const [creatures, setCreatures] = useState<MarineCreature[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  // Generate random marine creatures
  useEffect(() => {
    const generateCreature = (): MarineCreature => {
      const types: MarineCreature['type'][] = ['fish', 'jellyfish', 'seahorse', 'bubble'];
      const colors = ['#22d3ee', '#06b6d4', '#0891b2', '#67e8f9', '#a5f3fc'];
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        type: types[Math.floor(Math.random() * types.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 0.8 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 2 + 0.5,
        direction: Math.random() * 360,
      };
    };

    // Initialize creatures
    const initialCreatures = Array.from({ length: 8 }, generateCreature);
    setCreatures(initialCreatures);

    // Periodically add new creatures
    const interval = setInterval(() => {
      setCreatures(prev => {
        const newCreatures = prev.filter(creature => 
          creature.x < 120 && creature.x > -20 && creature.y < 120 && creature.y > -20
        );
        
        if (newCreatures.length < 6) {
          newCreatures.push(generateCreature());
        }
        
        return newCreatures;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Animate creatures
  useEffect(() => {
    const animationFrame = setInterval(() => {
      setCreatures(prev => prev.map(creature => ({
        ...creature,
        x: creature.x + Math.cos(creature.direction * Math.PI / 180) * creature.speed * 0.1,
        y: creature.y + Math.sin(creature.direction * Math.PI / 180) * creature.speed * 0.1,
        direction: creature.direction + (Math.random() - 0.5) * 5,
      })));
    }, 100);

    return () => clearInterval(animationFrame);
  }, []);

  const FishSVG = ({ creature }: { creature: MarineCreature }) => (
    <motion.svg
      width={`${creature.size * 40}px`}
      height={`${creature.size * 25}px`}
      viewBox="0 0 40 25"
      className="drop-shadow-lg"
      animate={{
        x: [0, 5, 0],
        rotate: [0, creature.direction % 60 - 30, 0],
      }}
      transition={{
        duration: 2 + Math.random(),
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <defs>
        <linearGradient id={`fishGradient-${creature.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={creature.color} />
          <stop offset="100%" stopColor={creature.color + '80'} />
        </linearGradient>
      </defs>
      
      {/* Fish body */}
      <ellipse cx="20" cy="12.5" rx="12" ry="6" fill={`url(#fishGradient-${creature.id})`} />
      
      {/* Fish tail */}
      <path d="M 8 12.5 L 2 8 L 4 12.5 L 2 17 Z" fill={creature.color} opacity="0.8" />
      
      {/* Fish eye */}
      <circle cx="25" cy="10" r="2" fill="white" />
      <circle cx="26" cy="10" r="1.2" fill="#1e40af" />
      <circle cx="26.5" cy="9.5" r="0.5" fill="white" />
      
      {/* Fish fins */}
      <ellipse cx="15" cy="18" rx="3" ry="1.5" fill={creature.color} opacity="0.6" />
      <ellipse cx="22" cy="6" rx="2" ry="1" fill={creature.color} opacity="0.6" />
    </motion.svg>
  );

  const JellyfishSVG = ({ creature }: { creature: MarineCreature }) => (
    <motion.svg
      width={`${creature.size * 35}px`}
      height={`${creature.size * 45}px`}
      viewBox="0 0 35 45"
      className="drop-shadow-lg"
      animate={{
        y: [0, -8, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 3 + Math.random(),
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <defs>
        <radialGradient id={`jellyfishGradient-${creature.id}`} cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor={creature.color} opacity="0.8" />
          <stop offset="100%" stopColor={creature.color} opacity="0.3" />
        </radialGradient>
      </defs>
      
      {/* Jellyfish bell */}
      <ellipse cx="17.5" cy="15" rx="15" ry="12" fill={`url(#jellyfishGradient-${creature.id})`} />
      
      {/* Jellyfish tentacles */}
      <motion.path 
        d="M 10 25 Q 8 35 12 40" 
        stroke={creature.color} 
        strokeWidth="1.5" 
        fill="none" 
        opacity="0.7"
        animate={{ d: ["M 10 25 Q 8 35 12 40", "M 10 25 Q 6 33 14 38", "M 10 25 Q 8 35 12 40"] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path 
        d="M 17.5 25 Q 15 38 19 42" 
        stroke={creature.color} 
        strokeWidth="1.5" 
        fill="none" 
        opacity="0.7"
        animate={{ d: ["M 17.5 25 Q 15 38 19 42", "M 17.5 25 Q 13 36 21 40", "M 17.5 25 Q 15 38 19 42"] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      <motion.path 
        d="M 25 25 Q 27 35 23 40" 
        stroke={creature.color} 
        strokeWidth="1.5" 
        fill="none" 
        opacity="0.7"
        animate={{ d: ["M 25 25 Q 27 35 23 40", "M 25 25 Q 29 33 21 38", "M 25 25 Q 27 35 23 40"] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
    </motion.svg>
  );

  const SeahorseSVG = ({ creature }: { creature: MarineCreature }) => (
    <motion.svg
      width={`${creature.size * 20}px`}
      height={`${creature.size * 40}px`}
      viewBox="0 0 20 40"
      className="drop-shadow-lg"
      animate={{
        rotate: [0, 5, -5, 0],
        y: [0, -3, 0],
      }}
      transition={{
        duration: 4 + Math.random(),
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <defs>
        <linearGradient id={`seahorseGradient-${creature.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={creature.color} />
          <stop offset="100%" stopColor={creature.color + '60'} />
        </linearGradient>
      </defs>
      
      {/* Seahorse body */}
      <path 
        d="M 10 5 Q 8 10 9 15 Q 10 25 8 35 Q 6 38 10 38 Q 14 38 12 35 Q 10 25 11 15 Q 12 10 10 5" 
        fill={`url(#seahorseGradient-${creature.id})`} 
      />
      
      {/* Seahorse head */}
      <ellipse cx="10" cy="8" rx="3" ry="4" fill={creature.color} />
      
      {/* Seahorse snout */}
      <ellipse cx="13" cy="8" rx="2" ry="1" fill={creature.color} />
      
      {/* Seahorse eye */}
      <circle cx="11" cy="7" r="1" fill="white" />
      <circle cx="11.3" cy="7" r="0.6" fill="#1e40af" />
      
      {/* Seahorse fin */}
      <motion.ellipse 
        cx="8" 
        cy="15" 
        rx="2" 
        ry="3" 
        fill={creature.color} 
        opacity="0.6"
        animate={{ rx: [2, 3, 2] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.svg>
  );

  const BubbleSVG = ({ creature }: { creature: MarineCreature }) => (
    <motion.div
      className="rounded-full bg-gradient-to-br from-cyan-200/30 to-cyan-400/20 border border-cyan-300/40"
      style={{
        width: `${creature.size * 20}px`,
        height: `${creature.size * 20}px`,
      }}
      animate={{
        y: [0, -100],
        scale: [1, 1.2, 0.8],
        opacity: [0.7, 1, 0],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeOut"
      }}
    />
  );

  const renderCreature = (creature: MarineCreature) => {
    const CreatureComponent = {
      fish: FishSVG,
      jellyfish: JellyfishSVG,
      seahorse: SeahorseSVG,
      bubble: BubbleSVG,
    }[creature.type];

    return (
      <motion.div
        key={creature.id}
        className="absolute pointer-events-none"
        style={{
          left: `${creature.x}%`,
          top: `${creature.y}%`,
          zIndex: creature.type === 'bubble' ? 1 : 2,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.2 }}
      >
        <CreatureComponent creature={creature} />
      </motion.div>
    );
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      <AnimatePresence>
        {creatures.map(renderCreature)}
      </AnimatePresence>
      
      {/* Toggle button */}
      <button
        className="fixed top-4 right-20 z-50 pointer-events-auto bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-lg p-2 text-slate-300 hover:text-primary transition-colors"
        onClick={() => setIsVisible(!isVisible)}
        title={isVisible ? 'Skrýt mořské tvory' : 'Zobrazit mořské tvory'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17C15.24 5.06 14.32 5 13.4 5C10.44 5 7.69 5.69 5.3 6.93L6.7 9.07C8.54 8.21 10.64 7.74 12.81 7.74C13.73 7.74 14.63 7.81 15.5 7.93L17 6.43L21 9ZM3.4 14.78L6.81 17.93L8.1 16.72C7.45 15.9 7.04 14.93 6.91 13.87L3.4 14.78ZM12 13.5C11.2 13.5 10.5 14.2 10.5 15S11.2 16.5 12 16.5S13.5 15.8 13.5 15S12.8 13.5 12 13.5Z"/>
        </svg>
      </button>
    </div>
  );
}