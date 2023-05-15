import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioEditFormComponent } from './audio-edit-form.component';

describe('AudioEditFormComponent', () => {
  let component: AudioEditFormComponent;
  let fixture: ComponentFixture<AudioEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioEditFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
