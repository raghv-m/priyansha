import { useState } from 'react';
import Card from '../components/UI/Card';
import FormInput from '../components/UI/FormInput';
import Banner from '../components/UI/Banner';
import Button from '../components/UI/Button';
import API_CONFIG from '../config';
import useScrollAnimation from '../hooks/useScrollAnimation';

const NAVY = '#0F2044';
const GOLD = '#C9973A';

const Contact = () => {
  useScrollAnimation();

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', mortgageType: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

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
      newErrors.phone = 'Phone number is invalid';
    if (!formData.mortgageType) newErrors.mortgageType = 'Please select a mortgage type';
    if (!formData.message.trim()) newErrors.message = 'Please tell us about your situation';
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
        body: JSON.stringify({ ...formData, type: 'contact' }),
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', mortgageType: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 6000);
      } else {
        setSubmitError(data.error || 'An error occurred. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0F2044 100%)' }}>
        <div className="container text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border"
                style={{ borderColor: 'rgba(201,151,58,0.4)', color: GOLD, background: 'rgba(201,151,58,0.08)' }}>
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 fade-up">Contact Us</h1>
          <p className="text-lg max-w-2xl mx-auto fade-up stagger-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Have questions about mortgages? I'm here to help — personally.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Form — 3 cols */}
            <div className="lg:col-span-3 slide-left">
              <Card>
                <h2 className="text-xl font-bold mb-6" style={{ color: NAVY }}>Send a Message</h2>

                {submitSuccess && (
                  <Banner type="success" className="mb-6">
                    Thank you! I'll be in touch within a few hours — usually same day.
                  </Banner>
                )}
                {submitError && (
                  <Banner type="error" className="mb-6">{submitError}</Banner>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput label="Full Name" id="name" name="name" type="text"
                      placeholder="John Smith" value={formData.name}
                      onChange={handleChange} error={errors.name} required />

                    <FormInput label="Email Address" id="email" name="email" type="email"
                      placeholder="john@example.com" value={formData.email}
                      onChange={handleChange} error={errors.email} required />

                    <FormInput label="Phone Number" id="phone" name="phone" type="tel"
                      placeholder="(416) 555-0123" value={formData.phone}
                      onChange={handleChange} error={errors.phone} required />

                    <div className="mb-4">
                      <label htmlFor="mortgageType" className="block text-sm font-medium text-gray-700 mb-1">
                        Mortgage Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="mortgageType" name="mortgageType"
                        value={formData.mortgageType} onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:outline-none ${errors.mortgageType ? 'border-red-500' : 'border-gray-300'}`}
                        style={{ '--tw-ring-color': NAVY }}
                        required
                      >
                        <option value="">Select a type...</option>
                        <option value="purchase">Purchase</option>
                        <option value="refinance">Refinance</option>
                        <option value="pre-approval">Pre-Approval</option>
                        <option value="first-time">First-Time Buyer</option>
                        <option value="renewal">Renewal</option>
                        <option value="investment">Investment Property</option>
                      </select>
                      {errors.mortgageType && <p className="mt-1 text-xs text-red-600">{errors.mortgageType}</p>}
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message" name="message" rows="5"
                      placeholder="Tell me about your situation — buying, refinancing, timeline, etc."
                      value={formData.message} onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:outline-none resize-none ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                      style={{ '--tw-ring-color': NAVY }}
                      required
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                  </div>

                  <Button type="submit" variant="primary" size="lg"
                    className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Info — 2 cols */}
            <div className="lg:col-span-2 slide-right flex flex-col gap-5">
              <Card>
                <h2 className="text-lg font-bold mb-5" style={{ color: NAVY }}>Contact Information</h2>
                <div className="space-y-5">
                  {[
                    {
                      label: 'Phone', value: '[PHONE]', sub: 'Mon–Fri, 8:00 AM – 6:00 PM',
                      href: 'tel:[PHONE]',
                      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
                    },
                    {
                      label: 'Email', value: '[EMAIL]', sub: 'Response within 24 hours',
                      href: 'mailto:[EMAIL]',
                      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                    },
                    {
                      label: 'Office', value: '[ADDRESS]', sub: 'Visit during business hours',
                      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                    },
                  ].map(({ label, value, sub, href, icon }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                           style={{ background: '#eef7ff', color: NAVY }}>
                        {icon}
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-0.5">{label}</p>
                        {href ? (
                          <a href={href} className="text-sm font-medium text-gray-900 hover:underline">{value}</a>
                        ) : (
                          <p className="text-sm font-medium text-gray-900">{value}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h2 className="text-lg font-bold mb-4" style={{ color: NAVY }}>Business Hours</h2>
                <div className="space-y-2">
                  {[
                    { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
                    { day: 'Saturday', hours: '9:00 AM – 4:00 PM' },
                    { day: 'Sunday', hours: 'Closed' },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                      <span className="text-sm text-gray-600">{day}</span>
                      <span className="text-sm font-medium" style={{ color: hours === 'Closed' ? '#9ca3af' : NAVY }}>
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Response promise */}
              <div className="rounded-2xl p-5 border" style={{ background: 'rgba(201,151,58,0.06)', borderColor: 'rgba(201,151,58,0.2)' }}>
                <p className="text-sm font-semibold mb-1" style={{ color: GOLD }}>Quick Response Guarantee</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  I personally respond to all inquiries within a few hours during business days.
                  You'll always speak directly with me — not an assistant or call centre.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
