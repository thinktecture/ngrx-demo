import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteCountComponent } from './favorite-count.component';

describe('FavoriteCountComponent', () => {
  let component: FavoriteCountComponent;
  let fixture: ComponentFixture<FavoriteCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteCountComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
