import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { LibraryHomeComponent } from './components/library-home/library-home.component';
import { LibraryComponent } from './library.component';
import { BookExplorerComponent } from './modules/book-explorer/book-explorer.component';

const routes = [
    {path : 'e-library', component : LibraryComponent, 
    children : [
      {path : 'home',component : LibraryHomeComponent},
      {path : 'category/all', component : CategoryComponent},
      {path : 'book-explorer', loadChildren: () => import(`./modules/book-explorer/book-explorer.module`).then(m => m.BookExplorerModule)}
      
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
  export class LibraryRoutingModule { }