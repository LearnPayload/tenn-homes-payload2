export const CastleIcon = () => {
  return (
    <svg width={50} height={50} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Single tower */}
      <rect
        x={35}
        y={25}
        width={30}
        height={60}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={4}
      />
      {/* Battlements */}
      <rect
        x={35}
        y={22}
        width={4}
        height={6}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={43}
        y={22}
        width={4}
        height={6}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={51}
        y={22}
        width={4}
        height={6}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={59}
        y={22}
        width={4}
        height={6}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      {/* Main gate */}
      <path
        d="M 45,70 Q 45,65 50,65 Q 55,65 55,70 L 55,85 L 45,85 Z"
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      {/* Windows */}
      <rect
        x={40}
        y={35}
        width={4}
        height={6}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={56}
        y={35}
        width={4}
        height={6}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={48}
        y={50}
        width={4}
        height={6}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      {/* Flag on tower */}
      <line x1={50} y1={22} x2={50} y2={12} stroke="currentColor" strokeWidth={2} />
      <polygon points="50,12 50,16 58,14" fill="#ffffff" stroke="currentColor" strokeWidth={2} />
    </svg>
  )
}
