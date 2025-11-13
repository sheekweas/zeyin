import { motion } from "framer-motion";

interface Props {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  delay?: number;
}

export default function UserStatsCard({ title, value, icon, delay = 0 }: Props) {
  return (
    <motion.div
      className="p-4 bg-white rounded-4 shadow-sm text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="fs-1 text-primary mb-2">{icon}</div>
      <h4 className="fw-bold">{value}</h4>
      <p className="text-muted">{title}</p>
    </motion.div>
  );
}
