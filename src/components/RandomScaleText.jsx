import { useEffect, useRef } from 'react';

const RandomScaleText = ({ text, className, style }) => {
  const containerRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const spans = containerRef.current?.querySelectorAll('.rs-char');
    if (!spans || spans.length === 0) return;

    // Give each character a random phase offset and speed
    const charData = Array.from(spans).map(() => ({
      phase: Math.random() * Math.PI * 2,
      speed: 0.8 + Math.random() * 1.5,
      minScale: 0.6 + Math.random() * 0.2,
      maxScale: 1.0 + Math.random() * 0.3,
    }));

    const animate = (time) => {
      const t = time / 1000;
      spans.forEach((span, i) => {
        const d = charData[i];
        const wave = Math.sin(t * d.speed + d.phase);
        const scale = d.minScale + (d.maxScale - d.minScale) * ((wave + 1) / 2);
        span.style.transform = `scale(${scale})`;
        span.style.opacity = 0.4 + 0.6 * ((wave + 1) / 2);
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text]);

  const words = text.split(' ');

  return (
    <div ref={containerRef} className={className} style={style}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, ci) => (
            <span
              key={`${wi}-${ci}`}
              className="rs-char"
              style={{
                display: 'inline-block',
                willChange: 'transform',
                transition: 'none',
              }}
            >
              {char}
            </span>
          ))}
          {wi < words.length - 1 && (
            <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default RandomScaleText;
