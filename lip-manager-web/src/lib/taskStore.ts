import { useState, useCallback } from "react";
import dayjs from "dayjs";

export type Priority = "alta" | "media" | "baixa";
export type Status = "pendente" | "em_progresso" | "concluida" | "atrasada";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  createdAt: string;
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Finalizar relatório mensal",
    description: "Completar o relatório de atividades do mês de março",
    priority: "alta",
    status: "em_progresso",
    dueDate: dayjs().add(2, "day").toISOString(),
    createdAt: dayjs().subtract(3, "day").toISOString(),
  },
  {
    id: "2",
    title: "Preparar apresentação",
    description: "Slides para a reunião de equipe na sexta-feira",
    priority: "alta",
    status: "pendente",
    dueDate: dayjs().add(4, "day").toISOString(),
    createdAt: dayjs().subtract(1, "day").toISOString(),
  },
  {
    id: "3",
    title: "Revisar documentação da API",
    description: "Atualizar endpoints e exemplos de uso",
    priority: "media",
    status: "concluida",
    dueDate: dayjs().subtract(1, "day").toISOString(),
    createdAt: dayjs().subtract(5, "day").toISOString(),
  },
  {
    id: "4",
    title: "Configurar ambiente de testes",
    description: "Instalar e configurar Jest e Testing Library",
    priority: "baixa",
    status: "pendente",
    dueDate: dayjs().add(7, "day").toISOString(),
    createdAt: dayjs().subtract(2, "day").toISOString(),
  },
  {
    id: "5",
    title: "Corrigir bug no formulário de cadastro",
    description: "Validação de CPF não está funcionando corretamente",
    priority: "alta",
    status: "atrasada",
    dueDate: dayjs().subtract(2, "day").toISOString(),
    createdAt: dayjs().subtract(6, "day").toISOString(),
  },
  {
    id: "6",
    title: "Estudar React Hooks avançados",
    description: "useReducer, useContext e custom hooks",
    priority: "media",
    status: "concluida",
    dueDate: dayjs().subtract(3, "day").toISOString(),
    createdAt: dayjs().subtract(10, "day").toISOString(),
  },
];

export function useTaskStore() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = useCallback((task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: dayjs().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const stats = {
    total: tasks.length,
    pendentes: tasks.filter((t) => t.status === "pendente" || t.status === "em_progresso").length,
    concluidas: tasks.filter((t) => t.status === "concluida").length,
    atrasadas: tasks.filter((t) => t.status === "atrasada").length,
  };

  return { tasks, addTask, updateTask, deleteTask, stats };
}
