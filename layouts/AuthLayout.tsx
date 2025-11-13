import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";

export default function AuthLayout({ children, title, subtitle }: any) {
  return (
    <div className="auth-layout min-vh-100 d-flex align-items-center bg-light">
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col md={5}>
            <motion.div
              className="bg-white p-5 rounded-4 shadow-sm"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 text-center">
                <h3 className="fw-bold text-primary mb-2">{title}</h3>
                {subtitle && <p className="text-muted">{subtitle}</p>}
              </div>
              {children}
            </motion.div>
          </Col>

          <Col md={6} className="d-none d-md-flex justify-content-center">
            <motion.img
              src="/src/assets/login-img.png"
              alt="Auth illustration"
              className="img-fluid auth-img"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
