import api from "../axios/axios";
import type { Task, TaskUpdate } from "../types/Task";

export const taskService = {
  async criarTask(idUser: string, task: Task) {
    const response = await api.post(`/task/create/${idUser}`, task);
    return response.data;
  },

  async atualizarTask(idTask: string, task: TaskUpdate) {
    const response = await api.put(`/task/atualizar-task/${idTask}`, task);
    return response.data;
  },

  async apagarTask(idTask: string) {
    const response = await api.delete(`/task/apagar-task/${idTask}`);
    return response.data;
  },

  async listarTasksPorUsuario(idUser: string) {
    const response = await api.get<Task[]>(`/task/by-user/${idUser}`);
    return response.data;
  },
};