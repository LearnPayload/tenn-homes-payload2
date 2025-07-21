export const LandIcon = () => {
  return (
    <svg width={50} height={50} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Property boundary lines */}
      <polygon
        points="15,75 85,75 85,25 15,25"
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={4}
      />
      {/* Corner markers/stakes */}
      <circle cx={15} cy={25} r={2} fill="#ffffff" stroke="currentColor" strokeWidth={2} />
      <circle cx={85} cy={25} r={2} fill="#ffffff" stroke="currentColor" strokeWidth={2} />
      <circle cx={85} cy={75} r={2} fill="#ffffff" stroke="currentColor" strokeWidth={2} />
      <circle cx={15} cy={75} r={2} fill="#ffffff" stroke="currentColor" strokeWidth={2} />
      {/* Rolling hills/terrain */}
      <path
        d="M 15,60 Q 30,50 45,60 T 85,60"
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M 15,68 Q 25,63 35,68 Q 50,58 65,68 Q 75,63 85,68"
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={2}
      />
      {/* Simple tree */}
      <circle cx={35} cy={45} r={4} fill="#ffffff" stroke="currentColor" strokeWidth={2} />
      <line x1={35} y1={49} x2={35} y2={55} stroke="currentColor" strokeWidth={2} />
      {/* Another tree */}
      <circle cx={65} cy={40} r={4} fill="#ffffff" stroke="currentColor" strokeWidth={2} />
      <line x1={65} y1={44} x2={65} y2={50} stroke="currentColor" strokeWidth={2} />
    </svg>
  )
}
