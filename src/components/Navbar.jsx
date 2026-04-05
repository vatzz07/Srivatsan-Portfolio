import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import StaggeredMenu from './StaggeredMenu';

const NAV_ITEMS = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },

];

const MENU_ITEMS = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '#' },
  { label: 'About', ariaLabel: 'Learn about us', link: '#about' },
  { label: 'Projects', ariaLabel: 'View our projects', link: '#projects' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
];

const SOCIAL_ITEMS = [
  { label: 'Instagram', link: 'https://www.instagram.com/srivztz' },
  { label: 'GitHub', link: 'https://github.com/vatzz07' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/srivatsanp/' }
];


const Navbar = () => {
  const logoRef = useRef(null);
  const pillContainerRef = useRef(null);

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(logoRef.current, { scale: 0 }, { scale: 1, duration: 0.6, ease: 'power3.out' });
    }
    if (pillContainerRef.current) {
      gsap.fromTo(pillContainerRef.current, { width: 0, overflow: 'hidden' }, { width: 'auto', duration: 0.6, ease: 'power3.out' });
    }
  }, []);

  // Mobile state handled internally by StaggeredMenu

  return (
    <>
      <div className="nb-wrap">
        <nav className="nb-nav">



          {/* Desktop pill container */}
          <div className="nb-pills" ref={pillContainerRef}>
            <ul className="nb-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="nb-pill" aria-label={item.label}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className="nb-mobile-staggered">
        <StaggeredMenu
          position="left"
          items={MENU_ITEMS}
          socialItems={SOCIAL_ITEMS}
          displaySocials
          displayItemNumbering={true}
          menuButtonColor="#ffffff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={['#1a1a1a', '#0a0a0a']}
          logoUrl=""
          accentColor="#ffffff"
          isFixed={true}
        />
      </div>

      <style>{`
        .nb-wrap {
          position: fixed;
          top: 1em;
          left: 50%;
          transform: translateX(-50%);
          z-index: 99;
        }

        .nb-nav {
          display: flex;
          align-items: center;
          gap: 0;
          width: max-content;
        }

        /* ── Logo ── */
        .nb-logo {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #ffffff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          flex-shrink: 0;
        }

        .nb-logo-text {
          font-family: "Cormorant Garamond", serif;
          font-style: italic;
          font-size: 1.25rem;
          color: #000;
          line-height: 1;
        }

        /* ── Pill container ── */
        .nb-pills {
          display: flex;
          align-items: center;
          height: 42px;
          background: #ffffff;
          border-radius: 9999px;
        }

        .nb-list {
          list-style: none;
          display: flex;
          align-items: stretch;
          gap: 3px;
          margin: 0;
          padding: 3px;
          height: 100%;
        }

        .nb-list > li {
          display: flex;
          height: 100%;
        }

        /* ── Individual pill ── */
        .nb-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 0 18px;
          background: #0a0a0a;
          color: #ffffff;
          text-decoration: none;
          border-radius: 9999px;
          font-family: "DM Mono", monospace;
          font-weight: 600;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          white-space: nowrap;
          cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease;
        }

        .nb-pill:hover {
          background: #ffffff;
          color: #000000;
        }

        /* Mobile Wrapper Setup */
        .nb-mobile-staggered {
          display: none;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .nb-wrap {
            display: none;
          }
          .nb-mobile-staggered {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;