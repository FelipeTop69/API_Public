import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-album',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,  MatButtonModule, MatIconModule],
  templateUrl: './form-album.component.html',
  styleUrl: './form-album.component.css'
})
export class FormAlbumComponent  implements OnInit {
  @Input() album: any = null;
  @Input() cancelRoute: string = '/';
  @Output() save = new EventEmitter<any>();

  formAlbum!: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
    this.formAlbum = this.fb.group({
      title: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['album'] && this.album) {
      this.formAlbum?.patchValue(this.album);
    }
  }

  onSubmit() {

    if (this.formAlbum.valid) {
      const formValue = { 
        ...this.album, 
        ...this.formAlbum.value 
      };
      this.save.emit(formValue);
    }
  }

  onCancel() {
    this.router.navigate([this.cancelRoute]);
  }
}
