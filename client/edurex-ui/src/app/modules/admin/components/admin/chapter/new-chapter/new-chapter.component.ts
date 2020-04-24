import { Component, OnInit } from '@angular/core';
import { ChapterService } from 'src/app/modules/admin/service/chapter.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Chapter } from 'src/app/modules/admin/models/Chapter';
import { Validators, FormBuilder } from '@angular/forms';
import { SubjectService } from 'src/app/modules/admin/service/subject.service';
import { ClassService } from 'src/app/modules/admin/service/class.service';
import { Subject } from 'src/app/modules/admin/models/Subject';
import { Class } from 'src/app/modules/admin/models/Class';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-new-chapter',
  templateUrl: './new-chapter.component.html',
  styleUrls: ['./new-chapter.component.css']
})
export class NewChapterComponent implements OnInit {

  chapterList = [];
  subjectList = [];
  classList = [];
  progress = 0;
  error;
  message;
  url : string = "assets/images/img.png";
  uploading = false;

  constructor(private chapterService : ChapterService, private _snackbar : MatSnackBar,
    private formBuilder : FormBuilder, private subjectService : SubjectService, 
    private classService : ClassService) 
  {
    this.error = null;
    this.message = null;
   }

  ngOnInit(): void {
    this.subjectService.getSubjects().subscribe(
      data=>
      {
        this.subjectList = data as Subject[];
      },
      err =>
      {
        this._snackbar.open("Error in loading the subject list",null,{duration : 5000});
      }
    );

    this.classService.getClassess().subscribe(
      data=>
      {
        this.classList = data as Class[];
      },
      err =>
      {
        this._snackbar.open("Error in loading the class list",null,{duration : 5000});
      }
    );
  }

  submitDisabled()
  {
    if(this.chapterForm.status == "VALID")
    {
      return false;
    }
    else
    {
      return true;
    }
  }
  dismissErrorAlert()
  {
    this.error = null;
  }

  dismissMessageAlert()
  {
    this.message = null;
  }

  chapterForm = this.formBuilder.group({
   chapter_id : ['', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z0-9]*$')]],
   chapter_name: ['', [Validators.required,Validators.pattern('^[a-zA-Z][a-zA-Z0-9_ \t\r\s]*$')]],
   chapter_description : [''],
   chapter_subject : ['',Validators.required],
   chapter_class : ['',Validators.required],
   chapter_referrence_book : [null],
   active : true
  });

  get chapter_id()
  {
    return  this.chapterForm.get('chapter_id');
  }
  get chapter_name()
  {
    return  this.chapterForm.get('chapter_name');
  }
  get chapter_description()
  {
    return  this.chapterForm.get('chapter_description');
  }
  get chapter_class()
  {
    return  this.chapterForm.get('chapter_class');
  }
  get chapter_subject()
  {
    return  this.chapterForm.get('chapter_subject');
  }

  get chapter_referrence_book()
  {
    return this.chapterForm.get('chapter_referrence_book');
  }

  get chapter_image()
  {
    return this.chapterForm.get('chapter_image');
  }

  File : any

  onSelectFile(event) {
    this.progress = 0;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.File = event.target.files[0]
      reader.onload = (event: any) => {
        this.progress = Math.round(100 * event.loaded / event.total);
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  addChapter()
  {
    
    let formData = new FormData()
    formData.append('chapter_image',this.File);
    console.log(this.chapterForm);
    for ( const key of Object.keys(this.chapterForm.value) ) {
      const value = this.chapterForm.value[key];
      formData.append(key, value);
    }
    this.chapterService.addChapter(formData).subscribe(data => {
    
      
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
    err=>
    {
      
      this.message = null;
      this.error = "Error in adding Chapter to Edurex Database. Please try after few minutes."
    });
  

 
  }
  }

  
  
