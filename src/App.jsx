import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/common/RequireAuth";
import LoginPage from "./pages/LoginPage";
import BudgetBookDetailPage from "./pages/BudgetBookDetailPage";
import BudgetBooksPage from "./pages/BudgetBooksPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
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
