import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  URL = "http://localhost:3000/";
  constructor(private http : HttpClient) 
  {

   }
   
   getCounterList()
  {
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");
    return this.http.get(this.URL+"counter/list/",{headers:headers})
  }
}
