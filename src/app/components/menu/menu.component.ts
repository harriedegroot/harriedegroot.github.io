import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { fadeAnimation } from 'app/helpers/animations';
import { DeviceService } from 'app/services/device.service';
import { ScrollingService } from 'app/services/scrolling.service';

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
  
  @Input() public fixed: boolean = true;
  @Input() public hamburger: boolean = true;
  @Input() public langButton: boolean = true;
  @Input() public background: string = 'transparent';
  @Input() public footer: boolean = true;
  @Input() public menuShown: boolean = true;
  @Input() public footerShown: boolean = true;
  @Input() public open: boolean = false;
  
  @Input() selectedLanguage: string = 'en';
  public get otherLanguage() { return this.selectedLanguage === 'en' ? 'nl' : 'en'; }
  
  @Output('click') public readonly click$ = new EventEmitter<string>();
  @Output('lang') public readonly language$ = new EventEmitter<string>();

  hamburgerIcon = faBars as IconProp;
  hoveringLangButton = false;
  
  private _hoveringMenu = false;
  public get hoveringMenu() {
    return this._hoveringMenu;
  }
  public set hoveringMenu(value) {
    this._hoveringMenu = value;
  }
  private _hoveringFooter = false;
  public get hoveringFooter() {
    return this._hoveringFooter;
  }
  public set hoveringFooter(value) {
    this._hoveringFooter = value;
    console.log('hovering footer:', value);
  }
  
  constructor(
    private scrollingService: ScrollingService,
    private deviceService: DeviceService
  ) {
    this.hamburger = this.deviceService.isMobile;
    this.open = !this.deviceService.isMobile;
  }

  ngOnInit(): void {
    this.scrollingService.scrollingUp$.subscribe(() => this._onScrollingUp());
    this.scrollingService.scrollingDown$.subscribe(() => this._onScrollingDown());
  }
  
  private _onScrollingUp(): void {
    this.showMenu();
    this.showFooter();
  }

  private _onScrollingDown(): void {
    if(this.deviceService.isMobile) {
      this.closeMenu();
    }
    this.hideMenu();
    this.hideFooter();
  }

  public showMenu() {
    if(!this.menuShown) {
      this.menuShown = true;
    }
  }
  public hideMenu() {
    if(this.open) return;
    if(this.hoveringMenu) return;

    if(this.menuShown) {
      this.menuShown = false;
    }
  }
  public showFooter() {
    if(this.footer && !this.footerShown) {
      this.footerShown = true;
    }
  }
  public hideFooter() {
    if(this.hoveringFooter) return;
    
    if(this.footerShown) {
      this.footerShown = false;
    }
  }
  public openMenu() {
    if(!this.open) {
      this.open = true;
    }
  }
  public closeMenu() {
    if(this.open) {
      this.open = false;
    }
  }

  onHamburgerClick() {
    this.showMenu();
    this.open = !this.open;
  }

  onItemClick(section: string) {
    this.hideMenu();
    this.hideFooter();

    if(this.deviceService.isMobile) {
      this.closeMenu();
    }

    this.click$.emit(section);
  }

  onLanguageClick() {
    this.selectedLanguage = this.otherLanguage;
    this.language$.emit(this.selectedLanguage);
  }
}
