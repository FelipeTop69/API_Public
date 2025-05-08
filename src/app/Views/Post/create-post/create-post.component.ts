import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Post } from '../../../Models/post.model';
import { PostService } from '../../../Services/post.service';
import { FormPostComponent } from "../../../General/form-post/form-post.component";

@Component({
  selector: 'app-create-post',
  imports: [FormPostComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  private postService = inject(PostService);
  private router = inject(Router);

  handleSavePost(createPost: Post) {
    this.postService.create(createPost).subscribe({
      next: () => {
        Swal.fire(`${createPost.title} Creado Exitosamente`, '', 'success');
        this.router.navigate(['/post']);
      },
      error: (err) => {
        console.error('Error al crear el usuario:', err);
      }
    });
  }
}
