import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Post } from '../Models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService extends GenericService<Post> {

  constructor(http: HttpClient) { 
    super(http, 'https://jsonplaceholder.typicode.com/posts')
  }
}
