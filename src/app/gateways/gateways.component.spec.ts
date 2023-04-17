import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewaysComponent } from './gateways.component';
import { AllGateways } from '../app-interfaces/TestData';
import { By } from '@angular/platform-browser';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from '@angular/material/dialog';


fdescribe('GatewaysComponent', () => {
  let component: GatewaysComponent;
  let fixture: ComponentFixture<GatewaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule
      ],
      declarations: [ GatewaysComponent ]
    })
    .compileComponents();
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
    component.displayedColumns = ['gateway_id', 'gateway_name', 'IPv4','details'];
    component.dataSource =  new MatTableDataSource([...AllGateways]);

    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('table'));
    expect(rows.length).toBe(1);
  });

  it('should have a title',()=>{
    const titleMessage = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(titleMessage.innerHTML).toBe('Gateways');
  })

  it('should have add Device buton',()=>{
    const refreshBtnElement = fixture.debugElement.nativeElement.querySelector('#refresh_button');
    expect(refreshBtnElement.innerHTML).toBe('Refresh');
  })

  it('should show the 3 rows in the gateways table (test data length = 3)', () => {
    component.allGateways = AllGateways;
    component.displayedColumns = ['gateway_id', 'gateway_name', 'IPv4','details'];
    component.dataSource =  new MatTableDataSource([...AllGateways]);

    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('mat-row'));
    expect(rows.length).toBe(3);
    const refreshBtnElement = fixture.debugElement.nativeElement.querySelector('#refresh_button');
    expect(refreshBtnElement.innerHTML).toBe('Refresh');
  });

  it('should show  4 columns', () => {
    component.allGateways = AllGateways;
    component.displayedColumns = ['gateway_id', 'gateway_name', 'IPv4','details'];
    component.dataSource =  new MatTableDataSource([...AllGateways]);

    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('mat-header-cell'));
    expect(rows.length).toBe(4);
  });


});
