import { Formik } from "formik";
import { useTasks } from "../context/TaskProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function TasksForm() {
  const { createTask, getTasks, updateTask } = useTasks();
  const [task, setTask] = useState({ title: "", description: "" });
  const params = useParams();
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      if (params.id) {
        const t = await getTasks(params.id);
        setTask({
          title: t.title,
          description: t.description,
        });
      }
    };
    loadTasks();
  }, []);

  return (
    <div className="flex justify-center items-start md:items-center px-4 py-6">
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {

          if (!values.title.trim()) {
            setErrorMsg("El título no puede estar vacío.");
            return;
          }

          if (!values.description.trim()) {
            setErrorMsg("La descripción no puede estar vacía.");
            return;
          }

          setErrorMsg("");

          if (params.id) {
            await updateTask(params.id, values);
          } else {
            await createTask(values);
          }

          navigate("/");
          setTask({ title: "", description: "" });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <form
            onSubmit={handleSubmit}
            className="bg-white/90 border border-amber-300 shadow-lg rounded-2xl p-6 w-full max-w-md"
          >
            {errorMsg && (
              <p className="text-sm bg-red-50 text-red-700 border border-red-200 px-3 py-2 rounded-lg mb-4">
                {errorMsg}
              </p>
            )}

            <h1 className="text-2xl md:text-3xl font-extrabold text-center text-amber-800 mb-6 tracking-wide">
              {params.id ? "Editar Libro" : "Nuevo Libro"}
            </h1>

            <label className="block text-sm font-semibold mb-1">
              Título
            </label>
            <input
              type="text"
              name="title"
              placeholder="Escribe el título del libro"
              className="w-full px-3 py-2 mb-4 rounded-xl bg-amber-50 border border-amber-300 focus:ring-2 focus:ring-amber-400 outline-none transition"
              onChange={handleChange}
              value={values.title}
            />

            <label className="block text-sm font-semibold mb-1">
              Descripción
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Escribe una breve descripción"
              onChange={handleChange}
              className="w-full px-3 py-2 mb-6 rounded-xl bg-amber-50 border border-amber-300 focus:ring-2 focus:ring-amber-400 outline-none resize-none transition"
              value={values.description}
            ></textarea>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-xl transition disabled:opacity-60"
            >
              {isSubmitting ? "Guardando..." : "Guardar Libro"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default TasksForm;
