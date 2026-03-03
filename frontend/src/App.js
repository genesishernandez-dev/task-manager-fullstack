import React, { useEffect, useState } from "react";
import API from "./services/api";
import "./App.css";

function App() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTitle, setSearchTitle] = useState("");

  // ----------- MAPEO PARA MOSTRAR EN ESPAÑOL -----------
  const statusMap = {
    pending: "Pendiente",
    in_progress: "En progreso",
    completed: "Completada"
  };

  // ---------------- OBTENER TAREAS ----------------
  const fetchTasks = async () => {
    try {
      const response = await API.get("tasks/");
      setTasks(response.data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ---------------- CREAR TAREA ----------------
  const createTask = async (e) => {
    if (e) e.preventDefault();

    if (!title.trim()) return;

    try {
      await API.post("tasks/", {
        title,
        description,
        status,
      });

      setTitle("");
      setDescription("");
      setStatus("pending");

      fetchTasks();

    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  // ---------------- ELIMINAR TAREA ----------------
  const deleteTask = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta tarea?")) return;

    try {
      await API.delete(`tasks/${id}/`);
      fetchTasks();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  // ---------------- ACTUALIZAR ESTADO ----------------
  const updateStatus = async (task) => {

    let newStatus;

    if (task.status === "pending") newStatus = "in_progress";
    else if (task.status === "in_progress") newStatus = "completed";
    else newStatus = "pending";

    try {
      await API.put(`tasks/${task.id}/`, {
        ...task,
        status: newStatus,
      });

      fetchTasks();

    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  // ---------------- ORDENAR (más recientes primero) ----------------
  const sortedTasks = [...tasks].reverse();

  // ---------------- FILTRO ----------------
  const filteredTasks = sortedTasks.filter((task) => {

    const matchesStatus =
      filterStatus === "all" || task.status === filterStatus;

    const matchesTitle =
      task.title.toLowerCase().includes(searchTitle.toLowerCase());

    return matchesStatus && matchesTitle;
  });

  // ---------------- INTERFAZ ----------------
  return (
    <div className="app-container">
      <h1> GESTOR DE TAREAS</h1>
      <p>Total de tareas: {filteredTasks.length}</p>

      {/* FORMULARIO */}
      <form onSubmit={createTask} className="form">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pendiente</option>
          <option value="in_progress">En Progreso</option>
          <option value="completed">Completada</option>
        </select>

        <button 
            type="submit" 
            className="btn-add"
            disabled={!title.trim()}
          >
            ➕ Crear tarea
        </button>
      </form>

      {/* FILTROS */}
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Todos</option>
          <option value="pending">Pendiente</option>
          <option value="in_progress">En Progreso</option>
          <option value="completed">Completada</option>
        </select>
      </div>

      {/* LISTADO */}
      {filteredTasks.length === 0 ? (
        <p className="empty-message">
          No tienes tareas con ese filtro 👀
        </p>
      ) : (
        filteredTasks.map((task) => (
          <div key={task.id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            <div className={`status ${task.status}`}>
              Estado: {statusMap[task.status]}
            </div>

            <div className="buttons">
              <button
                className="btn-complete"
                onClick={() => updateStatus(task)}
              >
                Cambiar Estado
              </button>

              <button
                className="btn-delete"
                onClick={() => deleteTask(task.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))
      )}

      <button
        className="floating-btn"
        onClick={createTask}
        title="Crear tarea"
      >
        +
      </button>

    </div>
  );
}

export default App;