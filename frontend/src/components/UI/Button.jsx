/**
 * Button component that can render as a <button>, <a>, or any component
 * (e.g. React Router <Link>) via the `as` prop.
 *
 * Usage:
 *   <Button onClick={...}>Click me</Button>
 *   <Button as="a" href="/contact">Link</Button>
 *   <Button as={Link} to="/contact">Router Link</Button>
 */
const Button = ({ children, as: Tag = 'button', variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer';

  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 shadow-sm hover:shadow-md',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white focus:ring-secondary-500 shadow-sm hover:shadow-md',
    outline: 'border-2 border-primary-600 text-primary-700 hover:bg-primary-50 focus:ring-primary-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    white: 'bg-white text-primary-700 hover:bg-primary-50 focus:ring-primary-300 shadow-sm hover:shadow-md',
    'outline-white': 'border-2 border-white/70 text-white hover:bg-white/10 focus:ring-white/50',
  };

  const sizes = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-5 text-sm',
    lg: 'py-3 px-7 text-base',
  };

  const classes = `${baseClasses} ${variants[variant] ?? variants.primary} ${sizes[size]} ${className}`;

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
};

export default Button;