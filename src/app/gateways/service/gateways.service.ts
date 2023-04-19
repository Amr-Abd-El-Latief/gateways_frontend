import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AllGateways } from 'src/app/app-interfaces/TestData';
import { Gateway } from 'src/app/app-interfaces/GatewayTypes';
import { Observable, of } from 'rxjs';
import { Gateways_App_Base_URL } from 'src/app/app-interfaces/Constants';


@Injectable({
  providedIn: 'root'
})
export class GatewaysService {
  private gateways: Gateway[] = [];
  constructor(private http: HttpClient) { };

  /**
* gets All the gateways from the backend 
 * @returns all the albums data
*/
  getAllGateways(): Observable<Gateway[]> {
    if (this.gateways.length > 0) {
      return of(this.gateways);
    }
    return this.http.get<Gateway[]>(`${Gateways_App_Base_URL}/allgateways`)
  }

  /**
   * save device in the data base
   */
  saveGateway(gateway: Gateway): Observable<any> {
    let postData = { "gateway": gateway };
    return this.http.post(`${Gateways_App_Base_URL}/savegateway/`, postData);
  }

  /*
    * delete certain Gateway from database
    * 
   */
  deleteGateway(gatewayId: any): Observable<any> {

    return this.http.delete(`${Gateways_App_Base_URL}/deletegateway/${gatewayId}`)
  }

  /**
 * function to handle result from backend 
 */

  handleBackendResponse(res: any) {
    if (res['validation_message']) {

      alert(`Input is incorrect, operation didnt performe on database:  validation_message: ${res['validation_message']}`)

    } else if (res.status && res.status != 200) {
      //error 
      alert(`Error in request, operation didnt performe on database:  Error Details: ${JSON.stringify(res)}`)


    } else {
      alert(`Success, operation success in database`)

    }

  }
}
