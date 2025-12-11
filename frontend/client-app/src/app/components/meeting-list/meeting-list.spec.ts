import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingListComponent } from './meeting-list.component';

describe('MeetingList', () => {
  let component: MeetingListComponent;
  let fixture: ComponentFixture<MeetingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
