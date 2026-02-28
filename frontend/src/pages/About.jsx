import { Link } from 'react-router-dom';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import useScrollAnimation from '../hooks/useScrollAnimation';

const NAVY = '#0F2044';
const GOLD = '#C9973A';

const About = () => {
  useScrollAnimation();

  const values = [
    { id: 'integrity', title: 'Integrity', description: 'Honest, transparent advice with no hidden fees or surprises.' },
    { id: 'excellence', title: 'Excellence', description: 'Dedication to providing the highest level of service in the industry.' },
    { id: 'personal', title: 'Personal Service', description: 'One-on-one attention tailored to your unique financial situation.' },
    { id: 'results', title: 'Results', description: 'Focused on getting you the best outcome and most favourable terms.' },
  ];

  const credentials = [
    {
      title: 'FSRA Licensed',
      desc: 'Regulated by the Financial Services Regulatory Authority of Ontario',
      note: 'License #: [YOUR LICENSE]',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    },
    {
      title: 'Education',
      desc: "Bachelor's in Finance & Certified Mortgage Professional",
      note: 'Continuing Education Credits Maintained',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    },
    {
      title: 'Experience',
      desc: 'Over 10 years helping Canadians secure the right mortgage',
      note: '500+ Successful Applications',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    },
    {
      title: 'Top Rated',
      desc: 'Consistently rated among the best brokers in the GTA',
      note: '4.9/5 Stars · 200+ Reviews',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0F2044 100%)' }}>
        <div className="container text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border"
                style={{ borderColor: 'rgba(201,151,58,0.4)', color: GOLD, background: 'rgba(201,151,58,0.08)' }}>
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 fade-up">About Our Brokerage</h1>
          <p className="text-lg max-w-2xl mx-auto fade-up stagger-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Learn about our commitment to helping Canadians achieve their homeownership goals
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="slide-left">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Priyansha, Licensed Mortgage Broker"
                className="rounded-2xl shadow-xl w-full"
                style={{ outline: '4px solid #eef7ff', outlineOffset: '4px' }}
              />
            </div>
            <div className="slide-right">
              <span className="section-label">Meet Your Broker</span>
              <h2 className="text-3xl font-bold mb-4" style={{ color: NAVY }}>Priyansha Sharma</h2>
              <p className="text-gray-600 text-lg mb-5 leading-relaxed">
                As a licensed mortgage broker with over 10 years of experience, I'm committed to providing
                personalized service and finding the best mortgage solutions for my clients.
              </p>
              <p className="text-gray-500 mb-8 leading-relaxed">
                After seeing friends and family struggle with the mortgage process and overpay on rates, I
                became a broker myself. My mission is to make the process simple, transparent, and stress-free
                for every Canadian.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['FSRA Licensed', '10+ Years Experience', '50+ Lender Partners', 'Same-Day Pre-Approval'].map((badge) => (
                  <span key={badge}
                        className="text-sm font-medium px-3 py-1.5 rounded-full border"
                        style={{ background: '#eef7ff', color: NAVY, borderColor: '#bcdfff' }}>
                    {badge}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                <Button as={Link} to="/contact" variant="primary" size="lg">Contact Me</Button>
                <Button as={Link} to="/calculator" variant="outline" size="lg">Calculate Rates</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className="text-center mb-14 fade-up">
            <span className="section-label">Credentials</span>
            <h2 className="section-title">Professional Qualifications</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Licensed and regulated by the Financial Services Regulatory Authority of Ontario
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {credentials.map((c, i) => (
              <div key={c.title}
                   className={`fade-up stagger-${i + 1} bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-5`}>
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                     style={{ background: '#eef7ff', color: NAVY }}>
                  {c.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{c.title}</h3>
                  <p className="text-gray-500 text-sm mb-1">{c.desc}</p>
                  <p className="text-xs font-medium" style={{ color: GOLD }}>{c.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-14 fade-up">
            <span className="section-label">Our Values</span>
            <h2 className="section-title">What We Stand For</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              The principles that guide how we serve our clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={value.id}
                   className={`fade-up stagger-${i + 1} p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300`}>
                <div className="w-10 h-10 rounded-full mb-4 flex items-center justify-center"
                     style={{ background: 'rgba(201,151,58,0.12)' }}>
                  <div className="w-4 h-4 rounded-full" style={{ background: GOLD }} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-white" style={{ background: NAVY }}>
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 text-white fade-up">Ready to Get Started?</h2>
          <p className="max-w-2xl mx-auto mb-8 fade-up stagger-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Contact us today for a free consultation and let's find the right mortgage for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 fade-up stagger-3">
            <Button as={Link} to="/contact" variant="white" size="lg">Contact Us</Button>
            <Button as={Link} to="/calculator" variant="outline-white" size="lg">Calculate Rates</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
