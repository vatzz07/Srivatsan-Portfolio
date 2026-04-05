import React, { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollRevealText = ({ text, style, className }) => {
  const containerRef = useRef(null);
  
  // Track scroll progress when this container is in view
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start revealing when the container hits 80% from top of viewport, 
    // finish when it hits 50% from top.
    offset: ["start 80%", "end 50%"]
  });

  const words = text.split(" ");

  return (
    <div 
      ref={containerRef} 
      className={className} 
      style={{ ...style, display: 'flex', flexWrap: 'wrap', gap: '0.25em' }}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress}>
            {word}
          </Word>
        );
      })}
    </div>
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }}>
      {children}
    </motion.span>
  );
};

export default ScrollRevealText;
