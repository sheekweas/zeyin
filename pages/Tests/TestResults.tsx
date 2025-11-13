import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, ProgressBar, Modal, Nav } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  TrophyFill,
  BarChartFill,
  Bullseye,
  XCircle,
  EmojiSmileFill,
  EmojiNeutralFill,
  EmojiFrownFill,
} from "react-bootstrap-icons";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function TestResults() {
  const [score, setScore] = useState(0);
  const [showErrors, setShowErrors] = useState(false);
  const [viewedErrors, setViewedErrors] = useState(false);
  const [activeSubject, setActiveSubject] = useState("История Казахстана");

  const [results] = useState([
    { subject: "История Казахстана", score: 16, total: 20 },
    { subject: "Математическая грамотность", score: 8, total: 10 },
    { subject: "Грамотность чтения", score: 7, total: 10 },
    { subject: "Математика", score: 33, total: 40 },
    { subject: "Физика", score: 30, total: 40 },
  ]);

  const fakeErrors: { [key: string]: { q: number; correct: string }[] } = {
    "История Казахстана": [
      { q: 3, correct: "B" },
      { q: 7, correct: "A" },
    ],
    "Математическая грамотность": [{ q: 4, correct: "C" }],
    "Грамотность чтения": [{ q: 2, correct: "D" }],
    Математика: [
      { q: 6, correct: "B" },
      { q: 9, correct: "D" },
      { q: 15, correct: "A" },
    ],
    Физика: [{ q: 11, correct: "C" }],
  };

  useEffect(() => {
    const total = results.reduce((a, b) => a + b.total, 0);
    const gained = results.reduce((a, b) => a + b.score, 0);
    setScore(Math.round((gained / total) * 100));
  }, [results]);

  const COLORS = ["#3E4BFF", "#00C49F", "#FFBB28", "#FF8042", "#9B6EFF"];

  const getEmoji = () => {
    if (score >= 85) return <EmojiSmileFill className="text-success" size={48} />;
    if (score >= 60) return <EmojiNeutralFill className="text-warning" size={48} />;
    return <EmojiFrownFill className="text-danger" size={48} />;
  };

  return (
    <div className="test-theme">
      <div className="test-results-page min-vh-100 py-5">
        <Container>
          {/* Заголовок */}
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <TrophyFill className="text-warning mb-3" size={64} />
            <h1 className="fw-bold text-primary mb-2">Результаты ЕНТ</h1>
            <p className="text-muted">
              Поздравляем! Ты завершил экзамен — вот твой подробный анализ 👇
            </p>
          </motion.div>

          {/* Итоговый балл */}
          <motion.div
            className="result-card text-center rounded-4 shadow-sm p-5 mb-5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {getEmoji()}
            <h2 className="fw-bold text-primary mt-3">Общий результат</h2>
            <h1 className="display-4 fw-bold text-dark">{score}%</h1>
            <div className="mx-auto" style={{ maxWidth: "500px" }}>
              <ProgressBar
                now={score}
                label={`${score}%`}
                className="rounded-pill"
                variant={score > 80 ? "success" : score > 60 ? "warning" : "danger"}
              />
            </div>
            <p className="text-muted mt-3">
              {score >= 80
                ? "Отлично! Ты готов к реальному экзамену 💪"
                : score >= 60
                ? "Хорошо! Есть куда улучшаться ⚡"
                : "Не отчаивайся — повтори материал и попробуй снова 📘"}
            </p>
          </motion.div>

          {/* Аналитика */}
          <h4 className="fw-bold text-primary text-center mb-4">
            Подробная статистика по предметам
          </h4>
          <Row className="g-4 mb-5">
            {results.map((r, i) => {
              const percent = Math.round((r.score / r.total) * 100);
              return (
                <Col md={4} key={i}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="p-4 border-0 rounded-4 shadow-sm text-center">
                      <BarChartFill className="text-primary mb-2" size={30} />
                      <h5 className="fw-semibold mb-1">{r.subject}</h5>
                      <p className="text-muted mb-2">
                        {r.score}/{r.total} верных
                      </p>
                      <ProgressBar
                        now={percent}
                        label={`${percent}%`}
                        className="rounded-pill"
                        variant={percent > 80 ? "success" : percent > 60 ? "warning" : "danger"}
                      />
                    </Card>
                  </motion.div>
                </Col>
              );
            })}
          </Row>

          {/* Диаграмма */}
          <Card className="p-4 rounded-4 shadow-sm mb-5">
            <h5 className="fw-bold text-primary text-center mb-4">
              Распределение результатов по предметам
            </h5>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={results.map((r) => ({ name: r.subject, value: r.score }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >
                  {results.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Кнопки */}
          <div className="text-center mt-4">
            <Button
              variant="outline-primary"
              className="rounded-pill px-4 me-2"
              onClick={() => {
                if (viewedErrors) return alert("Ошибки можно просмотреть только один раз.");
                setShowErrors(true);
                setViewedErrors(true);
              }}
            >
              <Bullseye className="me-2" /> Просмотреть ошибки
            </Button>
            <Button variant="primary" className="rounded-pill px-4" href="/profile">
              Завершить
            </Button>
          </div>

          {/* Модалка ошибок */}
          <Modal show={showErrors} onHide={() => setShowErrors(false)} centered size="lg">
            <Modal.Body className="p-4">
              <div className="text-center mb-4">
                <XCircle className="text-danger mb-2" size={48} />
                <h4 className="fw-bold mb-1">Ошибки по предметам</h4>
                <p className="text-muted small">
                  После закрытия модального окна повторно открыть нельзя.
                </p>
              </div>

              <Nav variant="pills" className="justify-content-center mb-4">
                {Object.keys(fakeErrors).map((subj) => (
                  <Nav.Item key={subj}>
                    <Nav.Link
                      eventKey={subj}
                      active={activeSubject === subj}
                      onClick={() => setActiveSubject(subj)}
                      className="rounded-pill px-3 py-1"
                    >
                      {subj}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>

              <div>
                {fakeErrors[activeSubject].map((e, i) => (
                  <div key={i} className="error-item p-3 mb-3 rounded-4 bg-light">
                    <strong>
                      {activeSubject}: вопрос {e.q}
                    </strong>{" "}
                    — неправильный ответ.
                    <br />
                    <span className="text-muted small">
                      Правильный ответ: <span className="text-success fw-semibold">{e.correct}</span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-center mt-3">
                <Button variant="primary" className="rounded-pill px-4" onClick={() => setShowErrors(false)}>
                  Закрыть
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </div>
  );
}
