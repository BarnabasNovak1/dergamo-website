import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';

const projects = [
  {
    id: 'classmt',
    name: 'ClassMT',
    logo: '/classmt-logo.png?v=2',
    tagline: 'Your AI-powered study buddy',
    description: 'An AI-powered academic support platform with intelligent flashcards, study guides, and personalized learning paths.',
    link: '/projects/classmt',
    external: 'https://classmt.com',
    color: '#38BDF8',
  },
  {
    id: 'framedeer',
    name: 'FrameDeer',
    logo: '/framedeer-transparent.png',
    tagline: 'Movie reviews and ratings',
    description: 'A movie review and ratings platform featuring comprehensive film analysis, curated lists, and community features.',
    link: '/projects/framedeer',
    external: 'https://framedeer.com',
    color: '#10b981',
  },
  {
    id: 'penultimatehub',
    name: 'PenultimateHub',
    logo: '/penultimatehub-transparent.png',
    tagline: 'Gaming, fun, and lifestyle content',
    description: 'Our YouTube channel featuring gaming content, lifestyle videos, and entertainment from the DERGAMO team.',
    link: '/projects/penultimatehub',
    external: 'https://www.youtube.com/@PenultimateHub',
    color: '#ef4444',
  },
];

export default function Projects() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <SEO 
        title="Projects"
        description="Explore DERGAMO LLC's innovative projects: ClassMT - AI-powered study platform, FrameDeer - creative digital tools, and PenultimateHub - gaming and lifestyle content."
        keywords="ClassMT, classmt.com, AI study app, AI flashcards, FrameDeer, PenultimateHub, YouTube gaming, DERGAMO projects, AI education platform, study buddy AI"
        url="/projects"
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
            Our Projects
          </h1>
          <p style={{ color: '#71717a', fontSize: '1.15rem', maxWidth: '500px', margin: '0 auto' }}>
            Innovative solutions we're building at DERGAMO LLC.
          </p>
        </div>
      </section>

      {/* Projects List */}
      <section style={{ padding: '0 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {projects.map((project) => (
              <Link
                key={project.id}
                to={project.link}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '32px',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '20px',
                  padding: '40px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                }}
                className="md:flex-row"
              >
                {/* Image */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minWidth: '200px'
                }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      inset: '-20px',
                      background: `radial-gradient(circle, ${project.color}30 0%, transparent 70%)`,
                      borderRadius: '50%',
                      filter: 'blur(20px)'
                    }} />
                    <img 
                      src={project.logo} 
                      alt={project.name}
                      style={{
                        position: 'relative',
                        width: '140px',
                        height: '140px',
                        objectFit: 'contain',
                        transform: project.id !== 'classmt' ? 'scale(2)' : 'none'
                      }}
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div style={{ flex: 1, textAlign: 'center' }} className="md:text-left">
                  <p style={{ color: project.color, fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                    {project.tagline}
                  </p>
                  <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: 'white',
                    marginBottom: '12px'
                  }}>
                    {project.name}
                  </h2>
                  <p style={{ color: '#71717a', marginBottom: '24px', lineHeight: 1.6 }}>
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }} className="md:justify-start">
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: project.color,
                      fontWeight: 500,
                      fontSize: '15px'
                    }}>
                      Learn more
                      <ArrowRight size={18} />
                    </span>
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#52525b',
                        fontSize: '14px'
                      }}
                    >
                      <ExternalLink size={14} />
                      Visit site
                    </a>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 24px', marginTop: '100px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            padding: '48px'
          }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '12px' }}>
              More Coming Soon
            </h2>
            <p style={{ color: '#71717a' }}>
              We're always working on new and exciting projects. Stay tuned for more innovations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
