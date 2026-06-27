import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROTAS } from "./Routes.enum";

type Props = {
  children: ReactNode;
};

export function PrivateRoute({ children }: Props) {
  const { user, loading } = useAuth();

  console.log(user?.email)

  if (loading) return null;
  if (!user) return <Navigate to={ROTAS.LOGIN} />;

  return children;
}