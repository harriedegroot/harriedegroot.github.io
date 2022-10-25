import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() sections: string[] = [
    //'home',
    'about',
    'experience',
    'skills',
    'projects',
    'charasteristics',
    'contact'
  ];
  @Output('click') public readonly clickEmitter = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onClick(item: string) {
    this.clickEmitter.emit(item);
  }
}
