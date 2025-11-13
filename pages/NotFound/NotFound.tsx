import { Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 bg-light text-center"
      style={{
        background: "linear-gradient(135deg, #f8f9ff 0%, #eef1ff 100%)",
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* <img
            src="/src/assets/404-illustration.png"
            alt="Not Found"
            className="img-fluid mb-4"
            style={{ maxWidth: "400px" }}
          /> */}

          <h1 className="fw-bold text-primary mb-3">404</h1>
          <h4 className="fw-semibold mb-2">Страница не найдена</h4>
          <p className="text-muted mb-4">
            Кажется, вы заблудились :( <br />
            Проверьте адрес или вернитесь на главную страницу.
          </p>

          <Button
            size="lg"
            variant="primary"
            className="px-4 py-2 fw-semibold"
            onClick={() => navigate("/")}
          >
            Вернуться домой
          </Button>
        </motion.div>
      </Container>
    </div>
  );
}
