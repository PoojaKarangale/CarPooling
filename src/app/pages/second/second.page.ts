import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {
passId=null;
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    //console.log('${foo}');
    this.passId=this.activatedRoute.snapshot.paramMap.get('myid');
  }

}
