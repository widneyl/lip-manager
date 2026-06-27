import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, Task, UpdateTaskDto } from './task.dto';
import { db } from '@/config/firebase';

@Injectable()
export class TaskService {
  async criarTask(idUser: string, dto: CreateTaskDto) {
    const userRef = db.collection('users').doc(idUser);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      throw new NotFoundException(`Usuário ${idUser} não encontrado`);
    }

    const taskRef = db.collection('tasks').doc();
    const novaTask = { ...dto, user: userRef };

    await taskRef.set(novaTask);

    return { id: taskRef.id, ...dto };
  }

  async apagarTask(idTask: string) {
    try {
      await db.collection('tasks').doc(idTask).delete();
      return 'Task deletada';
    } catch (e) {
      console.log(e);
    }
  }

  async atualizarTask(idTask: string, task: UpdateTaskDto) {
    try {
      await db
        .collection('tasks')
        .doc(idTask)
        .update({ ...task });
      return 'Task atualizada';
    } catch (e) {
      console.log('erro ao atualizar a task');
    }
  }

  async listarTasksDoUsuario(idUser: string) {
    const userRef = db.collection('users').doc(idUser);
    const snapshot = await db
      .collection('tasks')
      .where('user', '==', userRef)
      .get();

    return snapshot.docs.map((doc) => {
      const { user, ...rest } = doc.data();
      return { id: doc.id, ...rest };
    });
  }
}
