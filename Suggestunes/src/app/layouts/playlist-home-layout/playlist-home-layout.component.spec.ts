import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistHomeLayoutComponent } from './playlist-home-layout.component';

describe('PlaylistHomeLayoutComponent', () => {
  let component: PlaylistHomeLayoutComponent;
  let fixture: ComponentFixture<PlaylistHomeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistHomeLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistHomeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
