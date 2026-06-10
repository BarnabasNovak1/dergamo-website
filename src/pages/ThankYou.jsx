import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function ThankYou() {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/merch');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      backgroundColor: '#050507'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
        textAlign: 'center',
        maxWidth: '400px'
      }}>
        {/* Logo */}
        <img 
          src="/dergamo-transparent.png" 
          alt="DERGAMO" 
          style={{ 
            width: '180px', 
            height: 'auto',
            marginBottom: '16px'
          }} 
        />

        {/* Success Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <CheckCircle size={48} style={{ color: '#22c55e' }} />
        </div>

        {/* Thank You Message */}
        <div>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            color: 'white', 
            marginBottom: '12px' 
          }}>
            Thank You for Your Payment!
          </h1>
          <p style={{ 
            color: '#a1a1aa', 
            fontSize: '16px', 
            lineHeight: 1.6 
          }}>
            Your order has been confirmed and is being processed.
          </p>
        </div>

        {/* Countdown */}
        <p style={{ 
          color: '#71717a', 
          fontSize: '14px',
          marginTop: '16px'
        }}>
          Redirecting to store in <span style={{ color: '#e94560', fontWeight: 600 }}>{countdown}</span> second{countdown !== 1 ? 's' : ''}...
        </p>

        {/* Manual Link */}
        <a 
          href="/merch"
          style={{
            color: '#e94560',
            fontSize: '14px',
            textDecoration: 'underline'
          }}
        >
          Go to store now
        </a>
      </div>
    </div>
  );
}
