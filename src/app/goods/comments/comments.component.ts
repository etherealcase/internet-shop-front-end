import { ActivatedRoute } from '@angular/router';
import { Comments } from './../../model/comments';
import { CommentsService } from './../../servises/comments.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  private comments: Comments[] = [];
  private id: number;
  private months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
  constructor(private service: CommentsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(par =>{
        this.id = +par.get('id');
        this.service.get(this.id)
          .subscribe(res =>{
            this.comments = res.json();
          });
      });
  }

  addComment(c){
    let comment = new Comments(null, this.id, c.comment, c.name, new Date());
    this.service.post(comment)
      .subscribe(res =>{
        let result = +res.json();
      
        if(result == 0){
          this.service.get(this.id)
            .subscribe(resp =>{
                let com = resp.json();
                this.comments.push(com[com.length-1]);
            });
        }
      });
  }

  getStringDate(date: string){
    let d = date.split('-');
    return d[2] + ' ' + this.months[+d[1] - 1] + ' ' + d[0];
  }

}
