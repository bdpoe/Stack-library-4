import { createContext, useContext, useState } from "react";
import axios from "axios";

const LoansContext = createContext();

export const useLoans = () => useContext(LoansContext);

export function LoansProvider({ children }) {
  const [loans, setLoans] = useState([]);

  const API = import.meta.env.VITE_API_URL;

  const loadLoans = async () => {
    try {
      const res = await axios.get(`${API}/loans`);

      // Normalizamos para coincidir con LoanCard.jsx
      const normalized = Array.isArray(res.data)
        ? res.data.map(l => ({
            id: l.id,
            bookTitle: l.book,         // antes: loan.bookTitle
            studentName: l.student,    // antes: loan.studentName
            startDate: l.date_loan,    // antes: loan.startDate
            endDate: l.date_return,    // antes: loan.endDate
            status: l.returned ? "devuelto" : "activo"
          }))
        : [];

      setLoans(normalized);

    } catch (err) {
      console.error("Error cargando loans:", err);
      setLoans([]); // evita que React se rompa
    }
  };

  const createLoan = async (loan) => {
    const res = await axios.post(`${API}/loans`, loan);
    loadLoans(); // recargar para normalizar y actualizar vista
  };

  const updateLoan = async (id, updates) => {
    await axios.put(`${API}/loans/${id}`, updates);
    loadLoans();
  };

  const returnLoan = async (id) => {
    await axios.put(`${API}/loans/${id}/return`);
    loadLoans();
  };

  const deleteLoan = async (id) => {
    await axios.delete(`${API}/loans/${id}`);
    setLoans(loans.filter((loan) => loan.id !== id));
  };

  return (
    <LoansContext.Provider
      value={{
        loans,
        loadLoans,
        createLoan,
        updateLoan,
        deleteLoan,
        returnLoan
      }}
    >
      {children}
    </LoansContext.Provider>
  );
}
