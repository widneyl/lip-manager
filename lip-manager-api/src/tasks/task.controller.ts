import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto, type Task } from './task.dto';

@Controller('task')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/create/:idUser')
  async criar(@Param('idUser') idUser: string, @Body() dto: CreateTaskDto) {
    return this.taskService.criarTask(idUser, dto);
  }

  @Put('/atualizar-task/:idTask')
  atualizarTask(@Param('idTask') idTask: string, @Body() task: UpdateTaskDto){
    return this.taskService.atualizarTask(idTask, task)
  }

  @Delete('/apagar-task/:idTask')
  apagarTask(@Param('idTask') idTask: string){
    return this.taskService.apagarTask(idTask)
  }
 
    @Get('/by-user/:idUser')
  async listarPorUsuario(@Param('idUser') idUser: string) {
    return this.taskService.listarTasksDoUsuario(idUser);
  }
}
