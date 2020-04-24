import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibraryCategoryService {

  URL = "http://localhost:3000/";
  constructor(private httpClient : HttpClient) { }

  getArticleCategories()
  {
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");

    return this.httpClient.get(this.URL+"library/category/articles/list",{headers : headers});
  }

  getSubscriptionCategories()
  {
    let headers = new HttpHeaders();
    
    headers.append("Content-Type","application/json");

    return this.httpClient.get(this.URL+"library/category/subscriptions/list",{headers : headers});
  }
  addCategory(book_category : String)
  {

    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");

    let newCategory  = {
      book_category : book_category
    }
    return this.httpClient.post(this.URL+"library/category/articles/add",newCategory,{headers:headers})
  }

  addSubscriptionCategory(subscription_category : String)
  {
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");

    let newCategory  = {
      subscription_category : subscription_category
    }
    return this.httpClient.post(this.URL+"library/category/subscriptions/add",newCategory,{headers:headers})
  }

  addSubCategory(book_subCategory : String,book_category_id : String)
  {
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");

    let newSubCategory  = {
      book_subCategory : book_subCategory
    }
    return this.httpClient.put(this.URL+"library/category/articles/update/"+book_category_id,newSubCategory,{headers:headers})
  }


  removeSubCategory(book_subCategory : String,book_category_id : String)
  {
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");

    let newSubCategory  = {
      book_subCategory : book_subCategory
    }
    return this.httpClient.put(this.URL+"library/category/articles/delete/"+book_category_id,newSubCategory,{headers:headers})
  }

  removeSubscriptionCategory(id:String)
  {
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");

    
    return this.httpClient.put(this.URL+"library/category/subscriptions/remove/"+id,{headers:headers})
  }

  removeCategory(id:String)
  {
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");

    
    return this.httpClient.put(this.URL+"library/category/articles/remove/"+id,{headers:headers})
  }
  
  }