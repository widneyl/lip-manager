import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '@/config/firebase';

@Injectable()
export class UserService {
  async buscarUsuario(idUser: string) {
    const docRef = db.collection('users').doc(idUser);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw new NotFoundException(`Usuário com id ${idUser} não encontrado`);
    }

    return { id: docSnap.id, ...docSnap.data() };
  }
}