import { Link } from 'react-router-dom';
import { ArrowLeft, Youtube, Play, Gamepad2, Users, Video, Smile } from 'lucide-react';
import SEO from '../../components/SEO';

const features = [
  { icon: Gamepad2, title: 'Gaming Content', description: 'Engaging gameplay videos and gaming commentary' },
  { icon: Users, title: 'Community', description: 'A growing community of gaming enthusiasts' },
  { icon: Video, title: 'Regular Uploads', description: 'Fresh content uploaded regularly' },
  { icon: Smile, title: 'Entertainment', description: 'Fun, entertaining content for everyone' },
];

export default function PenultimateHub() {
  return (
    <div className="min-h-screen">
      <SEO 
        title="PenultimateHub - Gaming & Lifestyle Content"
        description="PenultimateHub is a YouTube channel featuring fun gaming content, lifestyle videos, and entertainment by the DERGAMO team."
        keywords="PenultimateHub, YouTube gaming, gaming channel, lifestyle videos, DERGAMO YouTube, gaming content, entertainment"
        url="/projects/penultimatehub"
        image="/penultimatehub-transparent.png"
      />

      {/* Hero Section */}
      <section style={{ position: 'relative', paddingTop: '100px', paddingBottom: '60px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(239,68,68,0.05), transparent)' }} />
        
        <div style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <Link to="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#a1a1aa', marginBottom: '32px', fontSize: '15px' }}>
            <ArrowLeft size={18} />
            <span>Back to Projects</span>
          </Link>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ order: 2 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '999px', padding: '8px 16px', marginBottom: '24px' }}>
                <Play size={16} style={{ color: '#ef4444' }} />
                <span style={{ fontSize: '14px', color: '#ef4444', fontWeight: 500 }}>YouTube Channel</span>
              </div>
              
              <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 700, color: 'white', marginBottom: '24px', lineHeight: 1.1 }}>PenultimateHub</h1>
              
              <p style={{ fontSize: '18px', color: '#a1a1aa', marginBottom: '32px', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 32px' }}>
                Fun, gaming, and lifestyle videos by the DERGAMO team. Join us for entertaining content, gaming sessions, and good vibes.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                <a href="https://www.youtube.com/@PenultimateHub" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#ef4444', color: 'white', padding: '14px 24px', borderRadius: '12px', fontWeight: 500, fontSize: '15px' }}>
                  <Youtube size={18} />
                  Subscribe on YouTube
                </a>
              </div>
            </div>

            <div style={{ order: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(239,68,68,0.2)', filter: 'blur(60px)', borderRadius: '50%' }} />
                <img src="/penultimatehub-transparent.png" alt="PenultimateHub" style={{ position: 'relative', width: '200px', height: '200px', objectFit: 'contain' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 20px', backgroundColor: '#0a0a0c' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '48px', textAlign: 'center' }}>What We Do</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {features.map((feature, index) => (
              <div key={index} style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <feature.icon size={24} style={{ color: '#ef4444' }} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginBottom: '8px' }}>{feature.title}</h3>
                <p style={{ color: '#71717a', fontSize: '14px', lineHeight: 1.6 }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Embed Section */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '32px', textAlign: 'center' }}>Latest Content</h2>
          <div style={{ aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#0a0a0c', border: '1px solid rgba(255,255,255,0.06)' }}>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed?listType=user_uploads&list=PenultimateHub"
              title="PenultimateHub Videos"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 20px', backgroundColor: '#0a0a0c' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '16px' }}>Join the Community</h2>
          <p style={{ color: '#a1a1aa', marginBottom: '32px', fontSize: '16px' }}>
            Subscribe to PenultimateHub and never miss an upload. New content coming regularly!
          </p>
          <a href="https://www.youtube.com/@PenultimateHub?sub_confirmation=1" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#ef4444', color: 'white', padding: '16px 32px', borderRadius: '12px', fontWeight: 600, fontSize: '16px' }}>
            <Youtube size={20} />
            Subscribe Now
          </a>
        </div>
      </section>
    </div>
  );
}
