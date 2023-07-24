function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={` ${className}`}
      height="20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      stroke="currentColor"
      fill="none"
    >
      <path
        stroke="inherit"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M14.861 24.222a8.861 8.861 0 1 0 0-17.722 8.861 8.861 0 0 0 0 17.722ZM21.127 21.627 26 26.5"
      />
    </svg>
  )
}

function ErrorIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={` ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        stroke="#1C1B1F"
        stroke-miterlimit="10"
        stroke-width="2"
        d="M16 28c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12Z"
      />
      <path
        stroke="#1C1B1F"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16 10v7"
      />
      <path fill="#1C1B1F" d="M16 23a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    </svg>
  )
}

export { SearchIcon, ErrorIcon }
