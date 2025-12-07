import { useTasks } from "../context/TaskProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function TaskCard({ task }) {
  const { deleteTask, toggleTaskDone } = useTasks();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDone = async () => {
    await toggleTaskDone(task.id);
  };

  return (
    <div className="bg-white border border-amber-300 rounded-xl shadow p-4">
      <header className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-bold text-amber-800">
          {task.title}
        </h2>
        <span className="text-xl">
          {task.done == 1 ? "📗" : "📕"}
        </span>
      </header>

      <p className="text-sm text-amber-700 mb-3">{task.description}</p>

      <div className="flex gap-2">

        {/* CRUD SOLO BIBLIOTECARIO */}
        {user?.role === "librarian" && (
          <>
            <button
              className="flex-1 bg-red-500 text-white py-1.5 rounded-lg"
              onClick={() => deleteTask(task.id)}
            >
              Eliminar
            </button>

            <button
              className="flex-1 bg-amber-700 text-white py-1.5 rounded-lg"
              onClick={() => navigate(`/edit/${task.id}`)}
            >
              Editar
            </button>
          </>
        )}

        {/* CAMBIAR ESTADO */}
        <button
          className="flex-1 bg-green-600 text-white py-1.5 rounded-lg"
          onClick={handleDone}
        >
          {task.done == 1 ? "Disponible" : "Prestado"}
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
