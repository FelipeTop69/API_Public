import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../Models/user.model';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-indice-user',
  imports: [],
  templateUrl: './indice-user.component.html',
  styleUrl: './indice-user.component.css'
})
export class IndiceUserComponent implements OnInit {
  
  userService = inject(UserService)

  dataUsers: User[] = []
  
  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.dataUsers = data;
        console.log('Usuarios recibidos:', this.dataUsers);
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }

}
