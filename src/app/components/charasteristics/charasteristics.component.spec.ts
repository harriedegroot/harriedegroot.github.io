import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharasteristicsComponent } from './charasteristics.component';

describe('CharasteristicsComponent', () => {
  let component: CharasteristicsComponent;
  let fixture: ComponentFixture<CharasteristicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharasteristicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharasteristicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
