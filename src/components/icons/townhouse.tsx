export const TownhouseIcon = () => {
  return (
    <svg width={50} height={50} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Left roof */}
      <polygon points="12,45 27.5,25 43,45" fill="#ffffff" stroke="currentColor" strokeWidth={4} />

      {/* Right roof */}
      <polygon points="62,45 77.5,25 93,45" fill="#ffffff" stroke="currentColor" strokeWidth={4} />

      {/* Left townhouse unit */}
      <rect
        x={15}
        y={45}
        width={27}
        height={40}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={4}
      />
      {/* Right townhouse unit */}
      <rect
        x={65}
        y={45}
        width={27}
        height={40}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={4}
      />
      {/* Middle townhouse unit */}
      <rect
        x={40}
        y={50}
        width={27}
        height={35}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={4}
      />

      {/* Middle roof */}
      <polygon points="37,50 52.5,30 68,50" fill="#ffffff" stroke="currentColor" strokeWidth={4} />

      {/* Windows */}
      <rect
        x={18}
        y={55}
        width={6}
        height={8}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={32}
        y={55}
        width={6}
        height={8}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={43}
        y={60}
        width={6}
        height={6}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={56}
        y={60}
        width={6}
        height={6}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={70}
        y={55}
        width={6}
        height={8}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={82}
        y={55}
        width={6}
        height={8}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />

      {/* Doors */}
      <rect
        x={22}
        y={70}
        width={8}
        height={15}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={47}
        y={70}
        width={8}
        height={15}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={72}
        y={70}
        width={8}
        height={15}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  )
}
