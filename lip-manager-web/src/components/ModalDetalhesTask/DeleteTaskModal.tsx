import {
  Box,
  Button,
  Divider,
  Modal,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

interface Props {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteTaskModal({
  open,
  onClose,
  onDelete,
}: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#fff",
          borderRadius: "14px",
          boxShadow: "0 20px 60px rgba(0,0,0,.15)",
          width: {
            xs: "90vw",
            sm: 380,
          },
          overflow: "hidden",
          outline: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
            px: 4,
            pt: 4,
            pb: 2,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              bgcolor: "#fef2f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WarningAmberRoundedIcon
              sx={{
                color: "#ef4444",
                fontSize: 24,
              }}
            />
          </Box>

          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "1rem",
              color: "#0f172a",
            }}
          >
            Apagar tarefa?
          </Typography>

          <Typography
            sx={{
              fontSize: ".85rem",
              color: "#64748b",
              lineHeight: 1.6,
            }}
          >
            Essa ação não pode ser desfeita. A tarefa será permanentemente
            removida.
          </Typography>
        </Box>

        <Divider />

        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            px: 3,
            py: 2,
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            onClick={onClose}
            sx={{
              borderRadius: "9px",
              textTransform: "none",
              color: "#475569",
              borderColor: "#e2e8f0",
              "&:hover": {
                bgcolor: "#f8fafc",
              },
            }}
          >
            Cancelar
          </Button>

          <Button
            fullWidth
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={onDelete}
            sx={{
              borderRadius: "9px",
              textTransform: "none",
              bgcolor: "#ef4444",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#dc2626",
                boxShadow: "none",
              },
            }}
          >
            Apagar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}