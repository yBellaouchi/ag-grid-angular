import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';

  // Each Column Definition results in one Column.
 public columnDefs: ColDef[] = [
  { field: 'make'},
  { field: 'model'},
  { field: 'price' }
];

 // DefaultColDef sets props common to all Columns
 public defaultColDef: ColDef = {
  sortable: true,
  filter: true,
  resizable: true,

};

 // Data that gets displayed in the grid
 public rowData$!: Observable<any[]>;

 @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

 constructor(private http: HttpClient) {}

 // Example load data from server
 onGridReady(params: GridReadyEvent) {
  this.rowData$ = this.http
    .get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
    console.log('data', this.rowData$)
}

 // Example of consuming Grid Event
 onCellClicked( e: CellClickedEvent): void {
  console.log('cellClicked', e.data);
}

 // Example using Grid's API
 clearSelection(): void {
  this.agGrid.api.deselectAll();
}
}
