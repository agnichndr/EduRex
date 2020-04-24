import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-e-library',
  templateUrl: './e-library.component.html',
  styleUrls: ['./e-library.component.css']
})
export class ELibraryComponent implements OnInit {

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
  }

  upload()
  {
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    return this.http.post("http://localhost:3000/sample/",{headers : headers})
  }

}
