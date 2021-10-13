import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstDocumentFormComponent } from './first-document-form.component';

describe('FirstDocumentFormComponent', () => {
  let component: FirstDocumentFormComponent;
  let fixture: ComponentFixture<FirstDocumentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstDocumentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstDocumentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
