import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFriendsComponent } from './account-friends.component';

describe('AccountFriendsComponent', () => {
  let component: AccountFriendsComponent;
  let fixture: ComponentFixture<AccountFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountFriendsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
