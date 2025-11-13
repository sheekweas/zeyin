import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircleFill, Stopwatch, LightningChargeFill } from "react-bootstrap-icons";

interface TestData {
  id: number;
  title: string;
  category: string;
  color: string;
}

const ALL_TESTS: TestData[] = [
  { id: 1, title: "ЕНТ — Полный экзамен", category: "Комплексный", color: "linear-gradient(135deg, #3E4BFF, #7A6FFF)" },
  { id: 2, title: "История Казахстана — 20 вопросов", category: "Обязательный", color: "linear-gradient(135deg, #FF7C7C, #FFB88C)" },
  { id: 3, title: "Математическая грамотность — 10 вопросов", category: "Обязательный", color: "linear-gradient(135deg, #00C49F, #66E6B9)" },
  { id: 4, title: "Профильные предметы — Математика + Физика", category: "Профильный", color: "linear-gradient(135deg, #6C63FF, #9B8CFF)" },
  { id: 5, title: "Профильные предметы — Биология + Химия", category: "Профильный", color: "linear-gradient(135deg, #4DB6AC, #26A69A)" },
];

export default function MyTests() {
  const navigate = useNavigate();
  const [purchasedTests, setPurchasedTests] = useState<TestData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState<TestData | null>(null);

  useEffect(() => {
    const purchasedIds = JSON.parse(localStorage.getItem("zeyinPurchasedTests") || "[]");
    const filtered = ALL_TESTS.filter((t) => purchasedIds.includes(t.id));
    setPurchasedTests(filtered);
  }, []);

  const handleStart = (test: TestData) => {
    setSelectedTest(test);
    setShowModal(true);
  };

  const confirmStart = () => {
    if (selectedTest) navigate(`/test/${selectedTest.id}`);
  };

  return (
    <div className="test-theme">
      <Container className="py-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5"
        >
          <h1 className="fw-bold text-primary mb-2">🧩 Мои тесты</h1>
          <p className="text-muted">Начни тест и проверь свой уровень подготовки!</p>
        </motion.div>

        {purchasedTests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-5"
          >
            <div className="empty-tests">
              <LightningChargeFill className="text-primary mb-3" size={48} />
              <h4 className="fw-semibold text-secondary">У тебя нет купленных тестов 😔</h4>
              <p className="text-muted">Зайди в магазин и выбери подходящий тест для подготовки!</p>
              <Button
                variant="primary"
                className="rounded-pill mt-3 px-4"
                onClick={() => navigate("/tests")}
              >
                Перейти в магазин тестов
              </Button>
            </div>
          </motion.div>
        ) : (
          <Row className="g-4 justify-content-center">
            {purchasedTests.map((test, i) => (
              <Col md={5} lg={4} key={test.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="mytest-card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="mytest-header" style={{ background: test.color }}>
                      <h5 className="fw-bold text-white mb-1">{test.title}</h5>
                      <small className="text-white-50">{test.category}</small>
                    </div>
                    <Card.Body>
                      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                        <Stopwatch className="text-primary" />
                        <span className="text-muted small">Время: 4 часа</span>
                      </div>
                      <Button
                        variant="primary"
                        className="rounded-pill w-100 fw-semibold py-2"
                        onClick={() => handleStart(test)}
                      >
                        Начать тест
                      </Button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        )}

        {/* Подтверждение старта */}
        <Modal centered show={showModal} onHide={() => setShowModal(false)} className="test-modal">
          <Modal.Body className="text-center py-5">
            <CheckCircleFill size={60} className="text-primary mb-3" />
            <h4 className="fw-bold mb-2">Начать тест?</h4>
            <p className="text-muted">
              У тебя будет <strong>4 часа</strong> на выполнение. После завершения нельзя пересдать.
            </p>
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
                Отмена
              </Button>
              <Button variant="primary" onClick={confirmStart}>
                Подтвердить
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}
