export type Priority = 
  | 'Urgente'
  | 'Alta'
  | 'Media'
  | 'Baixa';

export type Status = 
  | 'Concluida'
  | 'Em andamento'
  | 'Pendende';

export type Task = {
  id?: string,
  title: string,
  priority: Priority,
  description: string,
  status: Status,
  deliveryDate: string,
  startDade: string
} 

export type TaskUpdate = {
  title?: string,
  priority?: Priority,
  description?: string,
  status?: Status,
  deliveryDate?: string,
  startDade?: string
}