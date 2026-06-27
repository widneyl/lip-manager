import { Box, Button, IconButton, Tabs, Tab, useMediaQuery, useTheme } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddIcon from '@mui/icons-material/Add';
import TaskTable from "../../components/TasksTable/TasksTable";
import useTarefasController from "./UseTaferasController";
import FormTask from "../../components/FormTask/FormTask";

export default function Tarefas() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    handleOpenModalFormTask,
    handleCloseModalFormTask,
    openModalFormTask,
    tasks,
    updateTasks,
    statusFilter,
    setStatusFilter,
    statusOptions,
    exportTasksPdf,
  } = useTarefasController();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<PictureAsPdfIcon fontSize="small" />}
        sx={{ textTransform: 'none' }}
        onClick={exportTasksPdf}
      >
        Exportar PDF
      </Button>

      {isMobile ? (
        <IconButton
          color="success"
          sx={{ bgcolor: '#4caf50', color: 'white', borderRadius: 1 }}
          onClick={handleOpenModalFormTask}
        >
          <AddIcon />
        </IconButton>
      ) : (
        <Button
          variant="contained"
          color="success"
          size="small"
          startIcon={<AddIcon fontSize="small" />}
          sx={{ textTransform: 'none' }}
          onClick={handleOpenModalFormTask}
        >
          Nova Tarefa
        </Button>
      )}
      </Box>

      <Tabs
        value={statusFilter}
        onChange={(_, value) => setStatusFilter(value)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          minHeight: 36,
          '& .MuiTab-root': {
            minHeight: 36,
            textTransform: 'none',
            fontSize: '0.8rem',
            fontWeight: 500,
            color: '#64748b',
          },
          '& .Mui-selected': {
            color: '#0f172a !important',
            fontWeight: 600,
          },
        }}
      >
        {statusOptions.map((status) => (
          <Tab key={status} label={status} value={status} />
        ))}
      </Tabs>

      <TaskTable tasks={tasks} onModify={updateTasks} />

      <FormTask open={openModalFormTask} onClose={handleCloseModalFormTask} onSuccess={updateTasks} />
    </Box>
  );
}