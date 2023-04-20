import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesComponent } from './devices.component';
import { By } from '@angular/platform-browser';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from '@angular/material/dialog';
import {SampleDevices} from '../app-interfaces/TestData';
import { AllGateways } from '../app-interfaces/TestData';
import { MatTableModule } from '@angular/material/table';
fdescribe('DevicesComponent', () => {
  let component: DevicesComponent;
  let fixture: ComponentFixture<DevicesComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        MatTableModule
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
    component.displayedColumns = ['device_id', 'device_vendor', 'created_date','status','actions'];
    component.dataSource =  new MatTableDataSource([...SampleDevices]);

    fixture.detectChanges();
    const tableCount = fixture.debugElement.queryAll(By.css('table'));
    expect(tableCount.length).toBe(1);
  });

  it('should have a title',()=>{
    const titleMessage = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(titleMessage.innerHTML).toBe("Gateway's Devices");
  })

  it('should have add Device buton',()=>{
    const refreshBtnElement = fixture.debugElement.nativeElement.querySelector('#add_device');
    expect(refreshBtnElement.innerHTML).toBe('Add Device');
  })

  fit('should show the 5 columns in the gateways table', () => {
    component.devices = SampleDevices;
    component.displayedColumns = ['device_id', 'device_vendor', 'created_date', 'status', 'actions'];
    component.dataSource =  new MatTableDataSource([...SampleDevices]);
    component.gateway = AllGateways[0];
 
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('th'));
    expect(rows.length).toBe(5);
    const refreshBtnElement = fixture.debugElement.nativeElement.querySelector('#add_device');
    expect(refreshBtnElement.innerHTML).toBe('Add Device');
  });

  fit('should show  4 rows', () => {
    component.devices = SampleDevices;
    component.displayedColumns = ['device_id', 'device_vendor', 'created_date','status','actions'];
    component.dataSource =  new MatTableDataSource([...SampleDevices]);
    component.gateway = AllGateways[0];

  fixture.detectChanges();
  fixture.whenStable().then(() => {
    fixture.detectChanges();

  let tableColumns = fixture.nativeElement.querySelectorAll('tr');
  expect(tableColumns.length).toBe(4);
  });
  })

});
