import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { TextInput } from "../../components/common/Field";
import Panel from "../../components/common/Panel";
import { useAuth } from "../../contexts/AuthContext";

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
    } catch (err) {
      const code = err?.code ?? "";
      let message = isRegistering
        ? "Registreren mislukt. Controleer je gegevens."
        : "Inloggen mislukt. Controleer je gegevens.";
      if (code === "auth/email-already-in-use") message = "Dit e-mailadres is al in gebruik.";
      else if (code === "auth/invalid-email") message = "Ongeldig e-mailadres.";
      else if (code === "auth/weak-password") message = "Wachtwoord moet minimaal 6 tekens zijn.";
      else if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") message = "E-mailadres of wachtwoord klopt niet.";
      else if (code === "auth/operation-not-allowed") message = `Aanmelden niet ingeschakeld (${code}).`;
      else if (code) message += ` (${code})`;
      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
  }

  function toggleMode() {
    setIsRegistering((current) => !current);
    setErrorMessage(null);
  }

  let submitLabel = "Inloggen";
  if (submitting) {
    submitLabel = "Bezig...";
  } else if (isRegistering) {
    submitLabel = "Account aanmaken";
  }

  const switchModeLabel = isRegistering
    ? "Heb je al een account? Log in"
    : "Nog geen account? Registreer";

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
          <TextInput
            type="email"
            placeholder="E-mailadres"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextInput
            type="password"
            placeholder="Wachtwoord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          {errorMessage && (
            <p className="text-sm text-(--color-danger)">{errorMessage}</p>
          )}
          <Button
            type="submit"
            variant="primary"
            disabled={submitting}
            className="w-full"
          >
            {submitLabel}
          </Button>
        </form>
        <Button
          type="button"
          variant="ghost"
          onClick={toggleMode}
          className="w-full"
        >
          {switchModeLabel}
        </Button>
      </Panel>
    </main>
  );
}
