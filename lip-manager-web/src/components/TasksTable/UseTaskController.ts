import { useState } from "react";
import type { Task } from "../../types/Task";

const useTaskController = () => {
  const [openModalTask, setOpenModalTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // salva task clicada

  const handleOpenModalTask = (task: Task) => {
    setSelectedTask(task); //salva a task clicada
    setOpenModalTask(true);
  };

  const handleCloseModalTask = () => {
    setOpenModalTask(false);
    setSelectedTask(null); //limpa task atual ao fechar
  };

  return {
    openModalTask,
    selectedTask, //
    handleOpenModalTask,
    handleCloseModalTask,
  };
};

export default useTaskController;