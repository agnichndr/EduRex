import { Component, OnInit, OnChanges, DoCheck, Input, ViewChild } from '@angular/core';
import {Subject} from '../../../models/Subject';
import { FormControl, Validators,NgForm } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { SubjectService } from '../../../service/subject.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit,OnChanges, DoCheck {
  subjectList : Subject[];
  error;
  message;
  displayedColumns: string[] = ['select','subject_id', 'subject_name', 'action'];
  subjectidcontrol = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z0-9]*$')]);
  subjectnamecontrol = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z_ \t\r\s]*$')]);
  editsubjectnamecontrol = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z_ \t\r\s]*$')]);
  @Input()
  addSubjecthidden = true;

  editSubjecthidden = true;

  editDisable = false;
 
  sortedSubjectList : Subject[];

  selectedSubject : Subject=
  {
    subject_id : "",
    subject_name : "",
    active : true
  };

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  dataSource: MatTableDataSource<Subject>;
  
  constructor(private subjectservice : SubjectService, private _snackBar : MatSnackBar) { 
    this.subjectList = [];
    this.error = null;
    this.message = null;
  }

  ngOnInit(): void {

    this.getSubjects();
    
  }
  
  ngOnChanges() : void
  {
    
  }
  
  ngDoCheck():void{
   
  }

  @Input()
  selection = new SelectionModel<Subject>(true, []);

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
  checkboxLabel(row?: Subject): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.subject_id + 1}`;
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
  showAddSubjectForm()
  {
    this.editSubjecthidden = true;
    this.editDisable = false;
    this.addSubjecthidden = false;
  }

  closeAddSubjectForm()
  {
    var res = confirm("All data will be discarded! Are you sure you want to exit?")
    if(res)
    {
      this.addSubjecthidden = true;
    }
  }

  showEditSubjectForm(subject)
  {
    this.addSubjecthidden = true;
    this.editDisable = true;
    this.selectedSubject = subject;
    this.editSubjecthidden = false;
  }

  closeEditSubjectForm()
  {
    var res = confirm("All data will be discarded! Are you sure you want to exit?")
    if(res)
    {
      this.getSubjects();
      this.editSubjecthidden = true;
      this.editDisable = false;
    }
  }

  
  submitDisabled()
  {
    if(this.subjectidcontrol.hasError('required') || this.subjectnamecontrol.hasError('required')
    || this.subjectidcontrol.hasError('pattern') || this.subjectnamecontrol.hasError('pattern'))
    {
      return true;
    }
    return false;
  }

  updateDisabled()
  {
    if(this.editsubjectnamecontrol.hasError('required') || this.editsubjectnamecontrol.hasError('pattern'))
    {
      return true;
    }
    return false;
  }



  getSubjectIdErrorMessage() {
    if (this.subjectidcontrol.hasError('required')) {
      return 'You must enter a value';
    }

    return this.subjectidcontrol.hasError('pattern') ? 'Not a valid or subject id. Subject Id can be alphanumeric and should start with an alphabet. No special characters and spaciallowed' : '';
  }

  getSubjectNameErrorMessage() {
    if (this.subjectnamecontrol.hasError('required')) {
      return 'You must enter a value';
    }

    return this.subjectnamecontrol.hasError('pattern') ? 'Not a valid or subject name. Subject name can be alphanumeric and should start with an alphabet. No special characters allowed' : '';
  }

  getEditSubjectNameErrorMessage() {
    if (this.editsubjectnamecontrol.hasError('required')) {
      return 'You must enter a value';
    }

    return this.editsubjectnamecontrol.hasError('pattern') ? 'Not a valid or subject name. Subject name can be alphanumeric and should start with an alphabet. No special characters allowed' : '';
  }

  getSubjects()
  {
      this.subjectservice.getSubjects().subscribe(
        data=>{
          if(!(JSON.parse(JSON.stringify(data))['err']))
          {
            this.subjectList = data as Subject[];
            if(this.subjectList.length == 0)
            {
              this._snackBar.open('No Record Found!',null,{duration : 5000});
            }
            this.dataSource = new MatTableDataSource<Subject>(this.subjectList);
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
            this.error = "Error in loading subjects from edurex database.";
            
        }
      )

  }

  addSubject()
  {
      let newSubject : Subject = 
      {
        subject_id : this.subjectidcontrol.value,
        subject_name : this.subjectnamecontrol.value,
        active : true
      }
      
      
      this.subjectservice.addSubject(newSubject).subscribe(
        data=>
        {
          if(!(JSON.parse(JSON.stringify(data))['err']))
          {
            this.error = null;
            this.message = JSON.parse(JSON.stringify(data))['msg'];
            this.getSubjects();
            this.addSubjecthidden = true;
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
          this.error = "Error in adding subject to Edurex Database. Please try after few minutes."
        }
      )

  }

  editSubject()
  {
    let updateSubject : Subject = {
      _id : this.selectedSubject._id,
      subject_id : this.selectedSubject.subject_id,
      subject_name : this.selectedSubject.subject_name,
      active : true,
    }
    this.subjectservice.editSubject(updateSubject).subscribe(
      data=>
      {
        if(!(JSON.parse(JSON.stringify(data))['err']))
        {
          this.error = null;
          this.message = JSON.parse(JSON.stringify(data))['msg'];
          this.getSubjects();
          this.editSubjecthidden = true;
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
        this.error = "Error in editing board to Subject Database. Please try after few minutes."
      }
    )

    
  }

  deleteSubject(id : string ,subject_id : string ,subject_name : string)
  {
    let checkedSubject : Subject =
      {
        _id : id,
        subject_id : subject_id,
        subject_name : subject_name,
        active : false
      }
    var result = confirm("Are you sure you want to delete this subject ?");
    if(result)
  {
    this.subjectservice.deleteSubject(checkedSubject).subscribe
    (
      data=>{
      if(!(JSON.parse(JSON.stringify(data))['err']))
          {
            this.error = null;
            this.message = JSON.parse(JSON.stringify(data))['msg'];
            this.getSubjects();
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

  deleteSubjects()
  {
    var res = confirm("Are you sure you want to delte the selected subjects?");
    if(res){
      this.subjectservice.deleteSubjects(this.selection.selected).subscribe(
        data=>
        {
          if(!(JSON.parse(JSON.stringify(data))['err']))
          {
            this.error = null;
            this.message = JSON.parse(JSON.stringify(data))['msg'];
            this.getSubjects();
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

}
