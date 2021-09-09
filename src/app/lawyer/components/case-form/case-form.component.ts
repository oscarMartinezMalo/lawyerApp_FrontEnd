import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { RequireMatch } from 'src/app/shared/directives/requireMatch.Validator';
import { Case } from 'src/app/shared/models/case.model';
import { Client } from 'src/app/shared/models/client.model';
import { CasesService } from 'src/app/shared/services/cases.service';
import { ClientsService } from 'src/app/shared/services/clients.service';

@Component({
  selector: 'app-case-form',
  templateUrl: './case-form.component.html',
  styleUrls: ['./case-form.component.scss']
})
export class CaseFormComponent implements OnInit {
 
  public progressBarMode = '';
  caseForm: FormGroup;
  
  filteredOptions: Observable<Client[]>;
  clientArray: Client[];

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private snackBar: MatSnackBar,
    private clientsService: ClientsService,
    private casesService: CasesService
    ) { }

  async ngOnInit() {
    this.caseForm = this.fb.group({
      caseNumber: [null, Validators.required],
      type: [null, Validators.required],
      clientId: [null, [Validators.required, RequireMatch]]
    });

    this.caseForm.controls['clientId'].valueChanges.pipe(
      startWith(''),
      switchMap(inputText => {    
            return this.getClientListObservable(inputText || '')
       })
    ).subscribe(clientList => {      
      if(clientList.length > 0) this.clientArray = clientList;
      this.filteredOptions = of(clientList);
    });
  }

  getClientListObservable(val: string) {
    return this.clientsService.getClientsByQueryObservable(val);
  }  

  displayFn(clientArray: Client[]): (id: number) => string | null {
    return (id: number) => { 
      const correspondingOption = Array.isArray(clientArray) ? clientArray.find(option => option.id === id) : null;
      
      return correspondingOption ? (`${correspondingOption.firstName} ${correspondingOption.lastName}`) : '';
    }
  }

  async onSubmit() {    
    if (this.caseForm.invalid) { return; }

    this.progressBarMode = 'indeterminate';
    try {
        await this.casesService.saveCase(this.caseForm.value);
        this.snackBar.open(`Case ${this.caseForm.get('caseNumber').value} was successfuly created`, 'X', { duration: 20000, panelClass: ['green-snackbar'] });
        this.router.navigate(['/case-list']);
    } catch (error) {
        throw error; 
    } finally {
        this.progressBarMode = '';
    }

  }
}
