import type { Priority, Status } from "../../types/Task";

export const prioritiesList: Priority[] = [
  'Baixa',
  'Media',
  'Alta',
  'Urgente'
];

export const statusList: Status[] = [
  'Concluida',
  'Em andamento',
  'Pendende'
];

export const priorityConfig = {
  Urgente: { color: '#ef4444', bg: '#fef2f2' },
  Alta: { color: '#f97316', bg: '#fff7ed' },
  Media: { color: '#eab308', bg: '#fefce8' },
  Baixa: { color: '#22c55e', bg: '#f0fdf4' },
};