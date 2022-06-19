import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  get height() { return this.fullPage ? '100vh' : 'auto' }

  @Input() background = 'none';
  @Input() fullPage: boolean = false;
  @Input() title?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
