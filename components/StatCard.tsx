import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function StatCard({ number, suffix, text }: any) {
  return (
    <motion.div
      className="p-5 bg-white shadow-sm rounded-4 stat-card"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="fw-bold display-4 text-dark">
        <CountUp end={number} suffix={suffix || ""} duration={2.5} />
      </h1>
      <p className="text-muted mt-2">{text}</p>
    </motion.div>
  );
}
