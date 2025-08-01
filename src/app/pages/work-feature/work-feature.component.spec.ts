import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFeatureComponent } from './work-feature.component';

describe('WorkFeatureComponent', () => {
  let component: WorkFeatureComponent;
  let fixture: ComponentFixture<WorkFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
