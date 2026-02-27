import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: '#0a1628' }} className="text-white pt-14 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-lg font-extrabold tracking-tight text-white">Prime</span>
              <span className="text-lg font-extrabold tracking-tight" style={{ color: '#C9973A' }}>Mortgage</span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Licensed Canadian mortgage broker offering personalized solutions and competitive rates.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium"
                 style={{ borderColor: 'rgba(201,151,58,0.4)', color: '#C9973A', background: 'rgba(201,151,58,0.08)' }}>
              FSRA Licensed · Ontario
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'rgba(255,255,255,0.4)' }}>Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[['/', 'Home'], ['/about', 'About Us'], ['/services', 'Services'],
                ['/calculator', 'Calculator'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to}
                        className="transition-colors duration-150 hover:text-white"
                        style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'rgba(255,255,255,0.4)' }}>Services</h4>
            <ul className="space-y-2.5 text-sm">
              {['Purchase Mortgages', 'Refinancing', 'Pre-Approval',
                'First-Time Buyers', 'Investment Properties'].map((s) => (
                <li key={s}>
                  <Link to="/services"
                        className="transition-colors duration-150 hover:text-white"
                        style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'rgba(255,255,255,0.4)' }}>Contact</h4>
            <address className="not-italic text-sm space-y-3" style={{ color: 'rgba(255,255,255,0.55)' }}>
              <p>[ADDRESS]</p>
              <p>
                <a href="tel:[PHONE]" className="hover:text-white transition-colors">[PHONE]</a>
              </p>
              <p>
                <a href="mailto:[EMAIL]" className="hover:text-white transition-colors">[EMAIL]</a>
              </p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Mon–Fri: 8 AM – 6 PM<br />Sat: 9 AM – 4 PM
              </p>
            </address>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs"
             style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)' }}>
          <p>&copy; {new Date().getFullYear()} PrimeMortgage. All rights reserved.</p>
          <p>Licensed Mortgage Broker &mdash; FSRA Regulated</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
