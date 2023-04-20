import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../../service/devices.service';
import { Device, Gateway } from 'src/app/app-interfaces/GatewayTypes';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  currentGateway: Gateway;
  device: Device = {
    "device_id": 1,
    "device_vendor": "new device",
    "created_date": new Date("2/2/2023"),
    "status": true
  };
  constructor(private devicesService: DevicesService, @Inject(MAT_DIALOG_DATA) public data: any) {
   
    this.currentGateway = data.gateway;
  }

  ngOnInit(): void {
  }

  /**
   * function to save the device in data base
   */
  saveDevice() {
    let self = this;
    self.devicesService.saveGatewayDevice(self.currentGateway._id, self.device).subscribe((res) => {
      self.devicesService.handleBackendResponse(res);
    })

  }

}
