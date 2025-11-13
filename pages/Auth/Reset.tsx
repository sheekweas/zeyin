import { Form, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";

export default function Reset() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("На вашу почту отправлена ссылка для сброса пароля.");
  };

  return (
    <AuthLayout
      title="Сброс пароля"
      subtitle="Введите email, чтобы восстановить доступ к аккаунту."
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="you@example.com"
            required
            className="py-2"
          />
        </Form.Group>

        <Button type="submit" className="w-100 py-2 mb-3" variant="primary">
          Отправить ссылку
        </Button>

        <p className="text-center text-muted">
          Вспомнили пароль?{" "}
          <NavLink to="/auth/login" className="text-primary text-decoration-none">
            Вернуться к входу
          </NavLink>
        </p>
      </Form>
    </AuthLayout>
  );
}
