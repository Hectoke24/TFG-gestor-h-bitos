{/* Importa los hooks de React y los componentes de Recharts para crear gráficos */}
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

{/* Stats recibe la lista de habitos desde App.tsx mediante props */}
function Stats({ habits }) {
  {/* Define estados para guardar las estadísticas diarias, semanales, la racha actual y la racha máxima */}
  const [dailyStats, setDailyStats] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  {/* Calcula el total de hábitos, los completados hoy, los pendientes y el porcentaje de completados */}
  const totalHabitos = habits.length;
  const habitosCompletadosHoy = habits.filter((habit) => habit.completado).length;
  const habitosPendientes = totalHabitos - habitosCompletadosHoy;

  const porcentajeCompletados =
    totalHabitos > 0 ? Math.round((habitosCompletadosHoy / totalHabitos) * 100) : 0;

  {/* Agrupa los hábitos por categoría y cuenta cuántos hay en cada una */}
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

  {/* useEffect para cargar las estadísticas desde el backend cada vez que cambian los hábitos */}
  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        {/* Obtiene desde el backend los habitos completados por dia */}
        const dailyResponse = await fetch("http://localhost:3000/habits/stats/daily");
        const dailyData = await dailyResponse.json();

        const datosDiarios = dailyData.map((item) => ({
          fecha: item.fecha,
          completados: Number(item.completados)
        }));

        setDailyStats(datosDiarios);

        {/* Obtiene desde el backend los habitos completados por semana */}
        const weeklyResponse = await fetch("http://localhost:3000/habits/stats/weekly");
        const weeklyData = await weeklyResponse.json();

        const datosSemanales = weeklyData.map((item) => ({
          semana: item.semana,
          completados: Number(item.completados)
        }));

        setWeeklyStats(datosSemanales);

        {/* Obtiene desde el backend la racha actual y la racha máxima */}
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

  {/* Prepara los datos para los gráficos de barras y pastel */}
  const barData = [
    { nombre: "Completados hoy", cantidad: habitosCompletadosHoy },
    { nombre: "Pendientes", cantidad: habitosPendientes }
  ];

  const pieData = [
    { name: "Completados hoy", value: habitosCompletadosHoy },
    { name: "Pendientes", value: habitosPendientes }
  ];

  const COLORS = ["#86efac", "#fdba74"];

  {/* Devuelve la interfaz visual de la pagina de estadisticas */}
  return (
    <div className="stats-page">
      <h1>Estadísticas</h1>

      {/* Muestra las estadísticas principales en tarjetas */}
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
            {/* Gráfico de barras para mostrar los hábitos completados y pendientes hoy */}
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
            {/* Gráfico de pastel para mostrar la proporción de hábitos completados y pendientes hoy */}
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
          {/* Gráfico de líneas para mostrar la evolución de los hábitos completados por día */}
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
          {/* Gráfico de barras para mostrar la evolución de los hábitos completados por semana */}
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
            {/* Muestra cuantos habitos hay en cada categoría utilizando un gráfico de barras */}
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