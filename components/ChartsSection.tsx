import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Row, Col, Card } from "react-bootstrap";

interface Props {
  period: "week" | "month";
}

export default function ChartsSection({ period }: Props) {
  const activityData =
    period === "week"
      ? [
          { d: "Пн", act: 2 },
          { d: "Вт", act: 3 },
          { d: "Ср", act: 5 },
          { d: "Чт", act: 4 },
          { d: "Пт", act: 6 },
          { d: "Сб", act: 3 },
          { d: "Вс", act: 5 },
        ]
      : Array.from({ length: 30 }, (_, i) => ({
          d: i + 1,
          act: Math.floor(Math.random() * 8) + 1,
        }));

  const recentTests = [
    { name: "Тест 1", score: 78 },
    { name: "Тест 2", score: 85 },
    { name: "Тест 3", score: 92 },
    { name: "Тест 4", score: 88 },
    { name: "Тест 5", score: 80 },
  ];

  const correctError = [
    { name: "Правильные", value: 240 },
    { name: "Ошибки", value: 60 },
  ];

  const COLORS = ["#3E4BFF", "#00C49F", "#FF8042", "#FFBB28"];

  return (
    <section className="charts-section py-5">
      <Row className="g-4">
        <Col lg={7}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
            <Card className="p-4 shadow-sm rounded-4">
              <h5 className="fw-semibold mb-4 text-center">Активность ({period === "week" ? "Неделя" : "Месяц"})</h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={activityData}>
                  <XAxis dataKey="d" stroke="#999" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="act" stroke="#3E4BFF" strokeWidth={3} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Col>

        <Col lg={5}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
            <Card className="p-4 shadow-sm rounded-4">
              <h5 className="fw-semibold mb-4 text-center">Результаты последних тестов</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={recentTests}>
                  <XAxis dataKey="name" stroke="#999" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#6C63FF" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Col>
      </Row>

      <Row className="g-4 mt-1">
        <Col lg={6}>
          <Card className="p-4 shadow-sm rounded-4">
            <h5 className="fw-semibold mb-4 text-center">Правильные ответы vs Ошибки</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={correctError} dataKey="value" cx="50%" cy="50%" outerRadius={95} label>
                  {correctError.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </section>
  );
}
