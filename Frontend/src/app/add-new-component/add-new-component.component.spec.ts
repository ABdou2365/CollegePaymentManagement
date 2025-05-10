import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewComponentComponent } from './add-new-component.component';

describe('AddNewComponentComponent', () => {
  let component: AddNewComponentComponent;
  let fixture: ComponentFixture<AddNewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
