import { Component, OnInit } from '@angular/core';
import { LibraryCategoryService } from '../../service/library-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-explorer',
  templateUrl: './book-explorer.component.html',
  styleUrls: ['./book-explorer.component.css']
})
export class BookExplorerComponent implements OnInit {

  categories=[];
  constructor(private libCategoryService : LibraryCategoryService,
    private _snackbar : MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories();
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

}
