import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Badge, Modal } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { Coin, CheckCircleFill } from "react-bootstrap-icons";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const allItems: Item[] = [
  {
    id: 1,
    name: "Редкий аватар #01",
    description: "Уникальный стиль для твоего профиля — выделяйся из толпы.",
    price: 150,
    image: "/src/assets/avatar-1.gif",
    category: "Аватары",
  },
  {
    id: 2,
    name: "Фон ‘Night Sky’",
    description: "Потрясающий звёздный фон для твоего профиля.",
    price: 250,
    image: "/src/assets/banner-1.jpg",
    category: "Фоны",
  },
  {
    id: 3,
    name: "XP Booster (x2 на 1 день)",
    description: "Удваивает получаемый XP на 24 часа.",
    price: 400,
    image: "/src/assets/items/booster.png",
    category: "Бустеры",
  },
];

export default function Store() {
  const [coins, setCoins] = useState(1000);
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [ownedItems, setOwnedItems] = useState<Item[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [purchasedItem, setPurchasedItem] = useState<Item | null>(null);

  const categories = ["Все", "Аватары", "Фоны", "Бустеры"];

  useEffect(() => {
    const saved = localStorage.getItem("zeyinOwnedItems");
    if (saved) setOwnedItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("zeyinOwnedItems", JSON.stringify(ownedItems));
  }, [ownedItems]);

  const filteredItems =
    selectedCategory === "Все"
      ? allItems
      : allItems.filter((item) => item.category === selectedCategory);

  const handlePurchase = (item: Item) => {
    if (coins < item.price) {
      alert("Недостаточно монет 😢");
      return;
    }
    if (ownedItems.some((i) => i.id === item.id)) {
      alert("Ты уже купил этот предмет!");
      return;
    }

    setCoins((c) => c - item.price);
    setOwnedItems((prev) => [...prev, item]);
    setPurchasedItem(item);
    setShowModal(true);
  };

  return (
    <div className="store-page min-vh-100">
      <Container className="py-5">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="fw-bold text-primary mb-2">Магазин Zeyin</h1>
          <p className="text-muted mb-3">
            Трать монеты на редкие предметы, красивые фоны и мощные бустеры ✨
          </p>

          <motion.div
            className="coin-display d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill shadow-sm"
            whileHover={{ scale: 1.05 }}
          >
            <Coin className="text-warning" size={22} />
            <span className="fw-semibold text-dark">{coins}</span>
          </motion.div>
        </motion.div>

        {/* Категории */}
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`category-btn ${
                selectedCategory === cat ? "active" : ""
              }`}
              whileHover={{ scale: 1.07 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Товары */}
        <Row className="g-4">
          {filteredItems.map((item, i) => (
            <Col lg={4} md={6} key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="store-item glass-card border-0 rounded-4">
                  <div className="image-wrapper">
                    <Card.Img
                      src={item.image}
                      alt={item.name}
                      className="item-img"
                    />
                    <Badge bg="light" text="dark" className="price-tag shadow-sm">
                      <Coin className="text-warning me-1" size={14} />
                      {item.price}
                    </Badge>
                  </div>
                  <Card.Body>
                    <h5 className="fw-bold">{item.name}</h5>
                    <p className="text-muted small">{item.description}</p>

                    <Button
                      variant={
                        ownedItems.some((i) => i.id === item.id)
                          ? "outline-secondary"
                          : "primary"
                      }
                      className="w-100 rounded-pill mt-2"
                      onClick={() => handlePurchase(item)}
                      disabled={ownedItems.some((i) => i.id === item.id)}
                    >
                      {ownedItems.some((i) => i.id === item.id)
                        ? "Куплено"
                        : "Купить"}
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Модалка покупки */}
        <AnimatePresence>
          {showModal && purchasedItem && (
            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              centered
              backdrop="static"
              contentClassName="rounded-4 shadow-lg border-0"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Modal.Body className="text-center py-5">
                  <CheckCircleFill className="text-success mb-3" size={64} />
                  <h4 className="fw-bold mb-2">Поздравляем! 🎉</h4>
                  <p className="text-muted">
                    Ты приобрёл <strong>{purchasedItem.name}</strong>
                  </p>
                  <Button
                    variant="primary"
                    className="rounded-pill mt-3 px-4"
                    onClick={() => setShowModal(false)}
                  >
                    Отлично!
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
