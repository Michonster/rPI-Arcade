const ClipPath = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={2698}
    height={1969}
    viewBox="0 0 2698 1969"
    fill="none"
    className="rect-clip"
  >
    <defs>
      <clipPath id="rectangle-clip">
        <path
          d="M2697.77 1968.46V.463l-700 377.852H700.17L.173.463V1968.46H2697.77Z"
        />
      </clipPath>
    </defs>

    {/* Add a border by duplicating the path with a stroke */}
    <path
      d="M2697.77 1968.46V.463l-700 377.852H700.17L.173.463V1968.46H2697.77Z"
      fill="none"
      stroke="blue"       // Choose your desired border color
      strokeWidth="4"     // Adjust width as needed
    />
  </svg>
);

export default ClipPath;
