import { Controller, Get } from '@nestjs/common';

interface User {
  id: string;
  name: string;
  email: string;
}

@Controller('user')
export class UserController {

    private users: User[] = [
    {
        id: '1',
        name: 'Juan Muñoz',
        email: 'juan.muñoz@example.com'
    },
    {
        id: '2',
        name: 'Cristiano Ronaldo',
        email: 'cristiano.ronaldo@example.com'
    },
    {
        id: '3',
        name: 'Luis Diaz',
        email: 'luis.diaz@example.com'
    },
    {
        id: '4',
        name: 'Sofía Rodríguez',
        email: 'sofia.rodriguez@example.com'
    },
    {
        id: '5',
        name: 'Carlos Fernández',
        email: 'carlos.fernandez@example.com'
    },
    {
        id: '6',
        name: 'Laura Sánchez',
        email: 'laura.sanchez@example.com'
    },
    {
        id: '7',
        name: 'Diego López',
        email: 'diego.lopez@example.com'
    },
    {
        id: '8',
        name: 'Marta Díaz',
        email: 'marta.diaz@example.com'
    },
    {
        id: '9',
        name: 'Jorge Navarro',
        email: 'jorge.navarro@example.com'
    },
    {
        id: '10',
        name: 'Elena Torres',
        email: 'elena.torres@example.com'
    },
    {
        id: '11',
        name: 'Pablo Romero',
        email: 'pablo.romero@example.com'
    }
]

    @Get('')
    getUser() {
        return this.users;
    }
} 
