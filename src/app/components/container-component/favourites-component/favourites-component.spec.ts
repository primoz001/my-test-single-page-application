import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesComponent } from './favourites-component';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';

describe('FavouritesComponent', () => {
  let component: FavouritesComponent;
  let fixture: ComponentFixture<FavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritesComponent],
      providers: [provideHttpClient(), provideStore()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
