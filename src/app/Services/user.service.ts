import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { User } from '../Models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<User> {

  constructor(http: HttpClient) {
    super(http, 'https://jsonplaceholder.typicode.com/users');
  }
}
