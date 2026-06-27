import { Task } from "@/tasks/task.dto"

export class UserDTO{
  nome?: string;
  email: string;
  senha: string;
  tasks?: Task[]
}