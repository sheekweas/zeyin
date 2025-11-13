import { useEffect, useMemo, useState, useRef, type JSXElementConstructor, type ReactElement, type ReactNode, type ReactPortal } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Image, Card, Nav } from "react-bootstrap";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  BarChartFill,
  TrophyFill,
  GraphUpArrow,
  Bullseye,
  Fire,
  Stars,
  PencilSquare,
  PersonVcardFill,
  GeoAltFill,
  EnvelopeFill,
  TelephoneFill,
  BuildingFill,
  CalendarDateFill,
  ShieldLockFill,
  AwardFill,
  Gem,
  BagCheckFill
} from "react-bootstrap-icons";
import ChartsSection from "../../components/ChartsSection";
import UserStatsCard from "../../components/UserStatsCard";

const ME = {
  id: 0,
  fullName: "Аян Калдыбаев",
  username: "@ayan_kz",
  level: 7,
  xp: 420,
  maxXp: 600,
  avatar: "/src/assets/avatar.gif",
  banner: "/src/assets/banner.png",
  stats: {
    testsCompleted: 58,
    bestScore: 96,
    streak: 12,
    accuracy: 91,
    avgScore: 83,
    bestCombo: "Математика + Физика",
  },
  achievements: [
    { title: "ТОП-1 недели", icon: <TrophyFill /> },
    { title: "5-дневный стрик", icon: <Fire /> },
    { title: "100% по математике", icon: <Stars /> },
    { title: "Легенда тестов", icon: <Gem /> },
    { title: "Стабильный результат", icon: <AwardFill /> },
  ],
  personal: {
    phone: "+7 707 000 00 00",
    email: "ayan@example.com",
    iin: "000000000000",
    fio: "Калдыбаев Аян Нурланович",
    birthdate: "2007-04-14",
    school: "Школа-гимназия №23",
    city: "Алматы",
  },
  testHistory: [
    {
      name: "Математика (Базовый уровень)",
      score: 85,
      time: "14 мин",
      correct: 34,
      wrong: 6,
      sections: { Алгебра: "28/30", Геометрия: "6/10" },
    },
    {
      name: "История Казахстана",
      score: 92,
      time: "10 мин",
      correct: 36,
      wrong: 4,
      sections: { Средневековье: "18/20", "Новейшее время": "18/20" },
    },
  ],
  purchasedTests: [
    { title: "Английский язык — Полный курс", icon: <BagCheckFill /> },
    { title: "Физика: ЕНТ Практика", icon: <BagCheckFill /> },
  ],
};

export default function Profile() {
  const { id } = useParams();
  const isOwner = !id;
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(isOwner ? "personal" : "tests");
  const [period, setPeriod] = useState<"week" | "month">("week");
  const [xpDisplay, setXpDisplay] = useState(0);

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    setUser(ME);
  }, []);

  // === XP counter animation ===
  useEffect(() => {
    if (user && xpDisplay < user.xp) {
      let start = 0;
      const end = user.xp;
      const duration = 1200;
      const stepTime = Math.abs(Math.floor(duration / end));
      const timer = setInterval(() => {
        start += 5;
        setXpDisplay(Math.min(start, end));
        if (start >= end) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [user]);

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [controls, isInView]);

  const stats = user?.stats || {};

  const statCards = useMemo(
    () => [
      { title: "Пройдено тестов", value: stats.testsCompleted, icon: <BarChartFill /> },
      { title: "Лучший результат", value: `${stats.bestScore}%`, icon: <TrophyFill /> },
      { title: "Стрик активности", value: `${stats.streak} дней`, icon: <Fire /> },
      { title: "Точность ответов", value: `${stats.accuracy}%`, icon: <Bullseye /> },
      { title: "Лучшая комбинация", value: stats.bestCombo, icon: <Stars /> },
      { title: "Средний результат", value: `${stats.avgScore}%`, icon: <GraphUpArrow /> },
    ],
    [stats]
  );

  if (!user)
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 text-muted">
        Профиль не найден 😕
      </div>
    );

  const bannerStyle = user.banner
    ? { backgroundImage: `url(${user.banner})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: "linear-gradient(135deg, #3E4BFF, #6A5EFF, #8A80FF)" };

  return (
    <div className="profile-page">
      {/* ==== БАННЕР ==== */}
      <section className="banner" style={bannerStyle}>
        <div className="banner-overlay" />
        <div className="avatar-container">
          <Image src={user.avatar} roundedCircle className="avatar" />
        </div>

        {isOwner && (
          <Button as={Link as any} to="/profile/edit" variant="light" className="edit-btn shadow-sm">
            <PencilSquare className="me-2" />
            Редактировать профиль
          </Button>
        )}
      </section>

      <Container className="text-center mt-5 pt-3">
        <motion.h3 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="fw-bold text-primary">
          {user.fullName}
        </motion.h3>
        <p className="text-muted">{user.username}</p>

        {/* ==== XP display ==== */}
        <div className="xp-display mt-4 mb-5">
          <div className="xp-header">
            <div className="level-circle">
              <span className="lvl-text">{user.level}</span>
            </div>
            <div className="xp-text">
              <strong>{xpDisplay}</strong> / {user.maxXp} XP
            </div>
          </div>
          <div className="xp-bar-wrapper mt-2">
            <motion.div
              className="xp-progress"
              initial={{ width: 0 }}
              animate={{ width: `${(user.xp / user.maxXp) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        {/* ==== ВКЛАДКИ ==== */}
        <Nav
          fill
          variant="pills"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k || "tests")}
          className="justify-content-center mb-4"
        >
          {isOwner && <Nav.Item><Nav.Link eventKey="personal">Персональные данные</Nav.Link></Nav.Item>}
          <Nav.Item><Nav.Link eventKey="charts">Графики</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="achievements">Достижения</Nav.Link></Nav.Item>
        </Nav>

        {/* ==== ПЕРСОНАЛЬНЫЕ ДАННЫЕ ==== */}
        {isOwner && activeTab === "personal" && (
          <motion.section
            className="personal-section py-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-0 shadow-sm rounded-4">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center gap-2 mb-4">
                  <PersonVcardFill className="text-primary fs-5" />
                  <h5 className="fw-semibold mb-0">Персональные данные</h5>
                </div>
                <Row className="g-3 text-start">
                  <Col md={6}><div className="personal-card"><TelephoneFill className="text-primary me-2" /> {user.personal.phone}</div></Col>
                  <Col md={6}><div className="personal-card"><EnvelopeFill className="text-primary me-2" /> {user.personal.email}</div></Col>
                  <Col md={6}><div className="personal-card"><ShieldLockFill className="text-primary me-2" /> ИИН: {user.personal.iin}</div></Col>
                  <Col md={6}><div className="personal-card"><CalendarDateFill className="text-primary me-2" /> {user.personal.birthdate}</div></Col>
                  <Col md={6}><div className="personal-card"><BuildingFill className="text-primary me-2" /> {user.personal.school}</div></Col>
                  <Col md={6}><div className="personal-card"><GeoAltFill className="text-primary me-2" /> {user.personal.city}</div></Col>
                </Row>
              </Card.Body>
            </Card>
          </motion.section>
        )}

        {/* ==== ГРАФИКИ ==== */}
        {activeTab === "charts" && (
          <>
          <div className="m-5">
             <Row className="g-4">
              {statCards.map((s, i) => (
                <Col md={4} sm={6} key={i}>
                  <UserStatsCard title={s.title} value={s.value} icon={s.icon} delay={i * 0.1} />
                </Col>
              ))}
            </Row>
          </div>

            <div className="mt-4">
              <Button
                variant={period === "week" ? "primary" : "outline-primary"}
                className="me-2 rounded-pill px-4"
                onClick={() => setPeriod("week")}
              >
                Неделя
              </Button>
              <Button
                variant={period === "month" ? "primary" : "outline-primary"}
                className="rounded-pill px-4"
                onClick={() => setPeriod("month")}
              >
                Месяц
              </Button>
            </div>
            <ChartsSection period={period} />

           
          </>
        )}

        {/* ==== ДОСТИЖЕНИЯ ==== */}
        {activeTab === "achievements" && (
          <section className="achievements-section py-5">
            <h4 className="fw-semibold mb-4 text-primary">Достижения Zeyin</h4>
            <Row className="g-4 justify-content-center">
              {user.achievements.map((a: { icon: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, i: number) => (
                <Col md={4} sm={6} key={i}>
                  <motion.div
                    className="achievement-card p-4 shadow-sm rounded-4 text-center bg-white"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="achievement-icon text-primary fs-2 mb-2">{a.icon}</div>
                    <h6 className="fw-bold">{a.title}</h6>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </section>
        )}
      </Container>
    </div>
  );
}





        
