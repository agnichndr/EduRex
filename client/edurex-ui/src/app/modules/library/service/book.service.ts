import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  URL = "http://localhost:3000/library/books/";
  constructor(private httpClient : HttpClient) { }

  getBook(category : String, subcategory : String)
  {
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");
    return this.httpClient.get(this.URL+"list/"+category+"/" + subcategory,{headers:headers})
  }

  addBook(book : FormData)
  {

    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");
    return this.httpClient.post(this.URL+"add",book,{headers:headers})

  }
}