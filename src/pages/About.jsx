import { Mail, Linkedin, Youtube } from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <SEO 
        title="About"
        description="Learn about DERGAMO LLC, a creative tech company founded to innovate across technology, creativity, and entertainment. Meet the team behind ClassMT, FrameDeer, and PenultimateHub."
        keywords="DERGAMO LLC, about DERGAMO, DERGAMO founders, DERGAMO team, tech company, AI startup, creative technology company, DERGAMO mission"
        url="/about"
      />

      {/* Hero */}
      <section style={{ padding: '0 24px', marginBottom: '80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 700,
            color: 'white',
            marginBottom: '20px'
          }}>
            About
          </h1>
          <p style={{ color: '#71717a', fontSize: '1.15rem', maxWidth: '550px', margin: '0 auto' }}>
            A creative tech company developing AI, design, and entertainment projects.
          </p>
        </div>
      </section>

      {/* Story & Mission */}
      <section style={{ padding: '0 24px', marginBottom: '80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '32px'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '16px' }}>Our Story</h2>
              <p style={{ color: '#71717a', lineHeight: 1.7 }}>
                DERGAMO LLC was founded with a clear vision: to create innovative solutions at the intersection of technology, creativity, and entertainment. What started as a shared passion for building meaningful digital experiences has evolved into a company dedicated to pushing boundaries.
              </p>
            </div>

            <div style={{
              backgroundColor: 'rgba(233,69,96,0.05)',
              border: '1px solid rgba(233,69,96,0.1)',
              borderRadius: '16px',
              padding: '32px'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '16px' }}>Our Mission</h2>
              <p style={{ color: '#a1a1aa', fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.7 }}>
                "To innovate across technology, creativity, and entertainment."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section style={{ backgroundColor: '#0a0a0c', padding: '80px 24px', marginBottom: '80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '48px', textAlign: 'center' }}>
            What We Do
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                backgroundColor: 'rgba(233,69,96,0.1)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '24px'
              }}>
                🤖
              </div>
              <h3 style={{ color: 'white', fontWeight: 500, marginBottom: '8px' }}>AI & Technology</h3>
              <p style={{ color: '#52525b', fontSize: '14px' }}>Building intelligent tools that solve real problems</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                backgroundColor: 'rgba(233,69,96,0.1)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '24px'
              }}>
                🎨
              </div>
              <h3 style={{ color: 'white', fontWeight: 500, marginBottom: '8px' }}>Design & Creative</h3>
              <p style={{ color: '#52525b', fontSize: '14px' }}>Crafting beautiful digital experiences</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                backgroundColor: 'rgba(233,69,96,0.1)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '24px'
              }}>
                🎮
              </div>
              <h3 style={{ color: 'white', fontWeight: 500, marginBottom: '8px' }}>Entertainment</h3>
              <p style={{ color: '#52525b', fontSize: '14px' }}>Creating engaging content and media</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '0 24px', marginBottom: '80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '48px', textAlign: 'center' }}>
            The Team
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {/* Founder */}
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img 
                    src="/BarnabasNovak.jpeg" 
                    alt="Barnabas Novak"
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      flexShrink: 0,
                      border: '2px solid rgba(255,255,255,0.3)'
                    }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'white', marginBottom: '2px' }}>Barnabas Novak</h3>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 500 }}>Founder</p>
                  </div>
                </div>
                <a
                  href="https://www.linkedin.com/in/barnabas-novak/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    flexShrink: 0
                  }}
                >
                  <Linkedin size={18} />
                </a>
              </div>
              <p style={{ color: '#a1a1aa', fontSize: '14px', lineHeight: 1.7 }}>
                I design and develop cutting-edge solutions bridging data science, AI, and full-stack web development. At Cal State LA, I've excelled in real-world software projects integrating AI to drive user engagement and increase efficiency. Committed to delivering robust and scalable applications, I've developed AI-driven tools generating substantial improvements in operational performance. Ready to tackle ambitious software projects that empower businesses to innovate and grow.
              </p>
            </div>

            {/* Co-Founder */}
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img 
                    src="/JustinMcDonough.jpeg" 
                    alt="Justin McDonough"
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      flexShrink: 0,
                      border: '2px solid rgba(59,130,246,0.3)'
                    }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'white', marginBottom: '2px' }}>Justin McDonough</h3>
                    <p style={{ color: '#3b82f6', fontSize: '13px', fontWeight: 500 }}>Co-Founder</p>
                  </div>
                </div>
                <a
                  href="https://www.linkedin.com/in/justinmcdonough/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    backgroundColor: 'rgba(59,130,246,0.1)',
                    borderRadius: '8px',
                    color: '#3b82f6',
                    flexShrink: 0
                  }}
                >
                  <Linkedin size={18} />
                </a>
              </div>
              <p style={{ color: '#a1a1aa', fontSize: '14px', lineHeight: 1.7 }}>
                Currently pursuing a degree in Mechanical Engineering and active with on-campus research for AM2L. Background in hospitality with essential teamwork, leadership, time management, and communication skills. Strong foundation in 3D modeling using Autodesk and SolidWorks, passionate about engineering design and optimization, eager to drive forward-thinking projects and contribute to meaningful advancements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{ padding: '0 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '12px' }}>Get in Touch</h2>
          <p style={{ color: '#71717a', marginBottom: '32px' }}>Interested in working with us? Let's connect.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <a
              href="mailto:support@dergamo.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#e94560',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: 500,
                fontSize: '15px'
              }}
            >
              <Mail size={18} />
              Email Us
            </a>
            <a
              href="https://www.linkedin.com/company/dergamo"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: 500,
                fontSize: '15px'
              }}
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
            <a
              href="https://www.youtube.com/@PenultimateHub"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: 500,
                fontSize: '15px'
              }}
            >
              <Youtube size={18} />
              YouTube
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
