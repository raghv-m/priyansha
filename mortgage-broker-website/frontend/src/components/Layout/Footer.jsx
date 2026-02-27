const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PrimeMortgage</h3>
            <p className="text-gray-300">
              Providing trusted mortgage solutions with personalized service and competitive rates.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About</a></li>
              <li><a href="/services" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
              <li><a href="/calculator" className="text-gray-300 hover:text-white transition-colors">Calculator</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Purchase Mortgages</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Refinance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pre-Approval</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">First-Time Buyers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <address className="not-italic text-gray-300">
              <p>123 Financial District</p>
              <p>Toronto, ON M5J 1N8</p>
              <p className="mt-2">Phone: (416) 555-0123</p>
              <p>Email: info@primemortgage.ca</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} PrimeMortgage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;