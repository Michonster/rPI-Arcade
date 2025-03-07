{/* 
  steps to create:
    -in figma
      -ungroup and flatten = 
      -flatten TEXT
      -outline = vector
      -flatten both vectors
      -save as SVG
    -put SVG through SVGOMG to reduce size
    -put SVG through SVGR Playgroun to convert to TSX for easier animate
    -add animation
  
  */}
import * as React from "react";
import { motion, SVGMotionProps } from "framer-motion";

const TopStringDecorBackup = (props: SVGMotionProps<SVGSVGElement>) => {
  const x_end = 394;
  const duration_sec = 10;
  return (
    <>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={2419}
        height={20}
        viewBox="0 0 2419 20"
        fill="none"
        clipPath="url(#rectangle-clip)"
        {...props}
      >

        <motion.path
          fill="#fff"
      d="m634 1 5 1 1 4-1 1-1-1c0-2-1-3-4-3l-3 1-1 2v3c0 1 1 2 3 2h2l1 1-1 2h-2c-2 0-3 0-3 2v4l1 2h3c3 0 4 0 4-2v-2l1-1 2 1v2l-2 3-5 2-5-2-2-3v-4l1-2 2-2-2-1-1-2V6l2-4 5-1Zm-15 20-4-16-1-1h-1v20h-3V2l2-1h1l2 1h1l1 2 4 16v2h2V2l1-1 1 1v22h-5l-1-1v-2Zm-13 3h-1V2l1-1 2 1v22h-2Zm-3-22v22h-3V14h-9v10h-2V2l1-1 1 1v10h9V2l2-1 1 1Zm-27 4v14l1 2h3c3 0 5 0 5-2v-2l1-1 1 1v2l-1 3-6 2-5-2-2-3V6l2-4 5-1 6 1 1 4v2h-2V6c0-2-2-3-5-3l-3 1-1 2Zm-17 18h-2V6l2-4 6-1 5 1 2 4v18h-3v-9h-9v9h-1Zm1-18v7h9V6l-1-2-4-1-3 1-1 2Zm-7 18V4h-2v1l-4 16-1 1-2-1-4-16V4h-2v20h-2V2l2-1 3 1h1v2l4 13 3-13V2h1l3-1 2 1v22h-2ZM522 1l4 1c2 1 2 2 2 4l-1 1-1-1c0-2-2-3-4-3l-3 1-1 2v3c0 1 1 2 3 2h2l1 1-1 2h-2c-3 0-4 0-4 2v4l1 2h4c3 0 4 0 4-2v-2l1-1 1 1v2l-1 3-5 2c-3 0-4-1-5-2-2-1-2-2-2-3v-4l1-2 2-2-2-1-1-2V6l2-4 5-1Zm-23 21V2l2-1h6l5 2 1 3v13l-1 4-5 1h-8v-2Zm2 0h6l3-1 1-1V6l-1-2h-9v18Zm-17 2h-2V6l2-4 6-1 5 1 2 4v18h-3v-9h-9v9h-1Zm1-18v7h9V6l-1-2-3-1-4 1-1 2Zm-15 0v14l1 2h3c3 0 5 0 5-2v-2l1-1 1 1v2l-1 3-6 2-5-2-2-3V6l2-4 5-1 6 1 1 4v2h-2V6c0-2-2-3-5-3l-3 1-1 2Zm-13 7h2c3 0 4-1 4-3V6l-1-2-3-1c-3 0-4 1-4 3v18h-2V6l1-4 5-1 5 1 2 4v4l-1 2-2 2h1v2l2 8h-2l-2-7v-2h-5l-1-1 1-1Zm-20 11h-1V6l2-4 5-1 6 1 1 4v18h-2v-9h-9v9h-2Zm2-18v7h9V6l-1-2-4-1-3 1-1 2Zm-13 18h-1V2l1-1 1 1v22h-1Zm-12-11h3c2 0 4 0 4-2V6l-1-2-3-1c-3 0-5 1-5 3v18h-2V6l2-4 5-1 5 1 1 4v5l-1 3-5 2h-3l-1-2 1-1Zm-15 0h3c2 0 4-1 4-3V6l-1-2-3-1c-3 0-5 1-5 3v18h-2V6c0-2 0-3 2-4l5-1 4 1c2 1 2 2 2 4v6l-3 2h1l1 2 2 8h-3l-2-7v-2h-5l-1-1 1-1ZM1425 1l5 1 1 4-1 1-1-1c0-2-2-3-4-3l-3 1-1 2v3c0 1 1 2 3 2h2l1 1-1 2h-2c-3 0-4 0-4 2v4l1 2h4c3 0 4 0 4-2v-2l1-1 1 1v2l-1 3-5 2-5-2c-2-1-2-2-2-3v-4l1-2 2-2-2-1-1-2V6l2-4 5-1Zm-16 20-4-16V4h-2v20h-2V2l2-1 3 1h1l1 2 4 16v2h2V2l1-1 1 1v22h-5l-1-1-1-2Zm-12 3h-1V2l1-1 1 1v22h-1Zm-3-22v22h-3V14h-9v10h-3V2l2-1 1 1v10h9V2l1-1 2 1Zm-27 4v14l1 2h3c3 0 5 0 5-2v-2l1-1 1 1v2c0 1 0 3-2 3-1 1-2 2-5 2l-5-2-2-3V6l2-4 5-1 5 1c2 1 2 2 2 4v2h-2V6c0-2-2-3-5-3l-3 1-1 2Zm-18 18h-1V6l2-4 5-1 6 1 1 4v18h-2v-9h-9v9h-2Zm2-18v7h9V6l-1-2-4-1-3 1-1 2Zm-7 18V4h-2v1l-4 16-2 1-1-1-4-16V4h-2v20h-2V2l1-1h1l2 1h2v2l3 13 3-13 1-2h1l3-1 2 1v22h-2Zm-31-23 4 1 2 4-1 1-2-1c0-2-1-3-3-3l-3 1-2 2v3l4 2h2l1 1-1 2h-3c-2 0-3 0-3 2v4l1 2h4c2 0 4 0 4-2v-2l1-1 1 1v2l-1 3-5 2-6-2-1-3v-6l3-2-2-1-1-2V6l2-4 5-1Zm-23 21V2l2-1h6l4 2 2 3v13l-2 4-4 1h-8v-2Zm2 0h6l3-1V4h-9v18Zm-17 2h-2V6l2-4 6-1 5 1 2 4v18h-3v-9h-9v9h-1Zm1-18v7h9V6l-1-2-4-1-3 1-1 2Zm-15 0v14l1 2h3c3 0 5 0 5-2v-2l1-1 1 1v2c0 1 0 3-2 3-1 1-2 2-5 2l-5-2-2-3V6l2-4 5-1 5 1c2 1 2 2 2 4v2h-2V6c0-2-2-3-5-3l-3 1-1 2Zm-14 7h3c3 0 4-1 4-3V6l-1-2-3-1c-3 0-4 1-4 3v18h-3V6l2-4 5-1 5 1 2 4v4l-1 2-2 2h1v2l2 8h-2l-2-7v-2h-6v-2Zm-19 11h-1V6l2-4 5-1 5 1c2 1 2 2 2 4v18h-2v-9h-9v9h-2Zm2-18v7h9V6l-1-2-4-1-3 1-1 2Zm-13 18h-2V2l2-1 1 1v22h-1Zm-12-11h3c2 0 4 0 4-2V6l-1-2-4-1c-2 0-4 1-4 3v18h-2V6c0-2 0-3 2-4l4-1 5 1c2 1 2 2 2 4v5c0 1 0 2-2 3l-4 2h-3l-1-2 1-1Zm-15 0h2c3 0 5-1 5-3V6l-2-2-3-1c-2 0-4 1-4 3v18h-2V6l1-4 5-1 5 1 2 4v4l-1 2-2 2h1v2l3 8h-3l-2-7v-2h-5l-1-1 1-1Zm632-12 4 1 2 4-1 1-2-1c0-2-1-3-4-3l-3 1-1 2v3c0 1 1 2 4 2h2l1 1-1 2h-3c-2 0-3 0-3 2v4l1 2h3c3 0 5 0 5-2v-2l1-1 1 1v2c0 1 0 3-2 3-1 1-2 2-5 2l-5-2-1-3v-6l2-2-2-1V6c0-2 0-3 2-4l5-1Zm-16 20-4-16V4h-2v20h-2V2l1-1h1l2 1h1l1 2 4 16 1 2h1V2l1-1 2 1v20l-1 2h-4l-1-1-1-2Zm-12 3h-1V2l1-1 1 1v22h-1Zm-4-22v22h-2V14h-10v10h-2V2l1-1 1 1v10h10V2l1-1 1 1Zm-27 4v14l2 2h3c3 0 4 0 4-2v-2l2-1 1 1v2l-2 3-5 2-5-2c-2-1-2-2-2-3V6c0-2 0-3 2-4l5-1 5 1 2 4v2h-3V6c0-2-1-3-4-3l-3 1-2 2Zm-17 18h-1V6c0-2 0-3 2-4l5-1 5 1 2 4v18h-2v-9h-10v9h-1Zm1-18v7h10V6l-2-2-3-1-3 1-2 2Zm-7 18V4h-1l-1 1-4 16-1 1-1-1-4-16-1-1h-1v20h-3V4l1-2 1-1h1l2 1h1l1 2 3 13 3-13 1-2h1l2-1h1l1 1 1 2v20h-3Zm-31-23 5 1 2 4-2 1-1-1c0-2-1-3-4-3l-3 1-1 2v3c0 1 1 2 3 2h3v3h-3c-2 0-3 0-3 2v4l1 2h3c3 0 4 0 4-2v-2l2-1 1 1v2l-2 3-5 2-5-2-2-3v-4l1-2 2-2-2-1V6l1-4 5-1Zm-23 21V4l1-2 1-1h7l4 2 2 3v13l-2 4-4 1h-8l-1-2Zm3 0h6l2-1 1-1V6l-1-2h-8v18Zm-18 2h-1V6l2-4 5-1 5 1c2 1 2 2 2 4v18h-2v-9h-10v9h-1Zm1-18v7h10V6l-1-2-4-1-3 1-2 2Zm-15 0v14l1 2h4c3 0 4 0 4-2v-2l2-1 1 1v2l-2 3-5 2-5-2c-2-1-2-2-2-3V6c0-2 0-3 2-4l5-1 5 1 2 4v2h-3V6c0-2-1-3-4-3l-4 1-1 2Zm-13 7h3c2 0 4-1 4-3V6l-1-2-3-1c-3 0-5 1-5 3v18h-2V6l2-4 5-1 5 1 1 4v6l-2 2 1 2 2 8h-2l-2-7-1-1-1-1h-4l-1-1 1-1Zm-19 11h-1V6c0-2 0-3 2-4l5-1 5 1 2 4v18h-3v-9h-9v9h-1Zm1-18v7h9V6l-1-2-3-1-4 1-1 2Zm-13 18h-1V2l1-1 1 1v22h-1Zm-12-11h3c3 0 4 0 4-2V6l-1-2-3-1c-3 0-4 1-4 3v18h-2V6l1-4 5-1 5 1 2 4v5l-2 3-5 2h-3v-3Zm-15 0h3c3 0 4-1 4-3V6l-1-2-3-1c-3 0-4 1-4 3v18h-3V6l2-4 5-1 5 1 2 4v4l-1 2-2 2h1v2l2 8h-2l-2-7v-1l-1-1h-5v-2ZM1030 1l4 1 2 4-2 1-1-1c0-2-1-3-4-3l-3 1-1 2v3c0 1 1 2 4 2h2v3h-3c-2 0-3 0-3 2v4l1 2h3c3 0 5 0 5-2v-2l1-1 1 1v2l-2 3-5 2-5-2-2-3v-4l1-2 2-2-2-1V6c0-2 0-3 2-4l5-1Zm-16 20-4-16V4h-2v20h-2V2l1-1h1l2 1h1l1 2 4 16v2h2V2l1-1 2 1v20l-1 2h-4l-1-1-1-2Zm-12 3h-1V2l1-1 1 1v22h-1Zm-4-22v22h-2V14h-10v10h-2V2l1-1 1 1v10h10V2l1-1 1 1Zm-27 4v14l1 2h4c3 0 4 0 4-2v-2l1-1 2 1v2l-2 3-5 2-5-2c-2-1-2-2-2-3V6c0-2 0-3 2-4l5-1 5 1 2 4v2h-3V6c0-2-1-3-4-3l-4 1-1 2Zm-17 18h-1V6c0-2 0-3 2-4l5-1 5 1 2 4v18h-2v-9h-10v9h-1Zm1-18v7h10V6l-2-2-3-1-4 1-1 2Zm-7 18V4h-2v1l-4 16-1 1-1-1-4-16-1-1h-1v20h-3V4l1-2 1-1h1l2 1h1l1 2 3 13 3-13 1-2h1l2-1h1l1 1 1 2v20h-3ZM917 1l5 1 1 4-1 1-1-1c0-2-1-3-4-3l-3 1-1 2v3c0 1 1 2 3 2h3v3h-3c-2 0-3 0-3 2v4l1 2h3c3 0 4 0 4-2v-2l2-1 1 1v2l-2 3-5 2-5-2-2-3v-4l1-2 2-2-2-1V6l1-4 5-1Zm-23 21V4l1-2 1-1h6c3 0 4 1 5 2l1 3v13l-1 4-5 1h-7l-1-2Zm3 0h5l3-1 1-1V6l-1-2h-8v18Zm-18 2h-1V6l2-4 5-1 5 1c2 1 2 2 2 4v18h-2v-9h-10v9h-1Zm1-18v7h10V6l-2-2-3-1-3 1-2 2Zm-15 0v14l1 2h4c3 0 4 0 4-2v-2l1-1 2 1v2l-2 3-5 2-5-2c-2-1-2-2-2-3V6c0-2 0-3 2-4l5-1 5 1 2 4v2h-3V6c0-2-1-3-4-3l-4 1-1 2Zm-13 7h3c2 0 4-1 4-3V6l-1-2-3-1c-3 0-5 1-5 3v18h-2V6l2-4 5-1 5 1 1 4v6l-2 2 1 2 2 8h-3l-1-7-1-2h-5l-1-1 1-1Zm-19 11h-1V6l1-4 6-1 5 1 2 4v18h-3v-9h-9v9h-1Zm1-18v7h9V6l-1-2-3-1-4 1-1 2Zm-13 18h-1V2l1-1 1 1v22h-1Zm-12-11h3c3 0 4 0 4-2V6l-1-2-3-1c-3 0-4 1-4 3v18h-3V6l2-4 5-1 5 1 2 4v5l-2 3-5 2h-3v-3Zm-15 0h3c3 0 4-1 4-3V6l-1-2-3-1c-3 0-4 1-4 3v18h-3V6l2-4 5-1 5 1 2 4v4l-1 2-2 2h1v2l2 8h-2l-2-7-1-2h-5v-2Z"

          animate={{
            x: [0, x_end],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: duration_sec,
            ease: "linear",
          }}
        />
        <motion.path
          fill="#fff"
          fillRule="evenodd"
          d="m639 23 1 1h150a1 1 0 0 0 0-2H640l-1 1Zm3-13 1 1h147a1 1 0 0 0 0-3H643l-1 2Zm-3-7 1 1h150a1 1 0 0 0 0-2H640l-1 1Zm3 13 1 1h147a1 1 0 0 0 0-2H643l-1 1Zm788 7 1 1h150a1 1 0 1 0 0-2h-150l-1 1Zm3-13 1 1h147a1 1 0 1 0 0-3h-147l-1 2Zm-3-7 1 1h150a1 1 0 1 0 0-2h-150l-1 1Zm3 13 1 1h147a1 1 0 1 0 0-2h-147l-1 1Zm393 7 2 1h149a1 1 0 1 0 0-2h-149l-2 1Zm3-13 2 1h146a1 1 0 1 0 0-3h-146l-2 2Zm-3-7 2 1h149a1 1 0 1 0 0-2h-149l-2 1Zm3 13 2 1h146a1 1 0 1 0 0-2h-146l-2 1Zm-795 7 2 1h149a1 1 0 1 0 0-2h-149l-2 1Zm3-13 1 1h147a1 1 0 1 0 0-3h-147l-1 2Zm-3-7 2 1h149a1 1 0 1 0 0-2h-149l-2 1Zm3 13 1 1h147a1 1 0 1 0 0-2h-147l-1 1Z"

          clipRule="evenodd"
          animate={{
            x: [0, x_end],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: duration_sec,
            ease: "linear",
          }}
        />

        <motion.path
          fill="#fff"
          d="m240 1 5 1 1 4-1 1-1-1c0-2-2-3-4-3l-3 1-1 2v3c0 1 1 2 3 2h2l1 1-1 2h-2c-3 0-4 0-4 2v4l1 2h4c3 0 4 0 4-2v-2l1-1 1 1v2l-1 3-5 2-5-2c-2-1-2-2-2-3v-4l1-2 2-2-2-1-1-2V6l2-4 5-1Zm-16 20-4-16V4h-2v20h-2V2l2-1 3 1h1l1 2 4 16v2h2V2l1-1 1 1v22h-5l-1-1-1-2Zm-12 3h-1V2l1-1 1 1v22h-1Zm-3-22v22h-3V14h-9v10h-3V2l2-1 1 1v10h9V2l1-1 2 1Zm-27 4v14l1 2h3c3 0 5 0 5-2v-2l1-1 1 1v2c0 1 0 3-2 3-1 1-2 2-5 2l-5-2-2-3V6l2-4 5-1 5 1c2 1 2 2 2 4v2h-2V6c0-2-2-3-5-3l-3 1-1 2Zm-18 18h-1V6l2-4 6-1 5 1 1 4v18h-2v-9h-9v9h-2Zm2-18v7h9V6l-1-2-4-1-3 1-1 2Zm-7 18V4h-2v1l-4 16-2 1-1-1-4-16V4h-2v20h-2V2l2-1 2 1h2v2l3 13 3-13 1-2h1l3-1 2 1v22h-2ZM128 1l4 1 2 4-1 1-2-1c0-2-1-3-3-3l-3 1-2 2v3l4 2h2l1 1-1 2h-3c-2 0-3 0-3 2v4l1 2h4c2 0 4 0 4-2v-2l1-1 1 1v2l-1 3-5 2-6-2-1-3v-6l3-2-2-1-1-2V6l2-4 5-1Zm-23 21V2l2-1h6l4 2 2 3v13l-2 4-4 1h-8v-2Zm2 0h6l3-1V4h-9v18Zm-17 2h-2V6l2-4 6-1 5 1 2 4v18h-3v-9h-9v9h-1Zm1-18v7h9V6l-1-2-4-1-3 1-1 2ZM76 6v14l1 2h3c3 0 5 0 5-2v-2l1-1 1 1v2c0 1 0 3-2 3-1 1-2 2-5 2l-5-2-2-3V6l2-4 5-1 5 1c2 1 2 2 2 4v2h-2V6c0-2-2-3-5-3l-3 1-1 2Zm-14 7h3c3 0 4-1 4-3V6l-1-2-3-1c-3 0-4 1-4 3v18h-3V6l2-4 5-1 5 1 2 4v4l-1 2-2 2h1v2l2 8h-2l-2-7v-2h-6v-2ZM43 24h-1V6l2-4 5-1 5 1c2 1 2 2 2 4v18h-2v-9h-9v9h-2Zm2-18v7h9V6l-1-2-4-1-3 1-1 2ZM32 24h-2V2l2-1 1 1v22h-1ZM20 13h3c2 0 4 0 4-2V6l-1-2-3-1c-3 0-5 1-5 3v18h-2V6c0-2 0-3 2-4l5-1 4 1c2 1 2 2 2 4v5c0 1 0 2-2 3l-4 2h-3l-1-2 1-1ZM5 13h2c3 0 5-1 5-3V6l-1-2-4-1C5 3 3 4 3 6v18H1V6l1-4 5-1 5 1 2 4v4l-1 2-2 2h1v2l3 8h-3l-2-7v-2H5l-1-1 1-1Z"

          animate={{
            x: [0, x_end],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: duration_sec,
            ease: "linear",
          }}
        />
        <motion.path
          fill="#fff"
          fillRule="evenodd"
          d="m245 23 1 1h150a1 1 0 0 0 0-2H246l-1 1Zm3-13 1 1h147a1 1 0 0 0 0-3H249l-1 2Zm-3-7 1 1h150a1 1 0 0 0 0-2H246l-1 1Zm3 13 1 1h147a1 1 0 0 0 0-2H249l-1 1Z"

          clipRule="evenodd"
          animate={{
            x: [0, x_end],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: duration_sec,
            ease: "linear",
          }}
        />
        <motion.path
          fill="#fff"
      d="m2610 0 4 2 2 3v1h-3V5c0-2-1-3-4-3l-3 1-1 2v3c0 2 1 3 4 3h2l1 1-1 1h-3c-2 0-3 1-3 3v3l1 2 3 1c3 0 5-1 5-3v-2h2v2c0 2 0 3-2 4l-5 1-5-1-1-4v-6l2-1-2-1V5c0-1 0-3 2-3 1-1 2-2 5-2Zm-16 21-4-16V4l-1-1h-1v20l-1 1-1-1V1h4l1 1 1 2 4 16 1 1 1 1V2l1-1 2 1v19l-1 2-1 1h-1l-2-1h-1l-1-2Zm-12 3-1-1V1h2v22l-1 1Zm-4-23v22l-1 1-1-1V13h-10v10l-1 1-1-1V1h2v10h10V1h2Zm-27 4v14l2 2 3 1c3 0 4-1 4-3v-2h3v2l-2 4-5 1-5-1c-2-1-2-2-2-4V5c0-1 0-3 2-3l5-2 5 2 2 3v2l-1 1-2-1V5c0-2-1-3-4-3l-3 1-2 2Zm-17 19-1-1V5c0-1 0-3 2-3l5-2 5 2 2 3v18l-1 1-1-1v-8h-10v8l-1 1Zm1-19v7h10V5l-2-2-3-1-3 1-2 2Zm-7 18V3h-1v1l-1 1-4 16h-2l-4-16-1-1V3h-1v20l-1 1-2-1V3l1-2h4l1 1 1 2 3 12 3-12 1-2 1-1h4l1 2v20l-2 1-1-1Zm-31-23 5 2 2 3v1h-3V5c0-2-1-3-4-3l-3 1-1 2v3c0 2 1 3 3 3h3v2h-3c-2 0-3 1-3 3v3l1 2 3 1c3 0 4-1 4-3v-2h3v2l-2 4-5 1-5-1-2-4v-3l1-3 2-1-2-1V5l1-3 5-2Zm-23 21V3l1-2h8l4 1 2 4v13l-2 3-4 2h-7l-1-1-1-2Zm3 0h8l1-2V5l-1-2h-8v18Zm-18 3-1-1V5l2-3 5-2c3 0 4 1 5 2 2 0 2 2 2 3v18l-1 1-1-1v-8h-10v8l-1 1Zm1-19v7h10V5l-1-2-4-1-3 1-2 2Zm-15 0v14l1 2 4 1c3 0 4-1 4-3v-2h3v2l-2 4-5 1-5-1c-2-1-2-2-2-4V5c0-1 0-3 2-3l5-2 5 2 2 3v2l-1 1-2-1V5c0-2-1-3-4-3l-4 1-1 2Zm-13 7h3l4-2V5l-1-2-3-1c-3 0-5 1-5 3v18l-1 1-1-1V5l2-3 5-2 5 2 1 3v7l-2 1v1l1 1 2 8-1 1-1-1-2-7-1-1-1-1h-4l-1-1 1-1Zm-19 12-1-1V5c0-1 0-3 2-3l5-2 5 2 2 3v18l-1 1-2-1v-8h-9v8l-1 1Zm1-19v7h9V5l-1-2-3-1-4 1-1 2Zm-13 19-1-1V1h2v22l-1 1Zm-12-11h3c3 0 4-1 4-3V5l-1-2-3-1c-3 0-4 1-4 3v18l-1 1-1-1V5l1-3 5-2 5 2 2 3v5l-2 4-5 1h-3v-2Zm-15-1h3c3 0 4-1 4-2V5l-1-2-3-1c-3 0-4 1-4 3v18l-1 1-2-1V5l2-3 5-2 5 2 2 3v4l-1 3-2 1 1 1v1l2 8-1 1-1-1-2-7v-1l-1-1h-5v-2ZM3400 0l5 2 2 3v1h-3V5c0-2-1-3-4-3l-3 1-1 2v3c0 2 1 3 3 3h3v2h-3c-2 0-3 1-3 3v3l1 2 3 1c3 0 4-1 4-3v-2h3v2l-2 4-5 1-5-1-2-4v-3l1-3 2-1-2-1V5l1-3 5-2Zm-15 21-4-16V4l-1-1h-1v20l-1 1-2-1V3l1-2h4l1 1 1 2 4 16v1h1l1 1V2l1-1 2 1v19l-1 2-1 1h-1l-2-1h-1l-1-2Zm-12 3-2-1V1h3v22l-1 1Zm-4-23v22l-1 1-1-1V13h-10v10l-1 1-1-1V1h2v10h10V1h2Zm-27 4v14l1 2 4 1c3 0 4-1 4-3v-2h3v2l-2 4-5 1-5-1c-2-1-2-2-2-4V5c0-1 0-3 2-3 1-1 2-2 5-2l5 2 2 3v2l-2 1-1-1V5c0-2-1-3-4-3l-4 1-1 2Zm-17 19-1-1V5c0-1 0-3 2-3l5-2 5 2 2 3v18l-1 1-2-1v-8h-9v8l-1 1Zm1-19v7h9V5l-1-2-3-1-4 1-1 2Zm-7 18V3h-1l-1 1v1l-4 16h-2l-4-16-1-1V3h-1v20l-2 1-1-1V1h5l1 1 1 2 3 12 3-12 1-2 1-1h4l1 2v20l-2 1-1-1Zm-31-23 5 2 1 3v1h-2V5c0-2-1-3-4-3l-3 1-1 2v3c0 2 1 3 3 3h3v2h-3c-2 0-3 1-3 3v3l1 2 3 1c3 0 4-1 4-3v-2h3v2l-2 4-5 1-5-1-2-4v-3l1-3 2-1-2-1-1-3V5l2-3 5-2Zm-23 21V1h8l5 1 1 4v13l-1 3-5 2h-6l-2-1v-2Zm3 0h8l1-2V5l-1-2h-8v18Zm-18 3-1-1V5c0-1 0-3 2-3l5-2 5 2 2 3v18l-1 1-1-1v-8h-10v8l-1 1Zm1-19v7h10V5l-2-2-3-1-4 1-1 2Zm-15 0v14l1 2 4 1c3 0 4-1 4-3v-2h3v2l-2 4-5 1-6-1-1-4V5l1-3 6-2 5 2 2 3v2l-2 1-1-1V5c0-2-1-3-4-3l-4 1-1 2Zm-13 7h3l4-2V5l-1-2-4-1c-2 0-4 1-4 3v18l-1 1-1-1V5c0-1 0-3 2-3l4-2c3 0 4 1 5 2 2 0 2 2 2 3v4l-1 3-2 1 1 1 1 1 2 8-1 1-2-1-2-7v-1l-1-1h-4l-1-1 1-1Zm-19 12-1-1V5l1-3 6-2 5 2 2 3v18l-2 1-1-1v-8h-9v8l-1 1Zm1-19v7h9V5l-1-2-3-1-4 1-1 2Zm-13 19-1-1V1h2v22l-1 1Zm-12-11h3c3 0 4-1 4-3V5l-1-2-3-1c-3 0-4 1-4 3v18l-1 1-2-1V5l2-3 5-2 5 2 2 3v5l-2 4-5 1h-3v-2Zm-15-1h3c3 0 4-1 4-2V5l-1-2-3-1c-3 0-4 1-4 3v18l-2 1-1-1V5l2-3 5-2 5 2 1 3v7l-2 1v1l1 1 2 8-1 1-1-1-2-7-1-1v-1h-5v-2Zm632-12 5 2 1 3v1h-2V5c0-2-2-3-4-3l-3 1-1 2v3c0 2 1 3 3 3h2l1 1-1 1h-2c-2 0-4 1-4 3v3l2 2 3 1c3 0 4-1 4-3v-2h3v2l-2 4-5 1-5-1-2-4v-3l1-3 2-1-2-1-1-3V5l2-3 5-2Zm-15 21-4-16-1-1V3h-2v20l-1 1-1-1V1h5l1 1 1 2 4 16v1h1l1 1V2l1-1 1 1v21l-2 1-3-1h-1v-2Zm-13 3-1-1V1h3v22l-2 1Zm-3-23v22l-2 1-1-1V13h-9v10l-1 1-2-1V1h3v10h9V1h3Zm-27 4v14l1 2 3 1c3 0 5-1 5-3v-2h2v2l-1 4-6 1-5-1-2-4V5l2-3 5-2 6 2 1 3v2l-1 1-1-1V5c0-2-2-3-5-3l-3 1-1 2Zm-17 19-2-1V5l2-3 6-2 5 2 2 3v18l-2 1-1-1v-8h-9v8l-1 1Zm1-19v7h9V5l-1-2-4-1-3 1-1 2Zm-7 18V3h-1l-1 1v1l-4 16h-3l-4-16V4l-1-1h-1v20l-1 1-1-1V1h5l1 1v2l3 12 4-12V2l1-1h5v22l-1 1-1-1Zm-31-23 4 2c2 0 2 2 2 3v1h-2V5c0-2-2-3-4-3l-3 1-1 2v3c0 2 1 3 3 3h2l1 1-1 1h-2c-3 0-4 1-4 3v3l1 2 4 1c3 0 4-1 4-3v-2h2v2l-1 4-5 1-5-1c-2-1-2-2-2-4v-6l3-1-2-1-1-3V5l2-3 5-2Zm-23 21V1h8l5 1 1 4v13l-1 3-5 2h-6l-2-1v-2Zm2 0h9l1-2V5l-1-2h-9v18Zm-17 3-2-1V5l2-3 6-2 5 2 2 3v18l-2 1-1-1v-8h-9v8l-1 1Zm1-19v7h9V5l-1-2-3-1-4 1-1 2Zm-15 0v14l1 2 3 1c3 0 5-1 5-3v-2h2v2c0 2 0 3-2 4l-5 1-5-1-2-4V5l2-3 5-2c3 0 4 1 5 2 2 0 2 2 2 3v2l-1 1-1-1V5c0-2-2-3-5-3l-3 1-1 2Zm-14 7h3c3 0 4-1 4-2V5l-1-2-3-1c-3 0-4 1-4 3v18l-1 1-1-1V5l1-3 5-2 5 2 2 3v4l-1 3-2 1 1 1v1l2 8-1 1-1-1-2-7v-1l-1-1h-5v-2Zm-19 12-1-1V5l2-3 5-2 6 2 1 3v18l-1 1-1-1v-8h-9v8l-2 1Zm2-19v7h9V5l-1-2-4-1-3 1-1 2Zm-13 19-2-1V1h3v22l-1 1Zm-12-11h3c2 0 4-1 4-3V5l-1-2-3-1c-3 0-5 1-5 3v18l-1 1-1-1V5l2-3c1-1 2-2 5-2l5 2 1 3v5l-1 4-5 1h-3l-1-1 1-1Zm-15-1h2c3 0 5-1 5-2V5l-1-2-4-1c-2 0-4 1-4 3v18l-1 1-1-1V5c0-1 0-3 2-3l4-2c3 0 4 1 5 2 2 0 2 2 2 3v4l-1 3-2 1 1 1 1 1 2 8-1 1-2-1-2-7v-1l-1-1h-4l-1-1 1-1ZM3005 0l5 2 1 3v1h-2V5c0-2-2-3-4-3l-3 1-1 2v3c0 2 1 3 3 3h2l1 1-1 1h-2c-3 0-4 1-4 3v3l2 2 3 1c3 0 4-1 4-3v-2h3v2l-2 4-5 1-5-1-2-4v-3l1-3 2-1-2-1-1-3V5l2-3 5-2Zm-16 21-4-16V3h-2v20l-1 1-1-1V1h5l1 1 1 2 4 16v1l2 1V2l1-1 1 1v21l-2 1-3-1h-1l-1-2Zm-12 3-1-1V1h3v22l-2 1Zm-3-23v22l-2 1-1-1V13h-9v10l-1 1-2-1V1h3v10h9V1h3Zm-27 4v14l1 2 3 1c3 0 5-1 5-3v-2h2v2c0 2 0 3-2 4l-5 1-5-1-2-4V5l2-3 5-2c3 0 4 1 5 2 2 0 2 2 2 3v2l-1 1-1-1V5c0-2-2-3-5-3l-3 1-1 2Zm-18 19-1-1V5l2-3 6-2 5 2 1 3v18l-1 1-1-1v-8h-9v8l-2 1Zm2-19v7h9V5l-1-2-4-1-3 1-1 2Zm-7 18V3h-1l-1 1v1l-4 16h-3l-4-16V4l-1-1h-1v20l-1 1-1-1V1h4l2 1v2l3 12 4-12V2l1-1h5v22l-1 1-1-1Zm-31-23 4 2 2 3v1h-2V5c0-2-2-3-4-3l-3 1-1 2v3c0 2 1 3 3 3h2l1 1-1 1h-2c-3 0-4 1-4 3v3l1 2 4 1c2 0 4-1 4-3v-2h2v2l-1 4-5 1-5-1c-2-1-2-2-2-4v-6l3-1-2-1-1-3V5l2-3 5-2Zm-23 21V1h8l5 1 1 4v13l-1 3-5 2h-6l-2-1v-2Zm2 0h9V3h-9v18Zm-17 3-2-1V5l2-3 6-2 5 2 2 3v18l-2 1-1-1v-8h-9v8l-1 1Zm1-19v7h9V5l-1-2-3-1-4 1-1 2Zm-15 0v14l1 2 3 1c3 0 5-1 5-3v-2h2v2c0 2 0 3-2 4l-5 1-5-1-2-4V5l2-3 5-2c3 0 4 1 5 2 2 0 2 2 2 3v2l-1 1-1-1V5c0-2-2-3-5-3l-3 1-1 2Zm-14 7h3c3 0 4-1 4-2V5l-1-2-3-1c-3 0-4 1-4 3v18l-1 1-2-1V5l2-3 5-2 5 2 2 3v4l-1 3-2 1 1 1v1l2 8-1 1-1-1-2-7v-1l-1-1h-5v-2Zm-19 12-1-1V5l2-3 5-2 6 2 1 3v18l-1 1-1-1v-8h-9v8l-2 1Zm2-19v7h9V5l-1-2-4-1-3 1-1 2Zm-13 19-2-1V1h3v22l-1 1Zm-12-11h3c2 0 4-1 4-3V5l-1-2-3-1c-3 0-5 1-5 3v18l-1 1-1-1V5c0-1 0-3 2-3 1-1 2-2 5-2l4 2c2 0 2 2 2 3v5c0 2 0 3-2 4l-4 1h-3l-1-1 1-1Zm-15-1h2c3 0 5-1 5-2V5l-1-2-4-1c-2 0-4 1-4 3v18l-1 1-1-1V5l1-3 5-2c3 0 4 1 5 2l2 3v4l-1 3-2 1 1 1v1l3 8-1 1-2-1-2-7v-1l-1-1h-4l-1-1 1-1Z"

          animate={{
            x: [0, x_end],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: duration_sec,
            ease: "linear",
          }}
        />
        <motion.path
          fill="#fff"
          fillRule="evenodd"
          d="m2614 22 2 1h149a1 1 0 1 0 0-2h-149l-2 1Zm3-13 2 1h146a1 1 0 1 0 0-2h-146l-2 1Zm-3-7 2 2h149a1 1 0 1 0 0-3h-149l-2 1Zm3 14 2 1h146a1 1 0 1 0 0-3h-146l-2 2Zm788 6 1 1h150a1 1 0 1 0 0-2h-150l-1 1Zm3-13 1 1h147a1 1 0 1 0 0-2h-147l-1 1Zm-3-7 1 2h150a1 1 0 1 0 0-3h-150l-1 1Zm3 14 1 1h147a1 1 0 1 0 0-3h-147l-1 2Zm394 6 1 1h150a1 1 0 1 0 0-2h-150l-1 1Zm3-13 1 1h147a1 1 0 1 0 0-2h-147l-1 1Zm-3-7 1 2h150a1 1 0 1 0 0-3h-150l-1 1Zm3 14 1 1h147a1 1 0 1 0 0-3h-147l-1 2Zm-795 6 1 1h150l1-1-1-1h-150l-1 1Zm3-13 1 1h147l1-1-1-1h-147l-1 1Zm-3-7 1 2h150l1-2-1-1h-150l-1 1Zm3 14 1 1h147l1-1-1-2h-147l-1 2Z"

          clipRule="evenodd"
          animate={{
            x: [0, x_end],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: duration_sec,
            ease: "linear",
          }}
        />
        <motion.path
          fill="#fff"
          d="m2215 0 5 2 2 3v1h-3V5c0-2-1-3-4-3l-3 1-1 2v3c0 2 1 3 3 3h3v2h-3c-2 0-3 1-3 3v3l1 2 3 1c3 0 5-1 5-3v-2h2v2l-2 4-5 1-5-1-2-4v-3l1-3 2-1-2-1V5l1-3 5-2Zm-15 21-4-16V4l-1-1h-1v20l-1 1-2-1V3l1-2h4l1 1 1 2 4 16v1h1l1 1V2l1-1 2 1v19l-1 2-1 1h-1l-2-1h-1l-1-2Zm-12 3-1-1V1h2v22l-1 1Zm-4-23v22l-1 1-1-1V13h-10v10l-1 1-1-1V1h2v10h10V1h2Zm-27 4v14l1 2 4 1c3 0 4-1 4-3v-2h3v2l-2 4-5 1-5-1c-2-1-2-2-2-4V5c0-1 0-3 2-3l5-2 5 2 2 3v2l-2 1-1-1V5c0-2-1-3-4-3l-4 1-1 2Zm-17 19-1-1V5c0-1 0-3 2-3l5-2 5 2 2 3v18l-1 1-2-1v-8h-9v8l-1 1Zm1-19v7h9V5l-1-2-3-1-4 1-1 2Zm-7 18V3h-1l-1 1v1l-4 16h-2l-4-16-1-1V3h-1v20l-2 1-1-1V3l1-2h4l1 1 1 2 3 12 3-12 1-2 1-1h4l1 2v20l-2 1-1-1Zm-31-23 5 2 1 3v1h-2V5c0-2-1-3-4-3l-3 1-1 2v3c0 2 1 3 3 3h3v2h-3c-2 0-3 1-3 3v3l1 2 3 1c3 0 4-1 4-3v-2h3v2l-2 4-5 1-5-1-2-4v-3l1-3 2-1-2-1V5l1-3 5-2Zm-23 21V3l1-2h7l5 1 1 4v13l-1 3-5 2h-6l-1-1-1-2Zm3 0h8l1-2V5l-1-2h-8v18Zm-18 3-1-1V5c0-1 0-3 2-3l5-2 5 2 2 3v18l-1 1-1-1v-8h-10v8l-1 1Zm1-19v7h10V5l-2-2-3-1-4 1-1 2Zm-15 0v14l1 2 4 1c3 0 4-1 4-3v-2h3v2l-2 4-5 1-5-1c-2-1-2-2-2-4V5c0-1 0-3 2-3 1-1 2-2 5-2l5 2 2 3v2l-2 1-1-1V5c0-2-1-3-4-3l-4 1-1 2Zm-13 7h3l4-2V5l-1-2-3-1c-3 0-5 1-5 3v18l-1 1-1-1V5c0-1 0-3 2-3 1-1 2-2 5-2l4 2c2 0 2 2 2 3v7l-3 1 1 1 1 1 2 8-1 1-2-1-2-7v-1l-1-1h-4l-1-1 1-1Zm-19 12-1-1V5l1-3 6-2 5 2 2 3v18l-1 1-2-1v-8h-9v8l-1 1Zm1-19v7h9V5l-1-2-3-1-4 1-1 2Zm-13 19-1-1V1h2v22l-1 1Zm-12-11h3c3 0 4-1 4-3V5l-1-2-3-1c-3 0-4 1-4 3v18l-1 1-2-1V5l2-3 5-2 5 2 2 3v5l-2 4-5 1h-3v-2Zm-15-1h3c3 0 4-1 4-2V5l-1-2-3-1c-3 0-4 1-4 3v18l-2 1-1-1V5l2-3 5-2 5 2 2 3v4l-1 3-2 1v1l1 1 2 8-1 1-1-1-2-7-1-1v-1h-5v-2Z"

          animate={{
            x: [0, x_end],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: duration_sec,
            ease: "linear",
          }}
        />
        <motion.path
          fill="#fff"
          fillRule="evenodd"
          d="m2220 22 1 1h150a1 1 0 1 0 0-2h-150l-1 1Zm3-13 1 1h147a1 1 0 1 0 0-2h-147l-1 1Zm-3-7 1 2h150a1 1 0 1 0 0-3h-150l-1 1Zm3 14 1 1h147a1 1 0 1 0 0-3h-147l-1 2Z"

          clipRule="evenodd"
          animate={{
            x: [0, x_end],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: duration_sec,
            ease: "linear",
          }}
        />

      </motion.svg >

    </>

  );
};

export default TopStringDecorBackup;
