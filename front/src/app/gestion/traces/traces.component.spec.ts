import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracesComponent } from './traces.component';

describe('TracesComponent', () => {
  let component: TracesComponent;
  let fixture: ComponentFixture<TracesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TracesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
