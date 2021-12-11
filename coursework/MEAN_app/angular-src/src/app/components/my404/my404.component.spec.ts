/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { My404Component } from './my404.component';

describe('My404Component', () => {
  let component: My404Component;
  let fixture: ComponentFixture<My404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ My404Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(My404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
