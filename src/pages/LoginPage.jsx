import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/common/Button";
import { TextInput } from "../components/common/Field";
import Panel from "../components/common/Panel";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const destination = location.state?.from?.pathname ?? "/budget-books";

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);
    try {
      if (isRegistering) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      navigate(destination, { replace: true });
    } catch {
      setErrorMessage(
        isRegistering
          ? "Registreren mislukt. Controleer je gegevens."
          : "Inloggen mislukt. Controleer je gegevens."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function toggleMode() {
    setIsRegistering((current) => !current);
    setErrorMessage(null);
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <Panel className="w-full max-w-sm space-y-6">
        <div>
          <p className="text-sm font-medium text-(--color-accent)">Huishoudboekje</p>
          <h1 className="mt-2 text-3xl font-semibold text-(--color-text-primary)">
            {isRegistering ? "Registreren" : "Inloggen"}
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <TextInput type="email" placeholder="E-mailadres" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
          <TextInput type="password" placeholder="Wachtwoord" value={password}
            onChange={(e) => setPassword(e.target.value)} required
            minLength={6} />
          {errorMessage && <p className="text-sm text-(--color-danger)">{errorMessage}</p>}
          <Button type="submit" variant="primary" disabled={submitting} className="w-full">
            {submitting
              ? "Bezig..."
              : isRegistering
                ? "Account aanmaken"
                : "Inloggen"}
          </Button>
        </form>
        <Button type="button" variant="ghost" onClick={toggleMode} className="w-full">
          {isRegistering
            ? "Heb je al een account? Log in"
            : "Nog geen account? Registreer"}
        </Button>
      </Panel>
    </main>
  );
}
