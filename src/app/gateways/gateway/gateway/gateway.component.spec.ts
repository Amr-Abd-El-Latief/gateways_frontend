import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayComponent } from './gateway.component';
import { AllGateways } from 'src/app/app-interfaces/TestData';
import { Gateways_App_Base_URL } from 'src/app/app-interfaces/Constants';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { GatewaysService } from '../../service/gateways.service';

fdescribe('GatewayComponent', () => {
  let component: GatewayComponent;
  let fixture: ComponentFixture<GatewayComponent>;
  let httpMock: HttpTestingController;

  let service: GatewaysService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,

      ],
      declarations: [GatewayComponent]
    })
      .compileComponents();

    service = TestBed.inject(GatewaysService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call /savegateway/ when function saveGateway is called ', () => {
    const gateway = AllGateways[0];
    component.gateway = gateway;
    component.saveGateway()

    const req = httpMock.expectOne(Gateways_App_Base_URL + '/savegateway/');
    expect(req.request.method).toBe('POST');
  })


  // it('should call handleBackendResponse function when function saveGateway is called ', () => {
  //   const gateway = AllGateways[0];
  //   component.gateway = gateway;
  //   component.saveGateway();
  //   spyOn(service, "handleBackendResponse");
  //   expect(service.handleBackendResponse).toHaveBeenCalled();
  // })

});
