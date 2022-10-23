import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineMarkerComponent } from './timeline-marker.component';

describe('TimelineMarkerComponent', () => {
  let component: TimelineMarkerComponent;
  let fixture: ComponentFixture<TimelineMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineMarkerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
