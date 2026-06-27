import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {    
  }

  @Get('/get-data/:idUser')
  async buscarUsuario(@Param('idUser') idUser: string) {
    return this.userService.buscarUsuario(idUser)
  }
}
