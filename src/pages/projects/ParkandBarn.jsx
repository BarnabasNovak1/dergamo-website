import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, WifiOff, FileSpreadsheet, Import, ListChecks, Search, Lock, ShieldCheck, Wallet, Download, KeyRound } from 'lucide-react';
import SEO from '../../components/SEO';

const features = [
  { icon: Import, title: 'Imports Almost Anything', description: 'Drop in bank and credit-card statements in PDF, CSV, TSV, XLSX, XLSM, OFX, or QFX. No bank login required, ever.' },
  { icon: FileSpreadsheet, title: 'Your Workbook Stays the Source of Truth', description: 'Point ParkandBarn at your own budget workbook. It reads your categories and writes results back, so your spreadsheet remains in charge.' },
  { icon: ListChecks, title: 'Rules You Can Read', description: 'Every categorization comes from simple merchant rules you can see, edit, and delete. No AI, no black box.' },
  { icon: Search, title: 'Review Queue, Not Autopilot', description: 'Uncertain purchases are flagged with a confidence level. Confirm a category, exclude a line, or add transactions manually.' },
  { icon: Wallet, title: 'A Real Month-End View', description: 'Spending by category (actual vs. planned vs. over), income, balances, net-worth trends, daily spend, and reconciliation math that shows it all adds up.' },
  { icon: Lock, title: 'Locked Down, Locally', description: 'Optional password protection stored only on your device. Data sits in a local SQLite file beside the app, and deleting the folder erases it for good.' },
];

const steps = [
  { icon: Download, num: '01', title: 'Download & run', description: 'Grab the Windows installer and open it. No setup steps between you and your first import.' },
  { icon: KeyRound, num: '02', title: 'Activate once', description: 'Enter your key. One secure check with the license server, and you\'re verified for life.' },
  { icon: WifiOff, num: '03', title: 'Go offline. Stay offline.', description: 'Turn off Wi-Fi, work on a plane, budget in a cabin. ParkandBarn doesn\'t notice or care.' },
];

export default function ParkandBarn() {
  return (
    <div className="min-h-screen">
      <SEO
        title="ParkandBarn - The Financial App"
        description="ParkandBarn is a fully offline budgeting assistant. Import bank statements, categorize spending, and reconcile against your own Excel workbook, all on your machine, forever."
        keywords="ParkandBarn, parkandbarn.com, offline budgeting app, budgeting software, financial app, privacy budgeting, Excel reconciliation, offline finance"
        url="/projects/parkandbarn"
        image="/parkandbarn-logo.png"
      />

      {/* Hero Section */}
      <section style={{ position: 'relative', paddingTop: '100px', paddingBottom: '60px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(63,176,131,0.05), transparent)' }} />

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
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(63,176,131,0.1)', border: '1px solid rgba(63,176,131,0.2)', borderRadius: '999px', padding: '8px 16px', marginBottom: '24px' }}>
                <WifiOff size={16} style={{ color: '#3fb083' }} />
                <span style={{ fontSize: '14px', color: '#3fb083', fontWeight: 500 }}>Fully Offline · No Cloud · No Telemetry</span>
              </div>

              <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 700, color: 'white', marginBottom: '24px', lineHeight: 1.1 }}>
                ParkandBarn
              </h1>

              <p style={{ fontSize: '18px', color: '#a1a1aa', marginBottom: '32px', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 32px' }}>
                The fully offline budgeting app. Import statements, review purchases, and reconcile your workbook, all with Wi-Fi off, forever. One license check, then offline forever. No AI, no cloud, no telemetry.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <a
                  href="https://parkandbarn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#3fb083', color: 'white', padding: '14px 24px', borderRadius: '12px', fontWeight: 500, fontSize: '15px' }}
                >
                  <ExternalLink size={18} />
                  Visit Website
                </a>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#a1a1aa', padding: '10px 16px', borderRadius: '10px', fontSize: '14px' }}>
                    <ShieldCheck size={16} style={{ color: '#3fb083' }} />
                    One-time purchase
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#a1a1aa', padding: '10px 16px', borderRadius: '10px', fontSize: '14px' }}>
                    <WifiOff size={16} style={{ color: '#3fb083' }} />
                    Windows · Offline only
                  </span>
                </div>
              </div>
            </div>

            <div style={{ order: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(63,176,131,0.2)', filter: 'blur(60px)', borderRadius: '50%' }} />
                <img
                  src="/parkandbarn-logo.png"
                  alt="ParkandBarn"
                  style={{ position: 'relative', width: '200px', height: '200px', objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: '60px 20px', backgroundColor: '#0a0a0c' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '48px', textAlign: 'center' }}>Three Steps. Two of Them Are Offline.</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {steps.map((step, index) => (
              <div
                key={index}
                style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(63,176,131,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <step.icon size={24} style={{ color: '#3fb083' }} />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#2a8a64', letterSpacing: '0.1em' }}>{step.num}</span>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginBottom: '8px' }}>{step.title}</h3>
                <p style={{ color: '#71717a', fontSize: '14px', lineHeight: 1.6 }}>{step.description}</p>
              </div>
            ))}
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
                <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(63,176,131,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <feature.icon size={24} style={{ color: '#3fb083' }} />
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
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '16px' }}>Pay Once. Keep It Forever.</h2>
          <p style={{ color: '#a1a1aa', marginBottom: '32px', fontSize: '16px' }}>
            No subscription. No renewal. You buy ParkandBarn once and it's yours, working offline for as long as you keep it.
          </p>
          <a
            href="https://parkandbarn.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#3fb083', color: 'white', padding: '16px 32px', borderRadius: '12px', fontWeight: 600, fontSize: '16px' }}
          >
            Try the Free Trial
            <ExternalLink size={20} />
          </a>
        </div>
      </section>
    </div>
  );
}
