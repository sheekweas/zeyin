import { Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/auth/login");
  };

  return (
    <AuthLayout
      title="Регистрация в Zeyin"
      subtitle="Создай свой аккаунт и начни готовиться к ЕНТ прямо сейчас!"
    >
      <Form onSubmit={handleSubmit}>
        {/* Имя */}
        <Form.Group className="mb-3">
          <Form.Label>Имя и фамилия</Form.Label>
          <Form.Control
            type="text"
            placeholder="Айдар Нурланов"
            required
            className="py-2"
          />
        </Form.Group>

        {/* ИИН */}
        <Form.Group className="mb-3">
          <Form.Label>ИИН</Form.Label>
          <Form.Control
            type="text"
            placeholder="000000000000"
            maxLength={12}
            required
            className="py-2"
          />
        </Form.Group>

        {/* Дата рождения */}
        <Form.Group className="mb-3">
          <Form.Label>Дата рождения</Form.Label>
          <Form.Control
            type="date"
            required
            className="py-2"
          />
        </Form.Group>

        {/* Телефон */}
        <Form.Group className="mb-3">
          <Form.Label>Номер телефона</Form.Label>
          <Form.Control
            type="tel"
            placeholder="+7 777 123 45 67"
            required
            className="py-2"
          />
        </Form.Group>

        {/* Город */}
        <Form.Group className="mb-3">
          <Form.Label>Город</Form.Label>
          <Form.Control
            type="text"
            placeholder="Алматы"
            required
            className="py-2"
          />
        </Form.Group>

        {/* Школа */}
        <Form.Group className="mb-4">
          <Form.Label>Школа</Form.Label>
          <Form.Control
            type="text"
            placeholder="Школа №125"
            required
            className="py-2"
          />
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="you@example.com"
            required
            className="py-2"
          />
        </Form.Group>

        {/* Пароль */}
        <Form.Group className="mb-4">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="••••••••"
            required
            className="py-2"
          />
        </Form.Group>

        <Button type="submit" className="w-100 py-2 fs-5" variant="primary">
          Зарегистрироваться
        </Button>

        <p className="text-center text-muted mt-4 mb-0">
          Уже есть аккаунт?{" "}
          <NavLink to="/auth/login" className="text-primary text-decoration-none">
            Войти
          </NavLink>
        </p>
      </Form>
    </AuthLayout>
  );
}
