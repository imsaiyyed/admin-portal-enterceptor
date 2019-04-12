import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource,MatSort} from '@angular/material';
import {AccountDetails} from '../models/AccountDetails';
import {SelectionModel} from '@angular/cdk/collections';
import {AccountDetailsService} from '../services/account-service/account-details.service';
@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  displayedColumns: string[] ;
  dataSource ;
  selection = new SelectionModel<AccountDetails>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private accountDetails:AccountDetailsService){

  }
  ngOnInit() {
    this.displayedColumns= ['accountId','accountName', 'isActive','edit'];
    const ACCOUNT_DATA=this.accountDetails.ACCOUNT_DATA;
    console.log(ACCOUNT_DATA);
    this.dataSource = new MatTableDataSource<AccountDetails>(ACCOUNT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
   checkboxLabel(row?: AccountDetails): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.AccountId + 1}`;
  }
 
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editRecord(record){
    console.log(record);
  }
}