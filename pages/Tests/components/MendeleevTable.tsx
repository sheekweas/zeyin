import { motion } from "framer-motion";
import { X } from "react-bootstrap-icons";

export default function MendeleevTable({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="floating-table"
      drag
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
    >
      <div className="table-header d-flex justify-content-between align-items-center">
        <span>Таблица Менделеева</span>
        <X role="button" onClick={onClose} />
      </div>
      <img src="/src/assets/mendeleev.png" alt="Таблица Менделеева" className="w-100 rounded-3" />
    </motion.div>
  );
}
