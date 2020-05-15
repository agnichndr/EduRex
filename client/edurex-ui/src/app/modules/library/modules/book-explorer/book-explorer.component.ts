import { Component, OnInit } from '@angular/core';
import { LibraryCategoryService } from '../../service/library-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-book-explorer',
  templateUrl: './book-explorer.component.html',
  styleUrls: ['./book-explorer.component.css']
})
export class BookExplorerComponent implements OnInit {

  categories=[];
  books = [];
  imgUrl = "http://localhost:3000/thumbnail/";
  constructor(private libCategoryService : LibraryCategoryService,private bookService : BookService,
    private _snackbar : MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories();
    this.getLatestBooks();
  }

  getCategories()
  {
  this.libCategoryService.getArticleCategories().subscribe(
    data => {
      this.categories = data as Array<any>;
    },
    err => {
      this._snackbar.open("Error in loading Article Category",null,{duration : 5000})
    }
  )
  }

  getLatestBooks()
  {
    this.bookService.getLatestBooks().subscribe(
      data=>{
        console.log(data);
        this.books = data as Array<any>;
      },
      err=>{
        this._snackbar.open("Error in loading Latest release books",null,{duration : 5000})
      }
    )
  }

}
