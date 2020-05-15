import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/modules/admin/service/class.service';
import { SubjectService } from 'src/app/modules/admin/service/subject.service';
import { ChapterService } from 'src/app/modules/admin/service/chapter.service';
import { Chapter } from 'src/app/modules/admin/models/Chapter';
import { FileValidator } from 'ngx-material-file-input';


@Component({
  selector: 'app-new-assessment',
  templateUrl: './new-assessment.component.html',
  styleUrls: ['./new-assessment.component.css']
})
export class NewAssessmentComponent implements OnInit {
  message = null;
  error = null;
  ishidden = true;
  languages;
  startDate : Date;
  class_param = null;
  subject_pram = null;
  questionprogress: number;
  ansprogress : number;
  url = "assets/images/doc.png";
  constructor(private formBuilder : FormBuilder, private classService : ClassService,
    private _snackbar : MatSnackBar,private subjectService : SubjectService,
    private chapterService : ChapterService ,private router : Router)
     {
        

      }

    
  ngOnInit(): void {

    this.getSubjects();
    this.getClasses();
    this.populateStartDate();
    
  }

  ngOnChanges() : void {
  }

  ngDoCheck() : void
  {

  }

  dismissMessageAlert()
  {
    this.message = null;
  }

  dismissErrorAlert()
  {
    this.error = null;
  }

  classess = [];
  subjects=[];
  chapters : Chapter[] = [];

  
  createAssessmentForm = this.formBuilder.group(
    {
      id :['',[Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9]*$")]],
      name : ['',[Validators.required, Validators.maxLength(200)]],
      short :['',[Validators.required,Validators.maxLength(200)]],
      description :['',Validators.maxLength(500)],
      start_date :[new Date(),[Validators.required]],
      start_time :['12:00 AM'],
      end_date :['',[Validators.required]],
      end_time :['',],
      full_marks :['',[Validators.required,Validators.max(99999),Validators.min(0)]],
      class : ['',Validators.required],
      subject : ['',Validators.required],
      chapter : [[Chapter]],
      question : ['',[Validators.required,FileValidator.maxContentSize(100*1024*1024)]],//100 MB
      answer :  ['',[Validators.required,FileValidator.maxContentSize(100*1024*1024)]]//100 MB
      
    }
  )

  populateStartDate()
  {
    this.startDate  =new Date();
  }
  getClasses()
  {
    this.classService.getClassess().subscribe(
      data=>{
        this.classess = data as Array<any>;
      },
      err=>{
        this._snackbar.open('Error in Loading Classes',null,{duration : 5000});
      }
    )
  }

  getSubjects()
  {
    this.subjectService.getSubjects().subscribe(
      data=>{
        this.subjects = data as Array<any>;
      },
      err=>{
        this._snackbar.open('Error in Loading subjects',null,{duration : 5000});
      }
    )

  }

  getChapters(sub,cls)
  {
    this.chapterService.getChapters(sub,cls).subscribe(
      data=>{
        if(!JSON.parse(JSON.stringify(data))['err'])
        {
            this.chapters = data as Array<Chapter>;
            if(this.chapters.length !=0)
            {
              this.ishidden = false;
            }
            else
            {
              this.ishidden = !this.ishidden;
            }
           
        }
        else
        {
          this._snackbar.open(JSON.parse(JSON.stringify(data))['err'],null,{duration :5000});
        }
      },
      err=>{
        this._snackbar.open("Error in loading chapters",null,{duration :5000});
      }
    )
  }

  getChapterlist(event:Event, field : String)
  {
    
    if(field == 'class')
    {
      this.class_param = this.class.value;
    }
    else if(field == 'subject')
    {
      this.subject_pram = this.subject.value;
    }
    if(this.class_param != null && this.subject_pram != null)
    {
      this.getChapters(this.subject_pram,this.class_param);
      
    }

  }

  get id()
  {
    return this.createAssessmentForm.get('id');
  }

  get name()
  {
    return this.createAssessmentForm.get('name');
  }

  get short()
  {
    return this.createAssessmentForm.get('short');
  }

  get description()
  {
    return this.createAssessmentForm.get('description');
  }

  get start_date()
  {
    return this.createAssessmentForm.get('start_date');
  }
  get end_date()
  {
    return this.createAssessmentForm.get('end_date');
  }

  get start_time()
{
  return this.createAssessmentForm.get('start_time');
}

  get end_time()
  {
    return this.createAssessmentForm.get('end_time');
  }

  get full_marks()
  {
    return this.createAssessmentForm.get('full_marks');
  }
  get class()
  {
    return this.createAssessmentForm.get('class');
  }

  get subject()
  {
    return this.createAssessmentForm.get('subject');
  }

  get chapter()
  {
    return this.createAssessmentForm.get('chapter');
  }

  get question()
  {
    return this.createAssessmentForm.get('question');
  }

  get answer()
  {
    return this.createAssessmentForm.get('answer');
  }
  submitDisabled()
  {
    if(this.createAssessmentForm.status == "VALID")
    {
      return false;
    }
    else
    {
      return true;
    }
  }



  QuestionFile : any;
  onSelectQuestion(event) {
    this.questionprogress = 0;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.QuestionFile = event.target.files[0]
      reader.onload = (event: any) => {
        this.questionprogress = Math.round(100 * event.loaded / event.total);
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  AnsFile : any;
  onSelectAns(event) {
    this.ansprogress = 0;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.AnsFile = event.target.files[0]
      reader.onload = (event: any) => {
        this.ansprogress = Math.round(100 * event.loaded / event.total);
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  addAss()
  {
    console.log(this.createAssessmentForm.get('start_date'));

  }


  isEndDateInvalid() : Boolean
  {
    if(new Date(this.start_date.value).getTime() < new Date(this.end_date.value).getTime() 
    && this.end_date.value != '')
    {
      return true;
    }
    
    return false;
  }

   

}
