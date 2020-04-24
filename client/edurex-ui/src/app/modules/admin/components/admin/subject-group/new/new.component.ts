import { Component, OnInit, PipeTransform, Pipe, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SubjectService } from 'src/app/modules/admin/service/subject.service';
import { ClassService } from 'src/app/modules/admin/service/class.service';
import { Class } from 'src/app/modules/admin/models/Class';
import { Group } from 'src/app/modules/admin/models/Group';
import { GroupService } from 'src/app/modules/admin/service/group.service';



export interface Subject{

      subject_id : String,
      classes_id : String[]
}


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  public subjectList : Subject[] = []  
  @Input()
  public subjects : any;
  @Input()
  public classes : any;
  public message
  public error
  classSelection = [];
  subjectSelection = [];
  groupIdControl = new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z][a-zA-Z0-9]*$')]);
  groupNameControl = new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z][a-zA-Z0-9_ \t\r\s]*$')]);
  addSubVisible = true;
  @Input()
  visible = false;

  constructor(private subjectService : SubjectService, private classService : ClassService, private groupService : GroupService) {
    this.message = null,
    this.error = null
   }

  ngOnInit(): void {

    this.getSubjects();
    this.getClasses();
    this.visible = false;
  }


  dismissErrorAlert()
  {
    this.error = null;
  }

  dismissMessageAlert()
  {
    this.message = null;
  }

  submitDisabled()
  {
        if(this.groupIdControl.hasError('required') || this.groupIdControl.hasError('pattern')
        || this.groupNameControl.hasError('required') || this.groupNameControl.hasError('pattern')
        || this.classSelection[this.subjectList.length-1].hasError('required') || this.subjectSelection[this.subjectList.length-1].hasError('required'))
        {
         return true;
        }
      return false;
  }

  
  doVisible() : Boolean
  {
      if(this.subjectList.length == 0)
      {
        return true;
      }
      return false;
  }

  doVisibleAddMore(i : number) : Boolean
  {
     if(this.subjectSelection[i].value == '' || this.classSelection[i].value == '')
     {
       return false;
     }
     return true;
  }

  

  getGroupIdErrorMessage() {
    if (this.groupIdControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.groupIdControl.hasError('pattern') ? 'Not a valid or group id. Group Id can be alphanumeric and should start with an alphabet. No special characters and space allowed' : '';
  }

  getGroupNameErrorMessage() {
    if (this.groupNameControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.groupNameControl.hasError('pattern') ? 'Not a valid or group id. Group Id can be alphanumeric and should start with an alphabet. No special characters allowed' : '';
  }

  getSubjectErrorMessage(i) {
    if (this.subjectSelection[i].hasError('required')) {
      return 'You must enter a value';
    }

  }

  getClassErrorMessage(i) {
    if (this.classSelection[i].hasError('required')) {
      return 'You must enter a value';
    }

  }

  addSubject()
  {
    this.subjectList.push(
      {
        subject_id : "",
        classes_id : []
      }
    );
    this.classSelection.push(
      new FormControl('',Validators.required)
    );

    this.subjectSelection.push(
      new FormControl('',Validators.required)
    )
  }

  removeSubject(i)
  {
    this.subjectList.splice(i,1)
    this.subjectSelection.splice(i,1)
    this.classSelection.splice(i,1)
  }

  

  getSubjects()
  {
      this.subjectService.getSubjects().subscribe(
        data=>{
          if(!(JSON.parse(JSON.stringify(data))['err']))
          {
            this.subjects = data ;       
          }
          else
          {
            this.message = null;
            this.error =  JSON.parse(JSON.stringify(data))['err'];
            
          }
        },
        err => {
            this.message = null;
            this.error = "Error in loading subjects from edurex database.";
            
        }
      )

  }

  getClasses()
  {
      this.classService.getClassess().subscribe(
        data=>{
          if(!(JSON.parse(JSON.stringify(data))['err']))
          {
            this.classes = data ;
           
          }
          else
          {
            this.message = null;
            this.error =  JSON.parse(JSON.stringify(data))['err'];
            
          }
        },
        err => {
            this.message = null;
            this.error = "Error in adding group to edurex database. Please try after some time.";
            
        }
      )

  }

  saveGroup()
  {
    let newsub =[];
    let class_id =[];

    for(let classControl of this.classSelection)
    {
      let data : Class[]= classControl.value;
      class_id.push(data);
    }

    let index = 0;
    this.subjectSelection.forEach(
      res =>
      {
          let sub_id :String = res.value;
          
          newsub.push(
            {
              subject_id : sub_id,
              classes_id : class_id[index++]
            }
          )
         
      }
    )
    

    let newGroup : Group = {
      group_id : this.groupIdControl.value,
      group_name : this.groupNameControl.value,
      active : true,
      subject : newsub,

    }
    
    this.groupService.addGroup(newGroup).subscribe(
      data=>{
        if(!(JSON.parse(JSON.stringify(data))['err']))
        {
          this.error = null;
          this.message = JSON.parse(JSON.stringify(data))['msg'];
          this.visible = true;
        }
        else
        {
          this.message = null;
          this.error =  JSON.parse(JSON.stringify(data))['err'];
          
        }
      },
      err => {
          this.message = null;
          this.error = "Error in loading classes from edurex database.";
          
      }
    )
  }


}
