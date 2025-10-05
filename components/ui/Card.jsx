export default function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 ${className}`}
    >
      {children}
    </div>
  )
}
