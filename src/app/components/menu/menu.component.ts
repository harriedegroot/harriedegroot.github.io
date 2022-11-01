import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

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

  private _open?: boolean = true;
  public get open(): boolean {
    return !!this._open;
  }
  @Input()
  public set open(value: boolean) {
    if(this._open != value) {
      this._open = value;
      this.openChange.emit(value);
    }
  }
  @Output() openChange = new EventEmitter<boolean>();

  @Input() public fixed: boolean = true;
  @Input() public hamburger: boolean = true;
  @Input() public background: string = 'transparent';
  
  @Output('click') public readonly click$ = new EventEmitter<string>();

  hamburgerIcon = faBars as IconProp;

  constructor() {}

  ngOnInit(): void {
  }

  onClick(section: string) {
    this.open = false;
    this.click$.emit(section);
  }
}
