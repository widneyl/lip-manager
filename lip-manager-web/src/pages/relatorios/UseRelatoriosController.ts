import { useEffect, useMemo, useState } from "react";
import type { Task } from "../../types/Task";
import { taskService } from "../../services/tasks.service";
import { useAuth } from "../../hooks/useAuth";

interface StatusCount {
  status: string;
  total: number;
}

interface PriorityCount {
  priority: string;
  total: number;
}

const useRelatorioController = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  

  useEffect(() => {
    if (user?.uid) {
      loadTasks();
    }
  }, [user?.uid]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
     if (!user?.uid) return;
   const data = await taskService.listarTasksPorUsuario(user.uid);
    setTasks(data);
    setLoading(false);
  };

  const totalTasks = tasks.length;

  const statusCounts: StatusCount[] = useMemo(() => {
    const map = new Map<string, number>();
    tasks.forEach((t) => map.set(t.status, (map.get(t.status) ?? 0) + 1));
    return Array.from(map.entries()).map(([status, total]) => ({ status, total }));
  }, [tasks]);

  const priorityCounts: PriorityCount[] = useMemo(() => {
    const map = new Map<string, number>();
    tasks.forEach((t) => map.set(t.priority, (map.get(t.priority) ?? 0) + 1));
    return Array.from(map.entries()).map(([priority, total]) => ({ priority, total }));
  }, [tasks]);

  const concludedCount = tasks.filter((t) => t.status === "Concluida").length;
  const completionRate = totalTasks > 0 ? Math.round((concludedCount / totalTasks) * 100) : 0;

  const overdueCount = useMemo(() => {
    const hoje = new Date();
    return tasks.filter((t) => {
      if (t.status === "Concluida") return false;
      const dataEntrega = new Date(t.deliveryDate);
      return !isNaN(dataEntrega.getTime()) && dataEntrega < hoje;
    }).length;
  }, [tasks]);

  return {
    loading,
    totalTasks,
    statusCounts,
    priorityCounts,
    concludedCount,
    completionRate,
    overdueCount,
  };
};

export default useRelatorioController;