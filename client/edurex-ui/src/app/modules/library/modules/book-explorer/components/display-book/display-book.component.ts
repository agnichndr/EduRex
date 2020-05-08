import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/modules/library/service/book.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-display-book',
  templateUrl: './display-book.component.html',
  styleUrls: ['./display-book.component.css']
})
export class DisplayBookComponent implements OnInit {
  header_color = ["#bbf2c9","#f4b5f5","#b6e4f0","#f08873","#f0e54f","#79912a","#4a6a87","#ab653f"];

  books;
  imgUrl = "http://localhost:3000/thumbnail/";
  constructor(private bookService : BookService, private route : ActivatedRoute,private _snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.getBooks(routeParams.category,routeParams.subcategory);
    });
  }

  getBooks(category,subcategory)
  {
    this.bookService.getBook(category,subcategory).subscribe(
      data=>
      {
        this.books = data;
      },
      err=>{
          this._snackBar.open("Error in loading the list of books",null,{duration:5000});
      }

    )
  }

}
