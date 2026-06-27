import {
  Box, Modal, Chip, IconButton, Typography,
  TextField, Button, MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FlagIcon from '@mui/icons-material/Flag';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import type { Priority, Status, Task } from '../../types/Task';
import UseModalDetalhesTaskController from './UseModalDetalhesTaskController';
import { sx } from './styles';
import { prioritiesList, priorityConfig, statusList } from './constants';
import { MetaField } from './MetaField';
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import SendTaskModal from './sendTaskModal';
import DeleteTaskModal from './DeleteTaskModal';


interface Props {
  open: boolean;
  onClose: () => void;
  onModify: () => void;
  task?: Task | null;
}

export default function ModalDetalhesTask({ open, onClose, task, onModify }: Props) {
  const {
    editing, description, setDescription, title, setTitle,
    priority, setPriority, status, setStatus,
    startDate, setStartDate, deliveryDate, setDeliveryDate,
    setEditing, handleUpdate, handleCancel, handleDelete,
    openModalDelete, handleOpenModalDelete, handleCloseModalDelete,
    handleCloseSendModal, handleOpenSendModal, openSendModal
  } = UseModalDetalhesTaskController({ task, onClose, onModify });

  const priorityDetail = task?.priority
    ? (priorityConfig[task.priority] ?? { color: '#64748b', bg: '#f1f5f9' })
    : null;

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={sx.modal}>

          <Box sx={{ px: 3, pt: 2.5, pb: 2, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9' }}>
            {editing ? (
              <TextField fullWidth multiline rows={1} size="small" value={title}
                onChange={(e) => setTitle(e.target.value)} placeholder="Título" sx={sx.field} />
            ) : (
              <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#0f172a', lineHeight: 1.5, pr: 2 }}>
                {task?.title}
              </Typography>
            )}
            <IconButton size="small" onClick={onClose} sx={{ color: '#94a3b8', '&:hover': { bgcolor: '#f8fafc' } }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

            <Box sx={{ flex: 1, px: 3, py: 2.5, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box>
                <Typography sx={sx.label}>Descrição</Typography>
                {editing ? (
                  <TextField fullWidth multiline rows={13} size="small" value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Adicione uma descrição..." sx={sx.field} />
                ) : (
                  <Typography sx={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.7 }}>
                    {description || 'Nenhuma descrição adicionada.'}
                  </Typography>
                )}
              </Box>
            </Box>

            <Box sx={sx.sidebar}>

              <MetaField label="Status">
                {editing ? (
                  <TextField select size="small" value={status}
                    onChange={(e) => setStatus(e.target.value as Status)} sx={sx.field}>
                    {statusList.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                  </TextField>
                ) : (
                  <Typography sx={sx.value}>{task?.status}</Typography>
                )}
              </MetaField>

              <MetaField label="Prioridade">
                {editing ? (
                  <TextField select size="small" value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)} sx={sx.field}>
                    {prioritiesList.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                  </TextField>
                ) : priorityDetail ? (
                  <Chip
                    icon={<FlagIcon style={{ color: priorityDetail.color, fontSize: 13 }} />}
                    label={task?.priority} size="small"
                    sx={{ bgcolor: priorityDetail.bg, color: priorityDetail.color, fontWeight: 600, fontSize: '0.72rem', border: `1px solid ${priorityDetail.color}33`, width: 'fit-content' }}
                  />
                ) : <Typography sx={sx.value}>—</Typography>}
              </MetaField>

              <MetaField label="Início">
                {editing ? (
                  <DatePicker
                    value={startDate ? dayjs(startDate) : null}
                    onChange={(v) => setStartDate(v ? v.format('YYYY-MM-DD') : '')}
                    slotProps={{ textField: { size: 'small', sx: sx.field } }}
                  />
                ) : (
                  <Typography sx={sx.value}>
                    {task?.startDade ? dayjs(task.startDade).format('DD/MM/YYYY') : '—'}
                  </Typography>
                )}
              </MetaField>

              <MetaField label="Entrega">
                {editing ? (
                  <DatePicker
                    value={deliveryDate ? dayjs(deliveryDate) : null}
                    onChange={(v) => setDeliveryDate(v ? v.format('YYYY-MM-DD') : '')}
                    slotProps={{ textField: { size: 'small', sx: sx.field } }}
                  />
                ) : (
                  <Typography sx={sx.value}>
                    {task?.deliveryDate ? dayjs(task.deliveryDate).format('DD/MM/YYYY') : '—'}
                  </Typography>
                )}
              </MetaField>

            </Box>
          </Box>

          <Box sx={{ px: 3, py: 1.5, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Button size="small" startIcon={<EditOutlinedIcon />} onClick={() => setEditing(true)} disabled={editing}
                sx={{ borderRadius: '7px', textTransform: 'none', color: '#7c3aed', fontSize: '0.8rem', '&:hover': { bgcolor: '#f5f3ff' } }}>
                Editar
              </Button>
              <Button size="small" startIcon={<ArchiveOutlinedIcon />}
                sx={{ borderRadius: '7px', textTransform: 'none', color: '#64748b', fontSize: '0.8rem', '&:hover': { bgcolor: '#f1f5f9' } }}>
                Arquivar
              </Button>
              <Button
                size="small"
                startIcon={<SendRoundedIcon />}
                onClick={handleOpenSendModal}
                sx={{
                    borderRadius: "7px",
                    textTransform: "none",
                    color: "#2563eb",
                    fontSize: "0.8rem",
                    "&:hover": {
                        bgcolor: "#eff6ff",
                    },
                }}
              >
                Enviar
              </Button>
              <Button size="small" startIcon={<DeleteIcon />} onClick={handleOpenModalDelete}
                sx={{ borderRadius: '7px', textTransform: 'none', color: '#ef4444', fontSize: '0.8rem', '&:hover': { bgcolor: '#fef2f2' } }}>
                Deletar
              </Button>
            </Box>

            {editing && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button size="small" startIcon={<CancelOutlinedIcon />} onClick={handleCancel}
                  sx={{ borderRadius: '7px', textTransform: 'none', color: '#64748b', fontSize: '0.8rem' }}>
                  Cancelar
                </Button>
                <Button size="small" variant="contained" startIcon={<CheckIcon />} onClick={handleUpdate}
                  sx={{ borderRadius: '7px', textTransform: 'none', bgcolor: '#7c3aed', boxShadow: 'none', fontSize: '0.8rem', '&:hover': { bgcolor: '#6d28d9', boxShadow: 'none' } }}>
                  Salvar
                </Button>
              </Box>
            )}
          </Box>

        </Box>
      </Modal>

      

      <DeleteTaskModal
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        onDelete={handleDelete}
      />

      <SendTaskModal
        open={openSendModal}
        onClose={handleCloseSendModal}

      />
    </>
  );
}