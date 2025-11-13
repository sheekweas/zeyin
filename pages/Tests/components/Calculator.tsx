import { motion } from "framer-motion";
import { X } from "react-bootstrap-icons";

export default function Calculator({ onClose }: { onClose: () => void }) {
  const buttons = ["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"];
  return (
    <motion.div
      className="floating-calc"
      drag
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
    >
      <div className="calc-header d-flex justify-content-between align-items-center">
        <span>Калькулятор</span>
        <X role="button" onClick={onClose} />
      </div>
      <input type="text" readOnly className="calc-display" id="calcDisplay" />
      <div className="calc-grid">
        {buttons.map((b) => (
          <button
            key={b}
            onClick={() => {
              const display = document.getElementById("calcDisplay") as HTMLInputElement;
              if (b === "=") {
                try {
                  display.value = String(eval(display.value));
                } catch {
                  display.value = "Ошибка";
                }
              } else display.value += b;
            }}
          >
            {b}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
