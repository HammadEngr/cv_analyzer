import type { JSX } from "react";
import { motion } from "framer-motion";

function PulsingDots(): JSX.Element {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            width: 24,
            height: 24,
            borderRadius: "10%",
            background: "#1D9E75",
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default PulsingDots;
