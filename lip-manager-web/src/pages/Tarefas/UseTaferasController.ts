import { useEffect, useMemo, useState } from "react";
import type { Task } from "../../types/Task";
import { taskService } from "../../services/tasks.service";
import { useAuth } from "../../hooks/useAuth";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const TODOS_STATUS = "Todas";

const useTarefasController = () => {
  const { user } = useAuth();
  const [openModalFormTask, setOpenModalFormTask] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>(TODOS_STATUS);

  useEffect(() => {
    if (user?.uid) {
      loadTasks();
    }
  }, [user?.uid]);

  const loadTasks = async () => {
    if (!user?.uid) return;
    const data = await taskService.listarTasksPorUsuario(user.uid);
    setTasks(data);
  };

  const updateTasks = async () => {
    if (!user?.uid) return;
    const data = await taskService.listarTasksPorUsuario(user.uid);
    setTasks(data);
  };

  const statusOptions = useMemo(() => {
    const uniqueStatus = Array.from(new Set(tasks.map((t) => t.status)));
    return [TODOS_STATUS, ...uniqueStatus];
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (statusFilter === TODOS_STATUS) return tasks;
    return tasks.filter((t) => t.status === statusFilter);
  }, [tasks, statusFilter]);

  const handleOpenModalFormTask = () => setOpenModalFormTask(true);
  const handleCloseModalFormTask = () => setOpenModalFormTask(false);

  const exportTasksPdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Relatório de Tarefas", 14, 15);

    doc.setFontSize(10);
    doc.text(`Total: ${filteredTasks.length}`, 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [["Título", "Descrição", "Status"]],
      body: filteredTasks.map((task) => [
        task.title ?? "",
        task.description ?? "",
        task.status ?? "",
      ]),
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [15, 23, 42],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
      margin: { left: 14, right: 14 },
    });

    doc.save("tarefas.pdf");
  };

  return {
    openModalFormTask,
    handleOpenModalFormTask,
    handleCloseModalFormTask,
    tasks: filteredTasks,
    updateTasks,
    statusFilter,
    setStatusFilter,
    statusOptions,
    exportTasksPdf,
  };
};

export default useTarefasController;