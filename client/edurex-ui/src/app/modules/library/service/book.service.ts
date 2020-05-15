import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  URL = "http://localhost:3000/library/books/";
  constructor(private httpClient : HttpClient) { }

  getLanguages()
  {
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");
    return this.httpClient.get(this.URL+"languages/list/",{headers:headers})
  }

  getLangByID(code : String)
  {
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");
    return this.httpClient.get(this.URL+"languages/get/"+code,{headers:headers})
  }

  getBookById(id : String)
  {
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");
    return this.httpClient.get(this.URL+"view/" + id,{headers:headers})

  }

  getLatestBooks()
  {
    
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");
    return this.httpClient.get(this.URL+"list/latest/",{headers:headers})
  }

  deleteBookById(id : String)
  {
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");
    return this.httpClient.put(this.URL+"delete/" + id,{headers:headers})
  }

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

  updateArticle( form : FormData, id : String)
  {
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");
    return this.httpClient.put(this.URL+"edit/"+id,form,{headers:headers})
  }

  editThumbnail(thumbnail : FormData, id : String)
  {
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");
    return this.httpClient.put(this.URL+"edit/thumbnail/"+id,thumbnail,{headers:headers})
  }

  editBook(book : FormData, id : String)
  {
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");
    return this.httpClient.put(this.URL+"edit/content/"+id,book,{headers:headers})
  }
}