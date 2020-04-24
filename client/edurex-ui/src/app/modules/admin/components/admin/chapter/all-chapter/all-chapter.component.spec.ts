import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllChapterComponent } from './all-chapter.component';

describe('AllChapterComponent', () => {
  let component: AllChapterComponent;
  let fixture: ComponentFixture<AllChapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllChapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
