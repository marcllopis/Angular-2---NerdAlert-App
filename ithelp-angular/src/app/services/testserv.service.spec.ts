/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TestservService } from './testserv.service';

describe('TestservService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestservService]
    });
  });

  it('should ...', inject([TestservService], (service: TestservService) => {
    expect(service).toBeTruthy();
  }));
});
