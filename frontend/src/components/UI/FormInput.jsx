const sanitizeInput = (value) => {
  // Remove any script tags and trim whitespace
  return value.replace(/<script[^>]*>.*?<\/script>/gi, '').trim();
};

const FormInput = ({
  label, 
  id, 
  name,
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  required = false,
  ...props 
}) => {
  const handleChange = (e) => {
    const sanitizedValue = sanitizeInput(e.target.value);
    // Create a new event with the sanitized value
    const sanitizedEvent = {
      ...e,
      target: {
        ...e.target,
        value: sanitizedValue,
        name: e.target.name
      }
    };
    onChange(sanitizedEvent);
  };
  
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormInput;