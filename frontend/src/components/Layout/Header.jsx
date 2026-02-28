import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/calculator', label: 'Calculator' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Add subtle shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsMenuOpen(false), [location]);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header
      className="sticky top-0 z-50 bg-white/97 backdrop-blur-sm border-b border-gray-100 transition-shadow duration-200"
      style={{ boxShadow: scrolled ? '0 2px 16px rgba(15,32,68,0.08)' : 'none' }}
    >
      <div className="container">
        <div className="flex justify-between items-center py-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-0 group">
            <span className="text-xl font-extrabold tracking-tight" style={{ color: '#0F2044' }}>
              Prime
            </span>
            <span className="text-xl font-extrabold tracking-tight" style={{ color: '#C9973A' }}>
              Mortgage
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                style={
                  isActive(to)
                    ? { color: '#C9973A', background: 'rgba(201,151,58,0.08)' }
                    : { color: '#374151' }
                }
                onMouseEnter={e => { if (!isActive(to)) e.target.style.background = '#f3f4f6'; }}
                onMouseLeave={e => { if (!isActive(to)) e.target.style.background = 'transparent'; }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:[PHONE]"
              className="text-sm font-medium hidden lg:block"
              style={{ color: '#0F2044' }}
            >
              [PHONE]
            </a>
            <Link
              to="/contact"
              className="text-sm font-semibold px-5 py-2.5 rounded-lg text-white transition-all duration-200 shadow-sm hover:shadow-md"
              style={{ background: '#0F2044' }}
              onMouseEnter={e => e.currentTarget.style.background = '#0a1628'}
              onMouseLeave={e => e.currentTarget.style.background = '#0F2044'}
            >
              Get Pre-Approved
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: '#374151' }}
          >
            {isMenuOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-3">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="px-4 py-2.5 rounded-lg font-medium text-sm transition-colors"
                  style={
                    isActive(to)
                      ? { color: '#C9973A', background: 'rgba(201,151,58,0.08)' }
                      : { color: '#374151' }
                  }
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-2 text-white text-sm font-semibold px-4 py-2.5 rounded-lg text-center"
                style={{ background: '#0F2044' }}
              >
                Get Pre-Approved
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
