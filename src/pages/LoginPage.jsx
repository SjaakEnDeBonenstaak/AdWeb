import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [wachtwoord, setWachtwoord] = useState("");
  const [foutmelding, setFoutmelding] = useState(null);

  const bestemming = location.state?.from?.pathname ?? "/boekjes";

  async function handleSubmit(e) {
    e.preventDefault();
    setFoutmelding(null);
    try {
      await login(email, wachtwoord);
      navigate(bestemming, { replace: true });
    } catch {
      setFoutmelding("Inloggen mislukt. Controleer je gegevens.");
    }
  }

  return (
    <div className="mx-auto max-w-sm space-y-6 p-6">
      <h1 className="text-2xl font-semibold text-slate-900">Inloggen</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="email" placeholder="E-mailadres" value={email}
          onChange={(e) => setEmail(e.target.value)} required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        <input type="password" placeholder="Wachtwoord" value={wachtwoord}
          onChange={(e) => setWachtwoord(e.target.value)} required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {foutmelding && <p className="text-sm text-red-600">{foutmelding}</p>}
        <button type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Inloggen
        </button>
      </form>
    </div>
  );
}
