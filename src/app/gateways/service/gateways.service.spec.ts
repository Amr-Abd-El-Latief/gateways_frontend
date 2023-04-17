import { TestBed } from '@angular/core/testing';

import { GatewaysService } from './gateways.service';
import { Gateway } from 'src/app/app-interfaces/GatewayTypes';
import { AllGateways } from 'src/app/app-interfaces/TestData';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { Gateways_App_Base_URL } from 'src/app/app-interfaces/Constants';
import {HttpClientModule} from '@angular/common/http';
fdescribe('GatewaysService', () => {
  let service: GatewaysService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(GatewaysService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return list of Only three (test data length) gateways when called', () => {
    const result: Gateway[] =AllGateways;

    service.getAllGateways().subscribe(results => {
      expect(results).toBeTruthy();
      expect(results.length).toEqual(3);
    })

    //Gateways_App_Base_URL}/allgateways
    const req = httpMock.expectOne(Gateways_App_Base_URL + '/allgateways');
    expect(req.request.method).toBe('GET');
    req.flush(result);

  })

});
