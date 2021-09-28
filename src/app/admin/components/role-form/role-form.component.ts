import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';

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
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
    });
    
    this.fillFormEdit();
  }

  private async fillFormEdit() {    
    this.roleIdUrl = this.route.snapshot.paramMap.get('id');
    this.roleForm.get('id').setValue(this.roleIdUrl);

    if ( this.roleIdUrl ) {
      let roleToEdit = await this.adminService.getRoleById(this.roleIdUrl);
      console.log(roleToEdit);
      this.roleForm.patchValue({
        id: roleToEdit.id,
        name: roleToEdit.name
      });
    }
  }

  async onSubmit() {
    if (this.roleForm.invalid) { return; }

    this.progressBarMode = 'indeterminate';
    try {
        await this.adminService.updateRole(this.roleIdUrl, this.roleForm.value);
        this.snackBar.open(`Role ${this.roleForm.get('name').value} was successfuly updated`, 'X', { duration: 20000, panelClass: ['green-snackbar'] });

        this.router.navigate(['/clients']);
      } catch (error) {
          throw error; 
      } finally {
          this.progressBarMode = '';
      }
    }
}
