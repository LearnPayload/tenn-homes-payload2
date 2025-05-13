export const Logo = () => {
  return (
    <div className="flex items-center gap-1">
      <svg
        width={28}
        height={28}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 10V20H2V10L8 4L14 10ZM18 8.34961V20H16V9.1748L10.8252 4H13.6504L18 8.34961ZM22 6.7002V20H20V7.52539L16.4746 4H19.2998L22 6.7002ZM4 10.8252V18H12V10.8252L8 6.8252L4 10.8252Z"
          fill="#1F1F1F"
        />
      </svg>

      <h4 className="text-2xl text-primary uppercase">
        <span className=" font-extrabold">Tenn</span>
        <span className="font-medium">Homes</span>
      </h4>
    </div>
  )
}
