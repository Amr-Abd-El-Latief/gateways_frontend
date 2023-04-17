import { Component, OnInit, ViewChild } from '@angular/core';
import { Device, Gateway } from '../app-interfaces/GatewayTypes';
import { DevicesService } from './service/devices.service';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../service/app.service';
import {MatDialog} from '@angular/material/dialog';

import { DeviceComponent } from './device/device/device.component';
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  gateway: Gateway = {
    gateway_id: "",
    gateway_name: "no gateway exists",
    IPv4:"",
  };
  devices: Device[] = [];
  displayedColumns = ['device_id', 'device_vendor', 'created_at','status','actions'];
  dataSource = new MatTableDataSource<Device>();
  private gatewayId:string="";
  
  constructor(private devicesService:DevicesService,private activatedRoute: ActivatedRoute,
    public appService:AppService, public dialog: MatDialog) { 
   this.dataSource =  new MatTableDataSource([...this.devices]);
  }

  ngOnInit(): void {
    let self = this;
  this.gatewayId = <string>this.activatedRoute.snapshot.paramMap.get("gatewayId");
  self.getgatewayDevices(self.gatewayId);
  self.gateway = self.appService.currentGateway;
  }


  /**
   * function to get all Gateways from the gateway servise
   * @return {Gateway[]} array of gateways from the service
   * 
   */
  getgatewayDevices(gatewayId:string){
    let self= this;
   
    this.devicesService.getDevicesforGateway(gatewayId).subscribe(res=>{
      self.devices = <Device[]>res;
      self.dataSource.data = self.devices;
   })
  }



  /**
   * opens dialogue to add device
   */
  addDevice(){
  //  this.dialog.open(DeviceComponent);
  let self = this;
  const dialogref = this.dialog.open(DeviceComponent, {
   
      data: {
        gateway:self.gateway
      }
    });

    dialogref.afterClosed().subscribe(response => {
      console.log(response);
      if (response) {
      }
    });
  }

  deleteDevice(deviceID:string){
    let self = this;
     this.devicesService.deleteGatewayDevice(this.gateway._id,deviceID).subscribe((res)=>{
      self.devicesService.handleBackendResponse(res);
      self.getgatewayDevices(self.gatewayId);
     })

  }


}
