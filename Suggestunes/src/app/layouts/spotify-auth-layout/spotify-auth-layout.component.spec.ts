import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyAuthLayoutComponent } from './spotify-auth-layout.component';

describe('SpotifyAuthLayoutComponent', () => {
  let component: SpotifyAuthLayoutComponent;
  let fixture: ComponentFixture<SpotifyAuthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyAuthLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotifyAuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
