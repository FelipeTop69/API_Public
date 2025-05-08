import { Component, inject } from '@angular/core';
import { FormUserComponent } from "../../../General/form-user/form-user.component";
import { Router } from '@angular/router';
import { UserService } from '../../../Services/user.service';
import { User } from '../../../Models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  imports: [FormUserComponent],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  handleSaveUser(createUser: User) {
    this.userService.create(createUser).subscribe({
      next: () => {
        Swal.fire(`${createUser.username} Creado Exitosamente`, '', 'success');
        this.router.navigate(['/user']);
      },
      error: (err) => {
        console.error('Error al crear el usuario:', err);
      }
    });
  }
}
