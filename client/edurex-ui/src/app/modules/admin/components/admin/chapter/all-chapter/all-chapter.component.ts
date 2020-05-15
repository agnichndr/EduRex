import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/modules/admin/models/Class';
import { Subject } from 'src/app/modules/admin/models/Subject';
import { ClassService } from 'src/app/modules/admin/service/class.service';
import { SubjectService } from 'src/app/modules/admin/service/subject.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Chapter } from 'src/app/modules/admin/models/Chapter';
import { ChapterService } from 'src/app/modules/admin/service/chapter.service';
@Component({
  selector: 'app-all-chapter',
  templateUrl: './all-chapter.component.html',
  styleUrls: ['./all-chapter.component.css']
})
export class AllChapterComponent implements OnInit {

  classList : Class[];
  subjectList : Subject[];
  chapters : Chapter[] = [];
  classFormControl = new FormControl('',Validators.required);
  subjectFormControl = new FormControl('',Validators.required);
  
  filteredClassList: Class[];
  filteredSubjectList : Subject[];
  header_color = ["#bbf2c9","#f4b5f5","#b6e4f0","#f08873","#f0e54f","#79912a","#4a6a87","#ab653f"];
  constructor(private classService : ClassService, private subjectService : SubjectService,
    private _snackBar : MatSnackBar, private chapterService : ChapterService) 
  {
    
  }

  ngOnInit(): void {
     this.classService.getClassess().subscribe(
      data => {
        this.classList = data as Class[]
      } , 
      err => {
        this._snackBar.open("Class not loaded!",null,{duration : 5000})
      }
    )

    this.subjectService.getSubjects().subscribe(
      data => {
          this.subjectList = data as Subject[];
      },
      err => {
        this._snackBar.open("Subject not loaded!",null,{duration : 5000})
      }
    )

    }

  loadChapter()
  {
    this.chapterService.getChapters(this.subjectFormControl.value,this.classFormControl.value).subscribe(
      data=>
      {
        this.chapters = data as Chapter[];
        if(this.chapters.length == 0)
        {
          this._snackBar.open("No Chapter found!",null,{duration:5000});
        }

      },
      err=>
      {
          this._snackBar.open("Error in Loading Chapters",null,{duration:5000});
      }
    )
  }

  deleteChapter(id : String)
  {
    var res= confirm("Are you sure you want to delete this chapter");
    if(res)
    {
    this.chapterService.deleteChapter(id).subscribe(
      data=>{
        if(!JSON.parse(JSON.stringify(data))['err'])
        {
          this._snackBar.open(JSON.parse(JSON.stringify(data))['msg'],null,{duration:5000});
          this.loadChapter();
        }
        else{
          this._snackBar.open(JSON.parse(JSON.stringify(data))['err'],null,{duration:5000});
        }
      },
      err=>{
        this._snackBar.open("Server Error !  Error in deleting the chapter",null,{duration:5000});
      }
    )
    }
  }

  class_filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredClassList = this.classList.filter(value => value.class_name.toLowerCase().includes(filterValue.toLowerCase()))
  }

  subject_filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredSubjectList = this.subjectList.filter(value => value.subject_name.toLowerCase().includes(filterValue.toLowerCase()))
  }
  

}
