import type { Task } from "./Task"

export type User = {
  nome?: string,
  email: string
  senha: string,
  tasks?: Task[]
}