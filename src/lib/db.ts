import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  limit as fbLimit,
  type QueryConstraint,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firebaseConfigured, getDb } from "./firebase";

export interface FetchState<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
}

export function useCollection<T>(
  name: string,
  constraints: QueryConstraint[] = [],
  deps: unknown[] = [],
): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: [],
    loading: firebaseConfigured,
    error: null,
  });

  useEffect(() => {
    if (!firebaseConfigured) {
      setState({ data: [], loading: false, error: null });
      return;
    }
    try {
      const q = query(collection(getDb(), name), ...constraints);
      const unsub = onSnapshot(
        q,
        (snap) => {
          const rows = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as T[];
          setState({ data: rows, loading: false, error: null });
        },
        (err) => setState({ data: [], loading: false, error: err }),
      );
      return unsub;
    } catch (err) {
      setState({ data: [], loading: false, error: err as Error });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}

export function useDocument<T>(name: string, id: string | undefined) {
  const [state, setState] = useState<{ data: T | null; loading: boolean; error: Error | null }>({
    data: null,
    loading: firebaseConfigured && Boolean(id),
    error: null,
  });
  useEffect(() => {
    if (!firebaseConfigured || !id) {
      setState({ data: null, loading: false, error: null });
      return;
    }
    const unsub = onSnapshot(
      doc(getDb(), name, id),
      (snap) => {
        if (!snap.exists()) return setState({ data: null, loading: false, error: null });
        setState({
          data: { id: snap.id, ...(snap.data() as any) } as T,
          loading: false,
          error: null,
        });
      },
      (err) => setState({ data: null, loading: false, error: err }),
    );
    return unsub;
  }, [name, id]);
  return state;
}

export { where, orderBy, fbLimit as limit };