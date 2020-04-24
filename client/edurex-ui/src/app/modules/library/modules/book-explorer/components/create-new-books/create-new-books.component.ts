import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LibraryCategoryService } from 'src/app/modules/library/service/library-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-new-books',
  templateUrl: './create-new-books.component.html',
  styleUrls: ['./create-new-books.component.css']
})
export class CreateNewBooksComponent implements OnInit,OnChanges {

  ishidden = true;
  thumbnailprogress: number;
  url = "assets/images/doc.png";
  constructor(private formBuilder : FormBuilder, private libCategoryServices : LibraryCategoryService,
    private _snackbar : MatSnackBar) { }

    
  ngOnInit(): void {
    this.getCategories();
  }

  ngOnChanges() : void {
  }

  ngDoCheck() : void
  {
    if(this.categories.find(value => value.book_category == this.createBookForm.value['category']))
    {
      let subcat = this.categories.find(value => value.book_category == this.createBookForm.value['category']);
      this.subcategories = subcat.book_subCategory;
      
    }
    
  }

  categories = [];
  filteredcategories =[];
  subcategories =[]
  createBookForm = this.formBuilder.group(
    {
      name : ['',[Validators.required, Validators.maxLength(200)]],
      author : ['',[Validators.required, Validators.maxLength(100), 
      Validators.pattern('^[a-zA-Z. \'\t\r\s]*$')]],
      description : ['',[Validators.required]],
      category : ['',[Validators.required]],
      subcategory : [''],

    }
  )

  isSubCategoryDisabled()
  {
    if(this.category.value != '')
    {
      if(this.categories.find(value => value.book_category == this.category.value))
      {
        if(this.categories.find(value => value.book_category == this.category.value).book_subCategory.length > 0)
        {
          return false;
        }
      }
    }
    return true;
  }

  get name()
  {
    return this.createBookForm.get('name');
  }

  get author()
  {
    return this.createBookForm.get('author');
  }

  get description()
  {
    return this.createBookForm.get('description');
  }

  get category()
  {
    return this.createBookForm.get('category');
  }

  get subcategory()
  {
    return this.createBookForm.get('subcategory');
  }

  getCategories()
  {
      this.libCategoryServices.getArticleCategories().subscribe(
        data => {
          this.categories =data as Array<any>;
        },
        err=>
        {
          this._snackbar.open('Error in loading article categories',null,{duration:5000})
        }
      )
  }

  loadSubcategory(event : Event)
  {
    console.log("Agni");
  }

  resetSubCategory(event : Event)
  {
    this.subcategory.reset();
  }

  ThumbnailFile : any;
  onSelectThumbnail(event) {
    this.thumbnailprogress = 0;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.ThumbnailFile = event.target.files[0]
      reader.onload = (event: any) => {
        this.thumbnailprogress = Math.round(100 * event.loaded / event.total);
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  apply_filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredcategories= filterValue != null ? this.categories.filter(value => value.book_category.toLowerCase().includes(filterValue.toLowerCase())) : this.categories;
  }

  filter_subcategories(event : Event)
  {
    const subfilterValue = (event.target as HTMLInputElement).value;
    this.subcategories= subfilterValue ? this.subcategories.filter(value => value.toLowerCase().includes(subfilterValue.toLowerCase())) : this.subcategories;
  }
}
