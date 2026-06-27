import {
  Box, Modal, Typography, Button, Divider, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

interface Props {
  open: boolean;
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 25px 60px rgba(0,0,0,0.12)',
  width: { xs: '88vw', sm: '380px' },
  outline: 'none',
};

export default function ModalLogout({ open}: Props) {
  return (
    <Modal open={open} >
      <Box sx={modalStyle}>

        <Box sx={{ px: 3, pt: 3, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{
              width: 36, height: 36, borderRadius: '10px',
              bgcolor: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <LogoutOutlinedIcon sx={{ fontSize: 18, color: '#ef4444' }} />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', lineHeight: 1.2 }}>
                Sair da conta
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                LipManager {'</>'}
              </Typography>
            </Box>
          </Box>
          <IconButton size="small" sx={{ color: '#94a3b8', '&:hover': { bgcolor: '#f1f5f9' } }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider />

        <Box sx={{ px: 3, py: 2.5 }}>
          <Typography sx={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.7 }}>
            Tem certeza que deseja sair? Você precisará fazer login novamente para acessar sua conta.
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ px: 3, py: 2, display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
          <Button
            sx={{ borderRadius: '8px', color: '#64748b', textTransform: 'none', fontWeight: 500 }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              bgcolor: '#ef4444',
              boxShadow: 'none',
              '&:hover': { bgcolor: '#dc2626', boxShadow: 'none' },
            }}
          >
            Sair
          </Button>
        </Box>

      </Box>
    </Modal>
  );
}