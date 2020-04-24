import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Session } from '../../../models/Session';
import { FormControl, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SessionService } from '../../../service/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute } from '@angular/router';
import { BindingFlags } from '@angular/compiler/src/core';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  sessionList : Session[];
  error;
  message;
  flag : boolean;
  displayedColumns: string[] = ['select','session_id', 'session_name', 'action','current'];
  sessionidcontrol = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z0-9]*$')]);
  sessionnamecontrol = new FormControl('', [Validators.required, Validators.pattern('^[0-9]{4}-[0-9]{4}$')]);
  editsessionnamecontrol = new FormControl('', [Validators.required, Validators.pattern('^[0-9]{4}-[0-9]{4}$')]);
  @Input()
  addSessionhidden = true;

  editSessionhidden = true;

  editDisable = false;
 
  sortedSessionList : Session[];

  selectedSession : Session=
  {
    session_id : "",
    session_name : "",
    active : true,
    current : false,
  };

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  dataSource: MatTableDataSource<Session>;
  
  constructor(private sessionService : SessionService, private _snackBar : MatSnackBar,private route : ActivatedRoute) { 
    this.sessionList = [];
    this.error = null;
    this.message = null;
  }

  ngOnInit(): void {

    this.getSessions();
   
    
  }
  
  ngOnChanges() : void
  {
    
  }
  
  ngDoCheck():void{
   
  }

  @Input()
  selection = new SelectionModel<Session>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Session): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.session_id + 1}`;
  }

  

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dismissErrorAlert()
  {
    this.error = null;
  }

  dismissMessageAlert()
  {
    this.message = null;
  }
  showAddSessionForm()
  {
    this.editSessionhidden = true;
    this.editDisable = false;
    this.addSessionhidden = false;
  }

  closeAddSessionForm()
  {
    var res = confirm("All data will be discarded! Are you sure you want to exit?")
    if(res)
    {
      this.addSessionhidden = true;
    }
  }

  showEditSessionForm(session)
  {
    this.addSessionhidden = true;
    this.editDisable = true;
    this.selectedSession = session;
    this.editSessionhidden = false;
  }

  closeEditSessionForm()
  {
    var res = confirm("All data will be discarded! Are you sure you want to exit?")
    if(res)
    {
      this.getSessions();
      this.editSessionhidden = true;
      this.editDisable = false;
    }
  }

  
  submitDisabled()
  {
    if(this.sessionidcontrol.hasError('required') || this.sessionnamecontrol.hasError('required')
    || this.sessionidcontrol.hasError('pattern') || this.sessionnamecontrol.hasError('pattern'))
    {
      return true;
    }
    return false;
  }

  updateDisabled()
  {
    if(this.editsessionnamecontrol.hasError('required') || this.editsessionnamecontrol.hasError('pattern'))
    {
      return true;
    }
    return false;
  }



  getSessionIdErrorMessage() {
    if (this.sessionidcontrol.hasError('required')) {
      return 'You must enter a value';
    }

    return this.sessionidcontrol.hasError('pattern') ? 'Not a valid or session id. Session Id can be alphanumeric and should start with an alphabet. No special characters and spaciallowed' : '';
  }

  getSessionNameErrorMessage() {
    if (this.sessionnamecontrol.hasError('required')) {
      return 'You must enter a value';
    }

    return this.sessionnamecontrol.hasError('pattern') ? 'Not a valid or session name. Session name can be alphanumeric and should start with an alphabet. No special characters allowed' : '';
  }

  getEditSessionNameErrorMessage() {
    if (this.editsessionnamecontrol.hasError('required')) {
      return 'You must enter a value';
    }

    return this.editsessionnamecontrol.hasError('pattern') ? 'Not a valid or session name. Session name can be alphanumeric and should start with an alphabet. No special characters allowed' : '';
  }

  getSessions()
  {
      this.sessionService.getSessions().subscribe(
        data=>{
          if(!(JSON.parse(JSON.stringify(data))['err']))
          {
            this.sessionList = data as Session[];
            this.flag = false;
            if(this.sessionList.length == 0)
            {
              this._snackBar.open('No Record Found!',null,{duration : 5000});
              this.flag = true;
            }
            this.dataSource = new MatTableDataSource<Session>(this.sessionList);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;            
          }
          else
          {
            this.message = null;
            this.error =  JSON.parse(JSON.stringify(data))['err'];
            
          }
        },
        err => {
            this.message = null;
            this.error = "Error in loading sessions from edurex database.";
            
        }
      )

  }

  addSession()
  {
      let newSession : Session = 
      {
        session_id : this.sessionidcontrol.value,
        session_name : this.sessionnamecontrol.value,
        active : true,
        current : this.flag,
      }
      
      
      this.sessionService.addSession(newSession).subscribe(
        data=>
        {
          if(!(JSON.parse(JSON.stringify(data))['err']))
          {
            this.error = null;
            this.message = JSON.parse(JSON.stringify(data))['msg'];
            this.getSessions();
            this.addSessionhidden = true;
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
          this.error = "Error in adding session to Edurex Database. Please try after few minutes."
        }
      )

  }

  editSession()
  {
    let updateSession : Session = {
      _id : this.selectedSession._id,
      session_id : this.selectedSession.session_id,
      session_name : this.selectedSession.session_name,
      active : true,
      current : this.selectedSession.current
    }
    this.sessionService.editSession(updateSession).subscribe(
      data=>
      {
        if(!(JSON.parse(JSON.stringify(data))['err']))
        {
          this.error = null;
          this.message = JSON.parse(JSON.stringify(data))['msg'];
          this.getSessions();
          this.editSessionhidden = true;
          this.editDisable = false;
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
        this.error = "Error in updation session to Edurex Database. Please try after few minutes."
      }
    )

    
  }

  deleteSession(id : string ,session_id : string ,session_name : string)
  {
    let checkedSession : Session =
      {
        _id : id,
        session_id : session_id,
        session_name : session_name,
        active : false,
        current : false
      }
    var result = confirm("Are you sure you want to delete this session ?");
    if(result)
  {
    this.sessionService.deleteSession(checkedSession).subscribe
    (
      data=>{
      if(!(JSON.parse(JSON.stringify(data))['err']))
          {
            this.error = null;
            this.message = JSON.parse(JSON.stringify(data))['msg'];
            this.getSessions();
          }
          else
          {
            this.message = null;
            this.error =  JSON.parse(JSON.stringify(data))['err'];
          }
        }
    );
      }
  }

  deleteSessions()
  {
    var res = confirm("Are you sure you want to delte the selected subjects?");
    if(res){
      this.sessionService.deleteSessions(this.selection.selected).subscribe(
        data=>
        {
          if(!(JSON.parse(JSON.stringify(data))['err']))
          {
            this.error = null;
            this.message = JSON.parse(JSON.stringify(data))['msg'];
            this.getSessions();
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
          this.error = " Error in deleting " + this.selection.selected.length + 'subjects';
        }
      )
  }
  
  }

  setCurrentSession(id)
  {
    this.sessionService.setCurrentSession(id).subscribe(
      data=>{
        this.sessionService.getSessions();
        window.location.reload();
      },
      err=>
      {
        this._snackBar.open("Error! Error in setting current session",null,{duration : 5000});
      }
    )
  }

}
