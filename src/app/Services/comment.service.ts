import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { CommentModel } from '../Models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends GenericService<CommentModel>{

  constructor(http: HttpClient) { 
    super(http, 'https://jsonplaceholder.typicode.com/comments')
  }
}
