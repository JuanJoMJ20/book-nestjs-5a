import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

interface User {
  id: string;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  private users: User[] = [
    {
      id: '1',
      name: 'Juan Muñoz',
      email: 'juan.munoz@example.com',
    },
    {
      id: '2',
      name: 'Cristiano Ronaldo',
      email: 'cristiano.ronaldo@example.com',
    },
    {
      id: '3',
      name: 'Luis Diaz',
      email: 'luis.diaz@example.com',
    },
    {
      id: '4',
      name: 'Sofía Rodríguez',
      email: 'sofia.rodriguez@example.com',
    },
    {
      id: '5',
      name: 'Carlos Fernández',
      email: 'carlos.fernandez@example.com',
    },
    {
      id: '6',
      name: 'Laura Sánchez',
      email: 'laura.sanchez@example.com',
    },
    {
      id: '7',
      name: 'Diego López',
      email: 'diego.lopez@example.com',
    },
    {
      id: '8',
      name: 'Marta Díaz',
      email: 'marta.diaz@example.com',
    },
    {
      id: '9',
      name: 'Jorge Navarro',
      email: 'jorge.navarro@example.com',
    },
    {
      id: '10',
      name: 'Elena Torres',
      email: 'elena.torres@example.com',
    },
    {
      id: '11',
      name: 'Pablo Romero',
      email: 'pablo.romero@example.com',
    },
  ];

  @Get('')
  getUsers() {
    return this.users;
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return { result: 'Usuario no encontrado' };
    }

    return user;
  }

  @Get('correo/:name')
  getEmailByName(@Param('name') name: string) {
    const user = this.users.find(
      (user) => user.name.toLowerCase() === name.toLowerCase(),
    );

    if (!user) {
      return { result: 'No existe un usuario con ese nombre' };
    }

    return { result: user.email };
  }

  @Get('search/:name')
  getUserByName(@Param('name') name: string) {
    const user = this.users.find(
      (user) => user.name.toLowerCase() === name.toLowerCase(),
    );

    return { result: user?.email ?? 'Usuario no encontrado' };
  }

  @Post()
  createUser(@Body() newUser: User) {
    const existingUser = this.users.find(
      (user) => user.id === newUser.id || user.email.toLowerCase() === newUser.email.toLowerCase(),
    );

    if (existingUser) {
      return {
        message: 'El usuario con ese ID y/o correo ya existe.',
      };
    }

    this.users.push(newUser);

    return {
      msg: 'Usuario Creado',
      data: newUser,
    };
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const position = this.users.findIndex((user) => user.id === id);

    if (position === -1) {
      return {
        message: 'El usuario con ese ID no existe.',
      };
    }

    this.users.splice(position, 1);

    return {
      message: 'Usuario eliminado con éxito.',
    };
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userChanges: Partial<User>) {
    const position = this.users.findIndex((user) => user.id === id);

    if (position === -1) {
      return {
        message: 'No existe un usuario con ese ID.',
      };
    }

    const existingUser = this.users[position];
    const updatedUser = { ...existingUser, ...userChanges };
    this.users[position] = updatedUser;

    return {
      message: 'Usuario actualizado con éxito.',
      data: updatedUser,
    };
  }
}
