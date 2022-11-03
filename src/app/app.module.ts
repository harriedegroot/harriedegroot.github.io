import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SkillsComponent } from './views/skills/skills.component';
import { MainComponent } from './views/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { HomeComponent } from './views/home/home.component';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuComponent } from './components/menu/menu.component';
import { BackgroundComponent } from './components/background/background.component';
import { NgParticlesModule } from 'ng-particles';
import { AboutComponent } from './views/about/about.component';
import { SpecialitiesComponent } from './views/specialities/specialities.component';
import { CharasteristicsComponent } from './views/charasteristics/charasteristics.component';
import { ProjectsComponent } from './views/projects/projects.component';
import { SectionComponent } from './components/section/section.component';
import { FooterComponent } from './components/footer/footer.component';
import { ExperienceComponent } from './views/experience/experience.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TimelineContentComponent } from './components/timeline/timeline-item.component';
import { TimelineLabelComponent } from './components/timeline/timeline-label.component';
import { TimelineMarkerComponent } from './components/timeline/timeline-marker.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { environment } from 'environments/environment';
import {
  NgxGoogleAnalyticsModule,
  NgxGoogleAnalyticsRouterModule,
} from 'ngx-google-analytics';
import { TranslateModule, TranslateModuleConfig, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import * as _ from 'lodash';
import { MarkdownModule } from 'ngx-markdown';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const LANGUAGES = ['en', 'nl'];
const DEFAULT_LANGUAGE = 'en';
export function getLanguage(): string {
  const path = _.last(document.location.pathname?.split('/') ?? [])?.toLowerCase();
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
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
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
    MarkdownModule.forRoot()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
