import { TestBed } from '@angular/core/testing';
import { DevicesService } from './devices.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { Gateways_App_Base_URL } from 'src/app/app-interfaces/Constants';
import { SampleDevices } from 'src/app/app-interfaces/TestData';
fdescribe('DevicesService', () => {
  let service: DevicesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(DevicesService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

 it('should call /gatewaydevices/ when function  getDevicesforGateway is called ', () => {
    const gatewayId = "test_id";

    service.getDevicesforGateway(gatewayId).subscribe(results => {
      expect(results).toBeTruthy();
    })

    const req = httpMock.expectOne(Gateways_App_Base_URL + '/gatewaydevices/test_id');
    expect(req.request.method).toBe('GET');
  })


 it('should call /deletedevice/ when function  deleteGatewayDevice is called ', () => {
    const gatewayId = "test_id";
    const deviceId = "device_test_id"
    service.deleteGatewayDevice(gatewayId,deviceId).subscribe(results => {
      expect(results).toBeTruthy();
    })

    const req = httpMock.expectOne(Gateways_App_Base_URL + '/deletedevice/test_id/device_test_id');
    expect(req.request.method).toBe('DELETE');
  })

  it('should call /savedevice/ when function  saveGatewayDevice is called ', () => {
    const gatewayId = "test_id";
    const device = SampleDevices[0];
    service.saveGatewayDevice(gatewayId,device).subscribe(results => {
      expect(results).toBeTruthy();
    })

    const req = httpMock.expectOne(Gateways_App_Base_URL + '/savedevice/');
    expect(req.request.method).toBe('POST');
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
