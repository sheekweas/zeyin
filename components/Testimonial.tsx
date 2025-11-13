import { Card } from "react-bootstrap";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Testimonial({ name, role, text }: any) {
  return (
    <motion.div whileHover={{ scale: 1.03 }}>
      <Card className="testimonial-card border-0 shadow-sm rounded-4 p-4 h-100">
        <div className="text-warning mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="#ffc107" />
          ))}
        </div>
        <p className="text-muted mb-3">“{text}”</p>
        <div>
          <h6 className="fw-semibold mb-0">{name}</h6>
          <p className="text-muted small mb-0">{role}</p>
        </div>
      </Card>
    </motion.div>
  );
}
