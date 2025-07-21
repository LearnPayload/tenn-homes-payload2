export const ApartmentIcon = () => {
  return (
    <svg width={50} height={50} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Building base */}
      <rect
        x={25}
        y={20}
        width={50}
        height={65}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={4}
      />
      {/* Entrance door */}
      <rect
        x={45}
        y={70}
        width={10}
        height={15}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      {/* Door knob */}
      <circle cx={52} cy={77} r={1} fill="currentColor" />
      {/* Windows - First floor */}
      <rect
        x={30}
        y={60}
        width={8}
        height={8}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={62}
        y={60}
        width={8}
        height={8}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      {/* Windows - Second floor */}
      <rect
        x={30}
        y={45}
        width={8}
        height={8}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={46}
        y={45}
        width={8}
        height={8}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={62}
        y={45}
        width={8}
        height={8}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      {/* Windows - Third floor */}
      <rect
        x={30}
        y={30}
        width={8}
        height={8}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={46}
        y={30}
        width={8}
        height={8}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={62}
        y={30}
        width={8}
        height={8}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      {/* Flat roof */}
      <rect
        x={23}
        y={18}
        width={54}
        height={4}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  )
}
