import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from "recharts";

function Stats({ habits }) {
  const [dailyStats, setDailyStats] = useState([]);

  const totalHabitos = habits.length;
  const habitosCompletados = habits.filter((habit) => habit.completado).length;
  const habitosPendientes = totalHabitos - habitosCompletados;

  const porcentajeCompletados =
    totalHabitos > 0 ? Math.round((habitosCompletados / totalHabitos) * 100) : 0;

  useEffect(() => {
    const cargarEstadisticasDiarias = async () => {
      try {
        const response = await fetch("http://localhost:3000/habits/stats/daily");
        const data = await response.json();

        const datosFormateados = data.map((item) => ({
          fecha: item.fecha,
          completados: Number(item.completados)
        }));

        setDailyStats(datosFormateados);
      } catch (error) {
        console.error("Error al cargar estadísticas diarias:", error);
      }
    };

    cargarEstadisticasDiarias();
  }, []);

  const barData = [
    { nombre: "Completados", cantidad: habitosCompletados },
    { nombre: "Pendientes", cantidad: habitosPendientes }
  ];

  const pieData = [
    { name: "Completados", value: habitosCompletados },
    { name: "Pendientes", value: habitosPendientes }
  ];

  const COLORS = ["#86efac", "#fdba74"];

  return (
    <div className="stats-page">
      <h1>Estadísticas</h1>

      <div className="stats-cards">
        <div className="stats-card">
          <h3>Total</h3>
          <p>{totalHabitos}</p>
        </div>

        <div className="stats-card">
          <h3>Completados</h3>
          <p>{habitosCompletados}</p>
        </div>

        <div className="stats-card">
          <h3>Pendientes</h3>
          <p>{habitosPendientes}</p>
        </div>

        <div className="stats-card">
          <h3>Progreso</h3>
          <p>{porcentajeCompletados}%</p>
        </div>
      </div>

      <div className="chart-box">
        <h2>Resumen visual</h2>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombre" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="cantidad" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-box" style={{ marginTop: "24px" }}>
        <h2>Distribución de hábitos</h2>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-box" style={{ marginTop: "24px" }}>
        <h2>Progreso diario</h2>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <LineChart data={dailyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="completados" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Stats;