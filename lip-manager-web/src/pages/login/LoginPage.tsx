import { useState } from "react";
import { Input, Button, Card, Typography, Divider, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/user.service";
import { useAuth } from "../../hooks/useAuth";
import { ROTAS } from "../../routes/Routes.enum";
import { LogoutButton } from "../../components/LogoutButton/LogoutButton";

const { Text } = Typography;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      message.warning("Preencha email e senha");
      return;
    }
    if (!email.includes("@")) {
      message.error("Email inválido");
      return;
    }
    try {
      setLoading(true);
      await userService.login(email, password);
      message.success("Login realizado com sucesso");
      navigate(ROTAS.TAREFAS, { replace: true });
    } catch (error: any) {
      if (error.message.includes("auth/invalid-credential")) {
        message.error("Email ou senha inválidos");
      } else if (error.message.includes("auth/user-not-found")) {
        message.error("Usuário não encontrado");
      } else {
        message.error("Erro ao fazer login");
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: '80vh',
        paddingInline: 20
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 360,
          borderRadius: 15,
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        }}
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h2 className="font-bold" style={{color: "hsl(36, 87%, 9%)" }}>
            LIP Manager
          </h2>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Acesso ao sistema
          </Text>
        </div>

        {user ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
            <Text>
              Logado como <Text strong>{user.email}</Text>
            </Text>
            <LogoutButton />
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Input
              size="large"
              placeholder="Email"
              prefix={<MailOutlined />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderRadius: 10 }}
            />
            <Input.Password
              size="large"
              placeholder="Senha"
              prefix={<LockOutlined />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: 10 }}
            />
            <Button
              type="primary"
              size="large"
              loading={loading}
              onClick={handleLogin}
              style={{
                backgroundColor: '#2196f3',
                borderColor: '#2196f3',
                borderRadius: 12,
                height: 46,
                fontWeight: "bold",
                marginTop: 6,
              }}
            >
              Entrar
            </Button>

            {/* Link pra cadastro */}
            <div style={{ textAlign: "center", marginTop: 4 }}>
              <Text type="secondary" style={{ fontSize: 13 }}>
                Não tem conta?{" "}
              </Text>
              <Text
                strong
                style={{ fontSize: 13, color: '#2196f3', cursor: "pointer" }}
                onClick={() => navigate(ROTAS.REGISTER)}
              >
                Cadastre-se
              </Text>
            </div>
          </div>
        )}

        <div style={{ marginTop: 20, textAlign: "center" }}>
          <Divider style={{ margin: "12px 0" }} />
          <Text type="secondary" style={{ fontSize: 11 }}>
            Widney Lima
          </Text>
          <br />
          <Text strong style={{ fontSize: 12 }}>
            Universidade Federal do Ceará - UFC
          </Text>
        </div>
      </Card>
    </div>
  );
}