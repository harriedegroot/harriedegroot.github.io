import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  get mobile(): boolean {
    return this.deviceDetectorService.isMobile();
  }

  constructor(private deviceDetectorService:DeviceDetectorService) { }

  ngOnInit(): void {
  }

}
