import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Film, Star, Users, List, Youtube } from 'lucide-react';
import SEO from '../../components/SEO';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const features = [
  { icon: Film, title: 'Movie Reviews', description: 'In-depth reviews and ratings for movies and series' },
  { icon: Star, title: 'Ratings System', description: 'Comprehensive rating breakdowns and user scores' },
  { icon: Users, title: 'Community', description: 'Connect with other film enthusiasts and share opinions' },
  { icon: List, title: 'Curated Lists', description: 'Create watchlists, favorites, and top 3 lists' },
];

export default function FrameDeer() {
  return (
    <div className="min-h-screen">
      <SEO 
        title="FrameDeer - Movie Reviews and Ratings"
        description="FrameDeer is a movie review and ratings platform by DERGAMO LLC featuring comprehensive film analysis, curated lists, and community features."
        keywords="FrameDeer, movie reviews, film ratings, movie ratings, film reviews, DERGAMO, movie platform, film analysis"
        url="/projects/framedeer"
        image="/framedeer-transparent.png"
      />

      {/* Hero Section */}
      <section style={{ position: 'relative', paddingTop: '100px', paddingBottom: '60px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(16,185,129,0.05), transparent)' }} />
        
        <div style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <Link to="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#a1a1aa', marginBottom: '32px', fontSize: '15px' }}>
            <ArrowLeft size={18} />
            <span>Back to Projects</span>
          </Link>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ order: 2 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '999px', padding: '8px 16px', marginBottom: '24px' }}>
                <Film size={16} style={{ color: '#10b981' }} />
                <span style={{ fontSize: '14px', color: '#10b981', fontWeight: 500 }}>Movie Reviews</span>
              </div>
              
              <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 700, color: 'white', marginBottom: '24px', lineHeight: 1.1 }}>FrameDeer</h1>
              
              <p style={{ fontSize: '18px', color: '#a1a1aa', marginBottom: '32px', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 32px' }}>
                A movie review and ratings platform featuring comprehensive film analysis, curated lists, and community features. Discover your next favorite film.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <a href="https://framedeer.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#10b981', color: 'white', padding: '14px 24px', borderRadius: '12px', fontWeight: 500, fontSize: '15px' }}>
                  <ExternalLink size={18} />
                  Visit Website
                </a>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                  <a href="https://www.youtube.com/@FrameDeer" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '12px', borderRadius: '10px' }}>
                    <Youtube size={18} />
                  </a>
                  <a href="https://www.instagram.com/framedeer" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '12px', borderRadius: '10px' }}>
                    <InstagramIcon />
                  </a>
                  <a href="https://x.com/FrameDeer" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '12px', borderRadius: '10px' }}>
                    <XIcon />
                  </a>
                </div>
              </div>
            </div>

            <div style={{ order: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(16,185,129,0.2)', filter: 'blur(60px)', borderRadius: '50%' }} />
                <img src="/framedeer-transparent.png" alt="FrameDeer" style={{ position: 'relative', width: '200px', height: '200px', objectFit: 'contain' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 20px', backgroundColor: '#0a0a0c' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '48px', textAlign: 'center' }}>Features</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {features.map((feature, index) => (
              <div key={index} style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <feature.icon size={24} style={{ color: '#10b981' }} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginBottom: '8px' }}>{feature.title}</h3>
                <p style={{ color: '#71717a', fontSize: '14px', lineHeight: 1.6 }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '16px' }}>Start Exploring Today</h2>
          <p style={{ color: '#a1a1aa', marginBottom: '32px', fontSize: '16px' }}>
            Explore FrameDeer and discover movies, read reviews, and join the community.
          </p>
          <a href="https://framedeer.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#10b981', color: 'white', padding: '16px 32px', borderRadius: '12px', fontWeight: 600, fontSize: '16px' }}>
            Explore FrameDeer
            <ExternalLink size={20} />
          </a>
        </div>
      </section>
    </div>
  );
}
