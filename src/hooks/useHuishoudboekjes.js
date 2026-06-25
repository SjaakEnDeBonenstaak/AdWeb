import { useEffect, useState } from "react";
import {
  subscribeToHuishoudboekjes,
  maakHuishoudboekje,
  setArchiveerStatus,
  verwijderHuishoudboekje,
} from "../services/huishoudboekjesService";

export function useHuishoudboekjes(userId) {
  const [boekjes, setBoekjes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setBoekjes([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsubscribe = subscribeToHuishoudboekjes(userId, (data) => {
      setBoekjes(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [userId]);

  async function toevoegen({ naam, omschrijving }) {
    try {
      setError(null);
      await maakHuishoudboekje({ naam, omschrijving, ownerId: userId });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function archiveren(id) {
    return setArchiveerStatus(id, true);
  }

  async function verwijderen(id) {
    return verwijderHuishoudboekje(id);
  }

  return { boekjes, loading, error, toevoegen, archiveren, verwijderen };
}
