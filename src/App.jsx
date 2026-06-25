import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/common/RequireAuth";
import LoginPage from "./pages/LoginPage";
import HuishoudboekjesPage from "./pages/HuishoudboekjesPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/boekjes"
            element={
              <RequireAuth>
                <HuishoudboekjesPage />
              </RequireAuth>
            }
          />
          {/* TODO: route /boekjes/:id voor uitgaven + categorieën van
              één huishoudboekje (gebruik useUitgaven / useCategorieen) */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
