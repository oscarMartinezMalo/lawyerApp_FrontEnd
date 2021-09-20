import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ChildActivationStart, Router } from '@angular/router';
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
  title = 'CREATE NEW CASE';
  progressBarMode = '';
  caseForm: FormGroup;
  caseIdUrl: string;
  @ViewChild(MatAutocomplete) matAutocomplete: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) _auto: MatAutocompleteTrigger;
  
  filteredOptions: Observable<Client[]>;
  clientArray: Client[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private snackBar: MatSnackBar,
    private clientsService: ClientsService,
    private casesService: CasesService
    ) {
          
    // let scaseIdUrl = this.route.snapshot.paramMap.get('id');
    //   this.casesService.getCaseById(scaseIdUrl).then(caseto =>{
    //     if(caseto) {
    //       this.getClientListObservable(caseto.client.firstName + " " + caseto.client.lastName).subscribe( t =>{
    //         this.clientArray = t;
    //         console.log("here",t);
    //         this.filteredOptions = of(t);
    //         this.fillFormEdit();
            
    //         console.log( this.matAutocomplete.options.length);
    //         // this.matAutocomplete.options.first.select();
    //       });
    //     }
    //   });
   
  }

  setValue() {
    this.clientArray = [{id: 2, firstName: 'Oscar', lastName: 'Martinez', address: '', phone: '786-785-7896', lawyerId: ''}];
    this.filteredOptions = of(this.clientArray);

    // console.log(this.matAutocomplete.options.first);
    console.log(this._auto.autocomplete.options.toArray());
    this.caseForm.controls['clientId'].setValue("Oscar MArt");
    // this.matAutocomplete.options.first.select();
    // setTimeout(()=>{      
    //   console.log(this.matAutocomplete.options.first);
    // }, 2000);

    // let options = this.auto.autocomplete.options.toArray();
    // console.log('here',testArray[0]);
    // this.caseForm.controls['clientId'].setValue(testArray[0])
  }

  async ngOnInit() {

    this.caseForm = this.fb.group({
      caseNumber: [null, Validators.required],
      type: [null, Validators.required],
      clientId: ['' , [Validators.required, RequireMatch]]
    });
      
    this.caseForm.controls['clientId'].valueChanges.pipe(
      startWith(''),
      switchMap(inputText => {    
            return this.getClientListObservable(inputText || '')
       })
    ).subscribe(clientList => {      
      if(clientList.length > 0){ this.clientArray = clientList; }
      this.filteredOptions = of(clientList); 
    });   
   
    this.fillFormEdit();
  }

  private async fillFormEdit() {    
    this.caseIdUrl = this.route.snapshot.paramMap.get('id');

    if ( this.caseIdUrl ) {
      this.title = "EDIT CASE";      
      let caseToEdit = await this.casesService.getCaseById(this.caseIdUrl) as Case;

      this.caseForm.patchValue({
        id: caseToEdit.id,
        caseNumber: caseToEdit.caseNumber,
        type: caseToEdit.type
      });      

      // this.matAutocomplete.options.first.select();
    }
  }

  // AutoComplete Input
  getClientListObservable(val: string) {
    return this.clientsService.getClientsByQueryObservable(val);
  }  


  displayFn( clientArray: Client[]): (id: number) => string | null {
    return (id: number) => { 
      const correspondingOption = Array.isArray(clientArray) ? clientArray.find(option => option.id === id) : null;
      return correspondingOption ? (`${correspondingOption.firstName} ${correspondingOption.lastName}`) : '';
    }
  }
  // End AutoComplete Input

  async onSubmit() {    
    if (this.caseForm.invalid) { return; }

    this.progressBarMode = 'indeterminate';
    try {
        await this.casesService.saveCase(this.caseForm.value);
        this.snackBar.open(`Case ${this.caseForm.get('caseNumber').value} was successfuly created`, 'X', { duration: 20000, panelClass: ['green-snackbar'] });
        this.router.navigate(['/cases']);
    } catch (error) {
        throw error; 
    } finally {
        this.progressBarMode = '';
    }
  }
  
}
