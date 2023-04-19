import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesComponent } from './devices.component';
import { By } from '@angular/platform-browser';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from '@angular/material/dialog';
import {SampleDevices} from '../app-interfaces/TestData';
import { AllGateways } from '../app-interfaces/TestData';

fdescribe('DevicesComponent', () => {
  let component: DevicesComponent;
  let fixture: ComponentFixture<DevicesComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule
      ],
      declarations: [ DevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesComponent);
    component = fixture.componentInstance;
    component.gateway = AllGateways[0]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  fit('it should have table for gateway main data and table for devices', () => {
    component.gateway = {
      gateway_id: "",
      gateway_name: "no gateway exists",
      IPv4:"",
    };
    component.devices = SampleDevices;
    component.displayedColumns = ['device_id', 'device_vendor', 'created_at','status','actions'];
    component.dataSource =  new MatTableDataSource([...SampleDevices]);

    fixture.detectChanges();
    const tableCount = fixture.debugElement.queryAll(By.css('table'));
    expect(tableCount.length).toBe(2);
  });

  it('should have a title',()=>{
    const titleMessage = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(titleMessage.innerHTML).toBe("Gateway's Devices");
  })

  it('should have add Device buton',()=>{
    const refreshBtnElement = fixture.debugElement.nativeElement.querySelector('#add_device');
    expect(refreshBtnElement.innerHTML).toBe('Add Device');
  })

  it('should show the 3 rows in the gateways table (test data length = 3)', () => {
    component.devices = SampleDevices;
    component.displayedColumns = ['device_id', 'device_vendor', 'created_at', 'status', 'actions'];
    component.dataSource =  new MatTableDataSource([...SampleDevices]);
    component.gateway = AllGateways[0];
 
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('mat-row'));
    expect(rows.length).toBe(3);
    const refreshBtnElement = fixture.debugElement.nativeElement.querySelector('#refresh_button');
    expect(refreshBtnElement.innerHTML).toBe('Refresh');
  });

  fit('should show  4 columns', () => {
    component.devices = SampleDevices;
    component.displayedColumns = ['device_id', 'device_vendor', 'created_at','status','actions'];
    component.dataSource =  new MatTableDataSource([...SampleDevices]);
    component.gateway = AllGateways[0];
  //   fixture.detectChanges();
  //   const rows = fixture.debugElement.queryAll(By.css('mat-header-cell'));
  //   expect(rows.length).toBe(4);
  // });
  fixture.detectChanges();
  fixture.whenStable().then(() => {
    fixture.detectChanges();

  let tableColumns = fixture.nativeElement.querySelectorAll('mat-row');
  expect(tableColumns.length).toBe(4);
  });
  })

});
