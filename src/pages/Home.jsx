import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const projects = [
  {
    name: 'ClassMT',
    logo: '/classmt-logo.png?v=2',
    description: 'Your AI-powered study buddy and academic support platform.',
    link: '/projects/classmt',
    color: '#e94560',
  },
  {
    name: 'FrameDeer',
    logo: '/framedeer-transparent.png',
    description: 'A movie review and ratings platform with film analysis and community features.',
    link: '/projects/framedeer',
    color: '#10b981',
  },
  {
    name: 'PenultimateHub',
    logo: '/penultimatehub-transparent.png',
    description: 'Fun, gaming, and lifestyle videos by the DERGAMO team.',
    link: '/projects/penultimatehub',
    color: '#ef4444',
  },
];

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [introPhase, setIntroPhase] = useState('loading');

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('dergamo-intro-seen');
    if (hasSeenIntro) {
      setShowIntro(false);
      return;
    }

    const timer1 = setTimeout(() => setIntroPhase('zooming'), 2000);
    const timer2 = setTimeout(() => {
      setIntroPhase('done');
      sessionStorage.setItem('dergamo-intro-seen', 'true');
    }, 3500);
    const timer3 = setTimeout(() => setShowIntro(false), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh' }}>
      <SEO 
        title="Home"
        description="DERGAMO LLC is a creative tech company building innovative AI solutions like ClassMT, digital experiences, and entertainment projects including FrameDeer and PenultimateHub."
        keywords="DERGAMO, DERGAMO LLC, ClassMT, classmt.com, AI study buddy, AI flashcards, FrameDeer, PenultimateHub, creative technology, AI company, tech startup, AI education, study platform"
        url="/"
      />

      {/* Intro Animation */}
      {showIntro && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          backgroundColor: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: introPhase === 'done' ? 0 : 1,
          transition: 'opacity 0.5s ease'
        }}>
          <img 
            src="/dergamo-dark.jpeg" 
            alt="DERGAMO"
            style={{
              transition: 'all 1s ease-out',
              width: introPhase === 'loading' ? '200px' : introPhase === 'zooming' ? '280px' : '320px',
              opacity: introPhase === 'loading' ? 0 : 1,
              transform: introPhase === 'loading' ? 'scale(0.9)' : introPhase === 'zooming' ? 'scale(1)' : 'scale(1.05)'
            }}
          />
        </div>
      )}

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '72px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '30%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(233,69,96,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }} />
        
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <img 
            src="/dergamo-transparent.png" 
            alt="DERGAMO" 
            style={{
              width: '640px',
              maxWidth: '90vw',
              height: 'auto',
              objectFit: 'contain',
              margin: '-80px auto 24px'
            }}
          />
          
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            fontWeight: 700,
            color: 'white',
            marginBottom: '24px',
            letterSpacing: '-0.03em',
            lineHeight: 1.1
          }}>
            DERGAMO LLC
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
            color: '#a1a1aa',
            marginBottom: '16px',
            maxWidth: '600px',
            margin: '0 auto 16px'
          }}>
            Building creative, technical, and digital experiences.
          </p>
          
          <p style={{
            color: '#52525b',
            marginBottom: '48px',
            fontSize: '0.95rem'
          }}>
            Innovators across AI, media, and design.
          </p>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center'
          }}>
            <Link
              to="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#e94560',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '15px',
                transition: 'all 0.2s'
              }}
            >
              View Projects
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/about"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '15px',
                transition: 'all 0.2s'
              }}
            >
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section style={{
        padding: '120px 24px',
        backgroundColor: '#0a0a0c'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: 'white',
              marginBottom: '16px'
            }}>
              Our Projects
            </h2>
            <p style={{ color: '#71717a', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
              Innovative solutions we're building at DERGAMO LLC.
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {projects.map((project, index) => (
              <Link
                key={index}
                to={project.link}
                style={{
                  display: 'block',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  padding: '32px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <img 
                    src={project.logo} 
                    alt={project.name}
                    style={{ width: '56px', height: '56px', objectFit: 'contain' }}
                  />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'white' }}>
                    {project.name}
                  </h3>
                </div>
                <p style={{ color: '#71717a', marginBottom: '20px', lineHeight: 1.6 }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#e94560', fontWeight: 500, fontSize: '14px' }}>
                  Learn more
                  <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: 'white',
            marginBottom: '24px'
          }}>
            About DERGAMO LLC
          </h2>
          <p style={{
            color: '#a1a1aa',
            fontSize: '1.15rem',
            lineHeight: 1.7,
            marginBottom: '40px'
          }}>
            DERGAMO LLC is a creative tech company developing AI, design, and entertainment projects. 
            We're passionate about building innovative solutions that make a difference.
          </p>
          <Link
            to="/about"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#e94560',
              fontWeight: 600,
              fontSize: '1.05rem'
            }}
          >
            Learn more about us
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
