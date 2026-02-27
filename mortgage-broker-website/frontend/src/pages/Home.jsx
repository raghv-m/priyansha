import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import FormInput from '../components/UI/FormInput';
import Card from '../components/UI/Card';
import Banner from '../components/UI/Banner';
import API_CONFIG from '../config';
import useScrollAnimation from '../hooks/useScrollAnimation';

const NAVY = '#0F2044';
const GOLD = '#C9973A';

const Home = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // One call — hook auto-observes all animated elements on page
  useScrollAnimation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone))
      newErrors.phone = 'Phone is invalid';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch(`${API_CONFIG.apiUrl}${API_CONFIG.ENDPOINTS.LEADS}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setSubmitError(data.error || 'An error occurred. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whyCards = [
    {
      id: 'trust', title: 'Trusted & Licensed',
      description: 'Regulated by FSRA with full transparency on all fees and terms. No surprises.',
      svg: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    },
    {
      id: 'speed', title: 'Fast Turnaround',
      description: 'Same-day pre-approvals and fast closings. We move at your pace, not a bank\'s.',
      svg: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    },
    {
      id: 'personal', title: 'Personal Attention',
      description: 'You work directly with Priyansha — not a call centre. One person, start to finish.',
      svg: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    },
  ];

  const processSteps = [
    { id: 1, title: 'Free Consultation', description: 'We discuss your goals, timeline, and financial situation — no obligation.' },
    { id: 2, title: 'Application', description: 'We handle the paperwork and shop your file across 50+ lenders.' },
    { id: 3, title: 'Approval & Close', description: 'We secure the best rate and guide you through to your closing date.' },
  ];

  const testimonials = [
    { id: 1, name: 'Michael T.', location: 'Toronto', text: 'Priyansha helped us secure a great rate in just 3 days. Her personal approach made all the difference.' },
    { id: 2, name: 'Sarah K.', location: 'Mississauga', text: 'Finally, a broker who explains everything in plain English. No jargon, no runaround. Highly recommend.' },
    { id: 3, name: 'David L.', location: 'Oakville', text: "I was worried about my credit, but Priyansha found options I didn't think were possible. She delivered." },
  ];

  return (
    <div>

      {/* ── Hero ── */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0F2044 60%, #162d5e 100%)' }}
      >
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-20"
               style={{ background: GOLD }} />
          <div className="absolute -bottom-12 -left-12 w-72 h-72 rounded-full blur-2xl opacity-10"
               style={{ background: '#3392ec' }} />
        </div>

        <div className="container relative">
          <div className="flex flex-col md:flex-row items-center gap-14">

            {/* Left text */}
            <div className="md:w-1/2 text-white">
              <span className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border uppercase tracking-widest"
                    style={{ borderColor: 'rgba(201,151,58,0.4)', color: GOLD, background: 'rgba(201,151,58,0.08)' }}>
                Licensed Mortgage Broker · Toronto, ON
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-white">
                Hi, I'm Priyansha.<br />
                <span style={{ color: '#f3e9be' }}>
                  I'll get you the best mortgage — personally.
                </span>
              </h1>

              <p className="text-lg mb-8 leading-relaxed max-w-lg" style={{ color: 'rgba(255,255,255,0.75)' }}>
                I work <strong className="text-white">directly with you</strong> — not a call centre — to find
                the right rate from 50+ lenders. Fast, honest, and completely free.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button as={Link} to="/contact" variant="white" size="lg">
                  Book a Free Call
                </Button>
                <Button as={Link} to="/calculator" variant="outline-white" size="lg">
                  Try the Calculator
                </Button>
              </div>
            </div>

            {/* Right image */}
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Keys to a new home"
                  className="rounded-2xl shadow-2xl w-full"
                  style={{ outline: '3px solid rgba(255,255,255,0.12)', outlineOffset: '2px' }}
                />
                <div className="absolute -bottom-5 -left-4 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3">
                  <svg className="w-6 h-6 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Client Rating</p>
                    <p className="text-sm font-bold text-gray-900">4.9 / 5.0 · 200+ reviews</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="py-10" style={{ background: NAVY }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '500+', label: 'Happy Clients' },
              { value: '$200M+', label: 'Mortgages Funded' },
              { value: '50+', label: 'Lender Partners' },
            ].map(({ value, label }) => (
              <div key={label} className="fade-up">
                <div className="text-3xl font-extrabold text-white">{value}</div>
                <div className="text-xs font-medium uppercase tracking-wider mt-1" style={{ color: 'rgba(201,151,58,0.8)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-14 fade-up">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">A mortgage broker who works for you</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              We take a personal approach to help you find the right mortgage solution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyCards.map((card, i) => (
              <div key={card.id}
                   className={`fade-up stagger-${i + 1} text-center p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300`}>
                <div className="flex justify-center mb-5">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center"
                       style={{ background: '#eef7ff', color: NAVY }}>
                    {card.svg}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: NAVY }}>{card.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-20" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className="text-center mb-14 fade-up">
            <span className="section-label">How It Works</span>
            <h2 className="section-title">Simple. Fast. Personal.</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Getting your mortgage with us is straightforward and stress-free
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line on desktop */}
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5" style={{ background: 'rgba(201,151,58,0.2)' }} />

            {processSteps.map((step, i) => (
              <div key={step.id}
                   className={`slide-left stagger-${i + 1} text-center p-8 bg-white rounded-2xl shadow-sm relative`}>
                <div className="w-14 h-14 rounded-full text-white flex items-center justify-center text-xl font-extrabold mx-auto mb-5 shadow-md"
                     style={{ background: NAVY }}>
                  {step.id}
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: NAVY }}>{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-14 fade-up">
            <span className="section-label">Client Stories</span>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle max-w-xl mx-auto">Real results from real Canadians</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={t.id}
                   className={`fade-up stagger-${i + 1} p-8 rounded-2xl border border-gray-100`}
                   style={{ background: '#fafaf9' }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, si) => (
                    <svg key={si} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6 leading-relaxed text-sm">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
                       style={{ background: NAVY }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 text-white" style={{ background: NAVY }}>
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white fade-up">Ready to Get Started?</h2>
          <p className="max-w-2xl mx-auto mb-8 fade-up stagger-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Contact us today for a free consultation and see how we can help you achieve your mortgage goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 fade-up stagger-3">
            <Button as={Link} to="/contact" variant="white" size="lg">Contact Us</Button>
            <Button as={Link} to="/calculator" variant="outline-white" size="lg">Calculate Your Rates</Button>
          </div>
        </div>
      </section>

      {/* ── Quick Contact Form ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 fade-up">
              <span className="section-label">Get In Touch</span>
              <h2 className="section-title mt-1">Let's talk about your mortgage</h2>
              <p className="section-subtitle">
                Send your details and I'll reach out within a few hours — usually same day.
              </p>
            </div>

            <Card className="fade-up stagger-2">
              {submitSuccess && (
                <Banner type="success" className="mb-6">
                  Thanks! I'll be in touch within a few hours.
                </Banner>
              )}
              {submitError && (
                <Banner type="error" className="mb-6">{submitError}</Banner>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput label="Full Name" id="name" name="name" type="text"
                    placeholder="John Smith" value={formData.name}
                    onChange={handleChange} error={errors.name} required />

                  <FormInput label="Email Address" id="email" name="email" type="email"
                    placeholder="john@example.com" value={formData.email}
                    onChange={handleChange} error={errors.email} required />

                  <FormInput label="Phone Number" id="phone" name="phone" type="tel"
                    placeholder="(416) 555-0123" value={formData.phone}
                    onChange={handleChange} error={errors.phone} required />

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-gray-400">(optional)</span>
                    </label>
                    <textarea
                      id="message" name="message" rows="3"
                      placeholder="Buying, refinancing, first home...?"
                      value={formData.message} onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-0 focus:outline-none text-sm"
                      style={{ '--tw-ring-color': NAVY }}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <Button type="submit" variant="primary" size="lg"
                    className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Request Free Consultation'}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
