import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsLayoutComponent } from './songs-layout.component';

describe('SongsLayoutComponent', () => {
  let component: SongsLayoutComponent;
  let fixture: ComponentFixture<SongsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongsLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
