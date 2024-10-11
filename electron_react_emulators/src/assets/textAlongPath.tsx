import * as React from "react";
import { motion } from "framer-motion";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className="svgwave"
    xmlns="http://www.w3.org/2000/svg"
    width={1303}
    height={160}
    viewBox="0 0 1303 160"
    fill="none"
    {...props}
  >
    <path
      id="wavepath"
      stroke="#780000"
      d="m1 1 338.849 160H963.23L1301 1"
    />

    {/* Animate the text with Framer Motion */}
    <text fontSize="20" fill="white" textAnchor="middle">
      <motion.textPath
        href="#wavepath"
        initial={{ startOffset: "0%" }}
        // animate={{ startOffset: "125.3%" }}
        animate={{ startOffset: "119.7%" }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "linear",
        }}
      >
        {/* RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE====RPI ARCADE==== */}
        RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======RPI ARCADE=======
      
      </motion.textPath>
    </text>
  </svg>
);

export default SvgComponent;
