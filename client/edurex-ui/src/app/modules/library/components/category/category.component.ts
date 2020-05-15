import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, Validators } from '@angular/forms';
import { LibraryCategoryService } from '../../service/library-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  articleCategories = [];
  subscriptionCategories = [];
  config_params;
  header_color = ["#bbf2c9","#f4b5f5","#b6e4f0","#f08873","#f0e54f","#79912a","#4a6a87","#ab653f"]
  constructor(private formBuilder : FormBuilder,private libCategoryService : LibraryCategoryService,
    private _snackbar : MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories();
    this.getSubscriptionCategories();
    this.getConfigValues();
  }

  configForm = this.formBuilder.group(
    {
      release : [0,Validators.required],
      img_size : [0,Validators.required],
      doc_size : [0,Validators.required],
    }
  )
  
  articleCategoryForm = this.formBuilder.group({
    category_name : ['',[Validators.required,Validators.maxLength(100)]]
  }
  )
  articleSubCategoryForm = this.formBuilder.group({
    subcategory_name : ['',[Validators.required,Validators.maxLength(100)]]
  }
  )

  subscriptionCategoryForm = this.formBuilder.group({
    subscription_category_name : ['',[Validators.required,Validators.maxLength(100)]]
  }
  )

  submitCatDisabled()
  {
    if(this.articleCategoryForm.status == "VALID")
    {
      return false;
    }
    return true;
  }

  submitSubCatDisabled()
  {
    if(this.articleSubCategoryForm.status == "VALID")
    {
      return false;
    }
    return true;
  }

  submitSubscriptionDisabled()
  {
    if(this.subscriptionCategoryForm.status == "VALID")
    {
      return false;
    }
    return true;
  }

  subscriptionError() 
  {
    if(this.subscriptionCategoryForm.value['subscription_category_name'].hasError('required'))
    {
      return "Value is required";
    }
    
  }

  get category_name()
  {
    return this.articleCategoryForm.get('category_name');
  }



  get subcategory_name()
  {
    return this.articleSubCategoryForm.get('subcategory_name');
  }

  get release()
  {
    return this.configForm.get('release');
  }

  
  get img_size()
  {
    return this.configForm.get('img_size');
  }

  

  get doc_size()
  {
    return this.configForm.get('doc_size');
  }

  

  getConfigValues()
  {
    this.libCategoryService.getConfigParameters().subscribe(
      data=>{
        if(!JSON.parse(JSON.stringify(data))['err'])
        {
          this.config_params = data[0];
          this.configForm.patchValue({
            release : this.config_params.release,
            img_size : this.config_params.img_size,
            doc_size : this.config_params.doc_size,
          })
        }
        else
        {
          this._snackbar.open(JSON.parse(JSON.stringify(data))['err'],null,{duration : 5000})
        }
      },
      err=>{
        this._snackbar.open("Error in Loading Library Config Parameters",null,{duration : 5000})
      }
    )
  }

  setConfigValues()
  {
    this.libCategoryService.setConfigParameter(this.configForm.value).subscribe(
      data=>{
        if(!JSON.parse(JSON.stringify(data))['err'])
        {
          this.getConfigValues();
          this._snackbar.open(JSON.parse(JSON.stringify(data))['msg'],null,{duration : 5000})
        }
        else
        {
          this._snackbar.open(JSON.parse(JSON.stringify(data))['err'],null,{duration : 5000})
        }
      },
      err=>{
        this._snackbar.open("Error in Loading Library Config Parameters",null,{duration : 5000})
      }
    )
  }


  getSubscriptionCategories()
  {
    this.libCategoryService.getSubscriptionCategories().subscribe(
      data => {
        this.subscriptionCategories = data as Array<any>;
      },
      err => {
        this._snackbar.open("Error in loading Article Category",null,{duration : 5000})
      }
    )
  }


  getCategories()
  {
      this.libCategoryService.getArticleCategories().subscribe(
        data => {
          this.articleCategories = data as Array<any>;
        },
        err => {
          this._snackbar.open("Error in loading Article Category",null,{duration : 5000})
        }
      )
  }
 
  addSubscriptionCategory()
  {
    this.libCategoryService.addSubscriptionCategory(this.subscriptionCategoryForm.value['subscription_category_name']).subscribe(
      data=>{
        if((JSON.parse(JSON.stringify(data))['msg']))
        {
          this.getSubscriptionCategories();
          this._snackbar.open(JSON.parse(JSON.stringify(data))['msg'],null,{duration:5000});
        }
        else
        {
          this._snackbar.open(JSON.parse(JSON.stringify(data))['err'],null,{duration:5000});
        }
      },
      err => {
        this._snackbar.open(JSON.stringify(err),null,{duration : 5000});
      }
    )
  }
  

  addCategory()
  {
    this.libCategoryService.addCategory(this.articleCategoryForm.value['category_name']).subscribe(
      data=>{
        if((JSON.parse(JSON.stringify(data))['msg']))
        {
          this.getCategories();
          this._snackbar.open(JSON.parse(JSON.stringify(data))['msg'],null,{duration:5000});
        }
        else
        {
          this._snackbar.open(JSON.parse(JSON.stringify(data))['err'],null,{duration:5000});
        }
      },
      err => {
        this._snackbar.open(JSON.stringify(err),null,{duration : 5000});
      }
    )
  }
  
  addSubCategory(id : String)
  {
      this.libCategoryService.addSubCategory(this.articleSubCategoryForm.value['subcategory_name'],id).subscribe
      (
        data=>{

          if((JSON.parse(JSON.stringify(data))['msg']))
        {
          this.getCategories();
          this._snackbar.open(JSON.parse(JSON.stringify(data))['msg'],null,{duration:5000});
        }
        else
        {
          this._snackbar.open(JSON.parse(JSON.stringify(data))['err'],null,{duration:5000});
        }

        },
        err =>{
          this._snackbar.open(JSON.stringify(err),null,{duration : 5000});
        }
      )
  }

  removeSubCategory(subcat:String, id : String)
  {
    var res = confirm("Are you sure you want to delete this subcategory ?")
    if(res == true)
    {
      this.libCategoryService.removeSubCategory(subcat,id).subscribe
      (
        data=>{

          if((JSON.parse(JSON.stringify(data))['msg']))
        {
          this.getCategories();
          this._snackbar.open(JSON.parse(JSON.stringify(data))['msg'],null,{duration:5000});
        }
        else
        {
          this._snackbar.open(JSON.parse(JSON.stringify(data))['err'],null,{duration:5000});
        }

        },
        err =>{
          this._snackbar.open(JSON.stringify(err),null,{duration : 5000});
        }
      )
    }
  }

  removeCategory(id : String)
  {
    var res = confirm("Are you sure, you want to remove this category ?")
    {
    this.libCategoryService.removeCategory(id)
    .subscribe(
      data=>{

        if((JSON.parse(JSON.stringify(data))['msg']))
        {
          this.getCategories();
          this._snackbar.open(JSON.parse(JSON.stringify(data))['msg'],null,{duration:5000});
        }
        else
        {
          this._snackbar.open(JSON.parse(JSON.stringify(data))['err'],null,{duration:5000});
        }


      },
      err => {

        this._snackbar.open(JSON.stringify(err),null,{duration:5000});
      }
    )
  }
  }


  removeSubscriptionCategory(id : String)
  {
   
      var res = confirm("Are you sure, you want to remove this category ?")
      {
      this.libCategoryService.removeSubscriptionCategory(id)
      .subscribe(
        data=>{
  
          if((JSON.parse(JSON.stringify(data))['msg']))
          {
            this.getSubscriptionCategories();
            this._snackbar.open(JSON.parse(JSON.stringify(data))['msg'],null,{duration:5000});
          }
          else
          {
            this._snackbar.open(JSON.parse(JSON.stringify(data))['err'],null,{duration:5000});
          }
  
  
        },
        err => {
  
          this._snackbar.open(JSON.stringify(err),null,{duration:5000});
        }
      )
    }
    
  }

}
