import { useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Nav, Badge } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrophyFill,
  StarFill,
  GraphUp,
  Award,
  Gem,
  BarChartFill,
  LightningFill,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  username: string;
  level: number;
  xp: number;
  maxScore: number;
  avgScore: number;
  totalPoints: number;
  avatar: string;
}

const users: User[] = [
  {
    id: 1,
    name: "Аян Калдыбаев",
    username: "@ayan_kz",
    level: 9,
    xp: 5200,
    maxScore: 98,
    avgScore: 89,
    totalPoints: 15600,
    avatar: "/src/assets/avatar.gif",
  },
  {
    id: 2,
    name: "Диана Касымова",
    username: "@diana_ksm",
    level: 8,
    xp: 4600,
    maxScore: 95,
    avgScore: 87,
    totalPoints: 14900,
    avatar: "/src/assets/avatar.gif",
  },
  {
    id: 3,
    name: "Нуржан Есен",
    username: "@nur_es",
    level: 8,
    xp: 4300,
    maxScore: 93,
    avgScore: 85,
    totalPoints: 14100,
    avatar: "/src/assets/avatar.gif",
  },
  {
    id: 4,
    name: "Жансая Алим",
    username: "@zhan_alm",
    level: 7,
    xp: 3900,
    maxScore: 91,
    avgScore: 84,
    totalPoints: 13700,
    avatar: "/src/assets/avatar.gif",
  },
  {
    id: 5,
    name: "Алихан Рахим",
    username: "@ali_rk",
    level: 7,
    xp: 3600,
    maxScore: 89,
    avgScore: 81,
    totalPoints: 13300,
    avatar: "/src/assets/avatar.gif",
  },
];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("level");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const getSortedUsers = () => {
    switch (activeTab) {
      case "xp":
      case "level":
        return [...users].sort((a, b) => b.xp - a.xp);
      case "max":
        return [...users].sort((a, b) => b.maxScore - a.maxScore);
      case "avg":
        return [...users].sort((a, b) => b.avgScore - a.avgScore);
      case "total":
        return [...users].sort((a, b) => b.totalPoints - a.totalPoints);
      default:
        return users;
    }
  };

  const sortedUsers = getSortedUsers();

  return (
    <div className="leaderboard-page min-vh-100 pt-5">
      <Container className="py-5">
        {/* === Header === */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h1 className="fw-bold text-primary">
            Таблица лидеров
          </h1>
          <p className="text-muted mb-3">
            Узнай, кто в топе Zeyin по уровню, баллам и прогрессу
          </p>
        </motion.div>

        {/* === Tabs === */}
        <Nav
          fill
          variant="pills"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k || "level")}
          className="justify-content-center mb-4 leaderboard-tabs"
        >
          <Nav.Item><Nav.Link eventKey="level"><Award className="me-1" /> Уровень / XP</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="max"><Gem className="me-1" /> Макс. балл</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="avg"><GraphUp className="me-1" /> Средний результат</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="total"><BarChartFill className="me-1" /> Общий рейтинг</Nav.Link></Nav.Item>
        </Nav>

        {/* === Cards === */}
        <Row className="g-4 justify-content-center">
          {sortedUsers.map((user, i) => (
            <Col md={6} lg={4} key={user.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card
                  className={`leader-card border-0 rounded-4 shadow-sm position-relative ${
                    i === 0 ? "first" : i === 1 ? "second" : i === 2 ? "third" : ""
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="d-flex align-items-center p-4 gap-3">
                    <div className="position-relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="leader-avatar rounded-circle shadow-sm"
                      />
                      <Badge
                        bg="primary"
                        className="position-absolute top-0 start-100 translate-middle rounded-circle px-2 rank-badge"
                      >
                        {i + 1}
                      </Badge>
                    </div>
                    <div className="flex-grow-1 text-start">
                      <h5 className="fw-bold mb-0">{user.name}</h5>
                      <small className="text-muted">{user.username}</small>
                      <div className="d-flex align-items-center gap-2 mt-2 text-primary small">
                        {activeTab === "level" && (
                          <>
                            <LightningFill /> {user.level} ур., {user.xp} XP
                          </>
                        )}
                        {activeTab === "max" && (
                          <>
                            <StarFill className="text-warning" /> Макс. балл {user.maxScore}
                          </>
                        )}
                        {activeTab === "avg" && (
                          <>
                            <GraphUp /> Средний {user.avgScore}%
                          </>
                        )}
                        {activeTab === "total" && (
                          <>
                            <TrophyFill className="text-warning" /> {user.totalPoints.toLocaleString()} очков
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* === Modal === */}
        <AnimatePresence>
          {selectedUser && (
            <Modal
              show
              onHide={() => setSelectedUser(null)}
              centered
              size="lg"
              backdrop="static"
              contentClassName="rounded-4 border-0 shadow-lg"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Modal.Body className="text-center py-5">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className="avatar-lg rounded-circle shadow mb-3 border border-3 border-primary"
                  />
                  <h3 className="fw-bold text-primary mb-1">{selectedUser.name}</h3>
                  <p className="text-muted mb-4">{selectedUser.username}</p>

                  <div className="row g-3 mb-4 justify-content-center">
                    <div className="col-md-3 col-6">
                      <div className="stat-box">
                        <Award className="text-primary mb-2" size={24} />
                        <div className="fw-semibold">{selectedUser.level}</div>
                        <small className="text-muted">Уровень</small>
                      </div>
                    </div>
                    <div className="col-md-3 col-6">
                      <div className="stat-box">
                        <LightningFill className="text-warning mb-2" size={24} />
                        <div className="fw-semibold">{selectedUser.xp}</div>
                        <small className="text-muted">XP</small>
                      </div>
                    </div>
                    <div className="col-md-3 col-6">
                      <div className="stat-box">
                        <StarFill className="text-danger mb-2" size={24} />
                        <div className="fw-semibold">{selectedUser.maxScore}</div>
                        <small className="text-muted">Макс. балл</small>
                      </div>
                    </div>
                    <div className="col-md-3 col-6">
                      <div className="stat-box">
                        <GraphUp className="text-success mb-2" size={24} />
                        <div className="fw-semibold">{selectedUser.avgScore}%</div>
                        <small className="text-muted">Средний результат</small>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline-primary"
                    className="rounded-pill px-4 me-2"
                    onClick={() => setSelectedUser(null)}
                  >
                    Закрыть
                  </Button>
                  <Button
                    variant="primary"
                    className="rounded-pill px-4"
                    onClick={() => navigate(`/user/${selectedUser.id}`)}
                  >
                    Профиль
                  </Button>
                </Modal.Body>
              </motion.div>
            </Modal>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
}
