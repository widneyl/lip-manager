import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { ROTAS } from "./Routes.enum";
import LoginPage from "../pages/login/LoginPage";
import { PrivateRoute } from "./PrivateRouter";
import Relatorios from "../pages/relatorios/Relatorios";
import Tarefas from "../pages/Tarefas/Tarefas";
import RegisterPage from "../pages/login/RegisterPage";
import Layout from "../Layout/Layout";

export default function Routes() {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path={ROTAS.LOGIN} element={<LoginPage />} />
        <Route path={ROTAS.REGISTER} element={<RegisterPage />} />

        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path={ROTAS.TAREFAS} element={<Tarefas />} />
          <Route path={ROTAS.RELATORIOS} element={<Relatorios />} />
        </Route>

        <Route path="/" element={<Navigate to={ROTAS.TAREFAS} replace />} />
        <Route path="*" element={<Navigate to={ROTAS.TAREFAS} replace />} />
      </RouterRoutes>
    </BrowserRouter>
  );
}