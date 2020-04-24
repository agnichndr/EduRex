import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chapter } from '../models/Chapter';
import { FormGroup } from '@angular/forms';




@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  URL : string = "http://localhost:3000/chapters/"
  constructor(private http : HttpClient) { }

  getChapters(subject, class_name)
  {
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    return this.http.get(this.URL+ 'list/'+ subject +"/" + class_name ,{headers : headers});
  }

addChapter(newChapter : FormData)
{
  let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
   return this.http.post(this.URL+'add/',newChapter);
}


}
