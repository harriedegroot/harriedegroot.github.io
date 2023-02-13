import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './views/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: ':lang', component: MainComponent },
];

const routerConfig: ExtraOptions = {
  //useHash: true,
  anchorScrolling: "enabled",
  onSameUrlNavigation: "reload",
  initialNavigation: 'enabledBlocking'
  //scrollPositionRestoration: "disabled"
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
