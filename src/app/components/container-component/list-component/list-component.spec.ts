import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list-component';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [provideHttpClient(), provideStore()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
