import { useEffect, useState, useRef } from 'react';

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

const DecryptedText = ({
  text = 'Full Stack Dev | Freelancer',
  delay = 600,
  speed = 50,
}) => {
  const [display, setDisplay] = useState(() => Array(text.length).fill(''));
  const [resolved, setResolved] = useState(() => Array(text.length).fill(false));
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const scrambleIntervals = [];

    const initialDelay = setTimeout(() => {
      // Start scrambling all characters immediately
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          setDisplay(prev => { const n = [...prev]; n[i] = ' '; return n; });
          setResolved(prev => { const n = [...prev]; n[i] = true; return n; });
          continue;
        }

        const interval = setInterval(() => {
          setDisplay(prev => {
            const n = [...prev];
            n[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
            return n;
          });
        }, 60);
        scrambleIntervals.push({ index: i, interval });

        // Resolve this character after staggered delay
        const charDelay = i * speed + Math.random() * 800;
        const cycleCount = 3 + Math.floor(Math.random() * 4);
        const resolveTime = charDelay + cycleCount * 60;

        setTimeout(() => {
          const entry = scrambleIntervals.find(s => s.index === i);
          if (entry) clearInterval(entry.interval);
          setDisplay(prev => { const n = [...prev]; n[i] = text[i]; return n; });
          setResolved(prev => { const n = [...prev]; n[i] = true; return n; });
        }, resolveTime);
      }
    }, delay);

    return () => {
      clearTimeout(initialDelay);
      scrambleIntervals.forEach(s => clearInterval(s.interval));
      startedRef.current = false;
    };
  }, [text, delay, speed]);

  return (
    <span
      style={{
        fontFamily: '"DM Mono", monospace',
        fontSize: 'clamp(0.85rem, 2.5vw, 1.15rem)',
        letterSpacing: '0.15em',
        display: 'inline-flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
      aria-label={text}
    >
      {display.map((char, i) => {
        const isPipe = text[i] === '|';
        const isResolved = resolved[i];
        return (
          <span
            key={i}
            style={{
              color: isPipe && isResolved ? '#C8F04B' : isResolved ? '#888888' : 'rgba(255,255,255,0.5)',
              transition: isResolved ? 'color 0.3s ease' : 'none',
              animation: isPipe && isResolved ? 'pipePulse 2s ease-in-out infinite' : 'none',
              minWidth: char === ' ' ? '0.5em' : 'auto',
            }}
          >
            {char || '\u00A0'}
          </span>
        );
      })}
      <style>{`
        @keyframes pipePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </span>
  );
};

export default DecryptedText;
