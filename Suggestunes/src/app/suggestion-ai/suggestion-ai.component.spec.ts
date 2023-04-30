import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionAiComponent } from './suggestion-ai.component';

describe('SuggestionAiComponent', () => {
  let component: SuggestionAiComponent;
  let fixture: ComponentFixture<SuggestionAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionAiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
