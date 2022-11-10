import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { fadeAnimation } from 'app/helpers/animations';
import { DeviceService } from 'app/services/device.service';
import { ScrollingService } from 'app/services/scrolling.service';
import { debounceTime, filter } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [fadeAnimation]
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
  
  private _cooldown: boolean = false;
  
  private _open?: boolean = true;
  public get open(): boolean {
    return !!this._open;
  }
  @Input()
  public set open(value: boolean) {
    if (this._open != value) {
      this._open = value;
      this.openChange.emit(value);
      
      // block events during cooldown
      if (this.cooldownTime > 0) {
        this._cooldown = true;
        setTimeout(() => this._cooldown = false, this.cooldownTime);
      }
    }
  }
  @Output() openChange = new EventEmitter<boolean>();
  
  @Input() public fixed: boolean = true;
  @Input() public hamburger: boolean = true;
  @Input() public background: string = 'transparent';
  @Input() public cooldownTime: number = 1000;
  
  @Input() selectedLanguage: string = 'en';
  public get otherLanguage() { return this.selectedLanguage === 'en' ? 'nl' : 'en'; }
  
  @Output('click') public readonly click$ = new EventEmitter<string>();
  @Output('lang') public readonly language$ = new EventEmitter<string>();

  hamburgerIcon = faBars as IconProp;
  hoveringLangButton = false;

  constructor(
    private scrollingService: ScrollingService,
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.scrollingService.scrollDirection$
      .pipe(
        filter(() => !this._cooldown),
        filter(() => !this.deviceService.isMobile),
        debounceTime(50)
      )
      .subscribe((scrolling) => this.open = scrolling === 'up');
  }

  onItemClick(section: string) {
    this.open = false;
    this.click$.emit(section);
  }

  onLanguageClick() {
    this.selectedLanguage = this.otherLanguage;
    this.language$.emit(this.selectedLanguage);
  }
}
