import { DocumentReference } from 'firebase-admin/firestore';

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
  title: string,
  priority: Priority,
  description: string,
  status: Status,
  deliveryDate: string,
  startDade: string
  user?: DocumentReference
} 

export class UpdateTaskDto {
  title?: string;
  priority?: string;
  description?: string;
  status?: string;
  deliveryDate?: string;
  startDate?: string;
}

export class CreateTaskDto {
  title: string;
  priority: string;
  description: string;
  status: string;
  deliveryDate: string;
  startDate: string;
}