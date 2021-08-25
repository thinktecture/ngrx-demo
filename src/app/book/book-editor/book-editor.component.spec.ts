import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookEditorComponent } from './book-editor.component';

describe('BookEditorComponent', () => {
  let component: BookEditorComponent;
  let fixture: ComponentFixture<BookEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookEditorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
