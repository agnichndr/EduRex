

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/admin/home/home.component';
import { BoardComponent } from './components/admin/board/board.component';
import { AdminComponent } from './admin.component';
import { ClassComponent } from './components/admin/class/class.component';
import { SubjectComponent } from './components/admin/subject/subject.component';
import { GroupsComponent } from './components/admin/subject-group/groups/groups.component';
import { NewComponent } from './components/admin/subject-group/new/new.component';
import { EditgroupComponent } from './components/admin/subject-group/editgroup/editgroup.component';
import { SessionComponent } from './components/admin/session/session.component';
import { ELibraryComponent } from './components/admin/e-library/e-library.component';
import { NewChapterComponent } from './components/admin/chapter/new-chapter/new-chapter.component';
import { AllChapterComponent } from './components/admin/chapter/all-chapter/all-chapter.component';
import { LibraryComponent } from '../library/library.component';
import { CategoryComponent } from '../library/components/category/category.component';
import { EditChapterComponent } from './components/admin/chapter/edit-chapter/edit-chapter.component';
import { NewAssessmentComponent } from './components/admin/assessment/new-assessment/new-assessment.component';



const routes: Routes = [
  { path: 'admin', component : AdminComponent ,children : [
  {path : '', redirectTo : '/dashboard/', pathMatch : 'full' },
  { path: 'dashboard', component: HomeComponent },
  {path : 'assessment/add',component : NewAssessmentComponent},
  { path : 'boards' ,component : BoardComponent},
  {path : 'class', component : ClassComponent},
  {path : 'subject', component : SubjectComponent},
  {path : 'subject/groups', component : GroupsComponent},
  {path : 'subject/groups/add', component : NewComponent},
  {path : 'subject/groups/edit/:id', component : EditgroupComponent},
  {path : 'sessions', component: SessionComponent},
  {path : 'library', component : ELibraryComponent },
  {path : 'subject/chapters/edit/:id', component: EditChapterComponent},
  {path : 'subject/chapters/add', component : NewChapterComponent},
  {path : 'subject/chapters', component : AllChapterComponent},
]},
  
  
]
@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes)
  ]
})
export class AdminRoutingModule { }
