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
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const totalHabitos = habits.length;
  const habitosCompletadosHoy = habits.filter((habit) => habit.completado).length;
  const habitosPendientes = totalHabitos - habitosCompletadosHoy;

  const porcentajeCompletados =
    totalHabitos > 0 ? Math.round((habitosCompletadosHoy / totalHabitos) * 100) : 0;

  const categoriasData = Object.values(
    habits.reduce((acc, habit) => {
      const categoria = habit.categoria || "General";

      if (!acc[categoria]) {
        acc[categoria] = { categoria, cantidad: 0 };
      }

      acc[categoria].cantidad += 1;
      return acc;
    }, {})
  );

  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        const dailyResponse = await fetch("http://localhost:3000/habits/stats/daily");
        const dailyData = await dailyResponse.json();

        const datosDiarios = dailyData.map((item) => ({
          fecha: item.fecha,
          completados: Number(item.completados)
        }));

        setDailyStats(datosDiarios);

        const weeklyResponse = await fetch("http://localhost:3000/habits/stats/weekly");
        const weeklyData = await weeklyResponse.json();

        const datosSemanales = weeklyData.map((item) => ({
          semana: item.semana,
          completados: Number(item.completados)
        }));

        setWeeklyStats(datosSemanales);

        const streakResponse = await fetch("http://localhost:3000/habits/stats/streak");
        const streakData = await streakResponse.json();
        setStreak(streakData.rachaActual);

        const maxStreakResponse = await fetch("http://localhost:3000/habits/stats/max-streak");
        const maxStreakData = await maxStreakResponse.json();
        setMaxStreak(maxStreakData.rachaMaxima);
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
      }
    };

    cargarEstadisticas();
  }, [habits]);

  const barData = [
    { nombre: "Completados hoy", cantidad: habitosCompletadosHoy },
    { nombre: "Pendientes", cantidad: habitosPendientes }
  ];

  const pieData = [
    { name: "Completados hoy", value: habitosCompletadosHoy },
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
          <h3>Pendientes</h3>
          <p>{habitosPendientes}</p>
        </div>

        <div className="stats-card">
          <h3>Completados hoy</h3>
          <p>{habitosCompletadosHoy}</p>
        </div>

        <div className="stats-card">
          <h3>Progreso</h3>
          <p>{porcentajeCompletados}%</p>
        </div>

        <div className="stats-card">
          <h3>Racha actual</h3>
          <p>{streak}</p>
        </div>

        <div className="stats-card">
          <h3>Racha máxima</h3>
          <p>{maxStreak}</p>
        </div>
      </div>

      <div className="chart-box">
        <h2>Resumen del día</h2>
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
          {dailyStats.length === 0 ? (
            <p className="empty-message">Todavía no hay datos diarios registrados.</p>
          ) : (
            <ResponsiveContainer>
              <LineChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="completados" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="chart-box" style={{ marginTop: "24px" }}>
        <h2>Progreso semanal</h2>
        <div style={{ width: "100%", height: 320 }}>
          {weeklyStats.length === 0 ? (
            <p className="empty-message">Todavía no hay datos semanales registrados.</p>
          ) : (
            <ResponsiveContainer>
              <BarChart data={weeklyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semana" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="completados" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="chart-box" style={{ marginTop: "24px" }}>
        <h2>Hábitos por categoría</h2>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <BarChart data={categoriasData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="categoria" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="cantidad" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Stats;