import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteLoopComponent } from './infinite-loop.component';

describe('InfiniteLoopComponent', () => {
  let component: InfiniteLoopComponent;
  let fixture: ComponentFixture<InfiniteLoopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfiniteLoopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfiniteLoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
