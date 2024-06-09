import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagmentToolComponent } from './managment-tool.component';

describe('ManagmentToolComponent', () => {
  let component: ManagmentToolComponent;
  let fixture: ComponentFixture<ManagmentToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagmentToolComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagmentToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
