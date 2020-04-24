import { Component, OnInit } from '@angular/core';
import { Group } from './models/Group';
import { Class } from './models/Class';
import { Subject } from './components/admin/subject-group/new/new.component';
import { GroupService } from './service/group.service';
import { ClassService } from './service/class.service';
import { SubjectService } from './service/subject.service';
import { BreadcrumbService } from 'ng-breadcrumb';
import { Event,Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  
})
export class AdminComponent implements OnInit {
 
  showLoadingIndicator = true;
  constructor(private breadcrumbService : BreadcrumbService , private router : Router) {
    

    this.router.events.subscribe(
      (routerEvent : Event) => 
      {
        if(routerEvent instanceof NavigationStart)
        {
          this.showLoadingIndicator = true;
        }

        if(routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationError ||
          routerEvent instanceof NavigationCancel  )
        {
          this.showLoadingIndicator = false;
        }
      }
      );

  }
   
   

  ngOnInit(): void {
    
  }

  
  
}
