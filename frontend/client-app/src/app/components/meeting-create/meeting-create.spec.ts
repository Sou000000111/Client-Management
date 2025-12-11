import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingCreateComponent } from './meeting-create.component';

describe('MeetingCreate', () => {
  let component: MeetingCreateComponent;
  let fixture: ComponentFixture<MeetingCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingCreateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
