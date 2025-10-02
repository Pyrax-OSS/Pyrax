import { ReactNode, useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import LoadingPage from "./LoadingPage";

interface ProtectedRouteProps {
  children: ReactNode;
}

function useSession() {
  const [data, setData] = useState<null | { user: string }>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData({ user: "dummyUser" });
      setIsPending(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { data, isPending };
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: session, isPending } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !session) {
      navigate({ to: "/auth" });
    }
  }, [session, isPending, navigate]);

  if (isPending) {
    return <LoadingPage />;
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}
