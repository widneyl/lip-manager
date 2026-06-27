import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddTaskIcon from "@mui/icons-material/AddTask";
import type { Priority, Status, Task } from "../../types/Task";
import { taskService } from "../../services/tasks.service";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import { useAuth } from "../../hooks/useAuth";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const priorityColors: Record<string, string> = {
  Baixa: "#22c55e",
  Media: "#eab308",
  Alta: "#f97316",
  Urgente: "#ef4444",
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 32px 80px rgba(0,0,0,0.12)",
  width: { xs: "92vw", sm: "520px" },
  maxHeight: "90vh",
  overflowY: "auto",
  outline: "none",
};

const fieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontSize: "0.9rem",
    "&:hover fieldset": { borderColor: "#6366f1" },
    "&.Mui-focused fieldset": { borderColor: "#6366f1", borderWidth: "1.5px" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#6366f1" },
};

const emptyForm: Task = {
  id: "",
  title: "",
  priority: "Baixa",
  description: "",
  status: "Pendende",
  deliveryDate: "",
  startDade: "",
};

export default function FormTask({ open, onClose, onSuccess }: Props) {
  const { user } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const priorities: Priority[] = ["Baixa", "Media", "Alta", "Urgente"];
  const status: Status[] = ["Concluida", "Em andamento", "Pendende"];

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async () => {
    if (!user?.uid) {
      console.error("Usuário não autenticado.");
      return;
    }

    await taskService.criarTask(user.uid, {
      title: form.title,
      deliveryDate: form.deliveryDate,
      description: form.description,
      priority: form.priority,
      status: form.status,
      startDade: form.startDade,
    });

    await onSuccess();
    onClose();
  };

  const handleClose = () => {
    setForm(emptyForm);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Box
          sx={{
            px: 3,
            pt: 3,
            pb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                bgcolor: "#eef2ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AddTaskIcon sx={{ fontSize: 20, color: "#6366f1" }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#0f172a",
                  lineHeight: 1.2,
                }}
              >
                Nova Tarefa
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                Preencha os detalhes abaixo
              </Typography>
            </Box>
          </Box>
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{ color: "#94a3b8", "&:hover": { bgcolor: "#f1f5f9" } }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider />

        <Stack spacing={2.5} sx={{ px: 3, py: 3 }}>
          <TextField
            label="Título"
            fullWidth
            size="small"
            value={form.title}
            onChange={handleChange("title")}
            placeholder="Ex: Refatorar módulo de login"
            sx={fieldStyle}
          />

          <TextField
            label="Descrição"
            fullWidth
            size="small"
            multiline
            rows={6}
            value={form.description}
            onChange={handleChange("description")}
            placeholder="Descreva os detalhes da tarefa..."
            sx={fieldStyle}
          />

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <DatePicker
              label="Data de início"
              value={form.startDade ? dayjs(form.startDade) : null}
              onChange={(newValue) => {
                setForm(prev => ({
                  ...prev,
                  startDade: newValue ? newValue.format('YYYY-MM-DD') : ''
                }))
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                  sx: fieldStyle,
                }
              }}
            />

            <DatePicker
              label="Data de entrega"
              value={form.deliveryDate ? dayjs(form.deliveryDate) : null}
              onChange={(newValue) => {
                setForm(prev => ({
                  ...prev,
                  deliveryDate: newValue ? newValue.format('YYYY-MM-DD') : ''
                }))
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                  sx: fieldStyle,
                }
              }}
            />
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              select
              label="Prioridade"
              size="small"
              value={form.priority}
              onChange={handleChange("priority")}
              sx={fieldStyle}
            >
              {priorities.map((p) => (
                <MenuItem key={p} value={p}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: priorityColors[p],
                      }}
                    />
                    {p}
                  </Box>
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Status"
              size="small"
              value={form.status}
              onChange={handleChange("status")}
              sx={fieldStyle}
            >
              {status.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Stack>

        <Divider />

        <Box
          sx={{
            px: 3,
            py: 2,
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.5,
          }}
        >
          <Button
            onClick={handleClose}
            sx={{
              borderRadius: "8px",
              color: "#64748b",
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.title.trim()}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              bgcolor: "#6366f1",
              boxShadow: "none",
              "&:hover": { bgcolor: "#4f46e5", boxShadow: "none" },
              "&.Mui-disabled": { bgcolor: "#e2e8f0", color: "#94a3b8" },
            }}
          >
            Criar Tarefa
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
