import { Component, OnInit, ViewChild, OnChanges, Input, DoCheck } from '@angular/core';
import {Board} from '../../../models/Board';
import { Validators, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { BoardService } from '../../../service/board.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers : [BoardService]
  
})
export class BoardComponent implements OnInit, OnChanges,DoCheck {

  boardList : Board[];
  error;
  message;
  displayedColumns: string[] = ['select','board_id', 'board_name', 'action'];
  boardidcontrol = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z0-9]*$')]);
  boardnamecontrol = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z_ \t\r\s]*$')]);
  editboardnamecontrol = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z_ \t\r\s]*$')]);
  @Input()
  addBoardhidden = true;

  editBoardhidden = true;

  editDisable = false;
 
  sortedBoardList : Board[];

  selectedBoard : Board;
  

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  dataSource: MatTableDataSource<Board>;
  
  constructor(private boardservice : BoardService,private _snackbar : MatSnackBar) { 
    this.boardList = [];
    this.error = null;
    this.message = null;
  }

  ngOnInit(): void {

    this.getBoards();
    this.selectedBoard = {
      board_id : "",
      board_name : "",
      active : true
    };
    
  }
  
  ngOnChanges() : void
  {
    
  }
  
  ngDoCheck():void{
   
  }

  @Input()
  selection = new SelectionModel<Board>(true, []);

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
  checkboxLabel(row?: Board): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.board_id + 1}`;
  }

  
  submitDisabled()
  {
    if(this.boardidcontrol.hasError('required') || this.boardnamecontrol.hasError('required')
    || this.boardidcontrol.hasError('pattern') || this.boardnamecontrol.hasError('pattern'))
    {
      return true;
    }
    return false;
  }

  updateDisabled()
  {
    if(this.editboardnamecontrol.hasError('required') || this.editboardnamecontrol.hasError('pattern'))
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
  showAddBoardForm()
  {
    this.editBoardhidden = true;
    this.editDisable = false;
    this.addBoardhidden = false;
  }

  closeAddBoardForm()
  {
    var res = confirm("All data will be discarded! Are you sure you want to exit?")
    if(res)
    {
      this.addBoardhidden = true;
    }
  }

  showEditBoardForm(board)
  {
    this.addBoardhidden = true;
    this.editDisable = true;
    this.selectedBoard = board;
    this.editBoardhidden = false;
  }

  closeEditBoardForm()
  {
    var res = confirm("All data will be discarded! Are you sure you want to exit?")
    if(res)
    {
      this.getBoards();
      this.editBoardhidden = true;
      this.editDisable = false;
    }
  }

  

  getBoardIdErrorMessage() {
    if (this.boardidcontrol.hasError('required')) {
      return 'You must enter a value';
    }

    return this.boardidcontrol.hasError('pattern') ? 'Not a valid or board id. Board Id can be alphanumeric and should start with an alphabet. No special characters and space allowed' : '';
  }

  getBoardNameErrorMessage() {
    if (this.boardnamecontrol.hasError('required')) {
      return 'You must enter a value';
    }

    return this.boardnamecontrol.hasError('pattern') ? 'Not a valid or board name. Board name can be alphanumeric and should start with an alphabet. No special characters allowed' : '';
  }

  getEditBoardNameErrorMessage() {
    if (this.editboardnamecontrol.hasError('required')) {
      return 'You must enter a value';
    }

    return this.editboardnamecontrol.hasError('pattern') ? 'Not a valid or board name. Board name can be alphanumeric and should start with an alphabet. No special characters allowed' : '';
  }

  getBoards()
  {
      this.boardservice.getBoards().subscribe(
        data=>{
          if(!(JSON.parse(JSON.stringify(data))['err']))
          {
            
            this.boardList = data as Board[];
            if(this.boardList.length == 0)
            {
              this._snackbar.open('No Record Found!',null,{duration : 5000});
            }
            this.dataSource = new MatTableDataSource<Board>(this.boardList);
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
            this.error = "Error in loading boards from edurex database.";
            
        }
      )

  }

  addBoard()
  {
      let newBoard : Board = 
      {
        board_id : this.boardidcontrol.value,
        board_name : this.boardnamecontrol.value,
        active : true
      }
      
      
      this.boardservice.addBoard(newBoard).subscribe(
        data=>
        {
          if(!(JSON.parse(JSON.stringify(data))['err']))
          {
            this.error = null;
            this.message = JSON.parse(JSON.stringify(data))['msg'];
            this.getBoards();
            this.addBoardhidden = true;
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
          this.error = "Error in adding board to Edurex Database. Please try after few minutes."
        }
      )

  }

  editBoard()
  {
    let updateBoard : Board = {
      _id : this.selectedBoard._id,
      board_id : this.selectedBoard.board_id,
      board_name : this.selectedBoard.board_name,
      active : true,
    }
    console.log(updateBoard)
    this.boardservice.editBoard(updateBoard).subscribe(
      data=>
      {
        if(!(JSON.parse(JSON.stringify(data))['err']))
        {
          this.error = null;
          this.message = JSON.parse(JSON.stringify(data))['msg'];
          this.getBoards();
          this.editBoardhidden = true;
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

  deleteBoard(id : string ,board_id : string ,board_name : string)
  {
    let checkedBoard : Board =
      {
        _id : id,
        board_id : board_id,
        board_name : board_name,
        active : false
      }
    var result = confirm("Are you sure you want to delete this board ?");
    if(result)
  {
    this.boardservice.deleteBoard(checkedBoard).subscribe
    (
      data=>{
      if(!(JSON.parse(JSON.stringify(data))['err']))
          {
            this.error = null;
            this.message = JSON.parse(JSON.stringify(data))['msg'];
            this.getBoards();
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

  deleteBoards()
  {
    var res = confirm("Are you sure you want to delte the selected boards?");
    if(res){
      this.boardservice.deleteBoards(this.selection.selected).subscribe(
        data=>
        {
          if(!(JSON.parse(JSON.stringify(data))['err']))
          {
            this.error = null;
            this.message = JSON.parse(JSON.stringify(data))['msg'];
            this.getBoards();
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
          this.error = " Error in deleting " + this.selection.selected.length + 'boards';
        }
      )
  }
}

}

