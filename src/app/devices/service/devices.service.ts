import { Injectable } from '@angular/core';
import { SampleDevices } from 'src/app/app-interfaces/TestData';
import { Observable, of} from 'rxjs';
import { Gateways_App_Base_URL } from 'src/app/app-interfaces/Constants';
import { Device } from 'src/app/app-interfaces/GatewayTypes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private devices: Device[] = []; 
  constructor(private http:HttpClient) { };

 /**
 * gets All the gateways from the backend 
  * @returns all the albums data
 */
     getDevicesforGateway(gatewayId:string): Observable<Device[]> {

      return  this.http.get<Device[]>(`${Gateways_App_Base_URL}/gatewaydevices/${gatewayId}`)
    }

 /**
 * delete certain device from gateway
  * @returns all the albums data
 */
     deleteGatewayDevice(gatewayId:any,deviceId:string): Observable<Device[]> {
    
      return  this.http.delete<Device[]>(`${Gateways_App_Base_URL}/deletedevice/${gatewayId}/${deviceId}`)
    }

  
    /**
     * save device in the data base
     */
    saveGatewayDevice(gatewayId:any,device:Device): Observable<any> {
    let postData = {"gatewayId": gatewayId,"device":device };
      return  this.http.post(`${Gateways_App_Base_URL}/savedevice/`,postData);
    }

    /**
     * function to handle result from backend 
     */

    handleBackendResponse(res:any){
      if(res['validation_message']){

       alert(`Input is incorrect, operation didnt performe on database:  validation_message: ${res['validation_message']}`) 

      }else if(res.status && res.status !=200){
        //error 
        alert(`Error in request, operation didnt performe on database:  Error Details: ${res}`) 


      }else{
        alert(`Success, operation success in database`) 

      }

    }
}
