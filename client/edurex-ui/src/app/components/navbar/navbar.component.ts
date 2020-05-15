import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavbarService } from './navbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers :[NgbModalConfig,NgbModal],
})
export class NavbarComponent implements OnInit {
  
  themeList :String[] = ["indigo-pink","pink-bluegrey","teal-cyan","yellow-brown","deeppurple-amber"]
  constructor(config: NgbModalConfig, private modalService: NgbModal,private formBuilder : FormBuilder,
    private navbarService : NavbarService, private _snackbar : MatSnackBar) {
    config.backdrop = 'static';
    config.keyboard = false;

   }

   counterList;
  ngOnInit(): void {

    this.getCounterList();
   
    
  }
  counterForm = this.formBuilder.group( { 
  assessment :[Validators.required],
    board : [Validators.required],
    class : [Validators.required],
    course :[Validators.required],
    library : ['',Validators.required],
    parent :[Validators.required],
    session : [Validators.required],
    subject : [Validators.required],
    chapter : [Validators.required],
    subject_group : [Validators.required],
    video: [Validators.required],
    test : [Validators.required],
    teacher : [Validators.required],})


    get assessment()
    {
      return this.counterForm.get('assessment');
    } 

    get board()
    {
      return this.counterForm.get('board');
    }


    get class()
    {
      return this.counterForm.get('class');
    }
    
    get course()
    {
      return this.counterForm.get('course');
    }

    get library()
    {
      return this.counterForm.get('library');
    }
    
    get parent()
    {
      return this.counterForm.get('parent');
    }
  
    get session()
    {
      return this.counterForm.get('session');
    }


    get subject()
    {
      return this.counterForm.get('subject');
    }
    
    get chapter()
    {
      return this.counterForm.get('chapter');
    } 
    
    get subject_group()
    {
        return this.counterForm.get('subject_group');
    }
    
    get video()
    {
      return this.counterForm.get('video');
    }
   

    get test()
    {
      return this.counterForm.get('test');
    } 

    get teacher()
    {
      return this.counterForm.get('teacher');
    }
    

  

  @Output("toggleDarkness")
  toggleDarkness : EventEmitter<any> = new EventEmitter();

  @Output("setTheme")
  setTheme : EventEmitter<String> = new EventEmitter<String>();

  changeTheme(theme : String)
  {
    this.setTheme.next(theme);
  }


  toggleDarkMode()
  {
      this.toggleDarkness.emit();
  }

  open(content)
  {
    this.modalService.open(content,{size : 'lg',centered : true})
  }
  
  getCounterList()
  {
    this.navbarService.getCounterList().subscribe(
      data=>{
      this.counterList = data;
      this.counterForm.patchValue({library : this.counterList[0].library},
        {emitEvent : true});
      },
      err=>{
        this._snackbar.open("Error in loading counter", null, {duration : 5000});
      }
    )
  }

}
