import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatTableDataSource, MatSort } from "@angular/material";
import { ProjectDetails } from "../models/ProjectDetails";
import { SelectionModel } from "@angular/cdk/collections";
import { ProjectDetailsService } from "../services/project-service/project-details.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.css"]
})
export class ProjectDetailsComponent implements OnInit {
  displayedColumns: string[];
  dataSource;
  selection = new SelectionModel<ProjectDetails>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private projectDetails: ProjectDetailsService,
    private ngxService: NgxUiLoaderService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit() {
    // let PROJECT_DATA;
    this.ngxService.startBackground();
    this.projectDetails.initProjects().subscribe(resp => {
      // PROJECT_DATA=resp.body;
      this.projectDetails.PROJECT_DATA = resp.body;
      this.dataSource = new MatTableDataSource<ProjectDetails>(
        this.projectDetails.PROJECT_DATA
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.ngxService.stopBackground();
    });
    this.displayedColumns = [
      "ProjectId",
      "projectTitle",
      "startDate",
      "endDate",
      "isActive",
      "edit",
      "delete"
    ];
  }

  deleteProject(project: ProjectDetails) {
    this.projectDetails.deleteProject(project);
    this.dataSource = new MatTableDataSource<ProjectDetails>(
      this.projectDetails.PROJECT_DATA
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.snackBar.open("Client deleted...", "Ok", {
      duration: 3000
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ProjectDetails): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
    } row ${row.ProjectId + 1}`;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editRecord(record) {
    console.log(record);
  }
  selectRow(row:ProjectDetails) {
    console.log(row);
    this.router.navigate(['/project-details/project-profile/',row.ProjectId])
  }
}
