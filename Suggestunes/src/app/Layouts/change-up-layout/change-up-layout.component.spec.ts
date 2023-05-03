import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUpLayoutComponent } from './change-up-layout.component';

describe('ChangeUpLayoutComponent', () => {
  let component: ChangeUpLayoutComponent;
  let fixture: ComponentFixture<ChangeUpLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeUpLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeUpLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
