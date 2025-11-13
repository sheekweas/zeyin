import { Container, Row, Col } from "react-bootstrap";
import { Instagram, Send, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h4 className="fw-bold mb-3 text-primary">ZEYIN</h4>
            <p className="small text-light opacity-75">
              Ведущая платформа для подготовки к экзаменам в Казахстане. Помогаем
              ученикам достигать высоких результатов с 2025 года.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="social-icon">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-icon">
                <Send size={20} />
              </a>
              <a href="#" className="social-icon">
                <MessageCircle size={20} />
              </a>
            </div>
          </Col>

          <Col md={4} className="mb-4">
            <h6 className="fw-semibold mb-3">Быстрые ссылки</h6>
            <ul className="list-unstyled text-light opacity-75 small">
              <li><a href="#">Главная</a></li>
              <li><a href="#">Регистрация</a></li>
              <li><a href="#">Вход</a></li>
              <li><a href="#">О нас</a></li>
              <li><a href="#">Помощь</a></li>
            </ul>
          </Col>

          <Col md={4}>
            <h6 className="fw-semibold mb-3">Контакты</h6>
            <ul className="list-unstyled text-light opacity-75 small">
              <li>г. Астана, Проспект Туран, 34в</li>
              <li>+7 (700) 202-94-05</li>
              <li>Пн–Пт: 9:00–18:00</li>
              <li>info@zeyin.kz</li>
            </ul>
          </Col>
        </Row>

        <div className="text-center mt-4 small opacity-75">
          © 2025 ZEYIN. Все права защищены.
        </div>
      </Container>
    </footer>
  );
}
