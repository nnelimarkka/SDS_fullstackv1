import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class PostService {

  getPosts() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http.get("http://localhost:3000/api/posts", {headers: headers})
      .map(res => res.json());
  }

  getPost(title) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http.get(`http://localhost:3000/api/post/${title}`, {headers: headers})
      .map(res => res.json());
  }

  submitPost(post, token) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", token);
    return this.http.post(`http://localhost:3000/api/posts/post`, post, {headers: headers})
      .map(res => res.json());
  }

  addComment(title, comment, token) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", token);
    return this.http.post(`http://localhost:3000/api/posts/update/${title}`, comment, {headers: headers})
      .map(res => res.json());
  }

  constructor(private http: Http) { }

}
