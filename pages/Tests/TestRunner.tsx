import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Modal,
  ProgressBar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlarmFill,
  CalculatorFill,
  Flask,
  ChevronLeft,
  ChevronRight,
  ListCheck,
  XCircle,
} from "react-bootstrap-icons";
import Calculator from "./components/Calculator";
import MendeleevTable from "./components/MendeleevTable";
import { useNavigate, useParams } from "react-router-dom";

const SUBJECTS = [
  { id: 1, name: "История Казахстана", questions: 20 },
  { id: 2, name: "Математическая грамотность", questions: 10 },
  { id: 3, name: "Грамотность чтения", questions: 10 },
  { id: 4, name: "Профильный предмет 1", questions: 40 },
  { id: 5, name: "Профильный предмет 2", questions: 40 },
];

export default function TestRunner() {
  const TOTAL_TIME = 4 * 60 * 60;
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [activeSubject, setActiveSubject] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showCalc, setShowCalc] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [finished, setFinished] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [score, setScore] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  // Таймер
  useEffect(() => {
    if (finished) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setFinished(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [finished]);

  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const subject = SUBJECTS.find((s) => s.id === activeSubject)!;
  const totalQuestions = subject.questions;
  const answeredCount = Object.keys(answers).filter((a) =>
    a.startsWith(`${activeSubject}-`)
  ).length;

  // Пример данных
  const questions = Array.from({ length: totalQuestions }, (_, i) => ({
    id: `${activeSubject}-${i + 1}`,
    text: `Вопрос №${i + 1}: Пример содержимого вопроса.`,
    image: i % 7 === 0 ? "/src/assets/sample-question.jpg" : null,
    options: [
      { id: "A", text: "Вариант A", image: i % 5 === 0 ? "/src/assets/opt1.jpg" : null },
      { id: "B", text: "Вариант B" },
      { id: "C", text: "Вариант C", image: i % 3 === 0 ? "/src/assets/opt2.jpg" : null },
      { id: "D", text: "Вариант D" },
    ],
  }));

  const handleAnswer = (qId: string, ans: string) =>
    setAnswers((p) => ({ ...p, [qId]: ans }));

  const handleFinish = () => {
    setFinished(true);
    setScore(Math.floor(60 + Math.random() * 40));
  };

  if (finished) navigate(`/test/${id}/results`);
  const question = questions[currentQuestion];

  return (
    <div className={`test-theme ${focusMode ? "focus-mode" : ""}`}>
      <div className="test-runner-modern py-4">
        <Container fluid>
          <Row>
            {/* ЛЕВАЯ ПАНЕЛЬ */}
            {!focusMode && (
              <Col md={2} className="side-panel">
                <div className="d-flex flex-column align-items-center mb-4">
                  <h6 className="fw-bold text-primary mb-2">ЕНТ</h6>
                  <div className="timer-box-modern d-flex align-items-center px-3 py-2 rounded-pill">
                    <AlarmFill className="text-danger me-2" />
                    <span className="fw-semibold">{formatTime(timeLeft)}</span>
                  </div>
                </div>

                <div className="subject-switcher mb-3">
                  {SUBJECTS.map((s) => (
                    <Button
                      key={s.id}
                      variant={activeSubject === s.id ? "primary" : "outline-primary"}
                      size="sm"
                      className="rounded-pill w-100 mb-1"
                      onClick={() => {
                        setActiveSubject(s.id);
                        setCurrentQuestion(0);
                      }}
                    >
                      {s.name}
                    </Button>
                  ))}
                </div>

                <div className="progress-info text-center small mb-2">
                  <ListCheck className="me-1" /> {answeredCount}/{totalQuestions}
                </div>
                <ProgressBar
                  now={(answeredCount / totalQuestions) * 100}
                  variant="primary"
                  className="rounded-pill mb-3"
                  style={{ height: "6px" }}
                />

                {/* Навигация по вопросам */}
                <div className="question-nav-grid">
                  {questions.map((_, i) => {
                    const qKey = `${activeSubject}-${i + 1}`;
                    const answered = !!answers[qKey];
                    const isActive = currentQuestion === i;
                    const btnVariant = isActive
                      ? "primary"
                      : answered
                      ? "success"
                      : "outline-secondary";
                    return (
                      <OverlayTrigger
                        key={i}
                        overlay={<Tooltip id={`tooltip-${i}`}>Вопрос {i + 1}</Tooltip>}
                        placement="top"
                      >
                        <Button
                          size="sm"
                          variant={btnVariant}
                          className="rounded-circle nav-btn-modern"
                          onClick={() => setCurrentQuestion(i)}
                        >
                          {i + 1}
                        </Button>
                      </OverlayTrigger>
                    );
                  })}
                </div>

                {/* Кнопки утилит */}
                <div className="mt-auto text-center">
                  <div className="d-flex flex-column gap-2 mt-4">
                    <Button
  variant={showCalc ? "primary" : "outline-primary"}
  size="sm"
  className="rounded-pill"
  onClick={() => setShowCalc((prev) => !prev)}
>
  <CalculatorFill className="me-1" />
  {showCalc ? "Скрыть калькулятор" : "Калькулятор"}
</Button>

<Button
  variant={showTable ? "success" : "outline-success"}
  size="sm"
  className="rounded-pill"
  onClick={() => setShowTable((prev) => !prev)}
>
  <Flask className="me-1" />
  {showTable ? "Скрыть таблицу" : "Таблица"}
</Button>

                  </div>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="rounded-pill px-3 mt-3"
                    onClick={() => setShowExitModal(true)}
                  >
                    Завершить тест
                  </Button>
                </div>
              </Col>
            )}

            {/* ПРАВАЯ ОБЛАСТЬ */}
            <Col md={focusMode ? 12 : 10}>
              <motion.div
                className="question-card-modern p-5 rounded-5 shadow-sm bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold text-primary mb-0">
                    {subject.name} — Вопрос {currentQuestion + 1}/{totalQuestions}
                  </h5>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    className="rounded-pill"
                    onClick={() => setFocusMode(!focusMode)}
                  >
                    {focusMode ? "Показать панель" : "Фокус-режим"}
                  </Button>
                </div>

                <p className="fw-semibold mb-3">{question.text}</p>
                {question.image && (
                  <div className="text-center my-3">
                    <Image
                      src={question.image}
                      alt="Вопрос"
                      fluid
                      className="rounded-4 shadow-sm question-img-modern"
                    />
                  </div>
                )}

                <div className="options-grid">
                  {question.options.map((opt) => (
                    <motion.div
                      key={opt.id}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`option-modern p-3 rounded-4 ${
                        answers[question.id] === opt.id ? "selected" : ""
                      }`}
                      onClick={() => handleAnswer(question.id, opt.id)}
                    >
                      {opt.image ? (
                        <Image
                          src={opt.image}
                          alt={opt.text}
                          fluid
                          rounded
                          className="answer-img"
                        />
                      ) : (
                        <span className="fw-medium">
                          {opt.id}) {opt.text}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="d-flex justify-content-between align-items-center mt-4">
                  <Button
                    variant="outline-secondary"
                    className="rounded-pill"
                    disabled={currentQuestion === 0}
                    onClick={() => setCurrentQuestion((q) => q - 1)}
                  >
                    <ChevronLeft className="me-1" /> Назад
                  </Button>

                  <Button
                    variant="primary"
                    className="rounded-pill px-4"
                    onClick={() =>
                      currentQuestion + 1 === totalQuestions
                        ? handleFinish()
                        : setCurrentQuestion((q) => q + 1)
                    }
                  >
                    {currentQuestion + 1 === totalQuestions ? "Завершить" : "Далее"}{" "}
                    <ChevronRight className="ms-1" />
                  </Button>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>

        {/* 🔹 Всплывающие калькулятор и таблица */}
        <AnimatePresence>
  {showCalc && (
    <motion.div
      key="calc"
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 30 }}
      transition={{ duration: 0.25 }}
      style={{
        position: "fixed",
        bottom: 30,
        right: 30,
        zIndex: 9999,
        maxWidth: 320,
        width: "calc(100% - 60px)",
      }}
    >
      <Calculator onClose={() => setShowCalc(false)} />
    </motion.div>
  )}

  {showTable && (
    <motion.div
      key="table"
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 30 }}
      transition={{ duration: 0.25 }}
      style={{
        position: "fixed",
        bottom: 30,
        left: 30,
        zIndex: 9999,
        maxWidth: 420,
        width: "calc(100% - 60px)",
      }}
    >
      <MendeleevTable onClose={() => setShowTable(false)} />
    </motion.div>
  )}
</AnimatePresence>



        {/* Подтверждение выхода */}
        <Modal centered show={showExitModal} onHide={() => setShowExitModal(false)}>
          <Modal.Body className="text-center py-5">
            <XCircle size={60} className="text-danger mb-3" />
            <h5 className="fw-bold mb-2">Завершить тест раньше времени?</h5>
            <p className="text-muted">
              Результат будет сохранён и отправлен как окончательный.
            </p>
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button variant="outline-secondary" onClick={() => setShowExitModal(false)}>
                Отмена
              </Button>
              <Button variant="danger" onClick={handleFinish}>
                Завершить
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
