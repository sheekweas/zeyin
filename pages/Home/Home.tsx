import { useEffect } from "react";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Trophy, LineChart, Coins, Users } from "lucide-react";
import Feature from "../../components/Feature";
import StatCard from "../../components/StatCard";
import Testimonial from "../../components/Testimonial";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  return (
    <div className="home-page">

      {/* ===== HERO ===== */}
      <section
        id="home"
        className="min-vh-100 d-flex align-items-center bg-light position-relative overflow-hidden"
      >
        <Container className="text-start z-2">
          <Row className="align-items-center">
            <Col md={6}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3 fw-medium">
                  Подготовься к ЕНТ легко и с азартом
                </span>
                <h1 className="display-4 fw-bold mb-3">
                  ЕНТ? <br />
                  <span className="text-primary">Легко с Zeyin!</span>
                </h1>
                <p className="text-muted fs-5 mb-4">
                  Онлайн-платформа для пробных ЕНТ, рейтингов и призов. 
                  Проходи тесты, зарабатывай очки и соревнуйся с другими учениками.
                </p>

                <div className="d-flex gap-3">
                  <Button size="lg" className="btn-primary px-4 py-2">
                    <Nav.Link href="/auth/login">Начать бесплатно →</Nav.Link>
                  </Button>
                  <Button size="lg" variant="outline-dark" className="px-4 py-2">
                    <Nav.Link href="/auth/login">Войти</Nav.Link>
                  </Button>
                </div>

                <div className="d-flex gap-5 mt-5 text-dark fw-medium">
                  <div>
                    <h4 className="fw-bold mb-0">10K+</h4>
                    <small className="text-muted">Тестов пройдено</small>
                  </div>
                  <div>
                    <h4 className="fw-bold mb-0">95%</h4>
                    <small className="text-muted">Улучшают результат</small>
                  </div>
                  <div>
                    <h4 className="fw-bold mb-0">#1</h4>
                    <small className="text-muted">По азарту в обучении</small>
                  </div>
                </div>
              </motion.div>
            </Col>

            <Col md={6} className="text-center position-relative">
              <motion.img
                src="/src/assets/hero-img.png"
                alt="Student character"
                className="img-fluid hero-img"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              />
            </Col>
          </Row>
        </Container>
        <div className="hero-bg"></div>
      </section>

      {/* ===== STEPS ===== */}
      <section className="min-vh-100 bg-white d-flex align-items-center text-center">
        <Container>
          <motion.span
            className="badge bg-primary-subtle text-primary mb-3 px-3 py-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Начни за 1 минуту
          </motion.span>
          <h2 className="fw-bold display-6 mb-2">
            Три простых <span className="text-primary">шага к успеху</span>
          </h2>
          <p className="text-muted mb-5 fs-5">
            Всё просто — регистрируйся, проходи тесты и зарабатывай баллы.
          </p>

          <Row className="g-4 justify-content-center">
            {[
              { num: "01", title: "Создай профиль", desc: "Регистрация занимает меньше минуты." },
              { num: "02", title: "Пройди тест", desc: "Реальные задания в формате ЕНТ." },
              { num: "03", title: "Соревнуйся и зарабатывай", desc: "Получай очки и открывай награды." },
            ].map((step, i) => (
              <Col md={3} key={i}>
                <motion.div
                  data-aos="zoom-in"
                  data-aos-delay={i * 150}
                  className={`step-card p-4 rounded-4 shadow-sm ${
                    i === 2 ? "bg-primary text-white" : "bg-white"
                  }`}
                >
                  <h3 className="fw-bold mb-3">{step.num}</h3>
                  <h5 className="fw-semibold">{step.title}</h5>
                  <p className={i === 2 ? "text-white-50" : "text-muted"}>
                    {step.desc}
                  </p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="min-vh-100 bg-light d-flex align-items-center">
        <Container>
          <div className="text-center mb-5">
            <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2">
              Возможности платформы
            </span>
            <h2 className="fw-bold display-6 mb-2">
              Всё для подготовки к <span className="text-primary">ЕНТ</span>
            </h2>
            <p className="text-muted fs-5">
              Тесты, рейтинг, аналитика и мотивация — всё, чтобы достичь 140 баллов.
            </p>
          </div>

          <Row className="text-center g-4">
            <Col md={3} data-aos="zoom-in">
              <Feature
                icon={<Trophy />}
                title="Рейтинг"
                desc="Соревнуйся с другими учениками и поднимайся вверх."
              />
            </Col>
            <Col md={3} data-aos="zoom-in" data-aos-delay="100">
              <Feature
                icon={<LineChart />}
                title="Аналитика"
                desc="Следи за прогрессом и улучшай слабые предметы."
              />
            </Col>
            <Col md={3} data-aos="zoom-in" data-aos-delay="200">
              <Feature
                icon={<Coins />}
                title="Очки и награды"
                desc="Зарабатывай монеты и открывай уникальные предметы."
              />
            </Col>
            <Col md={3} data-aos="zoom-in" data-aos-delay="300">
              <Feature
                icon={<Users />}
                title="Сообщество"
                desc="Учись с друзьями и делись своими достижениями."
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* ===== STATS ===== */}
      <section id="results" className="min-vh-100 d-flex align-items-center bg-white">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold display-6 mb-3">Наши результаты</h2>
            <p className="text-muted fs-5">
              Каждый день тысячи школьников тренируются вместе с Zeyin.
            </p>
          </div>

          <Row className="text-center g-4">
            <Col md={4} data-aos="fade-up">
              <StatCard number={8000} text="Активных участников" />
            </Col>
            <Col md={4} data-aos="fade-up" data-aos-delay="100">
              <StatCard number={15000} text="Пройденных тестов" />
            </Col>
            <Col md={4} data-aos="fade-up" data-aos-delay="200">
              <StatCard number={88} suffix="%" text="Средний прогресс учеников" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="reviews" className="min-vh-100 d-flex align-items-center bg-light">
        <Container>
          <div className="text-center mb-5">
            <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2">
              Отзывы
            </span>
            <h2 className="fw-bold display-6 mb-2">
              Что говорят ученики <span className="text-primary">Zeyin</span>?
            </h2>
            <p className="text-muted fs-5">
              Реальные отзывы школьников, которые улучшили свои результаты.
            </p>
          </div>

          <Row className="g-4">
            <Col md={4}>
              <Testimonial
                name="Айжан С."
                role="Ученица, Алматы"
                text="Мне понравилось, что всё как на настоящем ЕНТ! Соревнования делают процесс интересным."
              />
            </Col>
            <Col md={4}>
              <Testimonial
                name="Нурлан А."
                role="Выпускник, Шымкент"
                text="Zeyin помог увидеть свои слабые стороны и улучшить результат. А очки — это крутая мотивация!"
              />
            </Col>
            <Col md={4}>
              <Testimonial
                name="Диана К."
                role="11 класс, Астана"
                text="Я готовлюсь к ЕНТ вместе с друзьями — это весело и помогает не сдаваться!"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section min-vh-100 d-flex align-items-center text-center text-white">
        <Container>
          <motion.h1
            className="fw-bold display-5 mb-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Присоединяйся к <span className="text-primary">Zeyin</span>
          </motion.h1>
          <motion.p
            className="text-light fs-5 mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Пройди пробный ЕНТ, соревнуйся с другими и поднимайся в рейтинге.
            <br />
            Стань частью сообщества, которое учится с азартом!
          </motion.p>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="light" size="lg" className="btn-glow">
              <Nav.Link href="/auth/login">Начать бесплатно</Nav.Link>
            </Button>
            <Button variant="outline-light" size="lg" className="btn-outline-glow">
              <Nav.Link href="/auth/login">Подробнее</Nav.Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
