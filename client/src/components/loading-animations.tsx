import { useState, useEffect } from 'react';

interface UnderwaterLoadingProps {
  isLoading: boolean;
  message?: string;
  variant?: 'default' | 'page' | 'inline' | 'overlay';
  size?: 'sm' | 'md' | 'lg';
}

export function UnderwaterLoading({ 
  isLoading, 
  message = "Načítání...", 
  variant = 'default',
  size = 'md' 
}: UnderwaterLoadingProps) {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 800);
    
    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-16 h-16';
      case 'md': return 'w-24 h-24';
      case 'lg': return 'w-32 h-32';
      default: return 'w-24 h-24';
    }
  };

  const getContainerClasses = () => {
    switch (variant) {
      case 'page':
        return 'fixed inset-0 bg-gradient-to-b from-blue-950 via-slate-900 to-green-950 z-50 flex items-center justify-center';
      case 'overlay':
        return 'absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-40 flex items-center justify-center';
      case 'inline':
        return 'flex items-center justify-center p-4';
      default:
        return 'flex items-center justify-center min-h-[200px]';
    }
  };

  return (
    <div className={getContainerClasses()}>
      <div className="text-center space-y-6">
        {/* Main Loading Animation */}
        <div className={`relative ${getSizeClasses()} mx-auto`}>
          {/* Water Current Background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 via-cyan-300/10 to-teal-400/20 animate-pulse"></div>
          
          {/* Swimming Fish Animation */}
          <div className="relative w-full h-full">
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full animate-spin-slow"
              style={{ animationDuration: '8s' }}
            >
              {/* Fish 1 */}
              <g className={`transform-gpu transition-all duration-800 ${animationPhase === 0 ? 'opacity-100 scale-110' : 'opacity-60 scale-100'}`}>
                <path
                  d="M20 50 Q30 45 40 50 Q30 55 20 50 Z"
                  fill="url(#fishGradient1)"
                  className="animate-pulse"
                />
                <circle cx="35" cy="50" r="1.5" fill="#1e40af" />
                <path d="M15 50 Q10 47 8 50 Q10 53 15 50 Z" fill="url(#fishGradient1)" opacity="0.8" />
              </g>
              
              {/* Fish 2 */}
              <g className={`transform-gpu transition-all duration-800 ${animationPhase === 1 ? 'opacity-100 scale-110' : 'opacity-60 scale-100'}`}>
                <path
                  d="M50 20 Q60 15 70 20 Q60 25 50 20 Z"
                  fill="url(#fishGradient2)"
                  className="animate-pulse"
                  style={{ animationDelay: '0.2s' }}
                />
                <circle cx="65" cy="20" r="1.5" fill="#1e40af" />
                <path d="M45 20 Q40 17 38 20 Q40 23 45 20 Z" fill="url(#fishGradient2)" opacity="0.8" />
              </g>
              
              {/* Fish 3 */}
              <g className={`transform-gpu transition-all duration-800 ${animationPhase === 2 ? 'opacity-100 scale-110' : 'opacity-60 scale-100'}`}>
                <path
                  d="M80 50 Q70 45 60 50 Q70 55 80 50 Z"
                  fill="url(#fishGradient3)"
                  className="animate-pulse"
                  style={{ animationDelay: '0.4s' }}
                />
                <circle cx="65" cy="50" r="1.5" fill="#1e40af" />
                <path d="M85 50 Q90 47 92 50 Q90 53 85 50 Z" fill="url(#fishGradient3)" opacity="0.8" />
              </g>
              
              {/* Fish 4 */}
              <g className={`transform-gpu transition-all duration-800 ${animationPhase === 3 ? 'opacity-100 scale-110' : 'opacity-60 scale-100'}`}>
                <path
                  d="M50 80 Q40 75 30 80 Q40 85 50 80 Z"
                  fill="url(#fishGradient4)"
                  className="animate-pulse"
                  style={{ animationDelay: '0.6s' }}
                />
                <circle cx="35" cy="80" r="1.5" fill="#1e40af" />
                <path d="M55 80 Q60 77 62 80 Q60 83 55 80 Z" fill="url(#fishGradient4)" opacity="0.8" />
              </g>

              {/* Gradients */}
              <defs>
                <linearGradient id="fishGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
                <linearGradient id="fishGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="fishGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#67e8f9" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
                <linearGradient id="fishGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a7f3d0" />
                  <stop offset="100%" stopColor="#67e8f9" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Bubble Animation */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-2 left-1/4 w-1 h-1 bg-cyan-300 rounded-full animate-bubble-rise opacity-60"></div>
            <div className="absolute bottom-3 right-1/3 w-0.5 h-0.5 bg-blue-300 rounded-full animate-bubble-rise opacity-50" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-1 left-1/2 w-1.5 h-1.5 bg-teal-300 rounded-full animate-bubble-rise opacity-40" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-4 right-1/4 w-0.5 h-0.5 bg-cyan-200 rounded-full animate-bubble-rise opacity-70" style={{ animationDelay: '1.5s' }}></div>
          </div>

          {/* Central Depth Indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Loading Message */}
        <div className="text-center space-y-2">
          <p className="text-cyan-200 font-medium text-lg animate-pulse">
            {message}
          </p>
          
          {/* Loading Dots */}
          <div className="flex justify-center space-x-1">
            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1 h-1 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Wave Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden opacity-30">
          <svg 
            viewBox="0 0 400 40" 
            className="w-full h-full animate-wave"
            preserveAspectRatio="none"
          >
            <path
              d="M0,20 Q100,10 200,20 T400,20 V40 H0 Z"
              fill="url(#waveGradient)"
              className="animate-pulse"
            />
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(34, 211, 238, 0.3)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0.1)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

// Skeleton loader for cards and content
export function UnderwaterSkeleton({ 
  lines = 3, 
  className = "" 
}: { 
  lines?: number; 
  className?: string; 
}) {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      <div className="h-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded animate-shimmer"></div>
      {Array.from({ length: lines - 1 }).map((_, i) => (
        <div 
          key={i} 
          className="h-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded animate-shimmer"
          style={{ 
            width: `${Math.random() * 40 + 60}%`,
            animationDelay: `${i * 0.2}s`
          }}
        ></div>
      ))}
    </div>
  );
}

// Page transition loading
export function UnderwaterPageTransition({ isTransitioning }: { isTransitioning: boolean }) {
  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-blue-950 via-slate-900 to-green-950">
      <div className="absolute inset-0 overflow-hidden">
        {/* Swimming transition fish */}
        <div className="absolute top-1/2 -left-32 opacity-40 animate-swim-across">
          <svg width="120" height="80" viewBox="0 0 120 80" className="text-cyan-300">
            <path
              d="M20 40 Q40 30 80 40 Q40 50 20 40 Z"
              fill="currentColor"
              className="animate-pulse"
            />
            <circle cx="65" cy="40" r="3" fill="#1e40af" />
            <path d="M10 40 Q0 35 -5 40 Q0 45 10 40 Z" fill="currentColor" opacity="0.8" />
          </svg>
        </div>

        {/* Bubble stream during transition */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-300 rounded-full animate-bubble-stream opacity-50"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `-10px`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <UnderwaterLoading 
          isLoading={true} 
          message="Přecházím na další stránku..." 
          variant="inline"
          size="lg"
        />
      </div>
    </div>
  );
}

// Loading states for specific components
export function ProductCardSkeleton() {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 p-4 animate-pulse">
      <div className="aspect-square bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 rounded-lg mb-4 animate-shimmer"></div>
      <UnderwaterSkeleton lines={2} />
      <div className="mt-4 flex justify-between items-center">
        <div className="h-6 bg-slate-700 rounded w-20 animate-shimmer"></div>
        <div className="h-8 bg-slate-700 rounded w-16 animate-shimmer"></div>
      </div>
    </div>
  );
}

export function ReviewSkeleton() {
  return (
    <div className="bg-slate-800/30 rounded-lg p-4 animate-pulse">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-slate-700 rounded-full animate-shimmer"></div>
        <div className="flex-1">
          <div className="h-4 bg-slate-700 rounded w-32 mb-2 animate-shimmer"></div>
          <div className="flex space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-4 h-4 bg-slate-700 rounded animate-shimmer"></div>
            ))}
          </div>
        </div>
      </div>
      <UnderwaterSkeleton lines={3} />
    </div>
  );
}