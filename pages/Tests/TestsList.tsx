import { useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Coin, CheckCircleFill, LightningChargeFill, FilterSquare } from "react-bootstrap-icons";
import { motion, AnimatePresence } from "framer-motion";

const TESTS = [
  {
    id: 1,
    title: "ЕНТ — Полный экзамен",
    price: 500,
    subjectCount: 5,
    category: "Комплексные",
    color: "linear-gradient(135deg, #3E4BFF, #7A6FFF)",
  },
  {
    id: 2,
    title: "История Казахстана — 20 вопросов",
    price: 200,
    subjectCount: 1,
    category: "Обязательные",
    color: "linear-gradient(135deg, #FF7C7C, #FFB88C)",
  },
  {
    id: 3,
    title: "Математическая грамотность — 10 вопросов",
    price: 180,
    subjectCount: 1,
    category: "Обязательные",
    color: "linear-gradient(135deg, #00C49F, #66E6B9)",
  },
  {
    id: 4,
    title: "Профильные предметы — Математика + Физика",
    price: 400,
    subjectCount: 2,
    category: "Профильные",
    color: "linear-gradient(135deg, #6C63FF, #9B8CFF)",
  },
  {
    id: 5,
    title: "Профильные предметы — Биология + Химия",
    price: 400,
    subjectCount: 2,
    category: "Профильные",
    color: "linear-gradient(135deg, #4DB6AC, #26A69A)",
  },
];

export default function TestsList() {
  const [purchased, setPurchased] = useState<number[]>(() =>
    JSON.parse(localStorage.getItem("zeyinPurchasedTests") || "[]")
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [boughtTest, setBoughtTest] = useState<any>(null);
  const [filter, setFilter] = useState<string>("Все");

  const categories = ["Все", "Комплексные", "Обязательные", "Профильные"];

  const filteredTests =
    filter === "Все" ? TESTS : TESTS.filter((t) => t.category === filter);

  const handleBuy = (test: any) => {
    if (purchased.includes(test.id)) return alert("Ты уже купил этот тест!");
    const newList = [...purchased, test.id];
    setPurchased(newList);
    localStorage.setItem("zeyinPurchasedTests", JSON.stringify(newList));
    setBoughtTest(test);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  return (
    <div className="test-theme">
      <Container className="py-5 text-center">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5"
        >
          <h1 className="fw-bold text-primary mb-2">🎓 Тесты ЕНТ</h1>
          <p className="text-muted">
            Выбирай нужный тест, прокачивай навыки и готовься к максимуму!
          </p>
        </motion.div>

        {/* Фильтры */}
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={cat === filter ? "primary" : "outline-primary"}
              className="rounded-pill px-4"
              onClick={() => setFilter(cat)}
            >
              <FilterSquare className="me-1" />
              {cat}
            </Button>
          ))}
        </div>

        {/* Список тестов */}
        <Row className="g-4 justify-content-center">
          {filteredTests.map((t, i) => (
            <Col md={4} sm={6} key={t.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="test-card border-0 shadow-sm rounded-4 overflow-hidden position-relative">
                  <div className="test-card-header" style={{ background: t.color }}>
                    <LightningChargeFill className="text-white fs-3 mb-2" />
                    <h5 className="fw-bold text-white mb-1">{t.title}</h5>
                    <small className="text-white-50">{t.subjectCount} предмет(ов)</small>
                  </div>
                  <Card.Body>
                    <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                      <Badge bg="primary" className="fs-6 shadow-sm">
                        <Coin className="me-1" />
                        {t.price}
                      </Badge>
                    </div>
                    <Button
                      variant={purchased.includes(t.id) ? "success" : "primary"}
                      className="rounded-pill w-100 fw-semibold py-2"
                      onClick={() => handleBuy(t)}
                    >
                      {purchased.includes(t.id) ? (
                        <>
                          <CheckCircleFill className="me-2" /> Куплено
                        </>
                      ) : (
                        "Купить тест"
                      )}
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Анимация успешной покупки */}
        <AnimatePresence>
          {showSuccess && boughtTest && (
            <motion.div
              className="purchase-toast shadow-lg rounded-4 py-3 px-4 text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.4 }}
            >
              <CheckCircleFill className="me-2 text-success" />
              Куплено: <strong>{boughtTest.title}</strong>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
}
