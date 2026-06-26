import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/common/RequireAuth";
import LoginPage from "./pages/LoginPage";
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
          {/* TODO: Add /budget-books/:id route for transactions and categories. */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
