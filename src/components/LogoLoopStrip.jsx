import { motion } from 'framer-motion';
import LogoLoop from './LogoLoop';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiFigma,
  SiGit,
  SiVercel,
} from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: 'React' },
  { node: <SiNextdotjs />, title: 'Next.js' },
  { node: <SiTypescript />, title: 'TypeScript' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS' },
  { node: <SiNodedotjs />, title: 'Node.js' },
  { node: <SiPostgresql />, title: 'PostgreSQL' },
  { node: <SiMongodb />, title: 'MongoDB' },
  { node: <SiFigma />, title: 'Figma' },
  { node: <SiGit />, title: 'Git' },
  { node: <SiVercel />, title: 'Vercel' },
];

const LogoLoopStrip = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.1 }}
      style={{
        background: '#000',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      <div
        style={{
          fontFamily: '"DM Mono", monospace',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          color: '#444',
          textTransform: 'uppercase',
          paddingLeft: 24,
          marginBottom: 16,
        }}
      >
      </div>

      <div style={{ height: 60, position: 'relative', overflow: 'hidden' }}>
        <LogoLoop
          logos={techLogos}
          speed={100}
          direction="left"
          logoHeight={28}
          gap={56}
          hoverSpeed={20}
          scaleOnHover
          fadeOut
          fadeOutColor="#000000"
          ariaLabel="Tech stack"
        />
      </div>
    </motion.section>
  );
};

export default LogoLoopStrip;
