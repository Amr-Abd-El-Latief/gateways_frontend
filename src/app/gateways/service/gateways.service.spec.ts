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

  it('should return list of all gateways', () => {
    const result: Gateway[] = AllGateways;   // Allgateways length is 3

    service.getAllGateways().subscribe(results => {
      expect(results).toBeTruthy();
      expect(results.length).toEqual(3);
    })

    const req = httpMock.expectOne(Gateways_App_Base_URL + '/allgateways');
    expect(req.request.method).toBe('GET');
    req.flush(result);

  })


  it('should call /savegateway/ when function saveGateway is called ', () => {
    const gateway = AllGateways[0];

    service.saveGateway(gateway).subscribe(results => {
      expect(results).toBeTruthy();
    })

    const req = httpMock.expectOne(Gateways_App_Base_URL + '/savegateway/');
    expect(req.request.method).toBe('POST');
  })

  it('should call /deletegateway/ when function deleteGateway is called ', () => {
    const gatewayId = "test_id";

    service.deleteGateway(gatewayId).subscribe(results => {
      expect(results).toBeTruthy();
    })

    const req = httpMock.expectOne(Gateways_App_Base_URL + '/deletegateway/test_id');
    expect(req.request.method).toBe('DELETE');
  })

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

  it('should show alert contain validation error when there is result have validation return', () => {
    let res= {validation_message:"IPv4 is not valid, please, enter it in the valid form" }
    spyOn(window, "alert");
    service.handleBackendResponse(res);
    expect(window.alert).toHaveBeenCalledWith('Input is incorrect, operation didnt performe on database:  validation_message: IPv4 is not valid, please, enter it in the valid form');
  })


  it('should show alert contain error message when there the status of the response is in correct ', () => {
    let res= {status:400}
        spyOn(window, "alert");
    service.handleBackendResponse(res);
    expect(window.alert).toHaveBeenCalledWith('Error in request, operation didnt performe on database:  Error Details: {"status":400}');
  })

  it('should show alert contain success message when the result have no errors', () => {
    let res= {status:200,message:"success"}
    spyOn(window, "alert");
    service.handleBackendResponse(res);
    expect(window.alert).toHaveBeenCalledWith('Success, operation success in database');
  })

});
