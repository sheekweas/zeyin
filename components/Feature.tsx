import { Card } from "react-bootstrap";
import { motion } from "framer-motion";

export default function Feature({ icon, title, desc }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Card className="feature-card text-center shadow-sm border-0 p-4 h-100 rounded-4">
        <div className="text-primary mb-3 fs-3">{icon}</div>
        <h5 className="fw-semibold mb-2">{title}</h5>
        <p className="text-muted small">{desc}</p>
      </Card>
    </motion.div>
  );
}
