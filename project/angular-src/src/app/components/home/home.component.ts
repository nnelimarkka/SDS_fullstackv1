import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { PostService } from 'app/services/post.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  noPosts: boolean = false;
  Posts: [Object];
  postBody: string;
  postTitle: string;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private ref: ChangeDetectorRef,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postService.getPosts()
      .subscribe(postsArray => {
        if(postsArray.message) { //If response contains message, then no posts were found
          this.noPosts = true;
          return false;
        }
        this.Posts = postsArray;
        this.ref.detectChanges(); //detect changes to refresh Posts after user submits a new post
      },
      err => {
        console.log(err);
        return false;
      })
  }

  onSubmitPost() {
    let token = this.authService.getToken();
    const post = {
      title: this.postTitle,
      body: this.postBody
    }

    this.postService.submitPost(post, token)
      .subscribe(response => {
        console.log(response);
        if(response.message === "ok") {
          this.fetchPosts();
        } else {
          this.flashMessage.show(response.message,  {cssClass: "alert-danger", timeout: 3000})
        }
      })
  }

}
