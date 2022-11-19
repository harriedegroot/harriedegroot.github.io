import { DOCUMENT, Location } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { MenuComponent } from 'app/components/menu/menu.component';
import { Profile } from 'app/models/profile.model';
import { DeviceService } from 'app/services/device.service';
import { ProfileService } from 'app/services/profile.service';
import { ScrollingService } from 'app/services/scrolling.service';
import gsap from 'gsap';
import { ScrollToPlugin, ScrollTrigger } from 'gsap/all';
import * as moment from 'moment';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { filter } from 'rxjs';
import { BackgroundComponent } from '../../components/background/background.component';
import { AboutComponent } from '../about/about.component';
import { ExperienceComponent } from '../experience/experience.component';
import { SkillsComponent } from '../skills/skills.component';

function animateFrom(elem: any, direction: number = 1) {
  direction = direction || 1;
  var x = 0,
    y = direction * 100;
  if (elem.classList.contains('from-left')) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains('from-right')) {
    x = 100;
    y = 0;
  }
  elem.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
  elem.style.opacity = '0';
  gsap.fromTo(
    elem,
    { x: x, y: y, autoAlpha: 0 },
    {
      duration: 1.25,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: 'expo',
      overwrite: 'auto',
    }
  );
}

function hide(elem: any) {
  gsap.set(elem, { autoAlpha: 0 });
}

function asArray<T>(obj: T | T[]): T[] {
  return Array.isArray(obj) ? (obj as T[]) : [obj as T];
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
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

  @ViewChild(ExperienceComponent, { static: false })
  experience!: ExperienceComponent;

  @ViewChild(SkillsComponent, { static: false })
  skills!: SkillsComponent;

  language!: string;
  scrollPercentage$ = this.scrollingService.scrollPercentage$;
  isScrolling$ = this.scrollingService.isScrolling$;

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
      .subscribe((desc) =>this.meta.updateTag({ name: 'description', content: desc }));
    
    this.translateService
      .stream('page.keywords')
      .pipe(filter((keywords) => keywords && keywords !== 'page.keywords'))
      .subscribe((keywords) =>this.meta.updateTag({ name: 'keywords', content: keywords }));
  }

  ngOnInit(): void {
    this.initLanguage();
    this.initAnimations();
  }

  private initLanguage() {
    this._updateLang(this.translateService.defaultLang);
  }

  private initAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    const nextSectionDelay = 2;
    gsap.to('.next-section', {
      opacity: 0.4,
      duration: 1,
      delay: nextSectionDelay + 0.8,
    });

    gsap.from('.next-section', {
      y: -70,
      duration: 1,
      ease: 'bounce',
      delay: nextSectionDelay + 1,
    });

    var tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0,
      delay: nextSectionDelay + 1.5,
      yoyo: true,
    });
    tl.to('.next-section', {
      y: -30,
      duration: 2,
      ease: 'inOut',
    });

    gsap.utils.toArray('.quote').forEach(function (elem: any) {
      hide(elem);
      ScrollTrigger.create({
        trigger: elem,
        onEnter: function () {
          try {
            animateFrom(elem);
          } catch {}
        },
        onEnterBack: function () {
          try {
            animateFrom(elem, -1);
          } catch {}
        },
        onLeave: function () {
          try {
            hide(elem);
          } catch {}
        },
      });
    });
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
        case 'experience':
          this.experience.refresh();
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
          this.experience.clear();
          break;
        case 'skills':
          this.skills.pause();
          break;
      }
    }
  }

  navigateTo(item: string, smooth: boolean = true) {
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
        if(!this.deviceService.isMobile) {
          this.menu.hideMenu();
          this.menu.hideFooter();
          setTimeout(() => {
            this.menu.hideMenu();
            this.menu.hideFooter();
          }, 200);
        }
        break;
    }
  }

  setLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
