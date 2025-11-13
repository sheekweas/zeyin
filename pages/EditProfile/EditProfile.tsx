import { useState } from "react";
import { Form, Button, Image, Card, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  PersonCircle,
  EnvelopeFill,
  TelephoneFill,
  KeyFill,
  Upload,
  CheckCircleFill,
  ExclamationTriangleFill,
} from "react-bootstrap-icons";

export default function EditProfile() {
  const [preview, setPreview] = useState("/assets/avatar.png");
  const [formData, setFormData] = useState({
    username: "@ayan_kz",
    email: "ayan@example.com",
    phone: "+7 707 000 00 00",
    password: "",
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileURL = URL.createObjectURL(e.target.files[0]);
      setPreview(fileURL);
    }
  };

  const handleOpenConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleSave = () => {
    setShowConfirm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="edit-profile-page d-flex align-items-center justify-content-center min-vh-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="edit-wrapper"
      >
        <Card className="p-4 p-md-5 shadow-lg border-0 rounded-4 bg-white edit-card">
          <h3 className="text-center fw-bold text-primary mb-4">Редактирование профиля</h3>

          {/* ==== AVATAR ==== */}
          <div className="text-center mb-4 position-relative">
            <motion.div
              className="avatar-edit-container mx-auto position-relative"
              whileHover={{ scale: 1.05 }}
            >
              <Image src={preview} roundedCircle className="avatar-edit shadow-sm" />
              <Form.Label htmlFor="avatarUpload" className="upload-btn">
                <Upload />
              </Form.Label>
              <Form.Control
                type="file"
                id="avatarUpload"
                accept="image/*"
                onChange={handleAvatarChange}
                hidden
              />
            </motion.div>
          </div>

          {/* ==== FORM ==== */}
          <Form onSubmit={handleOpenConfirm}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                <PersonCircle className="me-2 text-primary" /> Имя пользователя
              </Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-input"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                <EnvelopeFill className="me-2 text-primary" /> Электронная почта
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                <TelephoneFill className="me-2 text-primary" /> Номер телефона
              </Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">
                <KeyFill className="me-2 text-primary" /> Новый пароль
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Введите новый пароль"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
              />
            </Form.Group>

            <div className="text-center">
              <Button type="submit" variant="primary" size="lg" className="save-btn btn-glow px-5">
                Сохранить изменения
              </Button>
              {saved && (
                <motion.div
                  className="mt-3 text-success d-flex align-items-center justify-content-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <CheckCircleFill />
                  Изменения сохранены!
                </motion.div>
              )}
            </div>
          </Form>
        </Card>
      </motion.div>

      {/* ==== MODAL CONFIRM ==== */}
      <Modal
        centered
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        backdrop="static"
        keyboard={false}
        className="confirm-modal"
      >
        <Modal.Body className="text-center p-5">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ExclamationTriangleFill className="fs-1 text-warning mb-3" />
            <h5 className="fw-semibold mb-3">Подтвердите сохранение</h5>
            <p className="text-muted mb-4">
              Вы действительно хотите сохранить изменения профиля?
            </p>

            <div className="d-flex justify-content-center gap-3">
              <Button variant="outline-secondary" className="rounded-pill px-4" onClick={() => setShowConfirm(false)}>
                Отменить
              </Button>
              <Button variant="primary" className="rounded-pill px-4 btn-glow" onClick={handleSave}>
                Сохранить
              </Button>
            </div>
          </motion.div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
