import { Component, OnInit } from '@angular/core';
import { Gateway } from '../app-interfaces/GatewayTypes';
import { GatewaysService } from './service/gateways.service';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { AppService } from '../service/app.service';
import {MatDialog} from '@angular/material/dialog';
import { GatewayComponent } from './gateway/gateway/gateway.component';

@Component({
  selector: 'app-gateways',
  templateUrl: './gateways.component.html',
  styleUrls: ['./gateways.component.scss']
})
export class GatewaysComponent implements OnInit {
  allGateways: Gateway[] = [];
  displayedColumns = ['gateway_id', 'gateway_name', 'IPv4','details','delete'];
  dataSource = new MatTableDataSource<Gateway>();


  constructor(private gatewaysService:GatewaysService, private router: Router,
    public appService:AppService, public dialog: MatDialog) { 
   this.getAllGateways();
   this.dataSource =  new MatTableDataSource([...this.allGateways]);
  }

  ngOnInit(): void {
  }


  /**
   * function to get all Gateways from the gateway servise
   * @return {Gateway[]} array of gateways from the service
   * 
   */
  getAllGateways(){
    let self= this;
    this.gatewaysService.getAllGateways().subscribe(res=>{
      self.allGateways = <Gateway[]>res;
      self.dataSource.data = self.allGateways;
   })
  }

/**
 * function to open the details of certain gateway with its devices
 * @param {string} gatewayId id of the gateway
 */
  openDevice(gatewayId:string){
    this.appService.currentGateway = {...this.allGateways.filter(gateway=>gateway.gateway_id == gatewayId)[0]}
    this.router.navigate(['devices/' +gatewayId]);

  }


  /**
   * function to delete gateway from the database
   * @param {string} _id id of the gateway to be deleted
   */
  deleteGateway(gatewayId:string){
  let self = this;
    this.gatewaysService.deleteGateway(gatewayId).subscribe((res)=>{
      self.gatewaysService.handleBackendResponse(res);
      self.getAllGateways();
     })
  }

/**
 * function to show add gate way dialogue
 */
  addGateway(){
  //  this.dialog.open(DeviceComponent);
  let self = this;
  const dialogref = this.dialog.open(GatewayComponent, {

    });

    dialogref.afterClosed().subscribe(response => {
      console.log(response);
      if (response) {
      }
    });

  }

}
