import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostDialogComponentComponent } from './edit-post-dialog-component.component';

describe('EditPostDialogComponentComponent', () => {
  let component: EditPostDialogComponentComponent;
  let fixture: ComponentFixture<EditPostDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPostDialogComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPostDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
