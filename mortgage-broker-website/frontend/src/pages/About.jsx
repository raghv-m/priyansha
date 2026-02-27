import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const About = () => {
  return (
    <div className="section">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About PrimeMortgage</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in achieving homeownership dreams since 2008
          </p>
        </div>

        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2008, PrimeMortgage has helped thousands of families achieve their dream of homeownership. 
              Our journey began with a simple mission: to make the mortgage process transparent, accessible, and stress-free.
            </p>
            <p className="text-gray-600 mb-6">
              Over the years, we've grown into one of the most trusted mortgage brokerage firms in the region, 
              consistently delivering personalized service and competitive rates to our clients.
            </p>
            <Button variant="primary" size="lg">
              Meet Our Team
            </Button>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Team of mortgage professionals discussing with client" 
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trust & Integrity</h3>
              <p className="text-gray-600">
                We believe in transparent communication and honest advice that puts our clients' interests first.
              </p>
            </Card>
            
            <Card>
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every interaction, ensuring the highest quality service for our clients.
              </p>
            </Card>
            
            <Card>
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Client Focus</h3>
              <p className="text-gray-600">
                Every decision we make is centered around our clients' goals and financial well-being.
              </p>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="text-center">
                <img 
                  src={`https://images.unsplash.com/photo-${item === 1 ? '1472230202739-08968530e6db' : item === 2 ? '1507068137421-fd45c358072f' : item === 3 ? '1485020155023-72788407c533' : '1511714860296-4df0f0a16188'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`} 
                  alt="Team member" 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900">Sarah Johnson</h3>
                <p className="text-blue-600">CEO & Founder</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;