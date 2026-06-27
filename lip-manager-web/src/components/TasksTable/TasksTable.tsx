import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InboxIcon from '@mui/icons-material/Inbox';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventIcon from '@mui/icons-material/Event';
import FlagIcon from '@mui/icons-material/Flag';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import ModalDetalhesTask from '../ModalDetalhesTask/ModalDetalhesTask';
import UseTaskController from './UseTaskController';
import type { Task } from '../../types/Task';

interface props {
  tasks: Task[];
  onModify: () => void;
}

const STATUS_STYLES: Record<string, { bg: string; color: string; icon: React.ReactNode }> = {
  concluido: { bg: '#dcfce7', color: '#15803d', icon: <CheckCircleIcon sx={{ fontSize: 14 }} /> },
  'em andamento': { bg: '#fef9c3', color: '#a16207', icon: <HourglassBottomIcon sx={{ fontSize: 14 }} /> },
  pendente: { bg: '#f1f5f9', color: '#64748b', icon: <PendingOutlinedIcon sx={{ fontSize: 14 }} /> },
  atrasado: { bg: '#fee2e2', color: '#b91c1c', icon: <PendingOutlinedIcon sx={{ fontSize: 14 }} /> },
};

const PRIORITY_STYLES: Record<string, { bg: string; color: string }> = {
  urgente: { bg: '#fee2e2', color: '#b91c1c' },
  alta: { bg: '#fee2e2', color: '#b91c1c' },
  media: { bg: '#fef9c3', color: '#a16207' },
  baixa: { bg: '#dcfce7', color: '#15803d' },
};

const normalize = (value: string) =>
  value?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') ?? '';

function StatusChip({ status }: { status: string }) {
  const style = STATUS_STYLES[normalize(status)] ?? {
    bg: '#f1f5f9',
    color: '#64748b',
    icon: <PendingOutlinedIcon sx={{ fontSize: 14 }} />,
  };
  return (
    <Chip
      icon={style.icon as any}
      label={status}
      size="small"
      sx={{
        bgcolor: style.bg,
        color: style.color,
        fontWeight: 600,
        fontSize: '0.7rem',
        height: 24,
        '& .MuiChip-icon': { color: style.color, ml: '6px' },
      }}
    />
  );
}

function PriorityChip({ priority }: { priority: string }) {
  const style = PRIORITY_STYLES[normalize(priority)] ?? { bg: '#f1f5f9', color: '#64748b' };
  return (
    <Chip
      icon={<FlagIcon sx={{ fontSize: 14 }} />}
      label={priority}
      size="small"
      variant="outlined"
      sx={{
        borderColor: style.bg,
        color: style.color,
        fontWeight: 600,
        fontSize: '0.7rem',
        height: 24,
        '& .MuiChip-icon': { color: style.color, ml: '6px' },
      }}
    />
  );
}

const headerCellSx = {
  fontWeight: 600,
  fontSize: '0.75rem',
  color: '#303030',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
  borderBottom: '1px solid #f1f5f9',
};

const headerLabelSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.5,
};

const bodyCellSx = { borderBottom: '1px solid #f8fafc' };

export default function TaskTable({ tasks, onModify }: props) {
  const { openModalTask, handleCloseModalTask, handleOpenModalTask, selectedTask } =
    UseTaskController();

  return (
    <>
      <TableContainer
        sx={{
          borderRadius: '12px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          border: '1px solid #f1f5f9',
        }}
      >
        <Table sx={{ minWidth: 300 }}>
          <TableHead>
            <TableRow sx={{ fontWeight: 600 }}>
              <TableCell sx={headerCellSx}>
                <Box sx={headerLabelSx}>
                  <AssignmentIcon sx={{ fontSize: 14 }} />
                  Tarefa
                </Box>
              </TableCell>
              <TableCell align="right" sx={headerCellSx}>
                <Box sx={{ ...headerLabelSx, justifyContent: 'flex-end' }}>
                  <EventIcon sx={{ fontSize: 14 }} />
                  Entrega
                </Box>
              </TableCell>
              <TableCell align="right" sx={headerCellSx}>
                <Box sx={{ ...headerLabelSx, justifyContent: 'flex-end' }}>
                  <FlagIcon sx={{ fontSize: 14 }} />
                  Prioridade
                </Box>
              </TableCell>
              <TableCell align="right" sx={headerCellSx}>
                <Box sx={{ ...headerLabelSx, justifyContent: 'flex-end' }}>
                  <InfoOutlinedIcon sx={{ fontSize: 14 }} />
                  Status
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} sx={{ border: 0, py: 6 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1,
                      color: '#94a3b8',
                    }}
                  >
                    <InboxIcon sx={{ fontSize: 32 }} />
                    <Typography sx={{ fontSize: '0.875rem' }}>
                      Nenhuma tarefa encontrada
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => {
                const concluida = normalize(task.status) === 'concluido';
                return (
                  <TableRow
                    key={task.title}
                    onClick={() => handleOpenModalTask(task)}
                    sx={{
                      cursor: 'pointer',
                      borderBottom: '1px solid #f8fafc',
                      transition: 'background-color 0.15s ease',
                      '&:hover': { bgcolor: '#fafbff' },
                      '&:last-child td': { borderBottom: 0 },
                    }}
                  >
                    <TableCell sx={bodyCellSx}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {concluida ? (
                          <CheckCircleIcon sx={{ fontSize: 16, color: '#22c55e' }} />
                        ) : (
                          <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#cbd5e1' }} />
                        )}
                        <Typography
                          sx={{
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: '#0f172a',
                            textDecoration: concluida ? 'line-through' : 'none',
                            opacity: concluida ? 0.6 : 1,
                          }}
                        >
                          {task.title}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell align="right" sx={bodyCellSx}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                        <EventIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
                        <Typography sx={{ fontSize: '0.8rem', color: '#64748b' }}>
                          {task.deliveryDate}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell align="right" sx={bodyCellSx}>
                      <PriorityChip priority={task.priority} />
                    </TableCell>

                    <TableCell align="right" sx={bodyCellSx}>
                      <StatusChip status={task.status} />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalDetalhesTask
        open={openModalTask}
        onClose={handleCloseModalTask}
        task={selectedTask}
        onModify={onModify}
      />
    </>
  );
}