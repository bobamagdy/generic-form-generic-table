import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-Generic-Table',
  templateUrl: './Generic-Table.component.html',
  styleUrls: ['./Generic-Table.component.css']
})
export class GenericTableComponent implements OnInit {
  @Input() personList:any =[];
  @Input() header:{ key: string, value: any ,dataType?:any}[] =[];

  constructor() { }

  ngOnInit() {
  }

}
