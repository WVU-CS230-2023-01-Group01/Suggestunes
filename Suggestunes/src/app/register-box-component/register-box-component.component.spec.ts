import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBoxComponentComponent } from './register-box-component.component';

describe('RegisterBoxComponentComponent', () => {
  let component: RegisterBoxComponentComponent;
  let fixture: ComponentFixture<RegisterBoxComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterBoxComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterBoxComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
