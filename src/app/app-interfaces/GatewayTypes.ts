//Type used for Gatway data retrieved from Back End
export interface Gateway{
  _id?:object,
    gateway_id:string,
    gateway_name:string,
    IPv4:string,
    device?:Device[];
  }

 

  //Type used for Devices data retrieved from Back End
export interface Device{
    device_id:number,
    device_vendor:string,
    created_date:Date,
    status:boolean
  }


