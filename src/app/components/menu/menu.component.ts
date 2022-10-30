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
    //'charasteristics',
    'personality',
    'contact',
  ];

  @Output('click') public readonly click$ = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onClick(section: string) {
    this.click$.emit(section);
  }
}
