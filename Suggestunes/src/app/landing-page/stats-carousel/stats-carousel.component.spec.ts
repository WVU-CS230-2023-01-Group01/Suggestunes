import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsCarouselComponent } from './stats-carousel.component';

describe('StatsCarouselComponent', () => {
  let component: StatsCarouselComponent;
  let fixture: ComponentFixture<StatsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
