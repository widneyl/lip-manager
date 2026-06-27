import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ROTAS } from "../../routes/Routes.enum";
import { useAuth } from "../../hooks/useAuth";
import { userService } from "../../services/user.service";

const UseMenuController = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const ROTA_POR_TEXTO: Record<string, string> = {
    Tarefas: ROTAS.TAREFAS,
    Relatorios: ROTAS.RELATORIOS,
    
  };

  const handleClick = (text: string) => {
    const rota = ROTA_POR_TEXTO[text];
    if (rota) navigate(rota);
    setMobileOpen(false);
  };

  useEffect(() => {
    if (!user?.uid) {
      setUserData(null);
      return;
    }

    let ativo = true;

    const fetchUserData = async () => {
      try {
        const data = await userService.getUser(user.uid);
        if (ativo) setUserData(data);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();

    return () => {
      ativo = false;
    };
  }, [user?.uid]);

  return {
    mobileOpen,
    page: location.pathname,
    userData, 
    handleDrawerClose,
    handleDrawerTransitionEnd,
    handleDrawerToggle,
    handleClick,
  };
};

export default UseMenuController;