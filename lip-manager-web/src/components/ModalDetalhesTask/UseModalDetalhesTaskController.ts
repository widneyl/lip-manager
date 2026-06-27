import { useState, useEffect } from 'react';
import { type Priority, type Status, type Task } from '../../types/Task';
import { taskService } from '../../services/tasks.service';

interface Props {
  task?: Task | null;
  onClose: () => void;
  onModify: () => void;
}

const UseModalDetalhesTaskController = ({ task, onClose, onModify }: Props) => {
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(task?.description);
  const [status, setStatus] = useState<Status>(task?.status ?? 'Pendende');
  const [deliveryDate, setDeliveryDate] = useState(task?.deliveryDate);
  const [startDate, setStartDate] = useState(task?.startDade);
  const [priority, setPriority] = useState<Priority>(task?.priority ?? 'Baixa');
  const [title, setTitle] = useState(task?.title);

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleOpenModalDelete = () => setOpenModalDelete(true)
  const handleCloseModalDelete = () => setOpenModalDelete(false)
  const [openSendModal, setOpenSendModal] = useState(false);
  const handleOpenSendModal = () => { setOpenSendModal(true);};
  const handleCloseSendModal = () => {setOpenSendModal(false);};

  useEffect(() => {
  if (task) {
    setDescription(task.description ?? '');
    setStatus(task.status ?? 'Pendende');
    setTitle(task.title ?? '');
    setPriority(task.priority ?? 'Baixa');
    setDeliveryDate(task.deliveryDate ?? '');
    setStartDate(task.startDade ?? '');
    setEditing(false);
  }
}, [task]);

  const handleUpdate = async () => {
    if (!task?.id) return;

    const taskForm: Partial<Task> = {}
    if(description !== task.description) taskForm.description = description;
    if (status !== task.status) taskForm.status = status;
    if (title !== task.title) taskForm.title = title;
    if (priority !== task.priority) taskForm.priority = priority;
    if (deliveryDate !== task.deliveryDate) taskForm.deliveryDate = deliveryDate;
    if (startDate !== task.startDade) taskForm.startDade = startDate;
    
    await taskService.atualizarTask(task.id, taskForm);
    setEditing(false);
    onModify()
  };

  const handleCancel = () => {
    setDescription(task?.description ?? '');
    setStatus(task?.status ?? 'Pendende');
    setEditing(false);
  };

  const handleDelete = async ()  => {
    if(!task?.id) return;
    await taskService.apagarTask(task.id);
    onModify();
    handleCloseModalDelete();
    onClose();
  };

  const handleArchive = () => {
    if (!task) return;
    onClose();
  };

  return {
    editing,
    description,
    status,
    title,
    priority,
    startDate,
    deliveryDate,
    setDeliveryDate,
    setStartDate,
    setTitle,
    setStatus,
    setPriority,
    setEditing,
    setDescription,
    handleUpdate,
    handleCancel,
    handleDelete,
    handleArchive,
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    openSendModal,
    handleOpenSendModal,
    handleCloseSendModal
    
  };
};

export default UseModalDetalhesTaskController;