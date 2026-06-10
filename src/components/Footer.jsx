import { Link } from 'react-router-dom';
import { Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#050507',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '64px 24px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          marginBottom: '48px'
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }} className="col-span-2 md:col-span-1">
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img 
                src="/dergamo-transparent.png" 
                alt="DERGAMO" 
                style={{ height: '36px', width: '36px', objectFit: 'contain' }}
              />
              <span style={{ fontSize: '18px', fontWeight: 700, color: 'white' }}>DERGAMO</span>
            </Link>
            <p style={{ color: '#52525b', fontSize: '14px', maxWidth: '280px', lineHeight: 1.6 }}>
              A creative tech company developing AI, design, and entertainment projects.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 style={{ color: 'white', fontWeight: 500, marginBottom: '16px', fontSize: '14px' }}>Navigation</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/" style={{ color: '#71717a', fontSize: '14px', transition: 'color 0.2s' }}>Home</Link>
              <Link to="/projects" style={{ color: '#71717a', fontSize: '14px', transition: 'color 0.2s' }}>Projects</Link>
              <Link to="/merch" style={{ color: '#71717a', fontSize: '14px', transition: 'color 0.2s' }}>Merch</Link>
              <Link to="/about" style={{ color: '#71717a', fontSize: '14px', transition: 'color 0.2s' }}>About</Link>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 style={{ color: 'white', fontWeight: 500, marginBottom: '16px', fontSize: '14px' }}>Projects</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/projects/classmt" style={{ color: '#71717a', fontSize: '14px', transition: 'color 0.2s' }}>ClassMT</Link>
              <Link to="/projects/framedeer" style={{ color: '#71717a', fontSize: '14px', transition: 'color 0.2s' }}>FrameDeer</Link>
              <Link to="/projects/penultimatehub" style={{ color: '#71717a', fontSize: '14px', transition: 'color 0.2s' }}>PenultimateHub</Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <p style={{ color: '#52525b', fontSize: '14px' }}>
            © {new Date().getFullYear()} DERGAMO LLC. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="https://www.linkedin.com/company/dergamo"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#71717a', transition: 'color 0.2s' }}
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://www.youtube.com/@PenultimateHub"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#71717a', transition: 'color 0.2s' }}
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
