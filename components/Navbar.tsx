import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown, Image, Nav, Navbar, Container } from "react-bootstrap";
import { Coin } from "react-bootstrap-icons";
import { motion, AnimatePresence } from "framer-motion";

export default function AppNavbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [coins] = useState(230);
  const [animatedCoins, setAnimatedCoins] = useState(0);
  const location = useLocation();

  const handleLogout = () => setIsAuthenticated(false);

  // === Анимация для валюты ===
  useEffect(() => {
    let start = 0;
    const end = coins;
    const duration = 1000;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 5;
      setAnimatedCoins(Math.min(start, end));
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [coins]);

  const isAuthPage =
    location.pathname.startsWith("/auth") || location.pathname === "/auth/login";

  if (isAuthPage) return null; // скрываем navbar на страницах входа/регистрации

  return (
    <Navbar expand="lg" bg="white" fixed="top" className="zeyin-navbar shadow-sm py-2">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-4">
          <motion.span whileHover={{ scale: 1.05 }}>Zeyin</motion.span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="zeyin-navbar" />
        <Navbar.Collapse id="zeyin-navbar" className="justify-content-end">
          {isAuthenticated ? (
            <div className="d-flex align-items-center gap-3">
              {/* ===== Валюта ===== */}
              <motion.div
                className="coins-box d-flex align-items-center px-3 py-1 rounded-pill shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                <Coin className="text-warning me-2" size={20} />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={animatedCoins}
                    className="fw-semibold text-dark"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.25 }}
                  >
                    {animatedCoins}
                  </motion.span>
                </AnimatePresence>
              </motion.div>

              {/* ===== Профиль ===== */}
              <Dropdown align="end" className="profile-dropdown">
                <Dropdown.Toggle
                  as="div"
                  className="avatar-toggle d-flex align-items-center gap-2"
                >
                  <Image
                    src="/src/assets/avatar.gif"
                    roundedCircle
                    width={38}
                    height={38}
                    className="border border-2 border-light shadow-sm"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow-lg border-0 rounded-4 p-2">
                  <Dropdown.Item as={Link} to="/profile">Профиль</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/tests">Тесты</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/my-tests">Мои тесты</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/my-items">Мои предметы</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/store">Магазин</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/leaderboard">Рейтинг</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/profile/edit">Редактировать</Dropdown.Item>
                  <Dropdown.Item
                    onClick={handleLogout}
                    className="text-danger fw-semibold"
                  >
                    Выйти
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <Nav className="align-items-center gap-3">
              <Nav.Link as={Link} to="/" className="fw-medium text-dark">
                Главная
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="fw-medium text-dark">
                О платформе
              </Nav.Link>
              <Nav.Link as={Link} to="/leaderboard" className="fw-medium text-dark">
                Рейтинг
              </Nav.Link>
              <motion.a
                href="/auth/login"
                className="btn btn-primary px-4 py-2 fw-semibold rounded-3"
                whileHover={{ scale: 1.05 }}
              >
                Войти
              </motion.a>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
