import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import useScrollAnimation from '../hooks/useScrollAnimation';

const NAVY = '#0F2044';
const GOLD = '#C9973A';

const services = [
  {
    id: 'purchase', title: 'Purchase Mortgages',
    description: 'Find the perfect mortgage for your dream home with competitive rates and flexible terms tailored to your situation.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  },
  {
    id: 'refinance', title: 'Refinancing',
    description: 'Lower your payments, access equity, or consolidate debt with our refinancing solutions.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>,
  },
  {
    id: 'pre-approval', title: 'Pre-Approval',
    description: 'Know exactly what you can afford before house hunting with our fast pre-approval process.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  },
  {
    id: 'first-time', title: 'First-Time Buyers',
    description: 'Specialized programs and step-by-step guidance for your first home purchase journey.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  },
  {
    id: 'renewals', title: 'Renewals',
    description: 'Maximize savings when your mortgage term ends with our renewal negotiation services.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  },
  {
    id: 'investment', title: 'Investment Properties',
    description: 'Strategic financing solutions for building your real estate investment portfolio.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
];

// Stagger cycles back after 6
const staggerClass = (i) => `stagger-${(i % 6) + 1}`;

const Services = () => {
  useScrollAnimation();

  return (
    <div>
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0F2044 100%)' }}>
        <div className="container text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border"
                style={{ borderColor: 'rgba(201,151,58,0.4)', color: GOLD, background: 'rgba(201,151,58,0.08)' }}>
            What We Offer
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 fade-up">Our Mortgage Services</h1>
          <p className="text-lg max-w-2xl mx-auto fade-up stagger-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Comprehensive mortgage solutions tailored to your unique financial situation
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={service.id}
                   className={`fade-up ${staggerClass(i)} group p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col`}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-200 group-hover:scale-105"
                     style={{ background: '#eef7ff', color: NAVY }}>
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: NAVY }}>{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">{service.description}</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center text-sm font-semibold transition-colors duration-150 gap-1"
                  style={{ color: GOLD }}
                >
                  Get Started
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-white" style={{ background: NAVY }}>
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 text-white fade-up">Need Help Choosing?</h2>
          <p className="max-w-2xl mx-auto mb-8 fade-up stagger-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Not sure which service fits your situation? Let's talk — it's free and there's no obligation.
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

export default Services;
