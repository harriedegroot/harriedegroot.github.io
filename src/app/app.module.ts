import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateLoader, TranslateModule, TranslateModuleConfig } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'environments/environment';
import { last } from 'lodash';
import { NgParticlesModule } from 'ng-particles';
import { NgxEchartsModule } from 'ngx-echarts';
import {
  NgxGoogleAnalyticsModule,
  NgxGoogleAnalyticsRouterModule
} from 'ngx-google-analytics';
import { MarkdownModule } from 'ngx-markdown';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './components/background/background.component';
import { ContactBarComponent } from './components/contact-bar/contact-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { InfiniteLoopComponent } from './components/infinite-loop/infinite-loop.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { SectionComponent } from './components/section/section.component';
import { TimelineContentComponent } from './components/timeline/timeline-item.component';
import { TimelineLabelComponent } from './components/timeline/timeline-label.component';
import { TimelineMarkerComponent } from './components/timeline/timeline-marker.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { VisibleDirective } from './directives/visible.directive';
import { AboutComponent } from './views/about/about.component';
import { CharasteristicsComponent } from './views/charasteristics/charasteristics.component';
import { ContactComponent } from './views/contact/contact.component';
import { ExperienceComponent } from './views/experience/experience.component';
import { HomeComponent } from './views/home/home.component';
import { MainComponent } from './views/main/main.component';
import { ProjectsComponent } from './views/projects/projects.component';
import { ServicesComponent } from './views/services/services.component';
import { SkillsComponent } from './views/skills/skills.component';
import { SpecialitiesComponent } from './views/specialities/specialities.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const LANGUAGES = ['en', 'nl'];
const DEFAULT_LANGUAGE = 'en';
export function getLanguage(): string {
  const path = last(document.location.pathname?.split('/') ?? [])?.toLowerCase();
  const lang = path || navigator.language.split('-')[0].toLowerCase();
  return LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE;
}

const TRANSLATE_CONFIG: TranslateModuleConfig = {
  defaultLanguage: getLanguage(),
  loader: {
    provide: TranslateLoader,
    useFactory: (createTranslateLoader),
    deps: [HttpClient]
  }
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SkillsComponent,
    HomeComponent,
    MenuComponent,
    BackgroundComponent,
    AboutComponent,
    SpecialitiesComponent,
    CharasteristicsComponent,
    ProjectsComponent,
    SectionComponent,
    FooterComponent,
    ExperienceComponent,
    TimelineComponent,
    TimelineContentComponent,
    TimelineLabelComponent,
    TimelineMarkerComponent,
    ProjectCardComponent,
    VisibleDirective,
    ContactComponent,
    ContactBarComponent,
    ServicesComponent,
    InfiniteLoopComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    TranslateModule.forRoot(TRANSLATE_CONFIG),
    NgxGoogleAnalyticsModule.forRoot(environment.googleAnalytics),
    NgxGoogleAnalyticsRouterModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgParticlesModule,
    NgxTypedJsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MarkdownModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
