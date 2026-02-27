const Banner = ({ children, type = 'info', className = '', ...props }) => {
  const bannerStyles = {
    info: 'bg-blue-50 border border-blue-200 text-blue-800',
    success: 'bg-green-50 border border-green-200 text-green-800',
    warning: 'bg-yellow-50 border border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border border-red-200 text-red-800',
  };

  return (
    <div 
      className={`p-4 rounded-lg ${bannerStyles[type]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Banner;