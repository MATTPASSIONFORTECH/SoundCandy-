import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoginAnimationProps {
  onComplete: () => void;
}

const LoginAnimation: React.FC<LoginAnimationProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500); // Total animation duration
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
      <div className="relative w-80 h-80">
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          
          {/* DEFINITIONS for gradients/filters */}
          <defs>
            <linearGradient id="candyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* 1. UPPER HEAD (Static) 
              Path: Nose Bridge -> Forehead -> Top of Head -> Back of Head -> Neck Start
          */}
          <motion.path
            d="M 60 100 
               L 65 80 
               Q 75 40, 120 40 
               Q 160 40, 160 100 
               L 160 130"
            fill="none"
            stroke="#A855F7" // Purple
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* 2. EAR (Static, Pivot Point) 
              Positioned around (130, 100)
          */}
          <motion.path
            d="M 125 95 
               C 135 90, 140 105, 135 115 
               C 130 120, 125 110, 125 95"
            fill="none"
            stroke="#F472B6" // Pink
            strokeWidth="3"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />

          {/* 3. LOWER JAW (Animated)
              Pivot at Ear/Jaw Joint (approx 130, 110)
              Path: Jaw Joint -> Chin -> Lower Lip
          */}
          <motion.g 
            style={{ originX: "130px", originY: "110px" }} // Pivot point
            initial={{ rotate: 15 }} // Mouth Open
            animate={{ rotate: [15, 15, -5, 0] }} // Open -> Wait -> Bite -> Rest
            transition={{ 
              duration: 2, 
              times: [0, 0.6, 0.7, 1] // Bite happens at 0.7 (1.4s)
            }}
          >
            <path
              d="M 130 110 
                 Q 120 150, 90 150 
                 Q 60 150, 60 130"
              fill="none"
              stroke="#A855F7"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.g>

          {/* 4. CANDY (Animated)
              Moves from left into the mouth area (approx 60, 115)
          */}
          <motion.g
            initial={{ x: -50, y: 115, opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{ 
              x: [0, 60, 60], // Move to mouth
              y: [115, 115, 115],
              opacity: [0, 1, 0], // Visible then disappear on bite
              scale: [0.8, 1, 0], // Shrink on bite
              rotate: [0, 180, 180]
            }}
            transition={{
              duration: 1.5,
              times: [0, 0.6, 0.7] // Matches bite timing
            }}
          >
            {/* Wrapper Left */}
            <path d="M -12 0 L -18 -6 L -18 6 Z" fill="url(#candyGradient)" />
            {/* Candy Body */}
            <circle cx="0" cy="0" r="10" fill="url(#candyGradient)" filter="url(#glow)" />
            {/* Swirl */}
            <path d="M -5 -3 Q 0 5, 5 -3" stroke="white" strokeWidth="1.5" fill="none" opacity="0.8" />
            {/* Wrapper Right */}
            <path d="M 12 0 L 18 -6 L 18 6 Z" fill="url(#candyGradient)" />
          </motion.g>

          {/* 5. CRUNCH PARTICLES (Trigger on Bite) */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <motion.line
              key={`crunch-${i}`}
              x1="0" y1="0"
              x2="10" y2="0"
              stroke="#F472B6"
              strokeWidth="2"
              initial={{ opacity: 0, x: 60, y: 115 }} // Mouth position
              animate={{ 
                opacity: [0, 1, 0],
                x: 60 + Math.cos(deg * Math.PI / 180) * 20, // Explode outward
                y: 115 + Math.sin(deg * Math.PI / 180) * 20
              }}
              transition={{ delay: 1.4, duration: 0.3 }}
            />
          ))}

          {/* 6. SOUND WAVES FROM EAR (Trigger after Bite) 
              Center: Ear (130, 105)
          */}
          {[1, 2, 3, 4].map((i) => (
            <motion.circle
              key={`wave-${i}`}
              cx="130"
              cy="105"
              r="10"
              fill="none"
              stroke={`rgba(244, 114, 182, ${1 - i * 0.2})`} // Fading pink
              strokeWidth="3"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.5, 3 + i], // Expand outward
                strokeWidth: [3, 0.5]
              }}
              transition={{
                delay: 1.5 + (i * 0.3), // Staggered start after crunch
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.5
              }}
            />
          ))}

        </svg>
      </div>

      {/* Text Animation */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 tracking-wider">
          SoundCandy
        </h2>
        <motion.p 
          className="text-gray-400 mt-2 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          Unwrapping your sound...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoginAnimation;
