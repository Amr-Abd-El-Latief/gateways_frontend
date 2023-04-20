import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewaysComponent } from './gateways.component';
import { AllGateways } from '../app-interfaces/TestData';
import { By } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing'
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { GatewaysService } from './service/gateways.service';
import { Gateways_App_Base_URL } from '../app-interfaces/Constants';
import { Router } from '@angular/router';
fdescribe('GatewaysComponent', () => {
  let component: GatewaysComponent;
  let fixture: ComponentFixture<GatewaysComponent>;
  let httpMock: HttpTestingController;
  let service: GatewaysService;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        MatTableModule
      ],
      declarations: [GatewaysComponent]
    })
      .compileComponents();
      service = TestBed.inject(GatewaysService);
      httpMock = TestBed.inject(HttpTestingController);
      router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should have table', () => {
    component.allGateways = AllGateways;
    component.displayedColumns = ['gateway_id', 'gateway_name', 'IPv4', 'details'];
    component.dataSource = new MatTableDataSource([...AllGateways]);

    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('table'));
    expect(rows.length).toBe(1);
  });

  it('should have a title', () => {
    const titleMessage = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(titleMessage.innerHTML).toBe('Gateways');
  })

  it('should have add Device buton', () => {
    const refreshBtnElement = fixture.debugElement.nativeElement.querySelector('#refresh_button');
    expect(refreshBtnElement.innerHTML).toBe('Refresh');
  })

  fit('should show the 3 rows in the gateways table (test data length = 3 plus header)', () => {
    component.allGateways = AllGateways;
    component.displayedColumns = ['gateway_id', 'gateway_name', 'IPv4', 'details'];
    component.dataSource = new MatTableDataSource([...AllGateways]);
    component.dataSource.data = AllGateways;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let tableRows = fixture.nativeElement.querySelectorAll('tr');
      expect(tableRows.length).toBe(4);
    })

  });



  fit('should show  4 columns', () => {
    component.allGateways = AllGateways;
    component.displayedColumns = ['gateway_id', 'gateway_name', 'IPv4','details'];
    component.dataSource =  new MatTableDataSource([...AllGateways]);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

    let tableColumns = fixture.nativeElement.querySelectorAll('th');
    expect(tableColumns.length).toBe(4);
    })
  });


  fit('should call /deletegateway/ API when function deleteGateway function is called is called ', () => {
    component.deleteGateway("test_id")
    const req = httpMock.expectOne(Gateways_App_Base_URL + '/deletegateway/test_id');
    expect(req.request.method).toBe('DELETE');
  });


  fit('should navigate to devices when openDevice is called',async  () =>  {
    component.allGateways = AllGateways;
    const navigateSpy = spyOn(router, 'navigate');
    component.openDevice("test_gateway_id");
    const firstArg = navigateSpy.calls.mostRecent().args[0];
    expect(firstArg[0]).toContain('devices/test_gateway_id');
  });


});

