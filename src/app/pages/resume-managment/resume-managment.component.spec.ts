import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeManagmentComponent } from './resume-managment.component';

describe('ResumeManagmentComponent', () => {
  let component: ResumeManagmentComponent;
  let fixture: ComponentFixture<ResumeManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeManagmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
