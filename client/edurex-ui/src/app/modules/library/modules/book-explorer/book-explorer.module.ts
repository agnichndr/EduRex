import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookExplorerComponent } from './book-explorer.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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



import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatTabsModule} from '@angular/material/tabs';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { LibraryRoutingModule } from '../../library-routing.module';
import { CreateNewBooksComponent } from './components/create-new-books/create-new-books.component';
import { BookExplorerRoutingModule } from './book-explorer.routing.module';

@NgModule({
  declarations: [BookExplorerComponent,
                  CreateNewBooksComponent],
  imports: [
    CommonModule,
    MatSliderModule,
    MatTabsModule,
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
    BookExplorerRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers : [],
  bootstrap: [BookExplorerComponent,CreateNewBooksComponent]
})
export class BookExplorerModule { }
