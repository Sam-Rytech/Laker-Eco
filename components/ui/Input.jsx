export default function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  disabled = false,
  max,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        max={max}
        className={`
          w-full px-4 py-3 rounded-lg border-2 
          ${error ? 'border-red-500' : 'border-gray-300'} 
          focus:outline-none focus:border-blue-500 
          disabled:bg-gray-100 disabled:cursor-not-allowed
          transition-colors
        `}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}
