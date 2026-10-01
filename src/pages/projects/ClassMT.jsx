import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Sparkles, BookOpen, Brain, Target, Zap, Youtube, MessageSquare, FileText, Layers, HelpCircle, Briefcase, Users, Mic, Bookmark, Trophy } from 'lucide-react';
import SEO from '../../components/SEO';

// Custom icons for social media
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const features = [
  { icon: MessageSquare, title: 'Customizable Chat AI', description: 'Pick personalities or tailor your own prompts to shape tone, depth, and teaching style, from friendly coach to academic expert.' },
  { icon: FileText, title: 'AI Summarizer', description: 'Turn pages of notes into precise, meaningful summaries. Keep every key insight, lose the fluff.' },
  { icon: Layers, title: 'Instant Flashcards', description: 'Auto-generate flashcards from your text or notes. Study smarter with adaptive recall and spaced repetition built in.' },
  { icon: HelpCircle, title: 'Quiz Generator', description: 'Transform your material into interactive quizzes with hints and detailed explanations to sharpen comprehension.' },
  { icon: Briefcase, title: 'Career Launchpad', description: 'Build resumes, generate LinkedIn posts, prep interviews, and explore career matches, all powered by your own achievements.' },
  { icon: Users, title: 'Study Feed', description: 'Share and discover study challenges created by the community. Join quizzes, flashcard sets, and compete on leaderboards with fellow learners.' },
  { icon: Mic, title: 'Audio to Text Transcription', description: 'Upload audio and get a full transcript. Free: not available. Basic: 30m/mo • Advanced: 100m/mo • Pro: 300m/mo. Only text is saved, not your audio file.' },
  { icon: Bookmark, title: 'My Saves', description: 'Keep your Summaries, Flashcards, Quizzes, and Career Plans neatly organized and ready to pick up where you left off.' },
  { icon: Trophy, title: 'Motivation Engine', description: 'Earn streaks, XP, and achievements that reflect real progress, because growth feels better when you can see it.' },
];

export default function ClassMT() {
  return (
    <div className="min-h-screen">
      <SEO 
        title="ClassMT - AI Study Platform"
        description="ClassMT is your AI-powered study buddy. Generate flashcards, study guides, and personalized learning paths with cutting-edge AI technology."
        keywords="ClassMT, classmt.com, AI study app, AI flashcards, study buddy AI, AI education, personalized learning, study guides, academic support"
        url="/projects/classmt"
        image="/classmt-logo.png?v=2"
      />

      {/* Hero Section */}
      <section style={{ position: 'relative', paddingTop: '100px', paddingBottom: '60px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(56,189,248,0.05), transparent)' }} />
        
        <div style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <Link 
            to="/projects" 
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#a1a1aa', marginBottom: '32px', fontSize: '15px' }}
          >
            <ArrowLeft size={18} />
            <span>Back to Projects</span>
          </Link>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ order: 2 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '999px', padding: '8px 16px', marginBottom: '24px' }}>
                <Sparkles size={16} style={{ color: '#38BDF8' }} />
                <span style={{ fontSize: '14px', color: '#38BDF8', fontWeight: 500 }}>AI-Powered Education</span>
              </div>
              
              <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 700, color: 'white', marginBottom: '24px', lineHeight: 1.1 }}>
                ClassMT
              </h1>
              
              <p style={{ fontSize: '18px', color: '#a1a1aa', marginBottom: '32px', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 32px' }}>
                Your AI-powered study buddy and academic support platform. Transform the way you learn with intelligent flashcards, comprehensive study guides, and personalized learning paths.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <a 
                  href="https://classmt.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#38BDF8', color: 'white', padding: '14px 24px', borderRadius: '12px', fontWeight: 500, fontSize: '15px' }}
                >
                  <ExternalLink size={18} />
                  Visit Website
                </a>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                  <a href="https://www.youtube.com/@classmt" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '12px', borderRadius: '10px' }}>
                    <Youtube size={18} />
                  </a>
                  <a href="https://www.instagram.com/class_mate_ai/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '12px', borderRadius: '10px' }}>
                    <InstagramIcon />
                  </a>
                  <a href="https://www.tiktok.com/@classmt" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '12px', borderRadius: '10px' }}>
                    <TikTokIcon />
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61553983332344" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '12px', borderRadius: '10px' }}>
                    <FacebookIcon />
                  </a>
                </div>
              </div>
            </div>

            <div style={{ order: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(56,189,248,0.2)', filter: 'blur(60px)', borderRadius: '50%' }} />
                <img 
                  src="/classmt-logo.png?v=2" 
                  alt="ClassMT" 
                  style={{ position: 'relative', width: '200px', height: '200px', objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section style={{ padding: '60px 20px', backgroundColor: '#0a0a0c' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '32px', textAlign: 'center' }}>See ClassMT in Action</h2>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <iframe
              src="https://www.youtube.com/embed/jeGlIeuLjDU"
              title="ClassMT Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 20px', backgroundColor: '#0a0a0c' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '48px', textAlign: 'center' }}>Features</h2>
          
                    
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {features.map((feature, index) => (
              <div 
                key={index}
                style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}
              >
                <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(56,189,248,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <feature.icon size={24} style={{ color: '#38BDF8' }} />
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
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '16px' }}>Ready to Transform Your Learning?</h2>
          <p style={{ color: '#a1a1aa', marginBottom: '32px', fontSize: '16px' }}>
            Join thousands of students using ClassMT to study smarter, not harder.
          </p>
          <a 
            href="https://classmt.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#38BDF8', color: 'white', padding: '16px 32px', borderRadius: '12px', fontWeight: 600, fontSize: '16px' }}
          >
            Get Started Free
            <ExternalLink size={20} />
          </a>
        </div>
      </section>
    </div>
  );
}
