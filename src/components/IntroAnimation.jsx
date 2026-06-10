import { useState, useEffect } from 'react';

export default function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState('video'); // 'video' | 'image' | 'done'
  const [imageReady, setImageReady] = useState(false);

  useEffect(() => {
    // Check if user has seen intro in this session
    const hasSeenIntro = sessionStorage.getItem('dergamo-intro-seen');
    if (hasSeenIntro) {
      setPhase('done');
      onComplete?.();
      return;
    }

    // Play intro sequence
    const timer = setTimeout(() => {
      setPhase('image');
      sessionStorage.setItem('dergamo-intro-seen', 'true');
      
      // After image animation completes
      setTimeout(() => {
        setPhase('done');
        onComplete?.();
      }, 1500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {phase === 'video' && (
        <div className="relative w-full h-full flex items-center justify-center animate-pulse">
          <img 
            src="/dergamo-transparent.png" 
            alt="DERGAMO"
            className="w-48 md:w-64 opacity-0 animate-fade-in"
          />
        </div>
      )}
      
      {phase === 'image' && (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <img 
            src="/dergamo-dark.jpeg" 
            alt="DERGAMO"
            onLoad={() => setImageReady(true)}
            className={`w-64 md:w-80 transition-all duration-1000 ease-out ${
              imageReady ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          />
        </div>
      )}
    </div>
  );
}
