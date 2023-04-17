import { Injectable } from '@angular/core';
import { Gateway } from '../app-interfaces/GatewayTypes';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  currentGateway:any;
  constructor() { }
}
