import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogData, DialogCustomComponent } from 'src/app/shared/components/dialog-custom/dialog-custom.component';
import { Case } from 'src/app/shared/models/case.model';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {


  displayedColumns: string[] = ['name', 'delete'];  
  roleForm: FormGroup;

  public dataSource;
  
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private dialog: MatDialog,
    private router: Router
  ) { 
    this.dataSource = new MatTableDataSource<Case>()
  }

  async ngOnInit() {
    this.roleForm = this.fb.group({
      roleName: [null],
    });

    this.dataSource.data  = await this.adminService.getRoleList();
    console.log(this.dataSource.data);
  }

  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClick(row) {
    console.log(row);
  }

  onSubmit(){
    console.log(this.roleForm.value);
  }

  async onDelete(caseToDelete: Case){
    // const dialogData = new DialogData('Confirm Action', `Are you sure you want to delete the case number ${caseToDelete.caseNumber}`);
    // const dialogRef = this.dialog.open(DialogCustomComponent, { maxWidth: '500px', data: dialogData });

    // dialogRef.afterClosed().subscribe(async dialogResult => {
    //   if (dialogResult) {
    //     await this.casesService.deleteCaseFromLawyer(caseToDelete.id);
    //     const index = this.dataSource.data.indexOf(caseToDelete);
    //     this.dataSource.data.splice(index, 1);
    //     this.dataSource._updateChangeSubscription();
    //   }});
  }
}
