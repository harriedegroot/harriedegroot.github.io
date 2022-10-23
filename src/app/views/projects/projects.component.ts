import { Component, Input, OnInit } from '@angular/core';
import { Experience } from 'app/models/profile.model';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  @Input() public experience?: Experience[];
  
  get mobile(): boolean {
    return this.deviceDetectorService.isMobile();
  }

  constructor(private deviceDetectorService:DeviceDetectorService) { }

  ngOnInit(): void {
  }

}
