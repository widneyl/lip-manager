// LogoutButton.tsx
import { useNavigate } from "react-router-dom";
import { ROTAS } from "../../routes/Routes.enum";
import { userService } from "../../services/user.service";

export function LogoutButton() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await userService.logout();
      navigate(ROTAS.LOGIN, { replace: true });
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  }

  return (
    <button onClick={handleLogout}>
      Sair
    </button>
  );
}