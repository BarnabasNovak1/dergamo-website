import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Linkedin, Youtube } from 'lucide-react';

const projects = [
  { path: '/projects/classmt', label: 'ClassMT', desc: 'AI Study Platform' },
  { path: '/projects/framedeer', label: 'FrameDeer', desc: 'Creative Tools' },
  { path: '/projects/penultimatehub', label: 'PenultimateHub', desc: 'YouTube Channel' },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProjectsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: 'rgba(5, 5, 7, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="/dergamo-transparent.png" 
            alt="DERGAMO" 
            style={{ height: '36px', width: '36px', objectFit: 'contain' }}
          />
          <span style={{ fontSize: '18px', fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>
            DERGAMO
          </span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link
            to="/"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              color: isActive('/') ? 'white' : '#a1a1aa',
              backgroundColor: isActive('/') ? 'rgba(255,255,255,0.1)' : 'transparent',
              transition: 'all 0.2s'
            }}
          >
            Home
          </Link>

          {/* Projects Dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setProjectsOpen(!projectsOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                color: isActive('/projects') ? 'white' : '#a1a1aa',
                backgroundColor: isActive('/projects') ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Projects
              <ChevronDown size={16} style={{ 
                transform: projectsOpen ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.2s'
              }} />
            </button>

            {projectsOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#0c0c10',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '8px',
                minWidth: '220px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
              }}>
                <Link
                  to="/projects"
                  onClick={() => setProjectsOpen(false)}
                  style={{
                    display: 'block',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'white',
                    marginBottom: '4px',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    paddingBottom: '14px'
                  }}
                >
                  All Projects
                </Link>
                {projects.map((project) => (
                  <Link
                    key={project.path}
                    to={project.path}
                    onClick={() => setProjectsOpen(false)}
                    style={{
                      display: 'block',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <div style={{ fontSize: '14px', fontWeight: 500, color: 'white' }}>{project.label}</div>
                    <div style={{ fontSize: '12px', color: '#71717a', marginTop: '2px' }}>{project.desc}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/merch"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              color: isActive('/merch') ? 'white' : '#a1a1aa',
              backgroundColor: isActive('/merch') ? 'rgba(255,255,255,0.1)' : 'transparent',
              transition: 'all 0.2s'
            }}
          >
            Merch
          </Link>

          <Link
            to="/about"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              color: isActive('/about') ? 'white' : '#a1a1aa',
              backgroundColor: isActive('/about') ? 'rgba(255,255,255,0.1)' : 'transparent',
              transition: 'all 0.2s'
            }}
          >
            About
          </Link>
        </div>
        )}

        {/* Desktop Social */}
        {!isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a
            href="https://www.linkedin.com/company/dergamo"
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: '8px', color: '#71717a', transition: 'color 0.2s' }}
            onMouseEnter={(e) => e.target.style.color = 'white'}
            onMouseLeave={(e) => e.target.style.color = '#71717a'}
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://www.youtube.com/@PenultimateHub"
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: '8px', color: '#71717a', transition: 'color 0.2s' }}
            onMouseEnter={(e) => e.target.style.color = 'white'}
            onMouseLeave={(e) => e.target.style.color = '#71717a'}
          >
            <Youtube size={18} />
          </a>
        </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ padding: '12px', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div style={{
          padding: '20px 24px 32px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          backgroundColor: 'rgba(5, 5, 7, 0.98)'
        }}>
          <Link
            to="/"
            style={{
              display: 'block',
              padding: '16px 20px',
              borderRadius: '12px',
              fontSize: '17px',
              fontWeight: 600,
              color: isActive('/') ? 'white' : '#a1a1aa',
              backgroundColor: isActive('/') ? 'rgba(255,255,255,0.1)' : 'transparent',
              marginBottom: '8px'
            }}
          >
            Home
          </Link>
          <Link
            to="/projects"
            style={{
              display: 'block',
              padding: '16px 20px',
              borderRadius: '12px',
              fontSize: '17px',
              fontWeight: 600,
              color: isActive('/projects') ? 'white' : '#a1a1aa',
              backgroundColor: isActive('/projects') ? 'rgba(255,255,255,0.1)' : 'transparent',
              marginBottom: '8px'
            }}
          >
            Projects
          </Link>
          <div style={{ paddingLeft: '20px', marginBottom: '8px' }}>
            {projects.map((project) => (
              <Link
                key={project.path}
                to={project.path}
                style={{
                  display: 'block',
                  padding: '14px 20px',
                  fontSize: '15px',
                  color: isActive(project.path) ? 'white' : '#71717a'
                }}
              >
                {project.label}
              </Link>
            ))}
          </div>
          <Link
            to="/merch"
            style={{
              display: 'block',
              padding: '16px 20px',
              borderRadius: '12px',
              fontSize: '17px',
              fontWeight: 600,
              color: isActive('/merch') ? 'white' : '#a1a1aa',
              backgroundColor: isActive('/merch') ? 'rgba(255,255,255,0.1)' : 'transparent',
              marginBottom: '8px'
            }}
          >
            Merch
          </Link>
          <Link
            to="/about"
            style={{
              display: 'block',
              padding: '16px 20px',
              borderRadius: '12px',
              fontSize: '17px',
              fontWeight: 600,
              color: isActive('/about') ? 'white' : '#a1a1aa',
              backgroundColor: isActive('/about') ? 'rgba(255,255,255,0.1)' : 'transparent'
            }}
          >
            About
          </Link>
          <div style={{ 
            display: 'flex', 
            gap: '24px', 
            marginTop: '24px', 
            paddingTop: '24px',
            borderTop: '1px solid rgba(255,255,255,0.06)'
          }}>
            <a href="https://www.linkedin.com/company/dergamo" target="_blank" rel="noopener noreferrer" style={{ color: '#a1a1aa', padding: '8px' }}>
              <Linkedin size={24} />
            </a>
            <a href="https://www.youtube.com/@PenultimateHub" target="_blank" rel="noopener noreferrer" style={{ color: '#a1a1aa', padding: '8px' }}>
              <Youtube size={24} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
