import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.css']
})
export class GenericFormComponent implements OnInit {
  @Input() group:any =[];
  @Input() data:{ label: string ,value:string,type:string}[] =[];
  constructor() { }

  ngOnInit(): void {
  }

}
