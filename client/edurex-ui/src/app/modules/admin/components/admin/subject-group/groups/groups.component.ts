import { Component, OnInit,Input } from '@angular/core';
import { Group } from 'src/app/modules/admin/models/Group';
import { GroupService } from 'src/app/modules/admin/service/group.service';
import { SubjectService } from 'src/app/modules/admin/service/subject.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit{

  @Input()
  groupList : Group[] = [];
  
  message : String ;
  error : String;
  config : MatSnackBarConfig<any> ;
  header_color = ["#bbf2c9","#f4b5f5","#b6e4f0","#f08873","#f0e54f","#79912a","#4a6a87","#ab653f"]
  constructor(private groupService : GroupService, private subjectService : SubjectService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.message = null;
    this.error = null;
    this.getGroups();
    this.config.duration = 5000;
  }

  
  dismissErrorAlert()
  {
    this.error = null;
  }

  dismissMessageAlert()
  {
    this.message = null;
  }

  // getSubjectById(id : string) : String
  // {
  //     let val : String
  //     this.subjectService.getSubject(id).subscribe(
  //       data=>{
  //         val = data as String;
  //       },
  //       err =>
  //       {
  //         val = err.err;
  //       }

  //     )
  //     return val;
  // }

  

  getGroups()
  {
    this.groupService.getGroups().subscribe(
      data=>{
        if(!(JSON.parse(JSON.stringify(data))['err']))
        {
          this.groupList = data as Group[];
          if(this.groupList.length == 0)
          {
            this._snackBar.open('No Record Found!',null,{duration : 5000});
          }
               
        }
        else
        {
          this.message = null;
          this.error =  JSON.parse(JSON.stringify(data))['err'];
          
        }
      },
      err => {
          this.message = null;
          this.error = "Error in loading groups from edurex database.";
          
      }
    )
  }

  deleteGroup(id,group)
  {
    var res = confirm("Are you sure you want to delete this item ?")
    if(res)
    {
    this.groupService.deleteGroup(id,group).subscribe(

      data=>{
        if(!(JSON.parse(JSON.stringify(data))['err']))
        {
          this.error = null;
          this.getGroups();
          this.message = (JSON.parse(JSON.stringify(data))['msg']);
          this._snackBar.open(this.message.toString(),null,{duration : 5000})
          
               
        }
        else
        {
          this.message = null;
          this.error =  JSON.parse(JSON.stringify(data))['err'];
          this._snackBar.open(this.error.toString(),null,this.config)
        }
      },
      err => {
          this.message = null;
          this.error = "Error in deleting groups from edurex database. Please try after few minutes"+err;
          this._snackBar.open(this.error.toString(),null,this.config)
      }
    )
  }
}

}
