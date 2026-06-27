import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/common/RequireAuth";
import LoginPage from "./pages/auth/LoginPage";
import BudgetBookDetailPage from "./pages/budgetBooks/BudgetBookDetailPage";
import BudgetBooksPage from "./pages/budgetBooks/BudgetBooksPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/budget-books"
            element={
              <RequireAuth>
                <BudgetBooksPage />
              </RequireAuth>
            }
          />
          <Route
            path="/budget-books/:id"
            element={
              <RequireAuth>
                <BudgetBookDetailPage />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
