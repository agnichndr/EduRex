import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Session } from '../models/Session';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  URL : string = "http://localhost:3000/sessions/"
  constructor(private http : HttpClient) { }

  getSession(id : String)
  {
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    return this.http.get(this.URL+ '/get/'+id,{headers : headers});
  }
  
  getSessions()
  {
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    return this.http.get(this.URL+ 'list',{headers : headers});
  }

  addSession(newSession: Session)
{
  let headers = new HttpHeaders();
  headers.append('contect-Type','application/json');

  return this.http.post(this.URL + 'add',newSession,
  {headers : headers});
}

  deleteSession(checkedSession: Session)
  {
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');

    return this.http.put(this.URL + 'remove/' + checkedSession._id, checkedSession,
    {headers : headers});
  }

  deleteSessions(sessions : Session[])
  {
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');

    return this.http.put(this.URL + 'selected/remove/'+ sessions.length,sessions,{headers : headers})
  }

  editSession(currentSession : Session)
  {

    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    return this.http.put(this.URL + 'update/' + currentSession._id + "/" + currentSession.session_id, currentSession,
    {headers : headers});
  }

  setCurrentSession(id: String)
  {
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    return this.http.put(this.URL + 'current/'+id,{headers : headers});
  }

}
