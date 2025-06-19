export const MobileHomeIcon = () => {
  return (
    <svg width={50} height={50} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Main mobile home body (rectangular, longer than tall) */}
      <rect
        x={15}
        y={45}
        width={70}
        height={25}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={4}
      />
      {/* Low-pitched roof */}
      <polygon points="12,45 50,35 88,45" fill="#ffffff" stroke="currentColor" strokeWidth={4} />
      {/* Front door */}
      <rect
        x={25}
        y={60}
        width={8}
        height={10}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      {/* Door knob */}
      <circle cx={31} cy={65} r={1} fill="currentColor" />
      {/* Windows (multiple, evenly spaced) */}
      <rect
        x={40}
        y={52}
        width={8}
        height={6}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={52}
        y={52}
        width={8}
        height={6}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={64}
        y={52}
        width={8}
        height={6}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={76}
        y={52}
        width={6}
        height={6}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      {/* Support blocks/foundation */}
      <rect
        x={25}
        y={70}
        width={4}
        height={3}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={45}
        y={70}
        width={4}
        height={3}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={65}
        y={70}
        width={4}
        height={3}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      {/* Utility connections */}
      <line x1={20} y1={70} x2={20} y2={75} stroke="currentColor" strokeWidth={2} />
      <line x1={75} y1={70} x2={75} y2={75} stroke="currentColor" strokeWidth={2} />
    </svg>
  )
}
