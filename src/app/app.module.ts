import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SkillsComponent } from './components/skills/skills.component';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { HomeComponent } from './components/home/home.component';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuComponent } from './components/menu/menu.component';
import { BackgroundComponent } from './components/background/background.component';
import { NgParticlesModule } from 'ng-particles';
import { AboutComponent } from './components/about/about.component';
import { SpecialitiesComponent } from './components/specialities/specialities.component';
import { CharasteristicsComponent } from './components/charasteristics/charasteristics.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SectionComponent } from './components/section/section.component';
import { FooterComponent } from './components/footer/footer.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
