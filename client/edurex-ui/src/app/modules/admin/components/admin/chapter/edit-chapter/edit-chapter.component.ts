import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ClassService } from 'src/app/modules/admin/service/class.service';
import { ChapterService } from 'src/app/modules/admin/service/chapter.service';
import { SubjectService } from 'src/app/modules/admin/service/subject.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'src/app/modules/admin/models/Subject';
import { Class } from 'src/app/modules/admin/models/Class';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-chapter',
  templateUrl: './edit-chapter.component.html',
  styleUrls: ['./edit-chapter.component.css']
})
export class EditChapterComponent implements OnInit {

  chapterList = [];
  chapter;
  subjectList = [];
  classList = [];
  progress = 0;
  error;
  message;
  url : string = "assets/images/img.png";
  uploading = false;

  constructor(private chapterService : ChapterService, private _snackbar : MatSnackBar,
    private formBuilder : FormBuilder, private subjectService : SubjectService, 
    private classService : ClassService,private route : ActivatedRoute) 
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

      this.getChapterById(this.route.snapshot.paramMap.get('id'));
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
   chapter_name: ['', [Validators.required,Validators.pattern('^[a-zA-Z][a-zA-Z0-9_ \t\r\s]*$')]],
   chapter_description : [''],
   chapter_subject : ['',Validators.required],
   chapter_class : ['',Validators.required],
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

  
  getChapterById(id : String)
  {
    this.chapterService.getChapterById(id).subscribe(
      data=>{
          if(!JSON.parse(JSON.stringify(data))['err'])
          {
            this.chapter = data;
            this.chapterForm.patchValue({
              chapter_name: this.chapter.chapter_name,
              chapter_description : this.chapter.chapter_description,
              chapter_subject : this.chapter.chapter_subject,
              chapter_class : this.chapter.chapter_class,
            })
          }
      },
      err=>{
        this._snackbar.open("Error in Loading Chapter Data",null,{duration : 5000});
      }
    )
  }
  

  updateChapter()
  {
    
    let formData = new FormData()
    console.log(this.chapterForm);
    for ( const key of Object.keys(this.chapterForm.value) ) {
      const value = this.chapterForm.value[key];
      formData.append(key, value);
    }
    this.chapterService.updateChapter(this.chapter.chapter_id,formData).subscribe(data => {
    
      
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
      this.error = "Error in updating Chapter to Edurex Database. Please try after few minutes."
    });
  

 
  }

  reset()
  {
    this.chapterForm.reset();
  }

}
