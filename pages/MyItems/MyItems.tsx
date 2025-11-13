import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Nav } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleFill, Stars } from "react-bootstrap-icons";

interface Item {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
  type: "avatar" | "banner" | "booster";
}

export default function MyItems() {
  const [ownedItems, setOwnedItems] = useState<Item[]>([]);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [showAlreadyApplied, setShowAlreadyApplied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [animatingItem, setAnimatingItem] = useState<number | null>(null);

  const categories = ["Все", "Аватары", "Фоны", "Бустеры"];

  useEffect(() => {
    const saved = localStorage.getItem("zeyinOwnedItems");
    if (saved) setOwnedItems(JSON.parse(saved));
  }, []);

  const handleApply = (item: Item) => {
    const storageKey =
      item.type === "avatar"
        ? "zeyinActiveAvatar"
        : item.type === "banner"
        ? "zeyinActiveBanner"
        : null;

    if (!storageKey) return;

    const current = localStorage.getItem(storageKey);
    if (current === item.image) {
      setShowAlreadyApplied(true);
      return;
    }

    localStorage.setItem(storageKey, item.image);
    setActiveItem(item.id);
    setAnimatingItem(item.id);
    setTimeout(() => setAnimatingItem(null), 1800); // убрать анимацию через 1.8 сек
  };

  const filteredItems =
    selectedCategory === "Все"
      ? ownedItems
      : ownedItems.filter((i) => i.category === selectedCategory);

  return (
    <div className="my-items-page min-vh-100">
      <Container className="py-5">
        {/* Заголовок */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="fw-bold text-primary mb-2">
            Мои предметы <Stars className="text-warning ms-1" />
          </h1>
          <p className="text-muted">
            Активируй купленные предметы и укрась свой профиль ✨
          </p>
        </motion.div>

        {/* Категории */}
        {ownedItems.length > 0 && (
          <Nav
            fill
            variant="pills"
            activeKey={selectedCategory}
            onSelect={(k) => setSelectedCategory(k || "Все")}
            className="justify-content-center mb-4 myitems-tabs"
          >
            {categories.map((cat) => (
              <Nav.Item key={cat}>
                <Nav.Link eventKey={cat}>{cat}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        )}

        {/* Контент */}
        {ownedItems.length === 0 ? (
          <div className="text-center text-muted py-5">
            У тебя пока нет купленных предметов 😔
          </div>
        ) : (
          <Row className="g-4">
            {filteredItems.map((item, idx) => (
              <Col md={4} sm={6} key={item.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <div
                    className={`item-wrapper ${
                      animatingItem === item.id ? "activate-anim" : ""
                    }`}
                  >
                    <Card
                      className={`item-card border-0 rounded-4 shadow-sm ${
                        activeItem === item.id ? "active-card" : ""
                      }`}
                    >
                      <div className="item-image-wrapper">
                        <Card.Img
                          src={item.image}
                          className="item-img rounded-top-4"
                        />
                      </div>
                      <Card.Body>
                        <Card.Title className="fw-semibold">
                          {item.name}
                        </Card.Title>
                        <Card.Text className="text-muted small">
                          {item.description}
                        </Card.Text>

                        <Button
                          variant={
                            activeItem === item.id ? "success" : "primary"
                          }
                          className="w-100 rounded-pill"
                          onClick={() => handleApply(item)}
                        >
                          {activeItem === item.id ? "Активно" : "Применить"}
                        </Button>
                      </Card.Body>
                    </Card>

                    {animatingItem === item.id && (
                      <motion.div
                        className="activation-glow"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        <CheckCircleFill className="text-success glow-icon" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        )}

        {/* Модалка */}
        <AnimatePresence>
          {showAlreadyApplied && (
            <Modal
              show={showAlreadyApplied}
              onHide={() => setShowAlreadyApplied(false)}
              centered
              contentClassName="rounded-4 shadow-lg border-0"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Modal.Body className="text-center py-5">
                  <CheckCircleFill className="text-warning mb-3" size={64} />
                  <h4 className="fw-bold mb-2">Этот предмет уже применён</h4>
                  <p className="text-muted mb-4">
                    Попробуй активировать другой — экспериментируй со стилем!
                  </p>
                  <Button
                    variant="primary"
                    className="rounded-pill px-4"
                    onClick={() => setShowAlreadyApplied(false)}
                  >
                    Понятно
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
