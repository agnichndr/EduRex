import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AdminComponent } from './admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatGridListModule} from '@angular/material/grid-list';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardComponent } from './components/admin/board/board.component';
import { BoardService } from './service/board.service';
import { ClassComponent } from './components/admin/class/class.component';
import { ClassService } from './service/class.service';
import { SubjectComponent } from './components/admin/subject/subject.component';
import { NewComponent } from './components/admin/subject-group/new/new.component';
import { GroupsComponent } from './components/admin/subject-group/groups/groups.component';
import { SubjectService } from './service/subject.service';
import { HomeComponent } from './components/admin/home/home.component';
import { GroupService } from './service/group.service';
import { AdminRoutingModule } from './admin-routing.module';
import {NgBreadcrumbModule} from 'ng-breadcrumb';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MaterialFileInputModule } from 'ngx-material-file-input';

import { EditgroupComponent } from './components/admin/subject-group/editgroup/editgroup.component';
import { SessionComponent } from './components/admin/session/session.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ELibraryComponent } from './components/admin/e-library/e-library.component';
import { NewChapterComponent } from './components/admin/chapter/new-chapter/new-chapter.component';
import { AllChapterComponent } from './components/admin/chapter/all-chapter/all-chapter.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    AdminComponent,
    BoardComponent,
    ClassComponent,
    SubjectComponent,
    NewComponent,
    GroupsComponent,
    HomeComponent,
    EditgroupComponent,
    SessionComponent,
    ELibraryComponent,
    NewChapterComponent,
    AllChapterComponent,
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatSidenavModule,
    MatTableModule,
    MatSortModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatDialogModule,
    MatMenuModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatSelectModule,
    MaterialFileInputModule,
    MatProgressBarModule,
    NgxMatSelectSearchModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminRoutingModule,
    NgBreadcrumbModule

  ],
  providers: [BoardService, ClassService, SubjectService,GroupService],
  bootstrap: [AdminComponent]
})


export class AdminModule { }
