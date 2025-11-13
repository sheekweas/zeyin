import { Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <AuthLayout
      title="Вход в Zeyin"
      subtitle="Добро пожаловать! Подготовка к ЕНТ начинается здесь."
    >
      <Form onSubmit={handleSubmit}>
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

        <div className="d-flex justify-content-between align-items-center mb-4">
          <Form.Check label="Запомнить меня" />
          <NavLink to="/auth/reset" className="text-primary text-decoration-none">
            Забыли пароль?
          </NavLink>
        </div>

        <Button type="submit" className="w-100 py-2" variant="primary">
          Войти
        </Button>

        <p className="text-center text-muted mt-4 mb-0">
          Нет аккаунта?{" "}
          <NavLink to="/auth/register" className="text-primary text-decoration-none">
            Зарегистрироваться
          </NavLink>
        </p>
      </Form>
    </AuthLayout>
  );
}
