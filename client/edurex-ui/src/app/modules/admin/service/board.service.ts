import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Board} from '../models/Board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  URL : string = "http://localhost:3000/boards/"
  constructor(private http : HttpClient) { }

  getBoards()
  {
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    return this.http.get(this.URL+ 'list',{headers : headers});
  }

  addBoard(newBoard:Board)
{
  let headers = new HttpHeaders();
  headers.append('contect-Type','application/json');

  return this.http.post(this.URL + 'add',newBoard,
  {headers : headers});
}

  deleteBoard(checkedBoard : Board)
  {
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');

    return this.http.put(this.URL + 'remove/' + checkedBoard._id, checkedBoard,
    {headers : headers});
  }

  deleteBoards(boards : Board[])
  {
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    return this.http.put(this.URL + 'selected/remove/'+ boards.length,boards,{headers : headers})
  }

  editBoard(currentBoard : Board)
  {

    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');

    return this.http.put(this.URL + 'update/' + currentBoard._id + "/" + currentBoard.board_id, currentBoard,
    {headers : headers});
  }
}
