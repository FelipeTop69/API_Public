import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../Models/user.model';
import { UserService } from '../../../Services/user.service';
import { FormUserComponent } from "../../../General/form-user/form-user.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  imports: [FormUserComponent],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  user: User | null = null;

  ngOnInit(): void {
    // Obtener el id del usuario desde la URL
    const userId = Number(this.route.snapshot.paramMap.get('id'));

    this.userService.getById(userId).subscribe({
      next: (data) => {
        this.user = data; 
      },
      error: (err) => {
        console.error('Error al obtener usuario:', err);
      }
    });
  }

  
  handleSaveUser(updatedUser: User) {
    this.userService.update(updatedUser.id,updatedUser).subscribe({
      next: () => {
        Swal.fire(`${updatedUser.username} Actualizado Exitosamente`, '', 'success');
        
        this.router.navigate(['/user']);
      },
      error: (err) => {
        console.error('Error al actualizar el usuario:', err);
      }
    });
  }
}
