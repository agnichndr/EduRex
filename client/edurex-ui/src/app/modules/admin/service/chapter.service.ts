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

  getChapterById(id : String)
  {
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    return this.http.get(this.URL+ 'get/'+ id ,{headers : headers});
  }

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

updateChapter(id:String,newChapter : FormData)
{
  let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
   return this.http.put(this.URL+'update/'+id,newChapter,{headers : headers});
}

deleteChapter(id : String)
{
  let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
   return this.http.put(this.URL+'remove/'+id,{headers : headers});
}


}
