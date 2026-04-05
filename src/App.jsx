import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoLoopStrip from './components/LogoLoopStrip';
import ElectricBorder from './components/ElectricBorder';
import ScrollRevealText from './components/ScrollRevealText';
import TiltedCard from './components/TiltedCard';
import vatzImg from '../Vatz.jpg';
import cielVid from '../Ciel.mov';
import bellVid from '../BellNeedles.mov';
import astroVid from '../Astrodate.mov';
import sbImg from '../Sb.png';
import tvOffAudio from '../tv off.mp3';
import TargetCursor from './components/TargetCursor';
import ScrollStack, { ScrollStackItem } from './components/ScrollStack';
import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import Lenis from 'lenis';

function App() {
  const aboutRef = useRef(null);
  const audioRef = useRef(null);
   const [isMuted, setIsMuted] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [isAboutIntersecting, setIsAboutIntersecting] = useState(false);
  const [showAudioButton, setShowAudioButton] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

   // Unlock audio context on first user interaction
  useEffect(() => {
    const unlock = () => {
      if (audioUnlocked) return;
      setAudioUnlocked(true);
      // Play and immediately pause to "prime" the audio element
      audioRef.current?.play()
        .then(() => audioRef.current?.pause())
        .catch(() => {});
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
    };
    window.addEventListener('click', unlock);
    window.addEventListener('touchstart', unlock);
    return () => {
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
    };
  }, [audioUnlocked]);

   useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsAboutIntersecting(entry.isIntersecting);
          if (entry.isIntersecting) {
            setShowAudioButton(true);
            if (audioUnlocked && !isMuted) {
              audioRef.current?.play().catch(e => console.log('Autoplay blocked:', e));
            }
          } else {
            audioRef.current?.pause();
            setShowAudioButton(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }
    return () => observer.disconnect();
  }, [audioUnlocked, isMuted]);

  // Sync play state when audio is unlocked via first click
  useEffect(() => {
    if (audioUnlocked && isAboutIntersecting && !isMuted) {
      audioRef.current?.play().catch(() => {});
    }
  }, [audioUnlocked, isAboutIntersecting, isMuted]);

  // Global Lenis Smooth Scrolling Engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      if (isMuted) {
        audioRef.current.play().catch(e => console.log('Autoplay blocked:', e));
      }
    }
  };

  return (
    <>
      <Navbar />
      <TargetCursor spinDuration={2} hideDefaultCursor={false} parallaxOn={true} hoverDuration={0.2} />
      <audio 
        ref={audioRef} 
        src={tvOffAudio} 
        loop 
        muted={isMuted} 
        preload="auto"
      />

      {/* Audio Toggle Button */}
      <button
        onClick={toggleMute}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '50px',
          padding: '12px 20px',
          color: '#fff',
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s ease',
          opacity: showAudioButton ? 1 : 0,
          pointerEvents: showAudioButton ? 'auto' : 'none',
          transform: showAudioButton ? 'translateY(0)' : 'translateY(10px)'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)' }}
      >
        {isMuted ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
            Unmute
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            Mute
          </>
        )}
      </button>

      <main>
        {/* ── Home ── */}
        <Hero />
        <LogoLoopStrip />

        {/* ── About ── */}
        <section
          id="about"
          ref={aboutRef}
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 24px',
            background: '#000000ff',
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '4rem',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '1200px',
            width: '100%'
          }}>
            <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
              <ElectricBorder
                color="#fafafa"
                speed={1}
                chaos={0.12}
                style={{ borderRadius: 16, padding: '8px', background: 'rgba(255,255,255,0.02)' }}
              >
                <div style={{ display: 'flex', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden' }}>
                  <img src={vatzImg} alt="Vatz" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 'inherit' }} />
                </div>
              </ElectricBorder>
            </div>

            <div style={{ flex: '1 1 400px' }}>
              <ScrollRevealText
                text="Full-stack developer for web and app, driving marketing, growth, and everything beyond."
                style={{
                  color: '#fff',
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: '2.25rem',
                  lineHeight: '1.6',
                }}
              />
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section
          id="projects"
          style={{
            minHeight: '100vh',
            padding: '80px 24px',
            background: '#000',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            position: 'relative',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: '#fff', fontSize: '3rem', margin: 0, letterSpacing: '1px', fontWeight: 800 }}>
              PROJECTS
            </h2>
          </div>

          {isMobileView ? (
            <ScrollStack
              className="proj-mobile-stack"
              itemDistance={100}
              itemStackDistance={40}
              stackPosition="20%"
              scaleEndPosition="10%"
              baseScale={0.85}
              scaleDuration={0.8}
              useWindowScroll={true}
            >
              {[
                { title: 'Ciel Infitech', url: 'https://www.cielinfitech.com/', video: cielVid },
                { title: 'Bell Needles', url: 'https://bell-needles-nu.vercel.app/', video: bellVid },
                { title: 'Astro Date', url: 'https://www.astrodate.in/', video: astroVid },
                { title: 'Sukumar Balakrishnan', url: 'https://sukumar-balakrishnan.vercel.app/', image: sbImg }
              ].map((proj, i) => (
                <ScrollStackItem key={i} itemClassName="proj-scroll-card">
                  <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, borderRadius: 'inherit' }}>
                    {proj.video ? (
                      <video src={proj.video} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit', background: '#0a0a0a' }} />
                    ) : (
                      <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit', background: '#0a0a0a' }} />
                    )}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                      padding: '1.25rem',
                      background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
                      color: '#fff',
                      borderRadius: '0 0 28px 28px'
                    }}>
                      <h3 style={{ margin: 0, fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>{proj.title}</h3>
                      <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '0.75rem', fontWeight: 800, opacity: 0.6, letterSpacing: '3px', marginTop: '4px', display: 'block' }}>VIEW LIVE SITE ↗</span>
                    </div>
                  </a>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          ) : (
            <div className="tilted-grid-container">
              {[
                { title: 'Ciel Infitech', url: 'https://www.cielinfitech.com/', video: cielVid },
                { title: 'Bell Needles', url: 'https://bell-needles-nu.vercel.app/', video: bellVid },
                { title: 'Astro Date', url: 'https://www.astrodate.in/', video: astroVid },
                { title: 'Sukumar Balakrishnan', url: 'https://sukumar-balakrishnan.vercel.app/', image: sbImg }
              ].map((proj, i) => (
                <TiltedCard
                  key={i}
                  imageSrc={proj.image || ''}
                  videoSrc={proj.video}
                  altText={proj.title}
                  captionText={proj.title}
                  url={proj.url}
                  containerHeight="100%"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  rotateAmplitude={8}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={
                    <div style={{
                      padding: '20px',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end'
                    }}>
                      <h3 style={{ margin: 0, fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{proj.title}</h3>
                      <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '0.7rem', fontWeight: 700, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '2px', marginTop: '6px' }}>VIEW LIVE SITE ↗</span>
                    </div>
                  }
                />
              ))}
            </div>
          )}

          <style>{`
            .tilted-grid-container {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 50px;
              max-width: 1400px;
              margin: 0 auto;
            }

            .tilted-grid-container > figure {
              aspect-ratio: 16 / 10;
              width: 100%;
              border: 1px solid rgba(255, 255, 255, 0.15);
              border-radius: 20px;
              overflow: hidden;
            }

            /* ScrollStack mobile overrides */
            .proj-mobile-stack {
              width: 100%;
            }
            .proj-scroll-card {
              aspect-ratio: 16 / 10;
              height: auto !important;
              width: 94%;
              max-width: 800px;
              margin: 25px auto !important;
              padding: 0 !important;
              border-radius: 28px !important;
              overflow: hidden;
              position: relative;
              box-shadow: 0 20px 40px rgba(0,0,0,0.4);
              border: 1px solid rgba(255, 255, 255, 0.2);
            }

            @media (max-width: 768px) {
              .tilted-grid-container {
                display: none;
              }
            }
          `}</style>

        </section>

        {/* ── Contact ── */}
        <section
          id="contact"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 24px',
            background: '#0a0a0a',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            flexDirection: 'column',
            cursor: 'none'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: '#fff', fontSize: '3rem', margin: 0, letterSpacing: '1px', fontWeight: 800 }}>
              LET'S CONNECT
            </h2>
          </div>

          <div className="contact-grid">
            <a href="https://www.instagram.com/srivztz" target="_blank" rel="noopener noreferrer" className="cursor-target contact-item">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/srivatsanp/" target="_blank" rel="noopener noreferrer" className="cursor-target contact-item">
              <FaLinkedin />
            </a>
            <a href="https://github.com/vatzz07" target="_blank" rel="noopener noreferrer" className="cursor-target contact-item">
              <FaGithub />
            </a>
            <button
              className="cursor-target contact-item contact-item-wide"
              onClick={() => setIsContactModalOpen(true)}
            >
              psrivatsan407@gmail.com            </button>
          </div>

          <style>{`
            .contact-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 2rem;
              width: 100%;
              max-width: 900px;
              margin: 0 auto;
            }

            .contact-item {
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 140px;
              border: 2px dashed rgba(255, 255, 255, 0.4);
              border-radius: 24px;
              color: #ffffff;
              font-size: 3rem;
              text-decoration: none;
              transition: border-color 0.3s ease, color 0.3s ease;
              background: transparent;
            }
            
            .contact-item:hover {
              border-color: rgba(255, 255, 255, 1);
              color: #ffffff;
            }

            .contact-item-wide {
              grid-column: 1 / -1;
              font-family: "Plus Jakarta Sans", sans-serif;
              font-size: 2.5rem;
              font-weight: 900;
              letter-spacing: 2px;
              text-transform: uppercase;
            }

            @media (max-width: 768px) {
              .contact-grid {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 2.5rem;
                margin-top: 20px;
              }
              .contact-item {
                min-height: auto;
                padding: 0;
                border: none;
                border-radius: 0;
                filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.8));
              }
              .contact-item-wide {
                width: 100%;
                font-size: 1.1rem;
                padding: 20px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 50px;
                filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.4));
                margin-top: 10px;
              }
            }
          `}</style>
        </section>
      </main>

      {/* Contact Form Modal */}
      {isContactModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000000
        }}>
          <div style={{ background: '#111', padding: '40px', borderRadius: '24px', width: '90%', maxWidth: '500px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, color: '#fff', fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '1.8rem', fontWeight: 800 }}>Start a Project</h2>
              <button
                onClick={() => setIsContactModalOpen(false)}
                style={{ background: 'rgba(255,255,255,0.1)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                &times;
              </button>
            </div>
            <form action="https://formsubmit.co/psrivatsan407@gmail.com" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="text" name="name" placeholder="Your Name" required style={{ width: '100%', boxSizing: 'border-box', padding: '16px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '12px', fontFamily: '"Plus Jakarta Sans", sans-serif' }} />
              <input type="email" name="email" placeholder="Your Email" required style={{ width: '100%', boxSizing: 'border-box', padding: '16px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '12px', fontFamily: '"Plus Jakarta Sans", sans-serif' }} />
              <textarea name="requirement" placeholder="Describe your requirement..." rows="5" required style={{ width: '100%', boxSizing: 'border-box', padding: '16px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '12px', fontFamily: '"Plus Jakarta Sans", sans-serif', resize: 'vertical' }}></textarea>
              {/* FormSubmit internal settings */}
              <input type="hidden" name="_subject" value="New Portfolio Inquiry!" />
              <input type="hidden" name="_captcha" value="false" />
              <button type="submit" style={{ padding: '16px', background: '#5227FF', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '1rem', fontFamily: '"Plus Jakarta Sans", sans-serif', cursor: 'pointer', marginTop: '12px' }}>
                Send Direct Message
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
