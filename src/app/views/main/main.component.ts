import { DOCUMENT, Location } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { MenuComponent } from 'app/components/menu/menu.component';
import { fadeAnimation } from 'app/helpers/animations';
import { asArray } from 'app/helpers/array';
import { Profile } from 'app/models/profile.model';
import { DeviceService } from 'app/services/device.service';
import { ProfileService } from 'app/services/profile.service';
import { ScrollingService } from 'app/services/scrolling.service';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import * as moment from 'moment';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { filter } from 'rxjs';
import { BackgroundComponent } from '../../components/background/background.component';
import { AboutComponent } from '../about/about.component';
import { ExperienceComponent } from '../experience/experience.component';
import { ServicesComponent } from '../services/services.component';
import { SkillsComponent } from '../skills/skills.component';

const EXPERIENCE_DELAY = 700;
const SERVICES_DELAY = .7;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [fadeAnimation],
})
export class MainComponent implements OnInit {
  public profile: Profile | null = null;

  selectedSkillTags = ['Programming Language', 'Software Framework'];
  hiddenSkillTags = [
    'API',
    'Algorithm',
    'Machine Learning',
    'DevOps',
    'Low-Code',
    'Android',
    'iOS',
    //'Database',
    'Design Pattern',
  ];

  excludeExperience = ['Mustache Templates'];
  menuBackground: string = 'black';

  @ViewChild(BackgroundComponent, { static: false })
  background!: BackgroundComponent;

  @ViewChild(MenuComponent, { static: false })
  menu!: MenuComponent;

  @ViewChild(AboutComponent, { static: false })
  about!: AboutComponent;

  @ViewChild(ServicesComponent, { static: false })
  services!: ServicesComponent;

  @ViewChild(ExperienceComponent, { static: false })
  experience!: ExperienceComponent;

  @ViewChild(SkillsComponent, { static: false })
  skills!: SkillsComponent;

  language!: string;
  scrollPercentage$ = this.scrollingService.scrollPercentage$;
  isScrolling$ = this.scrollingService.isScrolling$;
  isMobile = this.deviceService.isMobile;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private profileService: ProfileService,
    private ga: GoogleAnalyticsService,
    private scrollingService: ScrollingService,
    private deviceService: DeviceService,
    private translateService: TranslateService,
    private location: Location,
    private title: Title,
    private meta: Meta
  ) {
    profileService.profile$.subscribe((p) => this._setProfile(p));
    translateService.onLangChange.subscribe((e) => this._updateLang(e.lang));
    this.initMeata();
  }

  private _setProfile(profile: Profile | null) {
    this.profile = profile;
  }

  private _updateLang(lang: string): void {
    if (!lang || this.language === lang) return;
    this.language = lang;
    this.document.documentElement.lang = lang;
    this.profileService.load(lang);
    this.location.replaceState('/' + lang);
    moment.locale(lang);
  }

  private initMeata() {
    this.translateService
      .stream('page.title')
      .pipe(filter((title) => title && title !== 'page.title'))
      .subscribe((title) => this.title.setTitle(title));

    this.translateService
      .stream('page.description')
      .pipe(filter((desc) => desc && desc !== 'page.description'))
      .subscribe((desc) =>
        this.meta.updateTag({ name: 'description', content: desc })
      );

    this.translateService
      .stream('page.keywords')
      .pipe(filter((keywords) => keywords && keywords !== 'page.keywords'))
      .subscribe((keywords) =>
        this.meta.updateTag({ name: 'keywords', content: keywords })
      );
  }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.initLanguage();
  }

  private initLanguage() {
    this._updateLang(this.translateService.defaultLang);
  }

  onShow(items: string | string[]) {
    for (let item of asArray(items)) {
      switch (item) {
        case 'background':
          this.background.enabled = true;
          break;
        case 'home':
          if (!this.deviceService.isMobile) {
            this.menuBackground = 'transparent';
          }
          break;
        case 'about':
          break;
        case 'services':
          this.services.show(SERVICES_DELAY);
          break;
        case 'experience':
          this.experience.show(EXPERIENCE_DELAY);
          break;
        case 'skills':
          this.skills.play();
          break;
      }

      if (item !== 'background') {
        this.ga.pageView(item, item);
        this.ga.event('show_section_' + item, 'navigation');
      }
    }
  }

  onHide(items: string | string[]) {
    for (let item of asArray(items)) {
      switch (item) {
        case 'background':
          this.background.enabled = false;
          break;
        case 'home':
          this.menuBackground = 'black';
          break;
        case 'experience':
          //this.experience.clear();
          break;
        case 'skills':
          this.skills.pause();
          break;
      }
    }
  }

  navigateTo(item: string, smooth: boolean = true) {
    switch (item) {
      case 'home':
      case 'about':
        break;
      case 'experience':
        this.experience.show(EXPERIENCE_DELAY);
        break;
      default:
        // show experience to set the correct height
        this.experience.show();
        break;
    }

    if (smooth) {
      this.scrollingService.smoothScrollTo(item);
    } else {
      this.scrollingService.scrollTo(item);
    }
    setTimeout(() => {
      this.menu.hideMenu();
      this.menu.hideFooter();
    }, 1000);
  }

  onSnap(section: string) {
    switch (section) {
      case 'home':
        this.menu.showMenu();
        this.menu.showFooter();
        break;
      default:
        this.menu.hideMenu();
        this.menu.hideFooter();

        setTimeout(() => {
          this.menu.hideMenu();
          this.menu.hideFooter();
        }, 1000);
        break;
    }
  }

  setLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
