import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCategoriesDialogComponentComponent } from './all-categories-dialog-component.component';

describe('AllCategoriesDialogComponentComponent', () => {
  let component: AllCategoriesDialogComponentComponent;
  let fixture: ComponentFixture<AllCategoriesDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllCategoriesDialogComponentComponent]
    });
    fixture = TestBed.createComponent(AllCategoriesDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
