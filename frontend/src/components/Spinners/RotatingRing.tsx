import { motion } from "framer-motion";
import type { JSX } from "react";

function RotatingRing(): JSX.Element {
  return (
    <motion.div
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        // border: "3px solid var(--border)",
        borderTop: "3px solid #1D9E75",
        borderRight: "3px solid #1D9E75",
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  );
}

export default RotatingRing;
