import { Component, OnInit } from '@angular/core';
import { Gateway } from 'src/app/app-interfaces/GatewayTypes';
import { GatewaysService } from '../../service/gateways.service';
@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss']
})
export class GatewayComponent implements OnInit {
  gateway: Gateway = {
    gateway_id: "gateway_ex",
    gateway_name: 'gateway_ex',
    IPv4: "192.168.x.x"
  };
  constructor(private gatewaysService:GatewaysService ) { }

  ngOnInit(): void {
  }
  saveGateway(){

    let self = this;
    self.gatewaysService.saveGateway(self.gateway).subscribe((res) => {
      self.gatewaysService.handleBackendResponse(res);

    })
  }

}
