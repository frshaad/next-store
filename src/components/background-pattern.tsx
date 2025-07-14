export default function BackgroundPattern() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-0 opacity-10 select-none">
        <svg
          className="h-full w-full"
          height="100%"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              height="20"
              id="smallGrid"
              patternUnits="userSpaceOnUse"
              width="20"
            >
              <path
                className="text-primary"
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
            <pattern
              height="80"
              id="grid"
              patternUnits="userSpaceOnUse"
              width="80"
            >
              <rect fill="url(#smallGrid)" height="80" width="80" />
              <path
                className="text-primary"
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
            <pattern
              height="40"
              id="circles"
              patternTransform="rotate(45)"
              patternUnits="userSpaceOnUse"
              width="40"
              x="0"
              y="0"
            >
              <circle className="fill-primary/40" cx="20" cy="20" r="2" />
            </pattern>
            <pattern
              height="20"
              id="dots"
              patternTransform="rotate(45)"
              patternUnits="userSpaceOnUse"
              width="20"
            >
              <circle className="fill-primary/60" cx="3" cy="3" r="1" />
            </pattern>
          </defs>
          <rect fill="url(#grid)" height="100%" width="100%" />
          <rect fill="url(#circles)" height="100%" width="100%" />
          <rect fill="url(#dots)" height="100%" width="100%" />
        </svg>
      </div>

      {/* Floating shapes */}
      {/* <div className="bg-primary/10 absolute top-20 left-20 z-0 h-64 w-64 rounded-full blur-3xl" />
      <div
        className="bg-primary/5 absolute right-20 bottom-20 z-0 h-80 w-80 rounded-full blur-3xl"
        style={{ animationDelay: '1s' }}
      /> */}
    </>
  )
}
