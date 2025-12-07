import { Routes, Route, Navigate } from "react-router-dom";

import TasksPage from "./pages/TasksPage";
import TasksForm from "./pages/TaskForm";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

import { TaskContextProvider } from "./context/TaskProvider";
import { AuthProvider, useAuth } from "./context/AuthContext";

import LoginPage from "./pages/LoginPage";
import LoansPage from "./pages/LoansPage";
import LoanForm from "./pages/LoanForm";

// RUTA PROTEGIDA SOLO PARA BIBLIOTECARIO
function LibrarianRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "librarian") return <Navigate to="/" />;
  return children;
}

// TODAS LAS RUTAS
function AppRoutes() {
  const { user } = useAuth();

  return (
    <TaskContextProvider>
      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* HOME SEGÚN ROL */}
        <Route
          path="/"
          element={
            !user ? (
              <Navigate to="/login" />
            ) : user.role === "librarian" ? (
              <TasksPage />
            ) : (
              <TasksPage />
            )
          }
        />

        {/* NUEVO LIBRO (Task) */}
        <Route
          path="/new"
          element={
            <LibrarianRoute>
              <TasksForm />
            </LibrarianRoute>
          }
        />

        {/* EDITAR LIBRO */}
        <Route
          path="/edit/:id"
          element={
            <LibrarianRoute>
              <TasksForm />
            </LibrarianRoute>
          }
        />

        {/* LOANS */}
        <Route
          path="/loans"
          element={
            <LibrarianRoute>
              <LoansPage />
            </LibrarianRoute>
          }
        />

        <Route
          path="/loans/new"
          element={
            <LibrarianRoute>
              <LoanForm />
            </LibrarianRoute>
          }
        />

        <Route
          path="/loans/edit/:id"
          element={
            <LibrarianRoute>
              <LoanForm />
            </LibrarianRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </TaskContextProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-bfrom-amber-100 via-amber-200 to-amber-50 text-amber-900 flex flex-col">
        <Navbar />

        <div className="flex-growcontainer mx-auto px-4 md:px-10 py-8">
          <AppRoutes />
        </div>

        <footer className="text-center py-4 text-amber-600 text-xs md:text-sm border-t border-amber-300 bg-white/60 backdrop-blur"></footer>
      </div>
    </AuthProvider>
  );
}

export default App;
