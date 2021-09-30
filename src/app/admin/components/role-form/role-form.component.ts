import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { DialogCustomComponent, DialogData } from 'src/app/shared/components/dialog-custom/dialog-custom.component';
import { RequireMatch } from 'src/app/shared/directives/requireMatch.Validator';
import { Client } from 'src/app/shared/models/client.model';
import { User } from 'src/app/shared/models/user.model';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ClientsService } from 'src/app/shared/services/clients.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {

  title = 'EDIT ROLE';
  progressBarMode = '';
  roleForm: FormGroup;
  roleIdUrl: string;

  public dataSource;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'delete'];

  filteredOptions: Observable<Client[]>;
  clientArray: Client[];
  caseForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    
    private clientsService: ClientsService,
  ) { 
    this.dataSource = new MatTableDataSource<User>()
  }

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
    });

    this.caseForm = this.fb.group({
      clientId: ['' , [Validators.required, RequireMatch]]
    });
    
    this.caseForm.controls['clientId'].valueChanges.pipe(
      startWith(''),
      switchMap(inputText => {    
            return this.getClientListObservable(inputText || '');
       })
    ).subscribe(clientList => {      
      if(clientList.length > 0){ this.clientArray = clientList; }
      this.filteredOptions = of(clientList); 
    });  

    this.fillFormEdit();
  }

    // AutoComplete Input
    getClientListObservable(val: string) {
      return this.clientsService.getClientsByQueryObservable(val);
    }  

  private async fillFormEdit() {    
    this.roleIdUrl = this.route.snapshot.paramMap.get('id');
    this.roleForm.get('id').setValue(this.roleIdUrl);

    if ( this.roleIdUrl ) {
      let roleToEdit = await this.adminService.getRoleById(this.roleIdUrl);
      this.roleForm.patchValue({
        id: roleToEdit.id,
        name: roleToEdit.name
      });

      this.dataSource.data = roleToEdit.users;
    }
  }

  async onSubmit() {
    if (this.roleForm.invalid) { return; }

    this.progressBarMode = 'indeterminate';
    try {
        await this.adminService.updateRole(this.roleIdUrl, this.roleForm.value);

        this.snackBar.open(`Role ${this.roleForm.get('name').value} was successfuly updated`, 'X', { duration: 20000, panelClass: ['green-snackbar'] });
        this.router.navigate(['/roles']);
      } catch (error) {        
          this.snackBar.open(`Role was not updated`, 'X', { duration: 20000, panelClass: ['red-snackbar'] });
          throw error; 
      } finally {
          this.progressBarMode = '';
      }
    }


    applyFilter(event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    async onDeleteUserFromRole($event, userToDelete: User){
      $event.stopPropagation();
      const dialogData = new DialogData('Confirm Action', `Are you sure you want to delete the user (${userToDelete.email}) from this role?`);
      const dialogRef = this.dialog.open(DialogCustomComponent, { maxWidth: '500px', data: dialogData });  
      
        dialogRef.afterClosed().subscribe(async dialogResult => {
          try {
            if (dialogResult) {
              await this.adminService.deleteUserFromRole(userToDelete.id, this.roleForm.get('id').value);
              const index = this.dataSource.data.indexOf(userToDelete);
      
              this.dataSource.data.splice(index, 1);
              this.dataSource._updateChangeSubscription();
            }        
          } catch (error) {
            this.snackBar.open('Something when wrong, User was not deleted from this role', 'X', { duration: 20000, panelClass: ['red-snackbar'] });
          } finally{
              this.progressBarMode = '';
          }
        }); 
    }

    async addUserToRole(){
      var roleId = "roleId";
      var userId = "userId";
      await this.adminService.addUserToRole(userId, roleId);
    }

    displayFn( clientArray: Client[]): (id: number) => string | null {
      return (id: number) => { 
        const correspondingOption = Array.isArray(clientArray) ? clientArray.find(option => option.id === id) : null;
        return correspondingOption ? (`${correspondingOption.firstName} ${correspondingOption.lastName}`) : '';
      }
    }
}
