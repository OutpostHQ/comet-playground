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

function LoadingDots() {
  return (
    <svg
      color="currentColor"
      viewBox="0 0 120 30"
      xmlns="http://www.w3.org/2000/svg"
      fill="#fff"
    >
      <circle fill="currentColor" cx="15" cy="15" r="15">
        <animate
          attributeName="r"
          from="15"
          to="15"
          begin="0s"
          dur="0.8s"
          values="15;9;15"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fillOpacity"
          from="1"
          to="1"
          begin="0s"
          dur="0.8s"
          values="1;.5;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle fill="currentColor" cx="60" cy="15" r="9" fillOpacity="0.3">
        <animate
          attributeName="r"
          from="9"
          to="9"
          begin="0s"
          dur="0.8s"
          values="9;15;9"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fillOpacity"
          from="0.5"
          to="0.5"
          begin="0s"
          dur="0.8s"
          values=".5;1;.5"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle fill="currentColor" cx="105" cy="15" r="15">
        <animate
          attributeName="r"
          from="15"
          to="15"
          begin="0s"
          dur="0.8s"
          values="15;9;15"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fillOpacity"
          from="1"
          to="1"
          begin="0s"
          dur="0.8s"
          values="1;.5;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  )
}

export { SearchIcon, ErrorIcon, LoadingDots }
