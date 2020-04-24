import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Subject} from '../models/Subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  URL : string = "http://localhost:3000/subjects/"
  constructor(private http : HttpClient) { }

  getSubject(id : String)
  {
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    return this.http.get(this.URL+ '/get/'+id,{headers : headers});
  }
  
  getSubjects()
  {
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    return this.http.get(this.URL+ 'list',{headers : headers});
  }

  addSubject(newSubject:Subject)
{
  let headers = new HttpHeaders();
  headers.append('contect-Type','application/json');

  return this.http.post(this.URL + 'add',newSubject,
  {headers : headers});
}

  deleteSubject(checkedSubject : Subject)
  {
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');

    return this.http.put(this.URL + 'remove/' + checkedSubject._id, checkedSubject,
    {headers : headers});
  }

  deleteSubjects(subjects : Subject[])
  {
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');

    return this.http.put(this.URL + 'selected/remove/'+ subjects.length,subjects,{headers : headers})
  }

  editSubject(currentSubject : Subject)
  {

    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    return this.http.put(this.URL + 'update/' + currentSubject._id + "/" + currentSubject.subject_id, currentSubject,
    {headers : headers});
  }
}
