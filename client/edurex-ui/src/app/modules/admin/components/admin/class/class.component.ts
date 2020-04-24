import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ClassService } from '../../../service/class.service';
import { Class } from '../../../models/Class';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
  providers : [ClassService]
})
export class ClassComponent implements OnInit {

  classList : Class[];
  error;
  message;
  displayedColumns: string[] = ['select','class_id', 'class_name', 'action'];
  classidcontrol = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z0-9]*$')]);
  classnamecontrol = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z_ \t\r\s]*$')]);
  editclassnamecontrol = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z_ \t\r\s]*$')]);
  @Input()
  addClasshidden = true;

  editClasshidden = true;

  editDisable = false;
 
  sortedClassList : Class[];

  selectedClass : Class=
  {
    class_id : "",
    class_name : "",
    active : true
  };

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  dataSource: MatTableDataSource<Class>;
  
  constructor(private classservice : ClassService, private _snackBar : MatSnackBar) { 
    this.classList = [];
    this.error = null;
    this.message = null;
  }

  ngOnInit(): void {

    this.getClasses();
   
  }

  

  

  ngOnChanges():void{
    this.getClasses();
  }


  @Input()
  selection = new SelectionModel<Class>(true, []);

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
  checkboxLabel(row?: Class): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.class_id + 1}`;
  }

  submitDisabled()
  {
    if(this.classidcontrol.hasError('required') || this.classnamecontrol.hasError('required')
    || this.classidcontrol.hasError('pattern') || this.classnamecontrol.hasError('pattern'))
    {
      return true;
    }
    return false;
  }

  updateDisabled()
  {
    if(this.editclassnamecontrol.hasError('required') || this.editclassnamecontrol.hasError('pattern'))
    {
      return true;
    }
    return false;
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
  showAddClassForm()
  {
    this.editClasshidden = true;
    this.editDisable = false;
    this.addClasshidden = false;
  }

  closeAddClassForm()
  {
    var res = confirm("All data will be discarded! Are you sure you want to exit?")
    if(res)
    {
      this.addClasshidden = true;
    }
  }

  showEditClassForm(board)
  {
    this.addClasshidden = true;
    this.editDisable = true;
    this.selectedClass = board;
    this.editClasshidden = false;
  }

  closeEditClassForm()
  {
    var res = confirm("All data will be discarded! Are you sure you want to exit?")
    if(res)
    {
      this.getClasses();
      this.editClasshidden = true;
      this.editDisable = false;
    }
  }

  

  getClassIdErrorMessage() {
    if (this.classidcontrol.hasError('required')) {
      return 'You must enter a value';
    }

    return this.classidcontrol.hasError('pattern') ? 'Not a valid or board id. Board Id can be alphanumeric and should start with an alphabet. No special characters and spaciallowed' : '';
  }

  getClassNameErrorMessage() {
    if (this.classnamecontrol.hasError('required')) {
      return 'You must enter a value';
    }

    return this.classnamecontrol.hasError('pattern') ? 'Not a valid or board name. Board name can be alphanumeric and should start with an alphabet. No special characters allowed' : '';
  }

  getEditClassNameErrorMessage() {
    if (this.editclassnamecontrol.hasError('required')) {
      return 'You must enter a value';
    }

    return this.editclassnamecontrol.hasError('pattern') ? 'Not a valid or board name. Board name can be alphanumeric and should start with an alphabet. No special characters allowed' : '';
  }

  getClasses()
  {
      this.classservice.getClassess().subscribe(
        data=>{
          if(!(JSON.parse(JSON.stringify(data))['err']))
          {
            this.classList = data as Class[];
            if(this.classList.length == 0)
            {
              this._snackBar.open('No Record Found!',null,{duration : 5000});
            }
            this.dataSource = new MatTableDataSource<Class>(this.classList);
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
            this.error = "Error in loading classes from edurex database.";
            
        }
      )

  }

  addClass()
  {
      let newClass : Class = 
      {
        class_id : this.classidcontrol.value,
        class_name : this.classnamecontrol.value,
        active : true
      }
      
      
      this.classservice.addClass(newClass).subscribe(
        data=>
        {
          if(!(JSON.parse(JSON.stringify(data))['err']))
          {
            this.error = null;
            this.message = JSON.parse(JSON.stringify(data))['msg'];
            this.getClasses();
            this.addClasshidden = true;
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
          this.error = "Error in adding class to Edurex Database. Please try after few minutes."
        }
      )

  }

  editClass()
  {
    let updateClass : Class = {
      _id : this.selectedClass._id,
      class_id : this.selectedClass.class_id,
      class_name : this.selectedClass.class_name,
      active : true,
    }

    this.classservice.editBoard(updateClass).subscribe(
      data=>
      {
        if(!(JSON.parse(JSON.stringify(data))['err']))
        {
          this.error = null;
          this.message = JSON.parse(JSON.stringify(data))['msg'];
          this.getClasses();
          this.editClasshidden = true;
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
        this.error = "Error in editing board to Edurex Database. Please try after few minutes."
      }
    )

    
  }

  deleteClass(id : string ,class_id : string ,class_name : string)
  {
    let checkedClass : Class =
      {
        _id : id,
        class_id : class_id,
        class_name : class_name,
        active : false
      }
    var result = confirm("Are you sure you want to delete this class ?");
    if(result)
  {
    this.classservice.deleteClass(checkedClass).subscribe
    (
      data=>{
      if(!(JSON.parse(JSON.stringify(data))['err']))
          {
            this.error = null;
            this.message = JSON.parse(JSON.stringify(data))['msg'];
            this.getClasses();
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

  deleteClasses()
  {
    var res = confirm("Are you sure you want to delte the selected classes?");
    if(res){
      this.classservice.deleteClasses(this.selection.selected).subscribe(
        data=>
        {
          if(!(JSON.parse(JSON.stringify(data))['err']))
          {
            this.error = null;
            this.message = JSON.parse(JSON.stringify(data))['msg'];
            this.getClasses();
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
          this.error = " Error in deleting " + this.selection.selected.length + 'classes';
        }
      )
  }
}
}
