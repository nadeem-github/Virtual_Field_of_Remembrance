import { TestBed } from '@angular/core/testing';

import { VirtualFieldAPIsService } from './virtual-field-apis.service';

describe('VirtualFieldAPIsService', () => {
  let service: VirtualFieldAPIsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirtualFieldAPIsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
