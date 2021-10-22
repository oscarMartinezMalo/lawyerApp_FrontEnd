import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogData, DialogCustomComponent } from 'src/app/shared/components/dialog-custom/dialog-custom.component';
import { Client } from 'src/app/shared/models/client.model';
import { DocumentFile } from 'src/app/shared/models/document.model';
import { ClientsService } from 'src/app/shared/services/clients.service';
import { DocumentService } from 'src/app/shared/services/document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'dateCreated', 'size', 'download', 'delete'];

  public dataSource;

  constructor(
    private clientsService: ClientsService,
    private documentService: DocumentService,
    private dialog: MatDialog,
    private router: Router
  ) { 
    this.dataSource = new MatTableDataSource<Client>()
  }

  async ngOnInit(): Promise<void> {
    this.dataSource.data  = await this.documentService.getDocumentsListOfLawyer();
  }

  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClick(row) {
    // this.router.navigate(['document-upload']);
  }

  async onDownload($event,documentToDownload: DocumentFile){
    $event.stopPropagation();
    console.log(documentToDownload);
    // const dialogData = new DialogData('Confirm Action', `Are you sure you want to delete the Client ${clientToDelete.firstName} ${clientToDelete.lastName}`);
    // const dialogRef = this.dialog.open(DialogCustomComponent, { maxWidth: '500px', data: dialogData });

    // dialogRef.afterClosed().subscribe(async dialogResult => {
    //   if (dialogResult) {
    //     await this.clientsService.deleteClientFromLawyer(clientToDelete.id);
    //     const index = this.dataSource.data.indexOf(clientToDelete);
    //     console.log(index);
    //     this.dataSource.data.splice(index, 1);
    //     this.dataSource._updateChangeSubscription();
    //   }});
  }

  async onDelete($event,clientToDelete: Client){
    // $event.stopPropagation();
    // const dialogData = new DialogData('Confirm Action', `Are you sure you want to delete the Client ${clientToDelete.firstName} ${clientToDelete.lastName}`);
    // const dialogRef = this.dialog.open(DialogCustomComponent, { maxWidth: '500px', data: dialogData });

    // dialogRef.afterClosed().subscribe(async dialogResult => {
    //   if (dialogResult) {
    //     await this.clientsService.deleteClientFromLawyer(clientToDelete.id);
    //     const index = this.dataSource.data.indexOf(clientToDelete);
    //     console.log(index);
    //     this.dataSource.data.splice(index, 1);
    //     this.dataSource._updateChangeSubscription();
    //   }});
  }
}
