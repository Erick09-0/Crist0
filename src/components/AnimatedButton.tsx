import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface AnimatedButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function AnimatedButton({ onClick, children }: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className="relative group cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Shadow layers */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full blur-xl pointer-events-none"
        animate={{
          opacity: isPressed ? 0.3 : isHovered ? 0.6 : 0.4,
          scale: isPressed ? 0.95 : isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Multiple shadow layers for depth */}
      <div className="absolute inset-0 rounded-full opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-purple-500 rounded-full blur-md transform translate-y-1 translate-x-1" />
        <div className="absolute inset-0 bg-purple-500 rounded-full blur-lg transform translate-y-2 translate-x-2" />
        <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl transform translate-y-3 translate-x-3" />
      </div>

      {/* Main button */}
      <div className="relative pointer-events-none">
        {/* Border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-full p-[3px]">
          <div className="h-full w-full rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600" />
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden"
          initial={false}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
            animate={isHovered ? {
              opacity: [0, 0.3, 0],
              x: ['-100%', '200%'],
            } : {}}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 0.5,
            }}
          />
        </motion.div>

        {/* Button content */}
        <div className="relative px-12 py-6 flex items-center gap-4">
          {/* Text with glow */}
          <motion.span
            className="text-2xl md:text-3xl text-white relative z-10"
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.5), 0 2px 4px rgba(0,0,0,0.3)',
            }}
            animate={isHovered ? {
              textShadow: [
                '0 0 20px rgba(255,255,255,0.5), 0 2px 4px rgba(0,0,0,0.3)',
                '0 0 30px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.3)',
                '0 0 20px rgba(255,255,255,0.5), 0 2px 4px rgba(0,0,0,0.3)',
              ]
            } : {}}
            transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
          >
            {children}
          </motion.span>

          {/* Animated icon */}
          <motion.div
            className="relative w-12 h-12 flex items-center justify-center"
            animate={isHovered ? {
              x: [0, 5, 0],
            } : {}}
            transition={{
              duration: 0.8,
              repeat: isHovered ? Infinity : 0,
              repeatType: "reverse",
            }}
          >
            <div className="absolute inset-0 bg-white/20 rounded-full" />
            <ArrowRight className="w-6 h-6 text-white relative z-10" />
          </motion.div>

          {/* Particle effects on hover */}
          {isHovered && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  initial={{
                    x: '50%',
                    y: '50%',
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: `${50 + Math.cos((i * Math.PI * 2) / 6) * 100}%`,
                    y: `${50 + Math.sin((i * Math.PI * 2) / 6) * 100}%`,
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* Inner glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/20 pointer-events-none" />
      </div>

      {/* Click splash effect */}
      {isPressed && (
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-white pointer-events-none"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.button>
  );
}