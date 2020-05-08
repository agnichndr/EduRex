import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LibraryCategoryService } from 'src/app/modules/library/service/library-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from 'src/app/modules/library/service/book.service';
import { FileValidator } from 'ngx-material-file-input';

@Component({
  selector: 'app-create-new-books',
  templateUrl: './create-new-books.component.html',
  styleUrls: ['./create-new-books.component.css']
})
export class CreateNewBooksComponent implements OnInit,OnChanges {

  message = null;
  error = null;
  ishidden = true;
  thumbnailprogress: number;
  docprogress : number;
  url = "assets/images/doc.png";
  constructor(private formBuilder : FormBuilder, private libCategoryServices : LibraryCategoryService,
    private _snackbar : MatSnackBar,private bookService : BookService) { }

    
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

  dismissMessageAlert()
  {
    this.message = null;
  }

  dismissErrorAlert()
  {
    this.error = null;
  }

  categories = [];
  filteredcategories =[];
  subcategories =[]
  createBookForm = this.formBuilder.group(
    {
      book_id : ['',[Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9]*$")]],
      name : ['',[Validators.required, Validators.maxLength(200)]],
      author : ['',[Validators.required, Validators.maxLength(100),Validators.pattern('^[a-zA-Z. \'\t\r\s]*$')]],
      description : ['',[Validators.required]],
      category : ['',[Validators.required]],
      subcategory : [''],
      book : ['', [Validators.required, FileValidator.maxContentSize(100*1024*1024)]],//100 MB
      cover : ['', [Validators.required, FileValidator.maxContentSize(1*1024*1024)]]//1 MB
    }
  )

  submitDisabled()
  {
    if(this.createBookForm.status == "VALID")
    {
      return false;
    }
    else
    {
      return true;
    }
  }

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

  get book_id()
  {
    return this.createBookForm.get('book_id');
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

  get cover()
  {
    return this.createBookForm.get('cover');
  }

  get book()
  {
    return this.createBookForm.get('book');
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

  BookFile : any;
  onSelectBook(event) {
    this.docprogress = 0;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.BookFile = event.target.files[0]
      reader.onload = (event: any) => {
        this.docprogress = Math.round(100 * event.loaded / event.total);
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


  addArticle()
  {
    let formData = new FormData()
    formData.append('thumbnail_image',this.ThumbnailFile);
    formData.append('book',this.BookFile)
    for ( const key of Object.keys(this.createBookForm.value) ) {
      const value = this.createBookForm.value[key];
      formData.append(key, value);
    }

    this.bookService.addBook(formData).subscribe(
      data=>
      {
        this.createBookForm.reset();
        if(!(JSON.parse(JSON.stringify(data))['err']))
        {
          this.error = null;
          this.message = JSON.parse(JSON.stringify(data))['msg'];
        }
        else
        {
          this.message = null;
          this.error =  JSON.parse(JSON.stringify(data))['err'];
        }
      },
      err =>
      {
        this.message = null;
        this.error = "Error in adding Book/Article to Edurex Database. Please try after few minutes."
      }
    )
  }


}
