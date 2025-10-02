import { ReactNode } from "react";
import { useSession } from "../../lib/auth-client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadingPage from "./LoadingPage";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: session, isPending } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !session) {
      navigate("/auth");
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
