import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-post',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,  MatButtonModule, MatIconModule],
  templateUrl: './form-post.component.html',
  styleUrl: './form-post.component.css'
})
export class FormPostComponent  implements OnInit {
  @Input() post: any = null;
  @Input() cancelRoute: string = '/';
  @Output() save = new EventEmitter<any>();

  formPost!: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
    this.formPost = this.fb.group({
      title: ['', Validators.required],
      body: ['', [Validators.required]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'] && this.post) {
      this.formPost?.patchValue(this.post);
    }
  }

  onSubmit() {

    if (this.formPost.valid) {
      const formValue = { 
        ...this.post, 
        ...this.formPost.value 
      };
      this.save.emit(formValue);
    }
  }

  onCancel() {
    this.router.navigate([this.cancelRoute]);
  }
}
