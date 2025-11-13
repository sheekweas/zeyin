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
        <Form.Group className="mb-3">
          <Form.Label>Имя и фамилия</Form.Label>
          <Form.Control
            type="text"
            placeholder="Айдар Нурланов"
            required
            className="py-2"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="you@example.com"
            required
            className="py-2"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="••••••••"
            required
            className="py-2"
          />
        </Form.Group>

        <Button type="submit" className="w-100 py-2" variant="primary">
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
