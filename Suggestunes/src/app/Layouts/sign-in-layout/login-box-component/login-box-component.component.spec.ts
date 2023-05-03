import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBoxComponentComponent } from './login-box-component.component';

describe('LoginBoxComponentComponent', () => {
  let component: LoginBoxComponentComponent;
  let fixture: ComponentFixture<LoginBoxComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginBoxComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginBoxComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
