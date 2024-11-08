import * as React from "react";
import { motion } from "framer-motion";
import { SVGProps, memo } from "react";

const BottomWave = (props: SVGProps<SVGSVGElement>) => {
  // Dynamically generate repeating text
  const repeatedText = "RPI ARCADE=======".repeat(20); // Create a smaller repeated string

  return (
    <svg
      className="svgwave-bot"
      xmlns="http://www.w3.org/2000/svg"
      width={1303}
      height={160}
      viewBox="0 0 1303 160"
      fill="none"
      {...props}
    >
      <path
        id="wavepath-bot"
        stroke="#780000"
        d="M1 160L340 0H963.23L1301 160"
      />

      <text fontSize="20" fill="white" textAnchor="middle">
        <motion.textPath
          href="#wavepath-bot"
          initial={{ startOffset: "0%" }}
          animate={{ startOffset: "100%" }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          }}
        >
          {repeatedText}
        </motion.textPath>
      </text>
    </svg>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(BottomWave);
