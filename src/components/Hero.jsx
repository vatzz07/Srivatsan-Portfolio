import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import GridScan from './GridScan';
import TextPressure from './TextPressure';
import DecryptedText from './DecryptedText';

const useIsMobile = () => {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return mobile;
};

const Hero = () => {
  const isMobile = useIsMobile();

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      {/* Layer 1: GridScan background */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <GridScan
          sensitivity={0}
          lineThickness={1}
          linesColor="#ffffff"
          gridScale={0.1}
          scanColor="#ffffff"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0}
          noiseIntensity={0.01}
        />
      </motion.div>

      {/* Layer 2: Vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Layer 3: Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 16px',
          pointerEvents: 'none',
        }}
      >
        {/* TextPressure name */}
        <div
          style={{
            position: 'relative',
            width: isMobile ? '90vw' : '70vw',
            maxWidth: 900,
            height: isMobile ? 120 : 200,
          }}
        >
          <TextPressure
            text="srivatsan"
            fontFamily="Compressa VF"
            fontUrl="https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2"
            flex={true}
            alpha={false}
            stroke={true}
            width={true}
            weight={true}
            italic={true}
            textColor="#FFFFFF"
            strokeColor="#000000"
            minFontSize={isMobile ? 32 : 48}
          />
        </div>
        
        <div
          style={{ marginTop: 20, textAlign: 'center' }}
        >
          <DecryptedText
            text="Full Stack Dev | Freelancer"
            delay={600}
            speed={50}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
