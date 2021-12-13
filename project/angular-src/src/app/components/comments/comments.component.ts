import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'app/services/post.service';
import { AuthService } from 'app/services/auth.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  title: string = this.currentRoute.snapshot.params.title;
  Post: Object;
  noPost: boolean = false;
  comment: string;

  

  constructor(
    private currentRoute: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.fetchPost();
  }

  fetchPost() {
    this.postService.getPost(this.title)
      .subscribe(response => {
        
        if(response.message) { //If response contains message, then post was not found
          this.noPost = true;
          return false;
        }
        
        this.Post = response;
        this.ref.detectChanges(); //detect changes to refresh the page content
      },
      err => {
        console.log(err);
        return false;
      })
  }

  onSubmitComment() {
    let token = this.authService.getToken();
    let comment = {
      body: this.comment
    }

    this.postService.addComment(this.title, comment, token)
      .subscribe(response => {
        console.log(response);
        this.fetchPost();
      });
  }

}
