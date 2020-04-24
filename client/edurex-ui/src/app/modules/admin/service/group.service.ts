import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Group } from '../models/Group';


@Injectable({
  providedIn: 'root'
})
export class GroupService {

  URL : string = "http://localhost:3000/subject-groups/"
  constructor(private http : HttpClient) { }

  getGroupById(id:String)
  {
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    return this.http.post(this.URL+ 'get/'+id,{headers : headers});
  }
  getGroups()
  {
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    return this.http.get(this.URL+ 'list',{headers : headers});
  }

  addGroup(newGroup : Group)
{
  let headers = new HttpHeaders();
  headers.append('contect-Type','application/json');

  return this.http.post(this.URL + 'add',newGroup,
  {headers : headers});
}

  deleteGroup(id : String, group : Group)
  {
    let headers = new HttpHeaders();
  headers.append('contect-Type','application/json');

  let selectedGroup : Group = {
    group_id : group.group_id,
    group_name : group.group_name,
    active : false,
    subject : group.subject

  }

  return this.http.put(this.URL + 'remove/'+id,selectedGroup,
  {headers : headers});
  }
}
