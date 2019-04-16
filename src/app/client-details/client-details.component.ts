import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource,MatSort} from '@angular/material';
import {AccountDetails} from '../models/AccountDetails';
import {SelectionModel} from '@angular/cdk/collections';
import {ClientDetailsService} from '../services/client-service/client-details.service';
import { ClientDetails } from '../models/ClientDetails';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  displayedColumns: string[] ;
  dataSource ;
  selection = new SelectionModel<ClientDetails>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private clientDetailsService:ClientDetailsService,private snackBar: MatSnackBar){

  }
  ngOnInit() {
    this.clientDetailsService.initClients().subscribe((resp)=>{
      // PROJECT_DATA=resp.body;
      console.log('init',resp.body);
      this.clientDetailsService.CLIENT_DATA=resp.body;
      this.dataSource = new MatTableDataSource<ClientDetails>(this.clientDetailsService.CLIENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.displayedColumns= ['Id','ClientEmail', 'Designation','ClientName','IsActive','edit','delete'];
    
  }





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
   checkboxLabel(row?: ClientDetails): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }
 
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editRecord(record){
    console.log(record);
  }
  deleteClient(client:ClientDetails){

    this.clientDetailsService.deleteClient(client);
    this.dataSource=new MatTableDataSource<ClientDetails>(this.clientDetailsService.CLIENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.snackBar.open('Client deleted...', 'Ok', {
      duration: 3000
    });
  }
}