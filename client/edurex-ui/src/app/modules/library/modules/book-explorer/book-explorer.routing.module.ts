import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookExplorerComponent } from './book-explorer.component';
import { CreateNewBooksComponent } from './components/create-new-books/create-new-books.component';


const routes = [
    {path : '', component : BookExplorerComponent , 
    children : [
      {path : 'create-new',component : CreateNewBooksComponent},
   
    ]}
]

@NgModule({
    exports: [
      RouterModule
    ],
    imports: [
      RouterModule.forChild(routes)
    ]
  })
  export class BookExplorerRoutingModule { }