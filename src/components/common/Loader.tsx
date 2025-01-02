const Loader = () => {
  return (

    <svg
    className="w-16 h-16 animate-spin-slow"
    viewBox="25 25 50 50"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="50"
      cy="50"
      r="20"
      fill="none"
      stroke=""
      
      strokeWidth="4"
      strokeDasharray="1, 200"
      strokeDashoffset="0"
      strokeLinecap="round"
      className="animate-dash-slow stroke-orange-600"
    />
  </svg>
  )
}

export default Loader