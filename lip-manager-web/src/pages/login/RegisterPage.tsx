import { useState } from "react";
import { Input, Button, Card, Typography, message } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/user.service";
import { ROTAS } from "../../routes/Routes.enum";

const { Text } = Typography;

export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!nome || !email || !password) {
      message.warning("Preencha todos os campos");
      return;
    }
    if (!email.includes("@")) {
      message.error("Email inválido");
      return;
    }
    if (password.length < 6) {
      message.error("A senha precisa ter no mínimo 6 caracteres");
      return;
    }

    try {
      setLoading(true);
      await userService.register(email, password, nome);
      message.success("Cadastro realizado com sucesso");
      navigate(ROTAS.TAREFAS, { replace: true });
    } catch (error: any) {
      if (error.message.includes("auth/email-already-in-use")) {
        message.error("Esse email já está cadastrado");
      } else if (error.message.includes("auth/weak-password")) {
        message.error("Senha muito fraca");
      } else {
        message.error("Erro ao cadastrar");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        paddingInline: 20,
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 360,
          borderRadius: 15,
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        }}
        bodyStyle={{ display: "flex", flexDirection: "column" }}
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h2 style={{ fontFamily: "Georgia, serif", color: "hsl(36, 87%, 9%)" }}>
            Criar conta
          </h2>
          <Text type="secondary" style={{ fontSize: 13 }}>
            LIP Manager
          </Text>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Input
            size="large"
            placeholder="Nome de usuário"
            prefix={<UserOutlined />}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{ borderRadius: 10 }}
          />
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
            onClick={handleRegister}
            style={{
              backgroundColor: "#2E5E1E",
              borderColor: "#2E5E1E",
              borderRadius: 12,
              height: 46,
              fontWeight: "bold",
              marginTop: 6,
            }}
          >
            Cadastrar
          </Button>
        </div>
      </Card>
    </div>
  );
}