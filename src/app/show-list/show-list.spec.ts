import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowList } from './show-list';

describe('ShowList', () => {
  let component: ShowList;
  let fixture: ComponentFixture<ShowList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
