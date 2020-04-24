import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Class } from '../models/Class';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  URL : string = "http://localhost:3000/class/"
  constructor(private http : HttpClient) { }

  getClassess()
  {
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    return this.http.get(this.URL+ 'list',{headers : headers});
  }

  addClass(newClass:Class)
{
  let headers = new HttpHeaders();
  headers.append('contect-Type','application/json');

  return this.http.post(this.URL + 'add',newClass,
  {headers : headers});
}

  deleteClass(checkedClass : Class)
  {
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');

    return this.http.put(this.URL + 'remove/' + checkedClass._id, checkedClass,
    {headers : headers});
  }

  deleteClasses(classes : Class[])
  {
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');

    return this.http.put(this.URL + 'selected/remove/'+ classes.length,classes,{headers : headers})
  }

  editBoard(currentClass : Class)
  {

    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');

    return this.http.put(this.URL + 'update/' + currentClass._id + "/" + currentClass.class_id, currentClass,
    {headers : headers});
  }

}
