import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Post } from '../../../Models/post.model';
import { PostService } from '../../../Services/post.service';
import { FormPostComponent } from "../../../General/form-post/form-post.component";

@Component({
  selector: 'app-update-post',
  imports: [FormPostComponent],
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.css'
})
export class UpdatePostComponent implements OnInit {
  private postService = inject(PostService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  post: Post | null = null;

  ngOnInit(): void {
    // Obtener el id del usuario desde la URL
    const postId = Number(this.route.snapshot.paramMap.get('id'));

    this.postService.getById(postId).subscribe({
      next: (data) => {
        this.post = data; 
      },
      error: (err) => {
        console.error('Error al obtener usuario:', err);
      }
    });
  }

  
  handleSavePost(updatedPost: Post) {
    this.postService.update(updatedPost.id,updatedPost).subscribe({
      next: () => {
        Swal.fire(`${updatedPost.title} Actualizado Exitosamente`, '', 'success');
        
        this.router.navigate(['/post']);
      },
      error: (err) => {
        console.error('Error al actualizar el usuario:', err);
      }
    });
  }
}
