import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet, useNavigate } from "react-router-dom";
import UseMenuController from "./UseMenuController";
import { userService } from "../../services/user.service";
import { ROTAS } from "../../routes/Routes.enum";
import { useAuth } from "../../hooks/useAuth";

const drawerWidth = 240;

const MENU_ITEMS = [
  { text: "Tarefas", icon: AssignmentIcon, rota: ROTAS.TAREFAS },
  { text: "Relatorios", icon: AssessmentIcon, rota: ROTAS.RELATORIOS },
];

export default function ResponsiveDrawer() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    mobileOpen,
    page,
    handleDrawerClose,
    handleDrawerTransitionEnd,
    handleDrawerToggle,
    handleClick,
    userData,
  } = UseMenuController();

  const handleLogout = async () => {
    try {
      await userService.logout();
      navigate(ROTAS.LOGIN, { replace: true });
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  const nomeExibido = userData?.nome ?? user?.email ?? "";
  const inicial = nomeExibido ? nomeExibido.charAt(0).toUpperCase() : "?";
  const carregando = !userData && !!user?.uid;

  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "center", py: 3 }}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
          LIP Manager
        </Typography>
      </Toolbar>

      <Divider />

      <List sx={{ py: 1 }}>
        {MENU_ITEMS.map(({ text, icon: Icon, rota }) => {
          const ativo = page === rota;
          return (
            <ListItem key={text} disablePadding sx={{ px: 1 }}>
              <ListItemButton
                onClick={() => handleClick(text)}
                selected={ativo}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  "&.Mui-selected": {
                    bgcolor: "primary.light",
                    "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                      color: "primary.contrastText",
                    },
                  },
                  "&.Mui-selected:hover": {
                    bgcolor: "primary.main",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />
      <List sx={{ px: 1, py: 1 }}>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LogoutIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Sair" slotProps={{ primary: { color: "error" } }} />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 2,
        }}
      >
        {carregando ? (
          <>
            <Skeleton variant="circular" width={36} height={36} />
            <Skeleton variant="text" width={120} />
          </>
        ) : (
          <>
            <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
              {inicial}
            </Avatar>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500 }}
              noWrap
            >
              {nomeExibido}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { sm: "none" },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="subtitle1" sx={{ ml: 1, fontWeight: 600 }}>
            LipManager
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="menu de navegação"
      >
        <Drawer
          container={null}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{ root: { keepMounted: true } }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: 1,
              borderColor: "divider",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` }}}>
        <Toolbar sx={{
          bgcolor: "primary.light",
          color: "primary.contrastText",
          p: 1,
          mb: 1
        }} 
        >
          <Typography variant="body2">Universidade Federal do Ceará - UFC</Typography>
        </Toolbar>
        <Box component="main" sx={{flexGrow: 1, p: 1}}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}