import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
 import InputAdornment from "@mui/material/InputAdornment";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SendTaskModal({
  open,
  onClose,
}: Props) {
  const [user, setUser] = useState("");

  const handleSend = () => {
    // futura lógica

    setUser("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#fff",
          borderRadius: 3,
          width: {
            xs: "90vw",
            sm: 430,
          },
          boxShadow: "0 20px 60px rgba(0,0,0,.15)",
          overflow: "hidden",
          outline: "none",
        }}
      >
        <Box
          sx={{
            p: 3,
          }}
        >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
            mb: .5,
          }}
        >
          Enviar tarefa
        </Typography>

        <Typography
          sx={{
            color: "#64748b",
            fontSize: ".85rem",
            mb: 2.5,
          }}
        >
          Informe o nome do usuário que receberá esta tarefa.
        </Typography>

        

        <TextField
        fullWidth
        size="small"
        label="Usuário"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="java.lima"
        slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              @
            </InputAdornment>
          ),
        },
        }}
      />
        </Box>

        <Divider />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.5,
            p: 2,
          }}
        >
          <Button
            onClick={onClose}
            sx={{
              textTransform: "none",
            }}
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            startIcon={<SendRoundedIcon />}
            onClick={handleSend}
            sx={{
              bgcolor: "#2563eb",
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#1d4ed8",
                boxShadow: "none",
              },
            }}
          >
            Enviar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}